create_descriptives <- function(observed_tables, output_base) {
  dir.create(file.path(output_base, "descriptives"), recursive = TRUE, showWarnings = FALSE)

  sessions <- observed_tables$sessions
  watch <- observed_tables$watch_events
  impressions <- observed_tables$impressions
  interactions <- observed_tables$interactions
  videos <- observed_tables$videos
  video_categories <- observed_tables$video_categories
  categories <- observed_tables$categories

  daily_sessions <- sessions %>%
    dplyr::mutate(date = as.Date(login_at)) %>%
    dplyr::group_by(date) %>%
    dplyr::summarise(
      dau = dplyr::n_distinct(user_id),
      sessions = dplyr::n(),
      mean_watch_seconds = mean(watch_seconds, na.rm = TRUE),
      .groups = "drop"
    )

  action_share <- watch %>%
    dplyr::count(action, name = "n") %>%
    dplyr::mutate(share = n / sum(n))

  feed_mix <- impressions %>%
    dplyr::count(source_bucket, name = "n") %>%
    dplyr::mutate(share = n / sum(n))

  category_watch <- watch %>%
    dplyr::left_join(video_categories, by = "video_id", relationship = "many-to-many") %>%
    dplyr::left_join(categories, by = "category_id") %>%
    dplyr::mutate(date = as.Date(started_at)) %>%
    dplyr::group_by(date, category_name) %>%
    dplyr::summarise(watch_seconds = sum(watch_seconds, na.rm = TRUE), .groups = "drop")

  top_creators <- watch %>%
    dplyr::group_by(creator_id) %>%
    dplyr::summarise(total_watch_seconds = sum(watch_seconds, na.rm = TRUE), .groups = "drop") %>%
    dplyr::arrange(dplyr::desc(total_watch_seconds)) %>%
    dplyr::slice_head(n = 20)

  readr::write_csv(daily_sessions, file.path(output_base, "descriptives", "daily_sessions.csv"))
  readr::write_csv(action_share, file.path(output_base, "descriptives", "action_share.csv"))
  readr::write_csv(feed_mix, file.path(output_base, "descriptives", "feed_mix.csv"))
  readr::write_csv(category_watch, file.path(output_base, "descriptives", "category_watch.csv"))
  readr::write_csv(top_creators, file.path(output_base, "descriptives", "top_creators.csv"))

  p1 <- ggplot2::ggplot(daily_sessions, ggplot2::aes(x = date, y = dau)) +
    ggplot2::geom_line(color = "#1b6ca8") +
    ggplot2::labs(title = "Daily Active Users", x = "Date", y = "Users") +
    ggplot2::theme_minimal()

  p2 <- ggplot2::ggplot(action_share, ggplot2::aes(x = action, y = share)) +
    ggplot2::geom_col(fill = "#2a9d8f") +
    ggplot2::scale_y_continuous(labels = scales::percent) +
    ggplot2::labs(title = "Watch Action Shares", x = "Action", y = "Share") +
    ggplot2::theme_minimal()

  p3 <- ggplot2::ggplot(feed_mix, ggplot2::aes(x = source_bucket, y = share)) +
    ggplot2::geom_col(fill = "#f4a261") +
    ggplot2::scale_y_continuous(labels = scales::percent) +
    ggplot2::labs(title = "Feed Source Mix", x = "Source", y = "Share") +
    ggplot2::theme_minimal()

  p4 <- ggplot2::ggplot(category_watch, ggplot2::aes(x = date, y = watch_seconds, color = category_name)) +
    ggplot2::geom_line(alpha = 0.7) +
    ggplot2::labs(title = "Category Watch Time Over Time", x = "Date", y = "Watch Seconds") +
    ggplot2::theme_minimal() +
    ggplot2::theme(legend.position = "none")

  ggplot2::ggsave(file.path(output_base, "descriptives", "daily_active_users.png"), p1, width = 8, height = 4)
  ggplot2::ggsave(file.path(output_base, "descriptives", "action_share.png"), p2, width = 7, height = 4)
  ggplot2::ggsave(file.path(output_base, "descriptives", "feed_mix.png"), p3, width = 7, height = 4)
  ggplot2::ggsave(file.path(output_base, "descriptives", "category_watch_trends.png"), p4, width = 9, height = 5)

  invisible(list(
    daily_sessions = daily_sessions,
    action_share = action_share,
    feed_mix = feed_mix,
    category_watch = category_watch,
    top_creators = top_creators
  ))
}
