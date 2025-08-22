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

# Introduce a pandemic effect starting in March 2020
spotify_data <- spotify_data %>%
  mutate(
    pandemic_period = if_else(date >= as.Date("2020-03-01"), "After Pandemic", "Before Pandemic"),
    # Simulate a slight drop in streams after the pandemic starts
    streams = if_else(pandemic_period == "After Pandemic", streams * runif(n(), 0.8, 1), streams)
  )

# Save the simulated data to CSV for analysis
write.csv(spotify_data, "spotify_data.csv", row.names = FALSE)
