softmax_sample <- function(x, labels) {
  z <- exp(x - max(x))
  p <- z / sum(z)
  sample(labels, size = 1, prob = p)
}

logit <- function(x) 1 / (1 + exp(-x))

get_mission_effects <- function(day_idx, mission_catalog, active_missions) {
  active <- mission_catalog %>%
    dplyr::filter(mission_id %in% active_missions, start_day <= day_idx, end_day >= day_idx)

  if (nrow(active) == 0) {
    return(list(login_shift = 0, explore_shift = 0, satiation_shift = 0, follow_shift = 0, like_shift = 0, targets = character(0), active_ids = character(0)))
  }

  list(
    login_shift = sum(active$login_shift, na.rm = TRUE),
    explore_shift = sum(active$explore_shift, na.rm = TRUE),
    satiation_shift = sum(active$satiation_shift, na.rm = TRUE),
    follow_shift = sum(active$follow_shift, na.rm = TRUE),
    like_shift = sum(active$like_shift, na.rm = TRUE),
    targets = active$target_category,
    active_ids = active$mission_id
  )
}

assemble_feed_source <- function(base_mix, explore_shift) {
  mix <- base_mix
  mix["explore"] <- max(0.05, mix["explore"] + explore_shift)
  scale_rest <- (1 - mix["explore"]) / (mix["known"] + mix["preferred_new"])
  mix["known"] <- mix["known"] * scale_rest
  mix["preferred_new"] <- mix["preferred_new"] * scale_rest
  mix / sum(mix)
}

choose_video <- function(source,
                         user_idx,
                         available_videos,
                         video_categories_by_video,
                         video_creator,
                         user_pref,
                         follow_mat,
                         n_cat) {
  if (length(available_videos) == 0) return(NA_integer_)

  if (source == "known") {
    followed_creators <- which(follow_mat[user_idx, ])
    candidates <- available_videos[video_creator[available_videos] %in% followed_creators]
    if (length(candidates) > 0) return(sample(candidates, 1))
  }

  if (source == "preferred_new") {
    pref_order <- order(user_pref, decreasing = TRUE)
    top_cats <- pref_order[1:min(3, n_cat)]
    candidate_videos <- unique(unlist(video_categories_by_video[top_cats], use.names = FALSE))
    candidates <- intersect(available_videos, candidate_videos)
    if (length(candidates) > 0) {
      non_followed <- candidates[!follow_mat[user_idx, video_creator[candidates]]]
      if (length(non_followed) > 0) return(sample(non_followed, 1))
      return(sample(candidates, 1))
    }
  }

  sample(available_videos, 1)
}

simulate_platform <- function(cfg, categories, creators, creator_categories, users, follows_init, videos, video_categories) {
  set.seed(cfg$seed + 100)

  start_date <- as.Date(cfg$start_date)
  dates <- seq(start_date, by = "day", length.out = cfg$n_days)

  n_users <- nrow(users)
  n_creators <- nrow(creators)
  n_cat <- nrow(categories)
  n_videos <- nrow(videos)

  user_pref_mat <- as.matrix(users[, paste0("pref_", categories$category_name)])
  creator_affinity <- matrix(0, nrow = n_users, ncol = n_creators)
  follow_mat <- matrix(FALSE, nrow = n_users, ncol = n_creators)
  if (nrow(follows_init) > 0) {
    follow_mat[cbind(follows_init$user_id, follows_init$creator_id)] <- TRUE
  }

  liked_cat <- matrix(0, nrow = n_users, ncol = n_cat)

  satiation <- rep(0, n_users)
  habit <- rep(0, n_users)

  video_creator <- videos$creator_id
  video_length <- videos$video_length_sec

  vc_split <- split(video_categories$category_id, video_categories$video_id)
  video_cat_list <- vector("list", n_videos)
  for (i in seq_len(n_videos)) {
    cats <- vc_split[[as.character(i)]]
    if (is.null(cats)) cats <- sample(seq_len(n_cat), 1)
    video_cat_list[[i]] <- cats
  }

  video_ids_by_cat <- vector("list", n_cat)
  raw_split <- split(video_categories$video_id, video_categories$category_id)
  for (i in seq_len(n_cat)) {
    vals <- raw_split[[as.character(i)]]
    if (is.null(vals)) vals <- integer(0)
    video_ids_by_cat[[i]] <- vals
  }

  cat_pop <- categories$base_popularity_minutes

  impression_log <- list()
  watch_log <- list()
  session_log <- list()
  interaction_log <- list()
  daily_user_state <- list()
  daily_cat_state <- list()
  follow_events <- list()
  mission_day_log <- list()

  impression_id <- 0L
  watch_id <- 0L
  session_id <- 0L
  interaction_id <- 0L

  for (d in seq_along(dates)) {
    day <- dates[d]
    mission_effect <- get_mission_effects(d, cfg$mission_catalog, cfg$active_missions)
    source_mix <- assemble_feed_source(cfg$source_mix, mission_effect$explore_shift)
    is_weekend <- lubridate::wday(day) %in% c(1, 7)

    seasonal_term <- sin((2 * pi * d) / 365)
    seasonal_multiplier <- 1 + categories$seasonal_amplitude * seasonal_term
    shock_trigger <- runif(n_cat) < cfg$category_trends$shock_prob_daily
    shock_mag <- ifelse(
      shock_trigger,
      1 + runif(n_cat, cfg$category_trends$shock_size[1], cfg$category_trends$shock_size[2]),
      1
    )

    cat_pop <- pmax(
      0.1,
      cat_pop *
        (1 + categories$daily_drift + rnorm(n_cat, 0, cfg$category_trends$random_noise_sd)) *
        seasonal_multiplier *
        shock_mag
    )
    if (length(mission_effect$targets) > 0) {
      target_ids <- categories$category_id[categories$category_name %in% mission_effect$targets]
      if (length(target_ids) > 0) {
        cat_pop[target_ids] <- cat_pop[target_ids] * 1.08
      }
    }

    daily_cat_state[[d]] <- tibble::tibble(
      date = day,
      category_id = categories$category_id,
      category_name = categories$category_name,
      trend_regime = categories$trend_regime,
      popularity_minutes = cat_pop
    )

    available_videos <- which(as.Date(videos$publish_time) <= day)

    for (u in seq_len(n_users)) {
      satiation[u] <- satiation[u] * users$satiation_decay[u]

      expected_feed_value <- sum((user_pref_mat[u, ] + liked_cat[u, ] * 0.02) * cat_pop) / sum(cat_pop)
      login_utility <- users$baseline_login[u] + 0.12 * expected_feed_value -
        cfg$user_behavior$satiation_login_penalty * satiation[u] +
        habit[u] + mission_effect$login_shift - ifelse(is_weekend, 0.08, 0)

      login_prob <- logit(login_utility)
      did_login <- runif(1) < login_prob

      if (!did_login) {
        habit[u] <- pmax(0, habit[u] - cfg$user_behavior$habit_decay_no_login)
      }

      if (did_login) {
        n_sessions <- pmax(1, rpois(1, lambda = cfg$user_behavior$mean_sessions_per_login))
        habit[u] <- pmin(2, habit[u] + cfg$user_behavior$habit_gain_per_login)

        for (s in seq_len(n_sessions)) {
          session_id <- session_id + 1L
          session_start <- as.POSIXct(day, tz = "UTC") + lubridate::seconds(sample(0:80000, 1))
          current_ts <- session_start

          mean_vid <- pmax(4, users$base_videos_watched_mean[u] * (1 - 0.12 * satiation[u]))
          n_slots <- round(rnorm(1, mean = mean_vid, sd = users$base_videos_watched_sd[u]))
          n_slots <- max(3, min(80, n_slots))

          session_watch_seconds <- 0
          session_videos <- 0
          exited <- FALSE

          for (slot in seq_len(n_slots)) {
            impression_id <- impression_id + 1L
            source <- sample(names(source_mix), 1, prob = source_mix)

            vid <- choose_video(
              source = source,
              user_idx = u,
              available_videos = available_videos,
              video_categories_by_video = video_ids_by_cat,
              video_creator = video_creator,
              user_pref = user_pref_mat[u, ],
              follow_mat = follow_mat,
              n_cat = n_cat
            )

            if (is.na(vid)) next

            cats <- video_cat_list[[vid]]
            cat_match <- mean(user_pref_mat[u, cats])
            creator <- video_creator[vid]
            creator_match <- creator_affinity[u, creator]
            novelty <- ifelse(follow_mat[u, creator], -0.08, 0.1)
            sat_pen <- satiation[u] * (1 + mission_effect$satiation_shift)
            len_pen <- -abs(video_length[vid] - 30) / 45

            u_full <- 0.65 * cat_match + 0.45 * creator_match + novelty + len_pen - 0.8 * sat_pen
            u_partial <- 0.35 * cat_match + 0.25 * creator_match - 0.55 * sat_pen
            u_skip <- -0.2 * cat_match - 0.2 * creator_match + 0.25 * sat_pen
            u_exit <- -0.4 * cat_match - 0.3 * creator_match + 0.55 * sat_pen

            action <- softmax_sample(c(u_full, u_partial, u_skip, u_exit), c("watch_full", "skip_after_partial", "skip_immediate", "exit_platform"))

            if (action == "watch_full") {
              watch_seconds <- video_length[vid]
            } else if (action == "skip_after_partial") {
              watch_seconds <- max(1, round(video_length[vid] * runif(1, 0.2, 0.75)))
            } else if (action == "skip_immediate") {
              watch_seconds <- 0
            } else {
              watch_seconds <- max(0, round(video_length[vid] * runif(1, 0.05, 0.35)))
              exited <- TRUE
            }

            watch_start <- current_ts
            watch_end <- current_ts + lubridate::seconds(max(1, watch_seconds))
            current_ts <- watch_end + lubridate::seconds(sample(1:4, 1))

            satiation[u] <- pmax(0, satiation[u] + (watch_seconds / 60) * cfg$user_behavior$satiation_increment_per_minute - 0.01)
            creator_affinity[u, creator] <- creator_affinity[u, creator] * 0.98 + 0.02 * cat_match + 0.04 * (watch_seconds / max(1, video_length[vid]))

            if (watch_seconds > 0) {
              liked_cat[u, cats] <- liked_cat[u, cats] + 1
            }

            rank_score <- u_full
            rank <- slot

            impression_log[[length(impression_log) + 1]] <- tibble::tibble(
              impression_id = impression_id,
              session_id = session_id,
              user_id = u,
              video_id = vid,
              creator_id = creator,
              shown_at = watch_start,
              feed_rank = rank,
              source_bucket = source,
              score_category_match = cat_match,
              score_creator_match = creator_match,
              score_satiation_penalty = sat_pen,
              score_total = rank_score,
              mission_ids = paste(mission_effect$active_ids, collapse = "|")
            )

            watch_id <- watch_id + 1L
            watch_log[[length(watch_log) + 1]] <- tibble::tibble(
              watch_event_id = watch_id,
              impression_id = impression_id,
              session_id = session_id,
              user_id = u,
              video_id = vid,
              creator_id = creator,
              action = action,
              watch_seconds = watch_seconds,
              started_at = watch_start,
              ended_at = watch_end
            )

            session_watch_seconds <- session_watch_seconds + watch_seconds
            session_videos <- session_videos + 1

            like_prob <- logit(-2 + 1.0 * users$need_interaction[u] + 0.6 * cat_match + 0.4 * creator_match + mission_effect$like_shift)
            follow_prob <- logit(-3 + 0.9 * users$need_interaction[u] + 0.7 * cat_match + 0.5 * creator_match + mission_effect$follow_shift)
            unfollow_prob <- logit(-4 + 1.1 * satiation[u] - 0.4 * cat_match)

            if (runif(1) < like_prob) {
              interaction_id <- interaction_id + 1L
              interaction_log[[length(interaction_log) + 1]] <- tibble::tibble(
                interaction_id = interaction_id,
                user_id = u,
                creator_id = creator,
                video_id = vid,
                interaction_type = "like",
                created_at = watch_end
              )
            } else if (runif(1) < 0.01 * like_prob) {
              interaction_id <- interaction_id + 1L
              interaction_log[[length(interaction_log) + 1]] <- tibble::tibble(
                interaction_id = interaction_id,
                user_id = u,
                creator_id = creator,
                video_id = vid,
                interaction_type = "unlike",
                created_at = watch_end
              )
            }

            if (!follow_mat[u, creator] && runif(1) < follow_prob) {
              follow_mat[u, creator] <- TRUE
              interaction_id <- interaction_id + 1L
              interaction_log[[length(interaction_log) + 1]] <- tibble::tibble(
                interaction_id = interaction_id,
                user_id = u,
                creator_id = creator,
                video_id = vid,
                interaction_type = "follow",
                created_at = watch_end
              )
              follow_events[[length(follow_events) + 1]] <- tibble::tibble(
                user_id = u,
                creator_id = creator,
                follow_start = watch_end,
                follow_end = as.POSIXct(NA)
              )
            } else if (follow_mat[u, creator] && runif(1) < unfollow_prob) {
              follow_mat[u, creator] <- FALSE
              interaction_id <- interaction_id + 1L
              interaction_log[[length(interaction_log) + 1]] <- tibble::tibble(
                interaction_id = interaction_id,
                user_id = u,
                creator_id = creator,
                video_id = vid,
                interaction_type = "unfollow",
                created_at = watch_end
              )
              follow_events[[length(follow_events) + 1]] <- tibble::tibble(
                user_id = u,
                creator_id = creator,
                follow_start = as.POSIXct(NA),
                follow_end = watch_end
              )
            }

            if (exited) break
          }

          session_log[[length(session_log) + 1]] <- tibble::tibble(
            session_id = session_id,
            user_id = u,
            login_at = session_start,
            logout_at = current_ts,
            session_duration_sec = as.numeric(difftime(current_ts, session_start, units = "secs")),
            videos_viewed = session_videos,
            watch_seconds = session_watch_seconds
          )
        }
      }

      daily_user_state[[length(daily_user_state) + 1]] <- tibble::tibble(
        date = day,
        user_id = u,
        logged_in = did_login,
        satiation = satiation[u],
        habit = habit[u],
        login_probability = login_prob
      )
    }

    mission_day_log[[length(mission_day_log) + 1]] <- tibble::tibble(
      date = day,
      day_index = d,
      active_missions = paste(mission_effect$active_ids, collapse = "|"),
      login_shift = mission_effect$login_shift,
      explore_shift = mission_effect$explore_shift,
      satiation_shift = mission_effect$satiation_shift,
      follow_shift = mission_effect$follow_shift,
      like_shift = mission_effect$like_shift
    )
  }

  follow_state <- which(follow_mat, arr.ind = TRUE)
  if (nrow(follow_state) > 0) {
    final_follows <- tibble::tibble(
      user_id = follow_state[, "row"],
      creator_id = follow_state[, "col"],
      is_following = TRUE
    )
  } else {
    final_follows <- tibble::tibble(
      user_id = integer(0),
      creator_id = integer(0),
      is_following = logical(0)
    )
  }

  list(
    sessions = dplyr::bind_rows(session_log),
    impressions = dplyr::bind_rows(impression_log),
    watch_events = dplyr::bind_rows(watch_log),
    interactions = dplyr::bind_rows(interaction_log),
    daily_user_state = dplyr::bind_rows(daily_user_state),
    daily_category_state = dplyr::bind_rows(daily_cat_state),
    follow_events = dplyr::bind_rows(follow_events),
    current_follows = final_follows,
    mission_daily_effects = dplyr::bind_rows(mission_day_log)
  )
}
