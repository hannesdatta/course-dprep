generate_videos <- function(cfg, creators, creator_categories, categories, start_date) {
  set.seed(cfg$seed + 5)
  n <- cfg$n_videos

  creator_weights <- creators$posting_rate / sum(creators$posting_rate)
  video_creators <- sample(creators$creator_id, size = n, replace = TRUE, prob = creator_weights)

  lengths <- pmin(
    cfg$video_length$max,
    pmax(
      cfg$video_length$min,
      round(rnorm(n, mean = cfg$video_length$mean, sd = cfg$video_length$sd))
    )
  )

  publish_day <- sample(0:(cfg$n_days - 1), size = n, replace = TRUE)
  publish_time <- as.POSIXct(start_date, tz = "UTC") + lubridate::days(publish_day) + lubridate::seconds(sample(0:86399, n, TRUE))

  videos <- tibble::tibble(
    video_id = seq_len(n),
    creator_id = video_creators,
    video_length_sec = lengths,
    publish_time = publish_time,
    fake_url = sprintf(
      "https://www.tiktok.com/@%s/video/%s",
      creators$creator_handle[video_creators],
      paste0("9", sprintf("%018d", seq_len(n)))
    )
  )

  category_lookup <- creator_categories %>%
    dplyr::group_by(creator_id) %>%
    dplyr::summarise(spec_categories = list(category_id), .groups = "drop")

  videos <- videos %>% dplyr::left_join(category_lookup, by = "creator_id")

  video_categories <- purrr::map_dfr(seq_len(nrow(videos)), function(i) {
    row <- videos[i, ]
    k <- sample(1:cfg$category_assignment$max_video_categories, 1, prob = c(0.7, 0.2, 0.1))
    all_cats <- categories$category_id
    chosen <- integer(0)

    for (j in seq_len(k)) {
      if (runif(1) < cfg$category_assignment$p_creator_specialty && length(row$spec_categories[[1]]) > 0) {
        pick <- sample(row$spec_categories[[1]], 1)
      } else {
        pick <- sample(all_cats, 1)
      }
      chosen <- unique(c(chosen, pick))
    }

    tibble::tibble(video_id = row$video_id, category_id = chosen)
  })

  videos <- videos %>% dplyr::select(-spec_categories)
  list(videos = videos, video_categories = video_categories)
}
