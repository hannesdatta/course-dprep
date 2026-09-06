# inspectdata.r ---------------------------------------------------------------
#
# General sanity / realism inspection of a generated TikTok dataset.
#
# Usage (from tiktok-data/):
#   Rscript inspectdata.r                # inspects output/prototype
#   Rscript inspectdata.r watch100k      # inspects output/watch100k
#   Rscript inspectdata.r prototype truth  # use the truth/ layer instead of observed/
#
# It only runs the checks for which the needed CSV files are present, so it
# also works on the trimmed single-target profiles (watch100k, users100k, ...).
#
# Questions it answers:
#   - Are all users unique (ids, handles, contiguous numbering)?
#   - How are the per-category user preferences distributed (shape, spread,
#     inter-category correlation, balance)?
#   - Do the behavioural tables look realistic (watch seconds vs video length,
#     action mix, feed-source mix, session shape, engagement rates, login rate,
#     creator/category concentration, timestamp ordering)?
# ---------------------------------------------------------------------------

suppressWarnings(suppressMessages({
  have_readr <- requireNamespace("readr", quietly = TRUE)
}))

args    <- commandArgs(trailingOnly = TRUE)
profile <- if (length(args) >= 1) args[[1]] else "prototype"
layer   <- if (length(args) >= 2) args[[2]] else "observed"   # "observed" | "truth"

base_dir  <- file.path("output", profile)
layer_dir <- file.path(base_dir, layer)
if (!dir.exists(base_dir)) stop("No such profile output: ", base_dir, call. = FALSE)
if (!dir.exists(layer_dir)) layer_dir <- base_dir   # trimmed runners write flat

# --- small helpers ---------------------------------------------------------

rule <- function(ch = "-") cat(strrep(ch, 74), "\n", sep = "")
section <- function(title) { cat("\n"); rule("="); cat(title, "\n"); rule("=") }
subhead <- function(title) { cat("\n", title, "\n", sep = ""); rule("-") }
strip_pref <- function(x) base::sub("^pref_", "", x)

read_tbl <- function(name) {
  for (dir in unique(c(layer_dir, base_dir))) {
    p <- file.path(dir, paste0(name, ".csv"))
    if (file.exists(p)) {
      df <- if (have_readr) {
        suppressWarnings(suppressMessages(as.data.frame(readr::read_csv(p, show_col_types = FALSE, progress = FALSE))))
      } else {
        utils::read.csv(p, stringsAsFactors = FALSE)
      }
      attr(df, "src") <- p
      return(df)
    }
  }
  NULL
}

flag <- function(ok, msg_ok, msg_bad) {
  cat(if (isTRUE(ok)) "  [ OK ] " else "  [FLAG] ", if (isTRUE(ok)) msg_ok else msg_bad, "\n", sep = "")
}

num_summary <- function(x, digits = 3) {
  x <- x[is.finite(x)]
  if (!length(x)) return(invisible())
  qs <- stats::quantile(x, c(0, .01, .25, .5, .75, .99, 1))
  cat(sprintf(
    "    n=%d  mean=%.*f  sd=%.*f  min=%.*f  p1=%.*f  p25=%.*f  med=%.*f  p75=%.*f  p99=%.*f  max=%.*f\n",
    length(x), digits, mean(x), digits, stats::sd(x),
    digits, qs[1], digits, qs[2], digits, qs[3], digits, qs[4], digits, qs[5], digits, qs[6], digits, qs[7]))
}

text_hist <- function(x, breaks = 20, width = 44, label = "") {
  x <- x[is.finite(x)]
  if (length(x) < 2) return(invisible())
  h <- graphics::hist(x, breaks = breaks, plot = FALSE)
  mx <- max(h$counts)
  if (nchar(label)) cat("  ", label, "\n", sep = "")
  for (i in seq_along(h$counts)) {
    bar <- strrep("#", round(width * h$counts[i] / mx))
    cat(sprintf("    %10.3f | %-*s %d\n", h$mids[i], width, bar, h$counts[i]))
  }
}

gini <- function(x) {
  x <- sort(x[is.finite(x) & x >= 0]); n <- length(x)
  if (n < 2 || sum(x) == 0) return(NA_real_)
  sum((2 * seq_len(n) - n - 1) * x) / (n * sum(x))
}

skewness <- function(x) { x <- x[is.finite(x)]; m <- mean(x); mean((x - m)^3) / (mean((x - m)^2)^1.5) }
kurtosis_excess <- function(x) { x <- x[is.finite(x)]; m <- mean(x); mean((x - m)^4) / (mean((x - m)^2)^2) - 3 }

as_time <- function(v) {
  if (inherits(v, "POSIXct")) return(v)
  suppressWarnings({
    t <- as.POSIXct(v, tz = "UTC", format = "%Y-%m-%dT%H:%M:%SZ")
    if (all(is.na(t)) && is.numeric(v)) t <- as.POSIXct(as.numeric(v), origin = "1970-01-01", tz = "UTC")
    t
  })
}

cat("Profile : ", profile, "\nLayer   : ", basename(layer_dir), " (", layer_dir, ")\n", sep = "")

# --- load whatever exists -------------------------------------------------

tbls <- list(
  users        = read_tbl("users"),
  creators     = read_tbl("creators"),
  categories   = read_tbl("categories"),
  videos       = read_tbl("videos"),
  video_categories = read_tbl("video_categories"),
  sessions     = read_tbl("sessions"),
  watch_events = read_tbl("watch_events"),
  impressions  = read_tbl("impressions"),
  interactions = read_tbl("interactions"),
  daily_user_state = read_tbl("daily_user_state")
)

section("FILE INVENTORY")
for (nm in names(tbls)) {
  df <- tbls[[nm]]
  if (is.null(df)) cat(sprintf("  %-18s  (missing)\n", nm))
  else cat(sprintf("  %-18s  %10d rows x %2d cols   %s\n",
                   nm, nrow(df), ncol(df), attr(df, "src")))
}

# --- 1. USER UNIQUENESS -------------------------------------------------------

if (!is.null(tbls$users)) {
  u <- tbls$users
  section("1. USER UNIQUENESS & INTEGRITY")
  n <- nrow(u)
  cat("  users rows:", n, "\n")

  flag(!anyDuplicated(u$user_id),
       sprintf("user_id fully unique (%d distinct)", length(unique(u$user_id))),
       sprintf("user_id has %d duplicate(s)", sum(duplicated(u$user_id))))

  contiguous <- identical(sort(as.integer(u$user_id)), seq_len(n))
  flag(contiguous, "user_id is a contiguous 1..N sequence",
       "user_id is NOT contiguous 1..N (gaps or offset)")

  if ("user_handle" %in% names(u)) {
    dh <- sum(duplicated(u$user_handle))
    flag(dh == 0, sprintf("user_handle fully unique (%d distinct)", length(unique(u$user_handle))),
         sprintf("user_handle has %d duplicate value(s)", dh))
  }
  if ("user_name" %in% names(u)) {
    dn <- sum(duplicated(u$user_name))
    flag(dn / n < 0.05,
         sprintf("user_name %d distinct of %d (%.1f%% repeat) -- not a key, mild collision is fine",
                 length(unique(u$user_name)), n, 100 * dn / n),
         sprintf("user_name only %d distinct of %d (%.1f%% repeat) -- name pool too small for this N",
                 length(unique(u$user_name)), n, 100 * dn / n))
  }

  key_cols <- intersect(c("user_id", "user_handle", "baseline_login", "satiation_decay",
                          "need_interaction", "base_videos_watched_mean"), names(u))
  na_counts <- vapply(u[key_cols], function(c) sum(is.na(c)), integer(1))
  flag(all(na_counts == 0), "no NA in key user columns",
       paste0("NA present: ", paste(sprintf("%s=%d", names(na_counts), na_counts), collapse = ", ")))

  # user attribute distributions (generator: rnorm/-runif based)
  subhead("User attribute distributions")
  for (cn in intersect(c("baseline_login", "satiation_decay", "need_interaction",
                         "base_videos_watched_mean", "base_videos_watched_sd"), names(u))) {
    cat("  ", cn, ":\n", sep = ""); num_summary(u[[cn]])
  }
}

# --- 2. USER PREFERENCE DISTRIBUTION ---------------------------------------

if (!is.null(tbls$users)) {
  u <- tbls$users
  pref_cols <- grep("^pref_", names(u), value = TRUE)
  if (length(pref_cols)) {
    section("2. USER PREFERENCE DISTRIBUTION (pref_* columns)")
    cat("  ", length(pref_cols), " category-preference columns; generator draws iid N(0, 0.9^2)\n", sep = "")

    pm <- as.matrix(u[pref_cols])
    subhead("Per-category summary")
    cat(sprintf("    %-22s %8s %8s %8s %8s %8s\n", "category", "mean", "sd", "min", "max", "%>0"))
    for (cn in pref_cols) {
      x <- pm[, cn]
      cat(sprintf("    %-22s %8.3f %8.3f %8.3f %8.3f %7.1f%%\n",
                  strip_pref(cn), mean(x), stats::sd(x), min(x), max(x), 100 * mean(x > 0)))
    }

    subhead("Pooled across all categories")
    num_summary(as.vector(pm))
    cat(sprintf("    skewness=%.3f  excess_kurtosis=%.3f  share_positive=%.1f%%\n",
                skewness(as.vector(pm)), kurtosis_excess(as.vector(pm)), 100 * mean(pm > 0)))
    text_hist(as.vector(pm), breaks = 25, label = "histogram of pooled preference values")

    om <- mean(pm); osd <- stats::sd(pm)
    flag(abs(om) < 0.05, sprintf("pooled mean %.3f ~ 0 (as designed)", om),
         sprintf("pooled mean %.3f departs from 0", om))
    flag(abs(osd - 0.9) < 0.1, sprintf("pooled sd %.3f ~ 0.9 (as designed)", osd),
         sprintf("pooled sd %.3f departs from target 0.9", osd))
    flag(abs(skewness(as.vector(pm))) < 0.15, "near-symmetric (|skew| < 0.15)",
         "noticeable skew in preference values")

    subhead("Inter-category correlation (upper triangle summary)")
    cc <- stats::cor(pm)
    ut <- cc[upper.tri(cc)]
    se_r <- 1 / sqrt(nrow(pm) - 3)   # ~SE of a single correlation under independence
    cat(sprintf("    pairs=%d  mean|r|=%.3f  max|r|=%.3f  (per-pair SE under independence ~ %.3f)\n",
                length(ut), mean(abs(ut)), max(abs(ut)), se_r))
    flag(mean(abs(ut)) < 2 * se_r,
         "no taste structure: mean |r| within noise of an iid design",
         "categories show correlation beyond sampling noise (taste clusters present)")

    subhead("Per-user preference profile")
    dom <- pref_cols[max.col(pm, ties.method = "first")]
    tb <- sort(table(strip_pref(dom)), decreasing = TRUE)
    cat("  count of users whose strongest preference is each category:\n")
    for (i in seq_along(tb)) cat(sprintf("    %-22s %d\n", names(tb)[i], tb[i]))
    spread <- apply(pm, 1, function(r) max(r) - stats::median(r))
    cat("  within-user (max - median) preference gap:\n"); num_summary(spread)
  }
}

# --- 3. CATEGORY / ITEM DISTRIBUTION -------------------------------------------

if (!is.null(tbls$categories)) {
  section("3. CATEGORY (ITEM CLASS) DISTRIBUTION")
  ca <- tbls$categories
  print(ca[order(-ca$base_popularity_minutes), intersect(c("category_name","trend_regime","daily_drift","seasonal_amplitude","base_popularity_minutes"), names(ca))], row.names = FALSE)
  if ("trend_regime" %in% names(ca)) {
    cat("\n  trend regime counts: ",
        paste(sprintf("%s=%d", names(table(ca$trend_regime)), table(ca$trend_regime)), collapse = "  "), "\n", sep = "")
  }
}

if (!is.null(tbls$video_categories)) {
  vc <- tbls$video_categories
  subhead("Videos per category")
  tb <- sort(table(vc$category_id), decreasing = TRUE)
  nm <- if (!is.null(tbls$categories)) tbls$categories$category_name[as.integer(names(tb))] else names(tb)
  for (i in seq_along(tb)) cat(sprintf("    %-22s %6d  (%.1f%%)\n", nm[i], tb[i], 100 * tb[i] / sum(tb)))
  cbal <- max(tb) / min(tb)
  flag(cbal < 6,
       sprintf("every category has catalog coverage (max/min = %.2f; imbalance is creator-specialty driven)", cbal),
       sprintf("category coverage very uneven (max/min = %.2f) -- thin categories may starve the feed", cbal))
  if (!is.null(tbls$videos)) {
    tags_per_video <- as.numeric(table(vc$video_id))
    cat("  category tags per video:\n"); num_summary(tags_per_video)
  }
}

# --- 4. CREATOR / VIDEO CONCENTRATION ---------------------------------------

if (!is.null(tbls$videos)) {
  section("4. CREATOR & VIDEO CATALOG")
  v <- tbls$videos
  if ("video_length_sec" %in% names(v)) {
    subhead("video_length_sec"); num_summary(v$video_length_sec)
    text_hist(v$video_length_sec, breaks = 20)
  }
  if ("creator_id" %in% names(v)) {
    per_creator <- as.numeric(table(v$creator_id))
    subhead("Videos per creator")
    num_summary(per_creator)
    g <- gini(per_creator)
    ord <- sort(per_creator, decreasing = TRUE)
    top10 <- sum(head(ord, ceiling(0.1 * length(ord)))) / sum(ord)
    cat(sprintf("    Gini=%.3f   top-10%% of creators hold %.1f%% of videos\n", g, 100 * top10))
    flag(!is.na(g) && g > 0.1 && g < 0.6,
         "creator output is skewed but not degenerate (0.1 < Gini < 0.6) -- posting_rate weighting",
         "creator output concentration looks off")
  }
}

if (!is.null(tbls$creators)) {
  cr <- tbls$creators
  for (cn in intersect(c("quality", "posting_rate"), names(cr))) {
    subhead(paste0("creators$", cn)); num_summary(cr[[cn]])
  }
}

# --- 5. ENGAGEMENT REALISM ------------------------------------------------------

if (!is.null(tbls$watch_events)) {
  section("5. WATCH EVENTS REALISM")
  w <- tbls$watch_events
  ws <- suppressWarnings(as.numeric(w$watch_seconds))

  cat("  watch_seconds NA rate: ", sprintf("%.2f%%", 100 * mean(is.na(ws))),
      " (corruption injects missingness in the observed layer)\n", sep = "")
  subhead("watch_seconds (non-NA)"); num_summary(ws)
  text_hist(ws, breaks = 20)

  flag(all(ws >= 0, na.rm = TRUE), "no negative watch_seconds",
       sprintf("%d rows with negative watch_seconds", sum(ws < 0, na.rm = TRUE)))

  if ("action" %in% names(w)) {
    subhead("action mix")
    tb <- sort(table(w$action), decreasing = TRUE)
    for (i in seq_along(tb)) cat(sprintf("    %-20s %8d  (%.1f%%)\n", names(tb)[i], tb[i], 100 * tb[i] / sum(tb)))
    if ("watch_full" %in% names(tb)) {
      zero_on_full <- sum(ws[w$action == "watch_full"] == 0, na.rm = TRUE)
      flag(zero_on_full == 0, "watch_full rows all have watch_seconds > 0",
           sprintf("%d watch_full rows have watch_seconds == 0", zero_on_full))
    }
  }

  # watch_seconds vs the video's own length
  if (!is.null(tbls$videos) && all(c("video_id") %in% names(w))) {
    vl <- setNames(tbls$videos$video_length_sec, tbls$videos$video_id)
    len <- vl[as.character(w$video_id)]
    over <- which(is.finite(ws) & is.finite(len) & ws > len + 1)
    subhead("watch_seconds vs video_length_sec")
    cat(sprintf("    rows where watch_seconds exceeds clip length by >1s: %d (%.2f%%)\n",
                length(over), 100 * length(over) / nrow(w)))
    share <- ws / len
    cat("    completion ratio (watch_seconds / video_length_sec):\n"); num_summary(share[is.finite(share)])
    flag(length(over) / nrow(w) < 0.02,
         "almost no watch beyond clip length (<2%) -- 'watch_seconds outliers' hook stays small",
         "many rows watch longer than the clip")
  }

  # timestamp ordering
  if (all(c("started_at", "ended_at") %in% names(w))) {
    s <- as_time(w$started_at); e <- as_time(w$ended_at)
    bad <- sum(is.finite(s) & is.finite(e) & e < s)
    flag(bad == 0, "started_at <= ended_at on every row",
         sprintf("%d rows have ended_at before started_at", bad))
  }

  # impressions per user
  if ("user_id" %in% names(w)) {
    per_user <- as.numeric(table(w$user_id))
    subhead("watch rows per user"); num_summary(per_user)
    text_hist(per_user, breaks = 20)
  }
}

if (!is.null(tbls$impressions)) {
  section("6. IMPRESSIONS / FEED-SOURCE REALISM")
  im <- tbls$impressions
  if ("source_bucket" %in% names(im)) {
    tb <- table(im$source_bucket); p <- tb / sum(tb)
    subhead("source_bucket mix  (configured base: known .20 / preferred_new .60 / explore .20, plus mission explore_shift)")
    for (i in seq_along(tb)) cat(sprintf("    %-16s %8d  (%.1f%%)\n", names(tb)[i], tb[i], 100 * p[i]))
    if ("explore" %in% names(p))
      flag(p[["explore"]] > 0.12 && p[["explore"]] < 0.45,
           sprintf("explore share %.1f%% within a plausible band", 100 * p[["explore"]]),
           sprintf("explore share %.1f%% outside plausible band", 100 * p[["explore"]]))
  }
  dup <- sum(duplicated(im$impression_id))
  cat(sprintf("\n  duplicate impression_id rows: %d (%.2f%%) -- observed layer intentionally duplicates ~1%%\n",
              dup, 100 * dup / nrow(im)))
  for (cn in intersect(c("score_category_match", "score_creator_match", "score_satiation_penalty", "score_total"), names(im))) {
    subhead(cn); num_summary(suppressWarnings(as.numeric(im[[cn]])))
  }
}

if (!is.null(tbls$sessions)) {
  section("7. SESSION SHAPE")
  s <- tbls$sessions
  for (cn in intersect(c("session_duration_sec", "videos_viewed", "watch_seconds"), names(s))) {
    subhead(cn); num_summary(suppressWarnings(as.numeric(s[[cn]])))
  }
  if ("videos_viewed" %in% names(s)) text_hist(as.numeric(s$videos_viewed), breaks = 20, label = "videos_viewed per session")
  if (all(c("user_id") %in% names(s))) {
    spu <- as.numeric(table(s$user_id))
    subhead("sessions per user (only users with >=1 session)"); num_summary(spu)
  }
  if (!is.null(tbls$watch_events) && "session_id" %in% names(tbls$watch_events)) {
    wpi <- as.numeric(table(tbls$watch_events$session_id))
    flag(abs(mean(wpi) - mean(as.numeric(s$videos_viewed))) < 1,
         "watch rows per session ~ matches sessions$videos_viewed",
         "watch rows per session diverges from sessions$videos_viewed")
  }
}

if (!is.null(tbls$interactions) && !is.null(tbls$impressions)) {
  section("8. INTERACTION RATES")
  it <- tbls$interactions
  n_imp <- nrow(tbls$impressions)
  tb <- table(it$interaction_type)
  for (i in seq_along(tb))
    cat(sprintf("    %-12s %8d   %.2f per 100 impressions\n", names(tb)[i], tb[i], 100 * tb[i] / n_imp))
  like_rate <- if ("like" %in% names(tb)) tb[["like"]] / n_imp else NA
  flag(!is.na(like_rate) && like_rate > 0.005 && like_rate < 0.25,
       sprintf("like rate %.1f%% of impressions -- plausible", 100 * like_rate),
       sprintf("like rate %.1f%% of impressions -- check", 100 * like_rate))
}

if (!is.null(tbls$daily_user_state)) {
  section("9. LOGIN / STATE DYNAMICS")
  d <- tbls$daily_user_state
  if ("logged_in" %in% names(d)) {
    li <- as.logical(d$logged_in)
    cat(sprintf("  overall login rate: %.1f%% of user-days (%d / %d)\n",
                100 * mean(li, na.rm = TRUE), sum(li, na.rm = TRUE), length(li)))
    if ("date" %in% names(d)) {
      by_day <- tapply(li, d$date, mean, na.rm = TRUE)
      cat(sprintf("  per-day login rate: min=%.1f%%  mean=%.1f%%  max=%.1f%%  (over %d days)\n",
                  100 * min(by_day), 100 * mean(by_day), 100 * max(by_day), length(by_day)))
    }
    flag(mean(li, na.rm = TRUE) > 0.15 && mean(li, na.rm = TRUE) < 0.85,
         "login rate in a sane 15-85% band", "login rate looks extreme")
  }
  for (cn in intersect(c("satiation", "habit", "login_probability"), names(d))) {
    subhead(cn); num_summary(suppressWarnings(as.numeric(d[[cn]])))
  }
  if ("login_probability" %in% names(d)) {
    lp <- suppressWarnings(as.numeric(d$login_probability))
    flag(all(lp >= 0 & lp <= 1, na.rm = TRUE), "login_probability within [0,1]",
         "login_probability outside [0,1]")
  }
}

section("DONE")
cat("Inspected profile '", profile, "' (", basename(layer_dir), " layer).\n", sep = "")
