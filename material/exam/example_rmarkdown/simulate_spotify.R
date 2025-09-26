# Load required libraries
library(dplyr)
library(lubridate)

# Set seed for reproducibility
set.seed(42)

# Generate 100 artists and songs
artists <- paste("Artist", 1:100)
songs <- paste("Song", 1:5)

# Simulate data for 3 years: Jan 2019 to Dec 2021
dates <- seq(as.Date('2019-01-01'), as.Date('2021-12-31'), by = "day")

# Simulate 10 countries
countries <- c("USA", "UK")

# Generate data: each day, each country, each artist has some number of streams
n = length(dates) * length(countries) * length(artists)

spotify_data <- data.frame(
  date = rep(dates, each = length(countries) * length(artists)),
  country = rep(countries, times = length(dates) * length(artists)),
  artist = rep(artists, times = length(dates) * length(countries)),
  song = rep(songs, times = length(dates) * length(countries)),
  streams = round(runif(n, min = 1000, max = 500000), 0)  # Random stream numbers
)

# Introduce a gradual pandemic effect starting in March 2020
pandemic_start <- as.Date("2020-03-01")
gradual_weeks <- 6   # number of weeks for drop to fully set in
min_factor <- 0.90    # final stable multiplier (e.g., 10% drop)

spotify_data <- spotify_data %>%
  mutate(
    weeks_since_pandemic = as.numeric(difftime(date, pandemic_start, units = "weeks")),
    weeks_since_pandemic = pmax(0, weeks_since_pandemic),  # no negatives
    # Build decay factor: linearly interpolate from 1.0 to min_factor over gradual_weeks
    drop_factor = if_else(
      date < pandemic_start, 
      1,
      pmax(min_factor, 1 - (1 - min_factor) * pmin(weeks_since_pandemic, gradual_weeks) / gradual_weeks)
    ),
    # Apply gradual decline
    streams = round(streams * drop_factor, 0)
  )

# Save the simulated data to CSV for analysis
write.csv(spotify_data, "spotify_data.csv", row.names = FALSE)
zip('spotify_data.zip', 'spotify_data.csv')
