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

message("Generating static entities...")
categories <- generate_categories(cfg)
cre_obj <- generate_creators(cfg, categories)
users <- generate_users(cfg, categories)
follows_init <- generate_initial_follows(cfg, users, cre_obj$creators)

message("Generating videos...")
vid_obj <- generate_videos(
  cfg = cfg,
  creators = cre_obj$creators,
  creator_categories = cre_obj$creator_categories,
  categories = categories,
  start_date = as.Date(cfg$start_date)
)

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

message("Applying observed-data corruption operators...")
observed_dynamic <- apply_corruption(
  cfg = cfg,
  truth = truth_dynamic,
  creators = cre_obj$creators,
  categories = categories,
  videos = vid_obj$videos,
  video_categories = vid_obj$video_categories
)

static_tables <- list(
  categories = categories,
  creators = cre_obj$creators,
  creator_categories = cre_obj$creator_categories,
  users = users,
  follows_initial = follows_init,
  videos = vid_obj$videos,
  video_categories = vid_obj$video_categories
)

message("Exporting CSV + SQLite...")
exported <- export_all(
  cfg = cfg,
  static_tables = static_tables,
  truth_dynamic = truth_dynamic,
  observed_dynamic = observed_dynamic,
  mission_catalog = cfg$mission_catalog,
  output_base = output_base
)

message("Creating descriptives and plots...")
create_descriptives(exported$observed_tables, output_base = output_base)

message("Evaluating mission effects...")
evaluate_missions(exported$observed_tables, cfg$mission_catalog, output_base)

message("Building student database documentation...")
build_student_data_docs(output_base = output_base)

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

message("Done. Output written to: ", output_base)
