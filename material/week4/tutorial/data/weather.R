# Load required libraries
library(tidyverse)
library(lubridate)

# Set seed for reproducibility
set.seed(42)

# Define the number of days (change as needed)
n_days <- 365  # One years of data

# Generate a sequence of days
dates <- seq(from = as.Date("2024-01-01"), by = "day", length.out = n_days)

# Function to generate realistic temperature trends
generate_temperatures <- function(base_temp, amplitude, noise_sd, n_days) {
  temp <- base_temp + amplitude * sin(2 * pi * (1:n_days) / 365) + rnorm(n_days, mean = 0, sd = noise_sd)
  return(temp)
}

# Function to generate sun hours, positively correlated with temperature
generate_sun_hours <- function(temp, max_sun, min_sun, noise_sd) {
  sun_hours <- min_sun + (max_sun - min_sun) * (temp - min(temp)) / (max(temp) - min(temp))
  sun_hours <- pmax(pmin(sun_hours + rnorm(length(temp), mean = 0, sd = noise_sd), max_sun), min_sun)
  return(sun_hours)
}

# Define parameters for each country (temperature: base, amplitude, noise)
params <- list(
  DE = list(base = 10, amp = 12, noise = 3, max_sun = 10, min_sun = 2, sun_noise = 1),
  BE = list(base = 11, amp = 11, noise = 3, max_sun = 9, min_sun = 2, sun_noise = 1),
  NL = list(base = 10, amp = 11, noise = 3, max_sun = 9, min_sun = 2, sun_noise = 1),
  US = list(base = 15, amp = 15, noise = 5, max_sun = 12, min_sun = 3, sun_noise = 2)
)

# Generate the temperature and sun hours data
temperature_data <- tibble(
  date = dates,
  DE_temp = generate_temperatures(params$DE$base, params$DE$amp, params$DE$noise, n_days),
  BE_temp = generate_temperatures(params$BE$base, params$BE$amp, params$BE$noise, n_days),
  NL_temp = generate_temperatures(params$NL$base, params$NL$amp, params$NL$noise, n_days),
  US_temp = generate_temperatures(params$US$base, params$US$amp, params$US$noise, n_days)
)

sun_hours_data <- tibble(
  date = dates,
  DE_sun = generate_sun_hours(temperature_data$DE_temp, params$DE$max_sun, params$DE$min_sun, params$DE$sun_noise),
  BE_sun = generate_sun_hours(temperature_data$BE_temp, params$BE$max_sun, params$BE$min_sun, params$BE$sun_noise),
  NL_sun = generate_sun_hours(temperature_data$NL_temp, params$NL$max_sun, params$NL$min_sun, params$NL$sun_noise),
  US_sun = generate_sun_hours(temperature_data$US_temp, params$US$max_sun, params$US$min_sun, params$US$sun_noise)
)

# Merge both datasets
final_data <- left_join(temperature_data, sun_hours_data, by = "date")

# Display the first few rows
print(head(final_data))

# Save as CSV
write_csv(final_data, "weather.csv")
