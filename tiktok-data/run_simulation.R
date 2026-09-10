required_packages <- c("dplyr", "tidyr", "purrr", "tibble", "readr", "lubridate", "ggplot2", "scales", "DBI", "RSQLite")
missing_packages <- required_packages[!vapply(required_packages, requireNamespace, logical(1), quietly = TRUE)]
if (length(missing_packages) > 0) {
  stop("Missing packages: ", paste(missing_packages, collapse = ", "), call. = FALSE)
}

suppressPackageStartupMessages({
  library(dplyr)
  library(tidyr)
  library(purrr)
  library(tibble)
  library(readr)
  library(lubridate)
  library(ggplot2)
  library(scales)
  library(DBI)
  library(RSQLite)
})

args <- commandArgs(trailingOnly = TRUE)
profile <- ifelse(length(args) >= 1, args[[1]], "prototype")
seed <- ifelse(length(args) >= 2, as.integer(args[[2]]), 42L)

source("R/00_config.R")
source("R/01_generate_entities.R")
source("R/02_generate_videos.R")
source("R/03_simulate_daily.R")
source("R/04_apply_corruption.R")
source("R/05_export_data.R")
source("R/06_descriptives_plots.R")
source("R/07_evaluate_missions.R")
source("R/08_build_student_data_docs.R")

cfg <- get_tiktok_config(profile = profile, seed = seed, output_dir = "output")
output_base <- file.path(cfg$output_dir, cfg$profile)
dir.create(output_base, recursive = TRUE, showWarnings = FALSE)

pipeline_progress_enabled <- isTRUE(cfg$progress$enabled)
pipeline_use_txt_bar <- pipeline_progress_enabled && interactive()
pipeline_total_steps <- 9L
pipeline_step <- 0L
pipeline_started_at <- Sys.time()
pipeline_pb <- NULL

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

advance_pipeline <- function(label) {
  if (!pipeline_progress_enabled) return(invisible(NULL))
  pipeline_step <<- pipeline_step + 1L
  elapsed_sec <- as.numeric(difftime(Sys.time(), pipeline_started_at, units = "secs"))
  eta_sec <- elapsed_sec * (pipeline_total_steps - pipeline_step) / pipeline_step
  if (pipeline_use_txt_bar) {
    utils::setTxtProgressBar(pipeline_pb, pipeline_step)
  }
  message(sprintf(
    "[pipeline %d/%d] %s | elapsed=%s eta=%s",
    pipeline_step,
    pipeline_total_steps,
    label,
    format_duration(elapsed_sec),
    format_duration(eta_sec)
  ))
  invisible(NULL)
}

if (pipeline_use_txt_bar) {
  pipeline_pb <- utils::txtProgressBar(min = 0, max = pipeline_total_steps, style = 3)
}

message("Generating static entities...")
categories <- generate_categories(cfg)
cre_obj <- generate_creators(cfg, categories)
users <- generate_users(cfg, categories)
follows_init <- generate_initial_follows(cfg, users, cre_obj$creators)
advance_pipeline("Static entities generated")

message("Generating videos...")
vid_obj <- generate_videos(
  cfg = cfg,
  creators = cre_obj$creators,
  creator_categories = cre_obj$creator_categories,
  categories = categories,
  start_date = as.Date(cfg$start_date)
)
advance_pipeline("Videos generated")

message("Running dynamic simulation (", cfg$profile, ")...")
truth_dynamic <- simulate_platform(
  cfg = cfg,
  categories = categories,
  creators = cre_obj$creators,
  creator_categories = cre_obj$creator_categories,
  users = users,
  follows_init = follows_init,
  videos = vid_obj$videos,
  video_categories = vid_obj$video_categories
)
advance_pipeline("Dynamic simulation complete")

message("Applying observed-data corruption operators...")
observed_dynamic <- apply_corruption(
  cfg = cfg,
  truth = truth_dynamic,
  creators = cre_obj$creators,
  categories = categories,
  videos = vid_obj$videos,
  video_categories = vid_obj$video_categories
)
advance_pipeline("Observed corruption complete")

static_tables <- list(
  categories = categories,
  creators = cre_obj$creators,
  creator_categories = cre_obj$creator_categories,
  users = users,
  follows_initial = follows_init,
  videos = vid_obj$videos,
  video_categories = vid_obj$video_categories
)

message("Injecting observed users-table missing values...")
static_tables_observed <- static_tables
static_tables_observed$users <- corrupt_user_table(cfg, users)

message("Exporting CSV + SQLite...")
exported <- export_all(
  cfg = cfg,
  static_tables = static_tables,
  truth_dynamic = truth_dynamic,
  observed_dynamic = observed_dynamic,
  mission_catalog = cfg$mission_catalog,
  output_base = output_base,
  static_tables_observed = static_tables_observed
)
advance_pipeline("Data export complete")

message("Creating descriptives and plots...")
create_descriptives(exported$observed_tables, output_base = output_base)
advance_pipeline("Descriptives complete")

message("Evaluating mission effects...")
evaluate_missions(exported$observed_tables, cfg$mission_catalog, output_base)
advance_pipeline("Mission evaluation complete")

message("Building student database documentation...")
build_student_data_docs(output_base = output_base)
advance_pipeline("Student documentation complete")

calibration_report <- tibble::tibble(
  metric = c("mean_sessions_per_user_day", "mean_watch_seconds_per_session", "share_watch_full", "share_explore_feed"),
  simulated_value = c(
    nrow(exported$observed_tables$sessions) / (cfg$n_users * cfg$n_days),
    mean(exported$observed_tables$sessions$watch_seconds, na.rm = TRUE),
    mean(exported$observed_tables$watch_events$action == "watch_full", na.rm = TRUE),
    mean(exported$observed_tables$impressions$source_bucket == "explore", na.rm = TRUE)
  ),
  target_placeholder = c(NA_real_, NA_real_, NA_real_, NA_real_)
)
readr::write_csv(calibration_report, file.path(output_base, "calibration_report.csv"))

run_metadata <- tibble::tibble(
  profile = cfg$profile,
  seed = cfg$seed,
  start_date = as.Date(cfg$start_date),
  end_date = as.Date(cfg$end_date),
  n_days = cfg$n_days,
  n_users = cfg$n_users,
  n_creators = cfg$n_creators,
  n_videos = cfg$n_videos,
  generated_at_utc = format(Sys.time(), tz = "UTC", usetz = TRUE)
)
readr::write_csv(run_metadata, file.path(output_base, "run_metadata.csv"))
advance_pipeline("Calibration and run metadata written")

if (!is.null(pipeline_pb)) {
  close(pipeline_pb)
}

message("Done. Output written to: ", output_base)
