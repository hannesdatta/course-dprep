get_tiktok_config <- function(profile = c("prototype", "full"),
                              seed = 42,
                              output_dir = "output") {
  profile <- match.arg(profile)

  base <- list(
    seed = seed,
    start_date = as.Date("2025-08-01"),
    end_date = as.Date("2026-07-31"),
    categories = c(
      "Comedy", "Dance", "BeautyFashion", "Food", "FitnessSports",
      "Gaming", "DIYHome", "Travel", "Education", "Pets"
    ),
    category_trends = list(
      min_regime_counts = c(grow = 3, stable = 3, decline = 3),
      drift_grow = c(0.0025, 0.0100),
      drift_stable = c(-0.0008, 0.0008),
      drift_decline = c(-0.0100, -0.0025),
      seasonal_amp = c(grow = 0.18, stable = 0.08, decline = 0.12),
      random_noise_sd = 0.006,
      shock_prob_daily = 0.015,
      shock_size = c(0.08, 0.28)
    ),
    source_mix = c(known = 0.20, preferred_new = 0.60, explore = 0.20),
    category_assignment = list(p_creator_specialty = 0.85, max_video_categories = 3),
    video_length = list(mean = 30, sd = 10, min = 10, max = 60),
    user_behavior = list(
      mean_sessions_per_login = 1.4,
      mean_videos_per_session = 28,
      sd_videos_per_session = 8,
      satiation_increment_per_minute = 0.12,
      satiation_login_penalty = 1.1,
      habit_gain_per_login = 0.08,
      habit_decay_no_login = 0.03
    ),
    corruption = list(
      missing_watch_seconds = 0.06,
      block_missing_category_week = 0.02,
      duplicate_impressions = 0.01,
      creator_alias_noise = 0.08,
      mixed_timestamp_formats = TRUE,
      milliseconds_bug_fraction = 0.01
    ),
    output_dir = output_dir
  )

  profile_cfg <- switch(
    profile,
    prototype = list(
      profile = "prototype",
      n_users = 200,
      n_creators = 60,
      n_videos = 1200,
      start_date = as.Date("2025-08-01"),
      end_date = as.Date("2025-09-29"),
      active_missions = c("M02", "M04", "M10")
    ),
    full = list(
      profile = "full",
      n_users = 10000,
      n_creators = 1000,
      n_videos = 100000,
      active_missions = "all"
    )
  )

  mission_catalog <- tibble::tribble(
    ~mission_id, ~title, ~business_goal, ~lever_type, ~target_segment, ~start_day, ~end_day,
    ~login_shift, ~explore_shift, ~satiation_shift, ~follow_shift, ~like_shift, ~target_category,
    ~data_prep_hook, ~difficulty,
    "M01", "Terms Friction", "Recover DAU after ToS update", "policy", "all_users", 45, 90,
    -0.35, 0.00, 0.00, 0.00, 0.00, NA,
    "mixed timestamp formats", "easy",
    "M02", "Declining Category Churn", "Reduce churn in declining-category viewers", "feed", "declining_category_viewers", 20, 80,
    0.00, 0.10, -0.05, 0.00, 0.00, "Travel",
    "block NA for category-week", "medium",
    "M03", "Bubble Breaker", "Improve diversity without losing watch time", "feed", "high_habit_users", 120, 180,
    0.00, 0.12, 0.00, 0.00, 0.00, NA,
    "duplicate impressions", "medium",
    "M04", "Exploration Experiment", "Test higher exploration mix", "feed", "all_users", 10, 25,
    0.00, 0.15, 0.00, 0.00, 0.00, NA,
    "missing source labels", "easy",
    "M05", "Viral Shock", "Contain crowd-out from viral category", "content", "all_users", 150, 170,
    0.00, -0.05, 0.03, 0.00, 0.05, "Dance",
    "watch seconds outliers", "hard",
    "M06", "Creator Burnout", "Protect retention during creator burnout", "creator", "followers_top_creators", 200, 260,
    -0.10, 0.08, 0.05, -0.04, 0.00, NA,
    "creator aliases regex", "medium",
    "M07", "Safety Mode", "Limit excessive sessions at night", "policy", "high_usage_users", 220, 300,
    -0.12, 0.02, 0.06, 0.00, -0.02, NA,
    "malformed segment strings", "hard",
    "M08", "Ad Load", "Maintain engagement under ad-load increase", "policy", "all_users", 100, 140,
    -0.18, 0.00, 0.08, 0.00, -0.01, NA,
    "session boundary reconstruction", "hard",
    "M09", "Cold Start", "Improve discovery of new creators", "feed", "new_creator_candidates", 35, 75,
    0.00, 0.07, 0.00, 0.08, 0.02, NA,
    "URL parsing for IDs", "medium",
    "M10", "Unfollow Surge", "Mitigate oversatiation unfollows", "social", "high_satiation_users", 18, 30,
    -0.05, 0.05, -0.08, -0.12, -0.02, NA,
    "follow state dedupe", "medium",
    "M11", "Like Inflation", "Recalibrate weak like signals", "ui", "all_users", 240, 290,
    0.00, 0.00, 0.00, 0.00, 0.15, NA,
    "schema drift in like flags", "medium",
    "M12", "Weekend Outside Good", "Defend WAU under weekend pressure", "external", "all_users", 1, 365,
    -0.08, 0.03, 0.02, 0.00, 0.00, NA,
    "timezone normalization", "easy",
    "M13", "Category Penalty", "Reallocate recommendations after policy penalty", "policy", "category_viewers", 280, 330,
    -0.05, 0.04, 0.02, -0.02, -0.01, "BeautyFashion",
    "category code mapping", "hard",
    "M14", "Quality Dip", "Mitigate quality drop in one vertical", "content", "category_viewers", 310, 355,
    -0.10, 0.05, 0.04, -0.03, -0.03, "Gaming",
    "missing creator metadata", "medium",
    "M15", "Market Bug", "Fix recommendation bug in selected market", "algorithm", "country_segment", 90, 120,
    -0.12, -0.08, 0.05, -0.03, -0.03, NA,
    "country code normalization", "hard"
  )

  cfg <- utils::modifyList(base, profile_cfg)
  cfg$mission_catalog <- mission_catalog
  cfg$n_days <- as.integer(cfg$end_date - cfg$start_date) + 1
  if (identical(cfg$active_missions, "all")) {
    cfg$active_missions <- mission_catalog$mission_id
  }
  cfg
}
