safe_ratio <- function(num, den) {
  ifelse(den == 0, NA_real_, num / den)
}

check_direction <- function(delta, expected_sign, tol = 1e-6) {
  if (is.na(expected_sign) || expected_sign == "none" || is.na(delta)) return(NA)
  if (expected_sign == "up") return(delta > tol)
  if (expected_sign == "down") return(delta < -tol)
  abs(delta) <= tol
}

evaluate_missions <- function(observed_tables, mission_catalog, output_base) {
  out_dir <- file.path(output_base, "mission_evaluation")
  dir.create(out_dir, recursive = TRUE, showWarnings = FALSE)

  sessions <- observed_tables$sessions
  watch <- observed_tables$watch_events
  impressions <- observed_tables$impressions
  interactions <- observed_tables$interactions

  session_daily <- sessions %>%
    dplyr::mutate(date = as.Date(login_at)) %>%
    dplyr::group_by(date) %>%
    dplyr::summarise(
      dau = dplyr::n_distinct(user_id),
      sessions = dplyr::n(),
      mean_watch_seconds_session = mean(watch_seconds, na.rm = TRUE),
      .groups = "drop"
    )

  watch_daily <- watch %>%
    dplyr::mutate(date = as.Date(started_at)) %>%
    dplyr::group_by(date) %>%
    dplyr::summarise(
      share_watch_full = mean(action == "watch_full", na.rm = TRUE),
      share_exit = mean(action == "exit_platform", na.rm = TRUE),
      .groups = "drop"
    )

  impression_daily <- impressions %>%
    dplyr::mutate(date = as.Date(shown_at)) %>%
    dplyr::group_by(date) %>%
    dplyr::summarise(
      share_explore = mean(source_bucket == "explore", na.rm = TRUE),
      .groups = "drop"
    )

  interaction_daily <- interactions %>%
    dplyr::mutate(date = as.Date(created_at)) %>%
    dplyr::group_by(date) %>%
    dplyr::summarise(
      likes = sum(interaction_type == "like", na.rm = TRUE),
      follows = sum(interaction_type == "follow", na.rm = TRUE),
      .groups = "drop"
    )

  daily <- session_daily %>%
    dplyr::left_join(watch_daily, by = "date") %>%
    dplyr::left_join(impression_daily, by = "date") %>%
    dplyr::left_join(interaction_daily, by = "date") %>%
    dplyr::mutate(
      likes = dplyr::coalesce(likes, 0L),
      follows = dplyr::coalesce(follows, 0L),
      like_rate_per_dau = safe_ratio(likes, dau),
      follow_rate_per_dau = safe_ratio(follows, dau)
    )

  metrics <- c("dau", "share_explore", "mean_watch_seconds_session", "like_rate_per_dau", "follow_rate_per_dau")

  get_expected <- function(row) {
    c(
      dau = dplyr::case_when(row$login_shift > 0 ~ "up", row$login_shift < 0 ~ "down", TRUE ~ "none"),
      share_explore = dplyr::case_when(row$explore_shift > 0 ~ "up", row$explore_shift < 0 ~ "down", TRUE ~ "none"),
      mean_watch_seconds_session = dplyr::case_when(row$satiation_shift > 0 ~ "down", row$satiation_shift < 0 ~ "up", TRUE ~ "none"),
      like_rate_per_dau = dplyr::case_when(row$like_shift > 0 ~ "up", row$like_shift < 0 ~ "down", TRUE ~ "none"),
      follow_rate_per_dau = dplyr::case_when(row$follow_shift > 0 ~ "up", row$follow_shift < 0 ~ "down", TRUE ~ "none")
    )
  }

  mission_results <- purrr::map_dfr(seq_len(nrow(mission_catalog)), function(i) {
    m <- mission_catalog[i, ]
    during_start <- min(daily$date) + (m$start_day - 1)
    during_end <- min(daily$date) + (m$end_day - 1)
    window_len <- as.integer(during_end - during_start) + 1
    pre_start <- during_start - window_len
    pre_end <- during_start - 1
    post_start <- during_end + 1
    post_end <- during_end + window_len

    pre <- daily %>% dplyr::filter(date >= pre_start, date <= pre_end)
    during <- daily %>% dplyr::filter(date >= during_start, date <= during_end)
    post <- daily %>% dplyr::filter(date >= post_start, date <= post_end)

    expected <- get_expected(m)

    purrr::map_dfr(metrics, function(metric) {
      pre_val <- mean(pre[[metric]], na.rm = TRUE)
      during_val <- mean(during[[metric]], na.rm = TRUE)
      post_val <- mean(post[[metric]], na.rm = TRUE)
      delta <- during_val - pre_val
      expected_sign <- expected[[metric]]
      pass <- check_direction(delta, expected_sign)

      tibble::tibble(
        mission_id = m$mission_id,
        mission_title = m$title,
        metric = metric,
        pre_value = pre_val,
        during_value = during_val,
        post_value = post_val,
        delta_during_vs_pre = delta,
        expected_sign = expected_sign,
        pass_direction = pass
      )
    })
  })

  mission_summary <- mission_results %>%
    dplyr::group_by(mission_id, mission_title) %>%
    dplyr::summarise(
      checks = sum(!is.na(pass_direction)),
      passes = sum(pass_direction, na.rm = TRUE),
      pass_rate = ifelse(checks == 0, NA_real_, passes / checks),
      .groups = "drop"
    )

  readr::write_csv(daily, file.path(out_dir, "daily_kpis.csv"))
  readr::write_csv(mission_results, file.path(out_dir, "mission_results.csv"))
  readr::write_csv(mission_summary, file.path(out_dir, "mission_summary.csv"))

  lines <- c(
    "# Mission Evaluation",
    "",
    "This report checks whether directionally expected KPI movements appear during each mission window.",
    ""
  )

  for (j in seq_len(nrow(mission_summary))) {
    row <- mission_summary[j, ]
    lines <- c(
      lines,
      sprintf("- %s (%s): %d/%d directional checks passed (%.1f%%)", row$mission_id, row$mission_title, row$passes, row$checks, 100 * row$pass_rate)
    )
  }

  writeLines(lines, file.path(out_dir, "mission_summary.md"))

  invisible(list(daily = daily, mission_results = mission_results, mission_summary = mission_summary))
}
