write_tables_csv <- function(output_dir, tables, prefix = "") {
  dir.create(output_dir, recursive = TRUE, showWarnings = FALSE)
  purrr::iwalk(tables, function(tbl, nm) {
    readr::write_csv(tbl, file.path(output_dir, paste0(prefix, nm, ".csv")))
  })
}

normalize_table_for_sqlite <- function(tbl) {
  for (nm in names(tbl)) {
    col <- tbl[[nm]]
    if (inherits(col, "POSIXt")) {
      tbl[[nm]] <- as.integer(as.numeric(col))
    } else if (inherits(col, "Date")) {
      tbl[[nm]] <- format(col, "%Y-%m-%d")
    } else if (is.logical(col)) {
      tbl[[nm]] <- as.integer(col)
    }
  }
  tbl
}

normalize_tables_for_sqlite <- function(tables) {
  purrr::map(tables, normalize_table_for_sqlite)
}

write_sqlite <- function(sqlite_path, tables, index_sql = character(0), post_sql = character(0)) {
  if (file.exists(sqlite_path)) {
    unlink(sqlite_path)
  }
  con <- DBI::dbConnect(RSQLite::SQLite(), sqlite_path)
  on.exit(DBI::dbDisconnect(con), add = TRUE)

  norm_tables <- normalize_tables_for_sqlite(tables)
  purrr::iwalk(norm_tables, function(tbl, nm) {
    DBI::dbWriteTable(con, nm, tbl, overwrite = TRUE)
  })

  if (length(index_sql) > 0) invisible(lapply(index_sql, DBI::dbExecute, conn = con))
  if (length(post_sql) > 0) invisible(lapply(post_sql, DBI::dbExecute, conn = con))
}

write_student_views_csv <- function(sqlite_path, output_dir, view_names = c("video_view", "user_view")) {
  dir.create(output_dir, recursive = TRUE, showWarnings = FALSE)
  con <- DBI::dbConnect(RSQLite::SQLite(), sqlite_path)
  on.exit(DBI::dbDisconnect(con), add = TRUE)

  purrr::walk(view_names, function(view_name) {
    view_tbl <- DBI::dbReadTable(con, view_name)
    readr::write_csv(view_tbl, file.path(output_dir, paste0(view_name, ".csv")))
  })
}

make_data_dictionary <- function(tables) {
  purrr::imap_dfr(tables, function(tbl, nm) {
    tibble::tibble(
      table_name = nm,
      column_name = names(tbl),
      r_type = vapply(tbl, function(x) class(x)[1], character(1)),
      example_value = vapply(tbl, function(x) {
        if (length(x) == 0) return(NA_character_)
        val <- x[which(!is.na(x))[1]]
        if (is.null(val) || length(val) == 0 || is.na(val)) return(NA_character_)
        as.character(val)
      }, character(1))
    )
  })
}

build_student_tables <- function(observed_tables, mission_catalog, cfg) {
  users <- observed_tables$users %>%
    dplyr::select(user_id, user_name, user_handle)

  creators <- observed_tables$creators %>%
    dplyr::select(creator_id, creator_name, creator_handle)

  videos <- observed_tables$videos %>%
    dplyr::transmute(
      video_id,
      creator_id,
      video_length_sec,
      published_at = publish_time,
      video_url = fake_url
    )

  watch_logs <- observed_tables$impressions %>%
    dplyr::transmute(
      impression_id,
      user_id,
      video_id,
      creator_id,
      impression_at = shown_at,
      source_bucket,
      creator_display_name
    ) %>%
    dplyr::left_join(
      observed_tables$watch_events %>%
        dplyr::transmute(
          watch_event_id,
          impression_id,
          watch_seconds,
          watch_start_at = started_at
        ),
      by = "impression_id"
    ) %>%
    dplyr::mutate(
      watch_seconds = dplyr::coalesce(watch_seconds, 0),
      was_watched = as.integer(watch_seconds > 0)
    )

  interactions <- observed_tables$interactions %>%
    dplyr::transmute(
      interaction_id,
      user_id,
      creator_id,
      video_id,
      interaction_type,
      interaction_at = created_at
    )

  mission_public <- mission_catalog %>%
    dplyr::select(
      mission_id, title, business_goal, lever_type, target_segment,
      start_day, end_day, target_category, data_prep_hook, difficulty
    )

  dataset_meta <- tibble::tibble(
    schema_version = "v1",
    profile = cfg$profile,
    seed = cfg$seed,
    window_start = as.Date(cfg$start_date),
    window_end = as.Date(cfg$end_date),
    generated_at_utc = Sys.time()
  )

  list(
    dataset_meta = dataset_meta,
    users = users,
    creators = creators,
    videos = videos,
    video_categories = observed_tables$video_categories,
    watch_logs = watch_logs,
    interactions = interactions,
    mission_catalog = mission_public
  )
}

export_all <- function(cfg,
                       static_tables,
                       truth_dynamic,
                       observed_dynamic,
                       mission_catalog,
                       output_base) {
  truth_tables <- c(static_tables, truth_dynamic)
  observed_tables <- c(static_tables, observed_dynamic)
  student_tables <- build_student_tables(observed_tables, mission_catalog, cfg)

  truth_dir <- file.path(output_base, "truth")
  observed_dir <- file.path(output_base, "observed")

  write_tables_csv(truth_dir, truth_tables)
  write_tables_csv(observed_dir, observed_tables)

  internal_index_sql <- c(
    "CREATE INDEX IF NOT EXISTS idx_impressions_user ON impressions(user_id)",
    "CREATE INDEX IF NOT EXISTS idx_impressions_video ON impressions(video_id)",
    "CREATE INDEX IF NOT EXISTS idx_watch_user ON watch_events(user_id)",
    "CREATE INDEX IF NOT EXISTS idx_watch_video ON watch_events(video_id)",
    "CREATE INDEX IF NOT EXISTS idx_watch_session ON watch_events(session_id)",
    "CREATE INDEX IF NOT EXISTS idx_sessions_user ON sessions(user_id)",
    "CREATE INDEX IF NOT EXISTS idx_interactions_user ON interactions(user_id)",
    "CREATE INDEX IF NOT EXISTS idx_interactions_creator ON interactions(creator_id)",
    "CREATE INDEX IF NOT EXISTS idx_follow_events_user ON follow_events(user_id)",
    "CREATE INDEX IF NOT EXISTS idx_follow_events_creator ON follow_events(creator_id)"
  )

  student_index_sql <- c(
    "CREATE INDEX IF NOT EXISTS idx_students_logs_user ON watch_logs(user_id)",
    "CREATE INDEX IF NOT EXISTS idx_students_logs_video ON watch_logs(video_id)",
    "CREATE INDEX IF NOT EXISTS idx_students_logs_creator ON watch_logs(creator_id)",
    "CREATE INDEX IF NOT EXISTS idx_students_logs_impression_time ON watch_logs(impression_at)",
    "CREATE INDEX IF NOT EXISTS idx_students_logs_watch_time ON watch_logs(watch_start_at)",
    "CREATE INDEX IF NOT EXISTS idx_students_logs_impression_id ON watch_logs(impression_id)",
    "CREATE INDEX IF NOT EXISTS idx_students_interactions_user ON interactions(user_id)",
    "CREATE INDEX IF NOT EXISTS idx_students_interactions_creator ON interactions(creator_id)",
    "CREATE INDEX IF NOT EXISTS idx_students_interactions_time ON interactions(interaction_at)"
  )

  student_views_sql <- c(
    "CREATE VIEW IF NOT EXISTS video_view AS
     SELECT
       v.video_id,
       v.creator_id,
       v.video_length_sec,
       v.published_at,
       v.video_url,
       COUNT(w.impression_id) AS impressions_n,
       SUM(CASE WHEN w.was_watched = 1 THEN 1 ELSE 0 END) AS watched_n,
       CASE WHEN COUNT(w.impression_id) = 0 THEN NULL
            ELSE CAST(SUM(CASE WHEN w.was_watched = 1 THEN 1 ELSE 0 END) AS REAL) / COUNT(w.impression_id)
       END AS watch_rate,
       AVG(CASE WHEN w.was_watched = 1 THEN w.watch_seconds ELSE NULL END) AS avg_watch_seconds_when_watched,
       SUM(COALESCE(w.watch_seconds, 0)) AS total_watch_seconds,
       AVG(CASE WHEN v.video_length_sec > 0 THEN CAST(w.watch_seconds AS REAL) / v.video_length_sec ELSE NULL END) AS avg_watch_share,
       COUNT(DISTINCT CASE WHEN w.was_watched = 1 THEN w.user_id ELSE NULL END) AS distinct_watchers_n,
       MIN(w.impression_at) AS first_impression_at,
       MAX(w.impression_at) AS last_impression_at,
       MIN(w.watch_start_at) AS first_watch_at,
       MAX(w.watch_start_at) AS last_watch_at
     FROM videos v
     LEFT JOIN watch_logs w ON v.video_id = w.video_id
     GROUP BY v.video_id, v.creator_id, v.video_length_sec, v.published_at, v.video_url",
    "CREATE VIEW IF NOT EXISTS user_view AS
     WITH watch_agg AS (
       SELECT
         user_id,
         COUNT(impression_id) AS impressions_n,
         SUM(CASE WHEN was_watched = 1 THEN 1 ELSE 0 END) AS watched_n,
         SUM(COALESCE(watch_seconds, 0)) AS total_watch_seconds,
         AVG(CASE WHEN was_watched = 1 THEN watch_seconds ELSE NULL END) AS avg_watch_seconds_when_watched,
         COUNT(DISTINCT CASE WHEN was_watched = 1 THEN video_id ELSE NULL END) AS distinct_videos_watched_n,
         COUNT(DISTINCT creator_id) AS distinct_creators_seen_n,
         MIN(impression_at) AS first_impression_at,
         MAX(COALESCE(watch_start_at, impression_at)) AS last_watch_or_impression_at
       FROM watch_logs
       GROUP BY user_id
     ),
     interaction_agg AS (
       SELECT
         user_id,
         SUM(CASE WHEN interaction_type = 'like' THEN 1 ELSE 0 END) AS like_n,
         SUM(CASE WHEN interaction_type = 'unlike' THEN 1 ELSE 0 END) AS unlike_n,
         SUM(CASE WHEN interaction_type = 'follow' THEN 1 ELSE 0 END) AS follow_n,
         SUM(CASE WHEN interaction_type = 'unfollow' THEN 1 ELSE 0 END) AS unfollow_n,
         MIN(interaction_at) AS first_interaction_at,
         MAX(interaction_at) AS last_interaction_at
       FROM interactions
       GROUP BY user_id
     )
     SELECT
       u.user_id,
       u.user_name,
       u.user_handle,
       COALESCE(w.impressions_n, 0) AS impressions_n,
       COALESCE(w.watched_n, 0) AS watched_n,
       CASE WHEN COALESCE(w.impressions_n, 0) = 0 THEN NULL
            ELSE CAST(w.watched_n AS REAL) / w.impressions_n
       END AS watch_rate,
       COALESCE(w.total_watch_seconds, 0) AS total_watch_seconds,
       w.avg_watch_seconds_when_watched,
       COALESCE(w.distinct_videos_watched_n, 0) AS distinct_videos_watched_n,
       COALESCE(w.distinct_creators_seen_n, 0) AS distinct_creators_seen_n,
       COALESCE(i.like_n, 0) AS like_n,
       COALESCE(i.unlike_n, 0) AS unlike_n,
       COALESCE(i.follow_n, 0) AS follow_n,
       COALESCE(i.unfollow_n, 0) AS unfollow_n,
       CASE
         WHEN w.first_impression_at IS NULL THEN i.first_interaction_at
         WHEN i.first_interaction_at IS NULL THEN w.first_impression_at
         ELSE MIN(w.first_impression_at, i.first_interaction_at)
       END AS first_activity_at,
       CASE
         WHEN w.last_watch_or_impression_at IS NULL THEN i.last_interaction_at
         WHEN i.last_interaction_at IS NULL THEN w.last_watch_or_impression_at
         ELSE MAX(w.last_watch_or_impression_at, i.last_interaction_at)
       END AS last_activity_at
     FROM users u
     LEFT JOIN watch_agg w ON u.user_id = w.user_id
     LEFT JOIN interaction_agg i ON u.user_id = i.user_id"
  )

  write_sqlite(file.path(output_base, "tiktok_truth.sqlite"), truth_tables, index_sql = internal_index_sql)
  write_sqlite(file.path(output_base, "tiktok_observed.sqlite"), observed_tables, index_sql = internal_index_sql)
  write_sqlite(file.path(output_base, "tiktok_students.sqlite"), student_tables, index_sql = student_index_sql, post_sql = student_views_sql)
  write_student_views_csv(file.path(output_base, "tiktok_students.sqlite"), output_base)

  data_dict <- make_data_dictionary(observed_tables)
  students_data_dict <- make_data_dictionary(student_tables)
  readr::write_csv(data_dict, file.path(output_base, "data_dictionary.csv"))
  readr::write_csv(students_data_dict, file.path(output_base, "data_dictionary_students.csv"))
  readr::write_csv(mission_catalog, file.path(output_base, "mission_catalog.csv"))

  invisible(list(
    truth_tables = truth_tables,
    observed_tables = observed_tables,
    student_tables = student_tables,
    data_dictionary = data_dict,
    student_data_dictionary = students_data_dict
  ))
}
