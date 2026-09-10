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
                         available_videos,
                         video_categories_by_video,
                         video_creator,
                         user_pref,
                         follow_row,
                         n_cat) {
  if (length(available_videos) == 0) return(NA_integer_)

  if (source == "known") {
    followed_creators <- which(follow_row)
    candidates <- available_videos[video_creator[available_videos] %in% followed_creators]
    if (length(candidates) > 0) return(sample(candidates, 1))
  }

  if (source == "preferred_new") {
    pref_order <- order(user_pref, decreasing = TRUE)
    top_cats <- pref_order[1:min(3, n_cat)]
    candidate_videos <- unique(unlist(video_categories_by_video[top_cats], use.names = FALSE))
    candidates <- intersect(available_videos, candidate_videos)
    if (length(candidates) > 0) {
      non_followed <- candidates[!follow_row[video_creator[candidates]]]
      if (length(non_followed) > 0) return(sample(non_followed, 1))
      return(sample(candidates, 1))
    }
  }

  sample(available_videos, 1)
}

simulate_platform <- function(cfg, categories, creators, creator_categories, users, follows_init, videos, video_categories) {
  set.seed(cfg$seed + 100)

  format_duration <- function(seconds) {
    seconds <- max(0, as.integer(round(seconds)))
    h <- seconds %/% 3600
    m <- (seconds %% 3600) %/% 60
    s <- seconds %% 60
    if (h > 0) {
      sprintf("%02dh:%02dm:%02ds", h, m, s)
    } else {
      sprintf("%02dm:%02ds", m, s)
    }
  }

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

  daily_cat_state <- list()
  mission_day_log <- list()

  progress_enabled <- isTRUE(cfg$progress$enabled)
  day_update_every <- cfg$progress$day_update_every
  if (is.null(day_update_every) || !is.numeric(day_update_every) || day_update_every < 1) {
    day_update_every <- 1L
  }
  day_update_every <- as.integer(day_update_every)
  use_txt_bar <- progress_enabled && interactive()
  progress_started_at <- Sys.time()
  day_pb <- NULL

  if (use_txt_bar) {
    day_pb <- utils::txtProgressBar(min = 0, max = cfg$n_days, style = 3)
  } else if (progress_enabled) {
    message(sprintf("Preparing %d simulation days...", cfg$n_days))
  }

  day_context <- vector("list", cfg$n_days)

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

    day_context[[d]] <- list(
      day = day,
      mission_effect = mission_effect,
      source_mix = source_mix,
      is_weekend = is_weekend,
      cat_pop = cat_pop,
      available_videos = which(as.Date(videos$publish_time) <= day)
    )

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

    if (progress_enabled && (d %% day_update_every == 0L || d == cfg$n_days)) {
      elapsed_sec <- as.numeric(difftime(Sys.time(), progress_started_at, units = "secs"))
      eta_sec <- if (d > 0) elapsed_sec * (cfg$n_days - d) / d else NA_real_
      if (use_txt_bar) {
        utils::setTxtProgressBar(day_pb, d)
      } else {
        message(sprintf(
          "prepare_days %d/%d (%.1f%%) elapsed=%s eta=%s",
          d,
          cfg$n_days,
          100 * d / cfg$n_days,
          format_duration(elapsed_sec),
          format_duration(eta_sec)
        ))
      }
    }
  }

  if (!is.null(day_pb)) {
    close(day_pb)
  }

  cpu_fraction <- cfg$parallel$cpu_fraction
  if (is.null(cpu_fraction) || !is.numeric(cpu_fraction) || cpu_fraction <= 0 || cpu_fraction > 1) {
    cpu_fraction <- 0.8
  }
  detected_cores <- parallel::detectCores(logical = TRUE)
  if (is.na(detected_cores) || detected_cores < 1) detected_cores <- 1L
  requested_workers <- floor(detected_cores * cpu_fraction)
  n_workers <- as.integer(max(1L, min(n_users, requested_workers)))
  if (!isTRUE(cfg$parallel$enabled)) n_workers <- 1L
  if (.Platform$OS.type == "windows" && n_workers > 1L) {
    message("Parallel user simulation currently uses forking and is disabled on Windows; falling back to 1 worker.")
    n_workers <- 1L
  }

  message(sprintf(
    "Simulating users with %d worker(s) (detected cores=%d, target fraction=%.2f).",
    n_workers,
    detected_cores,
    cpu_fraction
  ))

  make_chunks <- function(indices, n_chunks) {
    chunk_size <- ceiling(length(indices) / n_chunks)
    split(indices, ceiling(seq_along(indices) / chunk_size))
  }
  user_chunks <- make_chunks(seq_len(n_users), n_workers)

  simulate_user_chunk <- function(chunk_users) {
    n_local <- length(chunk_users)
    if (n_local == 0) {
      return(list(
        sessions = tibble::tibble(),
        impressions = tibble::tibble(),
        watch_events = tibble::tibble(),
        interactions = tibble::tibble(),
        daily_user_state = tibble::tibble(),
        follow_events = tibble::tibble(),
        current_follows = tibble::tibble(user_id = integer(0), creator_id = integer(0), is_following = logical(0))
      ))
    }

    satiation_local <- rep(0, n_local)
    habit_local <- rep(0, n_local)
    creator_affinity_local <- matrix(0, nrow = n_local, ncol = n_creators)
    follow_local <- follow_mat[chunk_users, , drop = FALSE]
    liked_cat_local <- matrix(0, nrow = n_local, ncol = n_cat)
    user_session_counter <- integer(n_local)
    user_impression_counter <- integer(n_local)

    session_log <- list()
    impression_log <- list()
    watch_log <- list()
    interaction_log <- list()
    daily_user_state_log <- list()
    follow_events_log <- list()

    for (d in seq_along(dates)) {
      ctx <- day_context[[d]]
      day <- ctx$day
      mission_effect <- ctx$mission_effect
      source_mix <- ctx$source_mix
      is_weekend <- ctx$is_weekend
      day_cat_pop <- ctx$cat_pop
      available_videos <- ctx$available_videos

      for (i in seq_len(n_local)) {
        u <- chunk_users[[i]]
        set.seed(cfg$seed + 100000L + d * 10000L + u)

        satiation_local[i] <- satiation_local[i] * users$satiation_decay[u]

        expected_feed_value <- sum((user_pref_mat[u, ] + liked_cat_local[i, ] * 0.02) * day_cat_pop) / sum(day_cat_pop)
        login_utility <- users$baseline_login[u] + 0.12 * expected_feed_value -
          cfg$user_behavior$satiation_login_penalty * satiation_local[i] +
          habit_local[i] + mission_effect$login_shift - ifelse(is_weekend, 0.08, 0)

        login_prob <- logit(login_utility)
        did_login <- runif(1) < login_prob

        if (!did_login) {
          habit_local[i] <- pmax(0, habit_local[i] - cfg$user_behavior$habit_decay_no_login)
        }

        if (did_login) {
          n_sessions <- pmax(1, rpois(1, lambda = cfg$user_behavior$mean_sessions_per_login))
          habit_local[i] <- pmin(2, habit_local[i] + cfg$user_behavior$habit_gain_per_login)

          for (s in seq_len(n_sessions)) {
            user_session_counter[i] <- user_session_counter[i] + 1L
            session_key <- sprintf("u%06d_s%06d", u, user_session_counter[i])
            session_start <- as.POSIXct(day, tz = "UTC") + lubridate::seconds(sample(0:80000, 1))
            current_ts <- session_start

            mean_vid <- pmax(4, users$base_videos_watched_mean[u] * (1 - 0.12 * satiation_local[i]))
            n_slots <- round(rnorm(1, mean = mean_vid, sd = users$base_videos_watched_sd[u]))
            n_slots <- max(3, min(80, n_slots))

            session_watch_seconds <- 0
            session_videos <- 0
            exited <- FALSE

            for (slot in seq_len(n_slots)) {
              source <- sample(names(source_mix), 1, prob = source_mix)

              vid <- choose_video(
                source = source,
                available_videos = available_videos,
                video_categories_by_video = video_ids_by_cat,
                video_creator = video_creator,
                user_pref = user_pref_mat[u, ],
                follow_row = follow_local[i, ],
                n_cat = n_cat
              )

              if (is.na(vid)) next

              cats <- video_cat_list[[vid]]
              cat_match <- mean(user_pref_mat[u, cats])
              creator <- video_creator[vid]
              creator_match <- creator_affinity_local[i, creator]
              novelty <- ifelse(follow_local[i, creator], -0.08, 0.1)
              sat_pen <- satiation_local[i] * (1 + mission_effect$satiation_shift)
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

              satiation_local[i] <- pmax(0, satiation_local[i] + (watch_seconds / 60) * cfg$user_behavior$satiation_increment_per_minute - 0.01)
              creator_affinity_local[i, creator] <- creator_affinity_local[i, creator] * 0.98 + 0.02 * cat_match + 0.04 * (watch_seconds / max(1, video_length[vid]))

              if (watch_seconds > 0) {
                liked_cat_local[i, cats] <- liked_cat_local[i, cats] + 1
              }

              user_impression_counter[i] <- user_impression_counter[i] + 1L
              impression_key <- sprintf("u%06d_i%09d", u, user_impression_counter[i])

              impression_log[[length(impression_log) + 1]] <- tibble::tibble(
                impression_key = impression_key,
                session_key = session_key,
                user_id = u,
                video_id = vid,
                creator_id = creator,
                shown_at = watch_start,
                feed_rank = slot,
                source_bucket = source,
                score_category_match = cat_match,
                score_creator_match = creator_match,
                score_satiation_penalty = sat_pen,
                score_total = u_full,
                mission_ids = paste(mission_effect$active_ids, collapse = "|")
              )

              watch_log[[length(watch_log) + 1]] <- tibble::tibble(
                impression_key = impression_key,
                session_key = session_key,
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
              unfollow_prob <- logit(-4 + 1.1 * satiation_local[i] - 0.4 * cat_match)

              if (runif(1) < like_prob) {
                interaction_log[[length(interaction_log) + 1]] <- tibble::tibble(
                  user_id = u,
                  creator_id = creator,
                  video_id = vid,
                  interaction_type = "like",
                  created_at = watch_end
                )
              } else if (runif(1) < 0.01 * like_prob) {
                interaction_log[[length(interaction_log) + 1]] <- tibble::tibble(
                  user_id = u,
                  creator_id = creator,
                  video_id = vid,
                  interaction_type = "unlike",
                  created_at = watch_end
                )
              }

              if (!follow_local[i, creator] && runif(1) < follow_prob) {
                follow_local[i, creator] <- TRUE
                interaction_log[[length(interaction_log) + 1]] <- tibble::tibble(
                  user_id = u,
                  creator_id = creator,
                  video_id = vid,
                  interaction_type = "follow",
                  created_at = watch_end
                )
                follow_events_log[[length(follow_events_log) + 1]] <- tibble::tibble(
                  user_id = u,
                  creator_id = creator,
                  follow_start = watch_end,
                  follow_end = as.POSIXct(NA)
                )
              } else if (follow_local[i, creator] && runif(1) < unfollow_prob) {
                follow_local[i, creator] <- FALSE
                interaction_log[[length(interaction_log) + 1]] <- tibble::tibble(
                  user_id = u,
                  creator_id = creator,
                  video_id = vid,
                  interaction_type = "unfollow",
                  created_at = watch_end
                )
                follow_events_log[[length(follow_events_log) + 1]] <- tibble::tibble(
                  user_id = u,
                  creator_id = creator,
                  follow_start = as.POSIXct(NA),
                  follow_end = watch_end
                )
              }

              if (exited) break
            }

            session_log[[length(session_log) + 1]] <- tibble::tibble(
              session_key = session_key,
              user_id = u,
              login_at = session_start,
              logout_at = current_ts,
              session_duration_sec = as.numeric(difftime(current_ts, session_start, units = "secs")),
              videos_viewed = session_videos,
              watch_seconds = session_watch_seconds
            )
          }
        }

        daily_user_state_log[[length(daily_user_state_log) + 1]] <- tibble::tibble(
          date = day,
          user_id = u,
          logged_in = did_login,
          satiation = satiation_local[i],
          habit = habit_local[i],
          login_probability = login_prob
        )
      }
    }

    follow_state <- which(follow_local, arr.ind = TRUE)
    if (nrow(follow_state) > 0) {
      final_follows <- tibble::tibble(
        user_id = chunk_users[follow_state[, "row"]],
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
      daily_user_state = dplyr::bind_rows(daily_user_state_log),
      follow_events = dplyr::bind_rows(follow_events_log),
      current_follows = final_follows
    )
  }

  run_users_started_at <- Sys.time()
  if (n_workers > 1L) {
    chunk_results <- parallel::mclapply(user_chunks, simulate_user_chunk, mc.cores = n_workers, mc.preschedule = TRUE)
  } else {
    chunk_results <- lapply(user_chunks, simulate_user_chunk)
  }
  elapsed_users <- as.numeric(difftime(Sys.time(), run_users_started_at, units = "secs"))
  message(sprintf("User simulation finished in %s.", format_duration(elapsed_users)))

  collect_chunk_tbl <- function(name) {
    dplyr::bind_rows(purrr::map(chunk_results, ~ .x[[name]]))
  }

  sessions_raw <- collect_chunk_tbl("sessions")
  impressions_raw <- collect_chunk_tbl("impressions")
  watch_raw <- collect_chunk_tbl("watch_events")
  interactions_raw <- collect_chunk_tbl("interactions")
  daily_user_state_tbl <- collect_chunk_tbl("daily_user_state")
  follow_events_tbl <- collect_chunk_tbl("follow_events")
  current_follows_tbl <- collect_chunk_tbl("current_follows")

  if (nrow(sessions_raw) > 0) {
    sessions_raw <- sessions_raw %>% dplyr::arrange(user_id, session_key, login_at)
  }
  if (nrow(impressions_raw) > 0) {
    impressions_raw <- impressions_raw %>% dplyr::arrange(user_id, impression_key, shown_at)
  }
  if (nrow(watch_raw) > 0) {
    watch_raw <- watch_raw %>% dplyr::arrange(user_id, impression_key, started_at, ended_at, action)
  }
  if (nrow(interactions_raw) > 0) {
    interactions_raw <- interactions_raw %>% dplyr::arrange(user_id, created_at, creator_id, video_id, interaction_type)
  }
  if (nrow(daily_user_state_tbl) > 0) {
    daily_user_state_tbl <- daily_user_state_tbl %>% dplyr::arrange(date, user_id)
  }
  if (nrow(follow_events_tbl) > 0) {
    follow_events_tbl <- follow_events_tbl %>% dplyr::arrange(user_id, creator_id, follow_start, follow_end)
  }
  if (nrow(current_follows_tbl) > 0) {
    current_follows_tbl <- current_follows_tbl %>% dplyr::arrange(user_id, creator_id)
  }

  if (nrow(sessions_raw) > 0) {
    sessions_tbl <- sessions_raw %>%
      dplyr::mutate(session_id = dplyr::row_number()) %>%
      dplyr::select(session_id, user_id, login_at, logout_at, session_duration_sec, videos_viewed, watch_seconds, session_key)
  } else {
    sessions_tbl <- tibble::tibble(
      session_id = integer(0),
      user_id = integer(0),
      login_at = as.POSIXct(character(0), tz = "UTC"),
      logout_at = as.POSIXct(character(0), tz = "UTC"),
      session_duration_sec = numeric(0),
      videos_viewed = numeric(0),
      watch_seconds = numeric(0),
      session_key = character(0)
    )
  }

  session_lookup <- sessions_tbl %>% dplyr::select(session_key, session_id)

  if (nrow(impressions_raw) > 0) {
    impressions_tbl <- impressions_raw %>%
      dplyr::left_join(session_lookup, by = "session_key") %>%
      dplyr::mutate(impression_id = dplyr::row_number()) %>%
      dplyr::select(
        impression_id, session_id, user_id, video_id, creator_id, shown_at, feed_rank,
        source_bucket, score_category_match, score_creator_match, score_satiation_penalty,
        score_total, mission_ids, impression_key, session_key
      )
  } else {
    impressions_tbl <- tibble::tibble(
      impression_id = integer(0),
      session_id = integer(0),
      user_id = integer(0),
      video_id = integer(0),
      creator_id = integer(0),
      shown_at = as.POSIXct(character(0), tz = "UTC"),
      feed_rank = integer(0),
      source_bucket = character(0),
      score_category_match = numeric(0),
      score_creator_match = numeric(0),
      score_satiation_penalty = numeric(0),
      score_total = numeric(0),
      mission_ids = character(0),
      impression_key = character(0),
      session_key = character(0)
    )
  }

  impression_lookup <- impressions_tbl %>%
    dplyr::select(impression_key, session_key, impression_id, session_id)

  if (nrow(watch_raw) > 0) {
    watch_tbl <- watch_raw %>%
      dplyr::left_join(impression_lookup, by = c("impression_key", "session_key")) %>%
      dplyr::mutate(watch_event_id = dplyr::row_number()) %>%
      dplyr::select(
        watch_event_id, impression_id, session_id, user_id, video_id, creator_id,
        action, watch_seconds, started_at, ended_at
      )
  } else {
    watch_tbl <- tibble::tibble(
      watch_event_id = integer(0),
      impression_id = integer(0),
      session_id = integer(0),
      user_id = integer(0),
      video_id = integer(0),
      creator_id = integer(0),
      action = character(0),
      watch_seconds = numeric(0),
      started_at = as.POSIXct(character(0), tz = "UTC"),
      ended_at = as.POSIXct(character(0), tz = "UTC")
    )
  }

  if (nrow(interactions_raw) > 0) {
    interactions_tbl <- interactions_raw %>%
      dplyr::mutate(interaction_id = dplyr::row_number()) %>%
      dplyr::select(interaction_id, user_id, creator_id, video_id, interaction_type, created_at)
  } else {
    interactions_tbl <- tibble::tibble(
      interaction_id = integer(0),
      user_id = integer(0),
      creator_id = integer(0),
      video_id = integer(0),
      interaction_type = character(0),
      created_at = as.POSIXct(character(0), tz = "UTC")
    )
  }

  list(
    sessions = sessions_tbl %>% dplyr::select(-session_key),
    impressions = impressions_tbl %>% dplyr::select(-impression_key, -session_key),
    watch_events = watch_tbl,
    interactions = interactions_tbl,
    daily_user_state = daily_user_state_tbl,
    daily_category_state = dplyr::bind_rows(daily_cat_state),
    follow_events = follow_events_tbl,
    current_follows = current_follows_tbl,
    mission_daily_effects = dplyr::bind_rows(mission_day_log)
  )
}
