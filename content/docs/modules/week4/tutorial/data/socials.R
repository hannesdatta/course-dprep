# Load required libraries
library(tidyverse)
library(lubridate)

# Set seed for reproducibility
set.seed(42)

# Define parameters
n_days <- 365  # One years of data
artists <- unique(read_csv('realistic_fake_artists_with_numbers.csv')$Artist)
dates <- seq(from = as.Date("2024-01-01"), by = "day", length.out = n_days)

platforms <- c("TikTok", "X", "Snapchat", "Instagram")
metrics <- c("followers", "comments")

# Create a full grid efficiently
data_grid <- expand.grid(artist = artists, platform = platforms, metric = metrics)

# Generate base values, growth rates, and noise for each artist/platform/metric combination
n_unique <- nrow(data_grid)  # Unique combinations of artist/platform/metric

data_grid <- data_grid %>%
  mutate(
    base_value = runif(n_unique, 1000, 500000),  # Different base per artist/platform/metric
    growth_rate = runif(n_unique, 0.0005, 0.002), # Followers grow steadily, comments fluctuate
    noise_sd = runif(n_unique, 10, 500), # Noise varies by metric
    decay = ifelse(metric == "followers", 0, runif(n_unique, 0.0001, 0.001)) # Only comments decay
  )

# Expand over time
expanded_data <- data_grid %>%
  crossing(date = dates) %>%
  mutate(
    day_index = as.numeric(date - min(date) + 1),
    value = base_value * (1 + growth_rate)^day_index + rnorm(n(), mean = 0, sd = noise_sd),
    value = pmax(0, round(value)) # Ensure non-negative integers
  ) %>%
  select(date, artist, platform, metric, value)

# Display first few rows
print(head(expanded_data))

# Create missing data
expanded_data <- expanded_data %>% mutate(is_NA = runif(n())<.02)
expanded_data <- expanded_data %>% group_by(platform, date) %>% mutate(is_missing = first(runif(1)<.05)) %>% ungroup()
expanded_data <- expanded_data %>% group_by(date) %>% mutate(is_missing2 = first(runif(1)<.1)) %>% ungroup()

expanded_data = expanded_data %>% mutate(value = ifelse(is_NA==T, NA, value))
expanded_data = expanded_data %>% filter(!is_missing & !is_missing2) %>% select(-is_missing, -is_missing2, -is_NA)

# Save to CSV
write_csv(expanded_data, "socials.csv")
