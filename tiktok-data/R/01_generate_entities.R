generate_categories <- function(cfg) {
  set.seed(cfg$seed + 1)
  n_cat <- length(cfg$categories)

  min_counts <- cfg$category_trends$min_regime_counts
  base_regimes <- c(
    rep("grow", min_counts[["grow"]]),
    rep("stable", min_counts[["stable"]]),
    rep("decline", min_counts[["decline"]])
  )
  if (length(base_regimes) > n_cat) {
    stop("min_regime_counts exceed number of categories")
  }
  remainder <- n_cat - length(base_regimes)
  extra <- if (remainder > 0) sample(c("grow", "stable", "decline"), remainder, replace = TRUE) else character(0)
  regime <- sample(c(base_regimes, extra), n_cat, replace = FALSE)

  drift <- dplyr::case_when(
    regime == "grow" ~ runif(n_cat, cfg$category_trends$drift_grow[1], cfg$category_trends$drift_grow[2]),
    regime == "decline" ~ runif(n_cat, cfg$category_trends$drift_decline[1], cfg$category_trends$drift_decline[2]),
    TRUE ~ runif(n_cat, cfg$category_trends$drift_stable[1], cfg$category_trends$drift_stable[2])
  )

  seasonal_amp <- unname(cfg$category_trends$seasonal_amp[regime])

  tibble::tibble(
    category_id = seq_len(n_cat),
    category_name = cfg$categories,
    trend_regime = regime,
    daily_drift = drift,
    seasonal_amplitude = seasonal_amp,
    base_popularity_minutes = runif(n_cat, 6, 35)
  )
}

make_name_pool <- function() {
  list(
    first = c("Emma", "Noah", "Olivia", "Liam", "Ava", "Mason", "Sophia", "Lucas", "Mia", "Ethan", "Isabella", "Logan", "Amelia", "James", "Harper", "Benjamin", "Evelyn", "Henry", "Charlotte", "Elijah"),
    last = c("Johnson", "Smith", "Garcia", "Davis", "Lopez", "Miller", "Wilson", "Anderson", "Brown", "Taylor", "Thomas", "Moore", "Jackson", "Martin", "Lee", "Clark", "Walker", "Hall", "Allen", "Young")
  )
}

slugify_handle <- function(x) {
  y <- tolower(gsub("[^A-Za-z0-9]+", "", x))
  y <- ifelse(nchar(y) < 4, paste0(y, sample(100:999, length(y), replace = TRUE)), y)
  make.unique(y, sep = "_")
}

make_creator_profile <- function(n) {
  pool <- make_name_pool()
  style <- c("fit", "daily", "studio", "official", "tv", "live", "media", "hub")
  first <- sample(pool$first, n, replace = TRUE)
  last <- sample(pool$last, n, replace = TRUE)
  display <- ifelse(
    runif(n) < 0.5,
    paste(first, last),
    paste(first, sample(style, n, replace = TRUE), sep = " ")
  )
  handle_raw <- ifelse(
    runif(n) < 0.6,
    paste(first, last, sep = "."),
    paste(first, sample(style, n, replace = TRUE), sample(1:9999, n, replace = TRUE), sep = "")
  )
  list(display = display, handle = slugify_handle(handle_raw))
}

# Larger pool used only for user display names. Combined with an optional middle
# name / initial and occasional double-barrelled surnames (see make_user_profile),
# this yields millions of distinct "First [Middle] Last" strings, so at 100k users
# almost every user_name is unique while each still reads like a real name.
make_user_name_pool <- function() {
  list(
    first = c(
      "Emma", "Noah", "Olivia", "Liam", "Ava", "Mason", "Sophia", "Lucas", "Mia", "Ethan",
      "Isabella", "Logan", "Amelia", "James", "Harper", "Benjamin", "Evelyn", "Henry", "Charlotte", "Elijah",
      "Alexander", "Michael", "Daniel", "Matthew", "Jackson", "Sebastian", "David", "Joseph", "Samuel", "John",
      "Owen", "Wyatt", "Luke", "Julian", "Gabriel", "Anthony", "Dylan", "Levi", "Isaac", "Andrew",
      "Joshua", "Christopher", "Nathan", "Ryan", "Adrian", "Aaron", "Thomas", "Charles", "Caleb", "Eli",
      "Jonathan", "Connor", "Jeremiah", "Cameron", "Josiah", "Colton", "Nicholas", "Ezra", "Hunter", "Robert",
      "Sofia", "Amara", "Aria", "Scarlett", "Grace", "Chloe", "Camila", "Penelope", "Riley", "Layla",
      "Lillian", "Nora", "Zoey", "Mila", "Aubrey", "Hannah", "Lily", "Addison", "Eleanor", "Natalie",
      "Luna", "Savannah", "Brooklyn", "Leah", "Zoe", "Stella", "Hazel", "Ellie", "Paisley", "Audrey",
      "Skylar", "Violet", "Claire", "Bella", "Aurora", "Lucy", "Anna", "Samantha", "Caroline", "Naomi",
      "Aaliyah", "Kennedy", "Allison", "Maya", "Sarah", "Madelyn", "Adeline", "Alexa", "Ariana", "Elena",
      "Gianna", "Emilia", "Ivy", "Delilah", "Isla", "Eliana", "Quinn", "Julia", "Diego", "Mateo",
      "Santiago", "Carlos", "Javier", "Omar", "Ibrahim", "Kai", "Ravi", "Arjun", "Priya", "Mei",
      "Yuki", "Haruki", "Amir", "Layan", "Nadia", "Chen", "Sanjay", "Fatima", "Hugo", "Freya"
    ),
    last = c(
      "Johnson", "Smith", "Garcia", "Davis", "Lopez", "Miller", "Wilson", "Anderson", "Brown", "Taylor",
      "Thomas", "Moore", "Jackson", "Martin", "Lee", "Clark", "Walker", "Hall", "Allen", "Young",
      "Hernandez", "King", "Wright", "Hill", "Scott", "Green", "Adams", "Baker", "Gonzalez", "Nelson",
      "Carter", "Mitchell", "Perez", "Roberts", "Turner", "Phillips", "Campbell", "Parker", "Evans", "Edwards",
      "Collins", "Stewart", "Sanchez", "Morris", "Rogers", "Reed", "Cook", "Morgan", "Bell", "Murphy",
      "Bailey", "Rivera", "Cooper", "Richardson", "Cox", "Howard", "Ward", "Torres", "Peterson", "Gray",
      "Ramirez", "Watson", "Brooks", "Kelly", "Sanders", "Price", "Bennett", "Wood", "Barnes", "Ross",
      "Henderson", "Coleman", "Jenkins", "Perry", "Powell", "Long", "Patterson", "Hughes", "Flores", "Washington",
      "Butler", "Simmons", "Foster", "Bryant", "Russell", "Griffin", "Diaz", "Hayes", "Myers", "Ford",
      "Hamilton", "Graham", "Sullivan", "Wallace", "Woods", "Cole", "West", "Jordan", "Owens", "Reynolds",
      "Fisher", "Ellis", "Harrison", "Gibson", "McDonald", "Cruz", "Marshall", "Ortiz", "Gomez", "Murray",
      "Freeman", "Wells", "Webb", "Simpson", "Stevens", "Tucker", "Porter", "Hunter", "Hicks", "Crawford",
      "Boyd", "Mason", "Morales", "Kennedy", "Warren", "Dixon", "Ramos", "Reyes", "Burns", "Gordon",
      "Shaw", "Holmes", "Rice", "Robertson", "Hunt", "Black", "Daniels", "Palmer", "Mills", "Nichols",
      "Grant", "Knight", "Ferguson", "Rose", "Stone", "Hawkins", "Dunn", "Perkins", "Chen", "Wang",
      "Nguyen", "Kim", "Patel", "Singh", "Khan", "Silva", "Santos", "Romano", "Muller", "Novak"
    )
  )
}

make_user_profile <- function(n) {
  pool <- make_user_name_pool()
  first <- sample(pool$first, n, replace = TRUE)
  last <- sample(pool$last, n, replace = TRUE)

  # Middle segment: full middle name (~72%), single initial (~18%), or none (~10%);
  # ~30% of full middle names get a second middle name ("Emma Grace Rose Miller").
  mid_kind <- sample(c("full", "initial", "none"), n, replace = TRUE, prob = c(0.80, 0.15, 0.05))
  mid_full <- sample(pool$first, n, replace = TRUE)
  mid_second <- ifelse(runif(n) < 0.30, paste0(" ", sample(pool$first, n, replace = TRUE)), "")
  mid_initial <- paste0(sample(LETTERS, n, replace = TRUE), ".")
  middle <- ifelse(mid_kind == "full", paste0(mid_full, mid_second),
                   ifelse(mid_kind == "initial", mid_initial, ""))

  # ~15% double-barrelled surnames ("Garcia-Nelson").
  hyphenate <- runif(n) < 0.15
  second_last <- sample(pool$last, n, replace = TRUE)
  last_display <- ifelse(hyphenate & second_last != last, paste0(last, "-", second_last), last)

  display <- gsub("\\s+", " ", trimws(paste(first, middle, last_display)))

  handle_raw <- ifelse(
    runif(n) < 0.7,
    paste(first, last, sample(10:999, n, replace = TRUE), sep = ""),
    paste(substr(first, 1, 1), last, sample(100:9999, n, replace = TRUE), sep = "")
  )
  list(display = display, handle = slugify_handle(handle_raw))
}

generate_creators <- function(cfg, categories) {
  set.seed(cfg$seed + 2)
  n <- cfg$n_creators
  cat_ids <- categories$category_id
  profiles <- make_creator_profile(n)

  creators <- tibble::tibble(
    creator_id = seq_len(n),
    creator_handle = profiles$handle,
    creator_name = profiles$display,
    quality = rnorm(n, mean = 0, sd = 0.8),
    posting_rate = pmax(0.2, rlnorm(n, meanlog = -0.2, sdlog = 0.4))
  )

  creator_categories <- purrr::map_dfr(seq_len(n), function(i) {
    k <- sample(1:3, 1, prob = c(0.45, 0.4, 0.15))
    chosen <- sample(cat_ids, size = k, replace = FALSE)
    tibble::tibble(creator_id = i, category_id = chosen, creator_specialty_rank = seq_along(chosen))
  })

  list(creators = creators, creator_categories = creator_categories)
}

generate_users <- function(cfg, categories) {
  set.seed(cfg$seed + 3)
  n <- cfg$n_users
  n_cat <- nrow(categories)
  profiles <- make_user_profile(n)

  pref_mat <- matrix(rnorm(n * n_cat, mean = 0, sd = 0.9), nrow = n, ncol = n_cat)
  colnames(pref_mat) <- paste0("pref_", categories$category_name)

  users <- tibble::tibble(
    user_id = seq_len(n),
    user_name = profiles$display,
    user_handle = profiles$handle,
    baseline_login = rnorm(n, -0.8, 0.7),
    satiation_decay = runif(n, 0.75, 0.96),
    need_interaction = runif(n, -1.3, 1.3),
    base_videos_watched_mean = pmax(4, rnorm(n, 42, 12)),
    base_videos_watched_sd = pmax(2, rnorm(n, 9, 3))
  )

  users <- dplyr::bind_cols(users, tibble::as_tibble(pref_mat))
  users
}

generate_initial_follows <- function(cfg, users, creators) {
  set.seed(cfg$seed + 4)
  anchor <- as.POSIXct(cfg$start_date, tz = "UTC")
  edges <- purrr::map_dfr(users$user_id, function(u) {
    n_follow <- rpois(1, lambda = 3)
    if (n_follow == 0) return(NULL)
    followed <- sample(creators$creator_id, size = min(n_follow, nrow(creators)), replace = FALSE)
    tibble::tibble(
      user_id = u,
      creator_id = followed,
      follow_start = anchor - lubridate::days(sample(1:120, length(followed), TRUE)),
      follow_end = as.POSIXct(NA)
    )
  })
  edges
}
