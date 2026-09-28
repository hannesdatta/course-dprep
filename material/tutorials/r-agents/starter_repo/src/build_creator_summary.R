library(readr)
library(dplyr)

video_view <- read_csv("data/exports/video_view.csv", show_col_types = FALSE)
creators <- read_csv("data/exports/creators.csv", show_col_types = FALSE)

creator_summary <- video_view %>%
  group_by(creator_id) %>%
  summarise(
    videos_n = n(),
    impressions_total = sum(impressions_n, na.rm = TRUE),
    avg_watch_rate = mean(watch_rate, na.rm = TRUE),
    .groups = "drop"
  ) %>%
  left_join(creators, by = "creator_id") %>%
  select(creator_id, creator_name, videos_n, impressions_total, avg_watch_rate) %>%
  arrange(desc(impressions_total))

dir.create("data/analysis", recursive = TRUE, showWarnings = FALSE)
write_csv(creator_summary, "data/analysis/creator_summary.csv")
