# Load required libraries
library(tidyverse)
library(lubridate)

# Set seed for reproducibility
set.seed(42)

# Define parameters
n_days <- 730  # Two years of data
artists <- paste0("Artist ", 1:100)
dates <- seq(from = as.Date("2024-01-01"), by = "day", length.out = n_days)

# Convert dates to ISO year-week
week_data <- tibble(
  date = dates,
  iso_week = paste0(year(date), "-W", sprintf("%02d", isoweek(date)))
)

# Remove duplicates to keep unique weeks
week_data <- week_data %>% distinct(iso_week) %>% arrange(iso_week)

# Generate base values per artist
artist_base_values <- tibble(
  artist = artists,
  base_playlists = runif(length(artists), 5, 500),  # Different starting playlist counts per artist
  growth_rate = runif(length(artists), 0.01, 0.05)  # Weekly growth rates
)

# Expand the dataset to artist-week level
playlist_data <- crossing(artist_base_values, week_data) %>%
  mutate(
    week_index = as.numeric(factor(iso_week, levels = unique(iso_week))),
    playlists = base_playlists * (1 + growth_rate)^week_index + rnorm(n(), mean = 0, sd = 10),
    playlists = pmax(0, round(playlists))  # Ensure non-negative values
  ) %>%
  select(iso_week, artist, playlists)

# Display first few rows
print(head(playlist_data))

# Save to CSV
write_csv(playlist_data, "playlists.csv")
