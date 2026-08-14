apply_corruption <- function(cfg, truth, creators, categories, videos, video_categories) {
  set.seed(cfg$seed + 200)

  impressions_obs <- truth$impressions
  watch_obs <- truth$watch_events
  sessions_obs <- truth$sessions
  interactions_obs <- truth$interactions

  if (nrow(watch_obs) > 0) {
    primary_video_category <- video_categories %>%
      dplyr::group_by(video_id) %>%
      dplyr::summarise(category_id = min(category_id), .groups = "drop")

    n_missing <- floor(nrow(watch_obs) * cfg$corruption$missing_watch_seconds)
    idx_missing <- sample(seq_len(nrow(watch_obs)), n_missing)
    watch_obs$watch_seconds[idx_missing] <- NA_real_

    watch_obs <- watch_obs %>%
      dplyr::left_join(primary_video_category, by = "video_id") %>%
      dplyr::mutate(week = paste0(lubridate::year(started_at), "-W", format(started_at, "%V")))

    weekly_block <- watch_obs %>%
      dplyr::distinct(category_id, week)

    n_block <- max(1, floor(nrow(weekly_block) * cfg$corruption$block_missing_category_week))
    blocked <- weekly_block %>% dplyr::slice_sample(n = n_block)

    watch_obs <- watch_obs %>%
      dplyr::left_join(blocked %>% dplyr::mutate(block_missing = TRUE), by = c("category_id", "week")) %>%
      dplyr::mutate(watch_seconds = dplyr::if_else(!is.na(block_missing), NA_real_, watch_seconds)) %>%
      dplyr::select(-category_id, -week, -block_missing)
  }

  if (nrow(impressions_obs) > 0 && cfg$corruption$duplicate_impressions > 0) {
    n_dup <- floor(nrow(impressions_obs) * cfg$corruption$duplicate_impressions)
    dup_rows <- impressions_obs %>% dplyr::slice_sample(n = n_dup)
    impressions_obs <- dplyr::bind_rows(impressions_obs, dup_rows)
  }

  creator_alias <- creators %>%
    dplyr::mutate(rand = runif(dplyr::n())) %>%
    dplyr::transmute(
      creator_id,
      creator_name,
      creator_alias = dplyr::case_when(
        rand < 0.25 ~ paste0("The ", creator_name),
        rand < 0.50 ~ gsub(" ", "-", creator_name),
        rand < 0.75 ~ paste0(creator_name, " Official"),
        TRUE ~ paste0(creator_name, " ", sample(100:999, dplyr::n(), replace = TRUE))
      )
    )

  impressions_obs <- impressions_obs %>%
    dplyr::left_join(creator_alias, by = "creator_id") %>%
    dplyr::mutate(
      creator_display_name = dplyr::if_else(runif(dplyr::n()) < cfg$corruption$creator_alias_noise, creator_alias, creator_name)
    ) %>%
    dplyr::select(-creator_name, -creator_alias)

  if (cfg$corruption$mixed_timestamp_formats && nrow(watch_obs) > 0) {
    fmt_type <- sample(c("iso", "compact", "epoch"), nrow(watch_obs), replace = TRUE, prob = c(0.7, 0.2, 0.1))
    watch_obs <- watch_obs %>%
      dplyr::mutate(
        started_at_raw = dplyr::case_when(
          fmt_type == "iso" ~ format(started_at, "%Y-%m-%dT%H:%M:%SZ"),
          fmt_type == "compact" ~ format(started_at, "%Y%m%d %H%M%S"),
          TRUE ~ as.character(as.integer(as.numeric(started_at)))
        )
      )
  }

  list(
    impressions = impressions_obs,
    watch_events = watch_obs,
    sessions = sessions_obs,
    interactions = interactions_obs,
    daily_user_state = truth$daily_user_state,
    daily_category_state = truth$daily_category_state,
    follow_events = truth$follow_events,
    current_follows = truth$current_follows,
    mission_daily_effects = truth$mission_daily_effects
  )
}
