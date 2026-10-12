
# full_plus: every observed table exported as-is (no joins, no dropped tables),
# derived from an existing profile's tiktok_observed.sqlite so the data matches
# the student DB of that profile exactly.

full_plus_index_sql <- c(
  "CREATE INDEX IF NOT EXISTS idx_impressions_user ON impressions(user_id)",
  "CREATE INDEX IF NOT EXISTS idx_impressions_video ON impressions(video_id)",
  "CREATE INDEX IF NOT EXISTS idx_impressions_session ON impressions(session_id)",
  "CREATE INDEX IF NOT EXISTS idx_watch_impression ON watch_events(impression_id)",
  "CREATE INDEX IF NOT EXISTS idx_watch_user ON watch_events(user_id)",
  "CREATE INDEX IF NOT EXISTS idx_watch_video ON watch_events(video_id)",
  "CREATE INDEX IF NOT EXISTS idx_watch_session ON watch_events(session_id)",
  "CREATE INDEX IF NOT EXISTS idx_sessions_user ON sessions(user_id)",
  "CREATE INDEX IF NOT EXISTS idx_interactions_user ON interactions(user_id)",
  "CREATE INDEX IF NOT EXISTS idx_interactions_creator ON interactions(creator_id)",
  "CREATE INDEX IF NOT EXISTS idx_follow_events_user ON follow_events(user_id)",
  "CREATE INDEX IF NOT EXISTS idx_follow_events_creator ON follow_events(creator_id)",
  "CREATE INDEX IF NOT EXISTS idx_daily_user_state_user ON daily_user_state(user_id)"
)

read_sqlite_tables <- function(sqlite_path) {
  if (!file.exists(sqlite_path)) {
    stop("Source database not found: ", sqlite_path, call. = FALSE)
  }
  con <- DBI::dbConnect(RSQLite::SQLite(), sqlite_path)
  on.exit(DBI::dbDisconnect(con), add = TRUE)

  table_names <- DBI::dbListTables(con)
  purrr::set_names(table_names) %>%
    purrr::map(~ tibble::as_tibble(DBI::dbReadTable(con, .x)))
}

verify_full_plus <- function(sqlite_path, expected_tables) {
  con <- DBI::dbConnect(RSQLite::SQLite(), sqlite_path)
  on.exit(DBI::dbDisconnect(con), add = TRUE)

  report <- purrr::imap_dfr(expected_tables, function(tbl, nm) {
    exists <- DBI::dbExistsTable(con, nm)
    n_out <- if (exists) DBI::dbGetQuery(con, sprintf('SELECT COUNT(*) AS n FROM "%s"', nm))$n else NA_integer_
    cols_out <- if (exists) DBI::dbListFields(con, nm) else character(0)
    tibble::tibble(
      table_name = nm,
      exists = exists,
      rows_expected = nrow(tbl),
      rows_written = n_out,
      cols_expected = ncol(tbl),
      cols_written = length(cols_out),
      ok = exists && identical(as.integer(n_out), nrow(tbl)) && identical(cols_out, names(tbl))
    )
  })

  if (!all(report$ok)) {
    print(report[!report$ok, ], n = Inf)
    stop("full_plus verification failed for: ", paste(report$table_name[!report$ok], collapse = ", "), call. = FALSE)
  }
  report
}

export_full_plus <- function(source_profile = "full", output_dir = "output") {
  source_base <- file.path(output_dir, source_profile)
  output_base <- file.path(output_dir, paste0(source_profile, "_plus"))
  dir.create(output_base, recursive = TRUE, showWarnings = FALSE)

  observed_tables <- read_sqlite_tables(file.path(source_base, "tiktok_observed.sqlite"))

  mission_catalog_path <- file.path(source_base, "mission_catalog.csv")
  extra_tables <- list()
  if (file.exists(mission_catalog_path)) {
    extra_tables$mission_catalog <- readr::read_csv(mission_catalog_path, show_col_types = FALSE)
  }

  window_dates <- as.Date(observed_tables$daily_user_state$date)
  extra_tables$dataset_meta <- tibble::tibble(
    schema_version = "plus_v1",
    profile = paste0(source_profile, "_plus"),
    source_profile = source_profile,
    window_start = format(min(window_dates, na.rm = TRUE), "%Y-%m-%d"),
    window_end = format(max(window_dates, na.rm = TRUE), "%Y-%m-%d"),
    generated_at_utc = as.integer(as.numeric(Sys.time()))
  )

  all_tables <- c(observed_tables, extra_tables)
  sqlite_path <- file.path(output_base, "tiktok_students_plus.sqlite")

  write_sqlite(sqlite_path, all_tables, index_sql = full_plus_index_sql)
  write_tables_csv(file.path(output_base, "tables"), all_tables)
  readr::write_csv(make_data_dictionary(all_tables), file.path(output_base, "data_dictionary_plus.csv"))

  report <- verify_full_plus(sqlite_path, all_tables)
  readr::write_csv(report, file.path(output_base, "table_check.csv"))

  invisible(report)
}
