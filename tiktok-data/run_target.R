# Lightweight single-target runner.
#
# Produces ONLY the one ~100k-row table a profile is calibrated for, plus the
# in-memory upstream it needs. No plots, SQLite, mission evaluation, docs, or
# truth/observed CSV dumps.
#
# Generation is identical to run_simulation.R: same modules, same call order,
# same seeding. Only the export step is trimmed.
#
# Usage (run from tiktok-data/):
#   Rscript run_target.R watch100k 42     -> output/watch100k/watch_events.csv  (~100k rows)
#   Rscript run_target.R impr100k  42     -> output/impr100k/impressions.csv    (~100k rows)
#   Rscript run_target.R sess100k  42     -> output/sess100k/sessions.csv       (~100k rows)
#   Rscript run_target.R users100k 42     -> output/users100k/users.csv         (100000 rows)

required_packages <- c("dplyr", "tidyr", "purrr", "tibble", "readr", "lubridate")
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
})

args <- commandArgs(trailingOnly = TRUE)
profile <- ifelse(length(args) >= 1, args[[1]], "watch100k")
seed <- ifelse(length(args) >= 2, as.integer(args[[2]]), 42L)

target_map <- c(
  watch100k = "watch_events",
  impr100k  = "impressions",
  sess100k  = "sessions",
  users100k = "users"
)
if (!profile %in% names(target_map)) {
  stop("Unknown profile '", profile, "'. Use one of: ", paste(names(target_map), collapse = ", "), call. = FALSE)
}
target_table <- unname(target_map[[profile]])

source("R/00_config.R")
source("R/01_generate_entities.R")
source("R/02_generate_videos.R")
source("R/03_simulate_daily.R")
source("R/04_apply_corruption.R")

cfg <- get_tiktok_config(profile = profile, seed = seed, output_dir = "output")
output_base <- file.path(cfg$output_dir, cfg$profile)
dir.create(output_base, recursive = TRUE, showWarnings = FALSE)

message("Generating static entities...")
categories <- generate_categories(cfg)

# users table depends only on cfg + categories; every generator reseeds itself,
# so this shortcut yields the same users.csv the full pipeline's observed layer
# would write (including the injected missing values).
if (identical(target_table, "users")) {
  users <- corrupt_user_table(cfg, generate_users(cfg, categories))
  out_path <- file.path(output_base, "users.csv")
  readr::write_csv(users, out_path)
  message("Done. Wrote ", out_path, " (", nrow(users), " rows, ",
          sum(is.na(users)), " missing cells)")
} else {
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

  out <- observed_dynamic[[target_table]]
  out_path <- file.path(output_base, paste0(target_table, ".csv"))
  readr::write_csv(out, out_path)
  message("Done. Wrote ", out_path, " (", nrow(out), " rows)")
}
