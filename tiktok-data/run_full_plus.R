required_packages <- c("dplyr", "purrr", "tibble", "readr", "DBI", "RSQLite")
missing_packages <- required_packages[!vapply(required_packages, requireNamespace, logical(1), quietly = TRUE)]
if (length(missing_packages) > 0) {
  stop("Missing packages: ", paste(missing_packages, collapse = ", "), call. = FALSE)
}

suppressPackageStartupMessages({
  library(dplyr)
})

args <- commandArgs(trailingOnly = TRUE)
source_profile <- ifelse(length(args) >= 1, args[[1]], "full")

source("R/05_export_data.R")
source("R/09_export_full_plus.R")

message("Building ", source_profile, "_plus from output/", source_profile, "/tiktok_observed.sqlite...")
report <- export_full_plus(source_profile = source_profile, output_dir = "output")
print(report, n = Inf)
message("Done. All ", nrow(report), " tables verified in output/", source_profile, "_plus/")
