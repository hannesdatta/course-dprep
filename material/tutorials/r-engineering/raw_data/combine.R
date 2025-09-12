# combine

library(tidyverse)

weather <- read_csv('weather.csv')
socials <- read_csv('socials.csv')
playlists <- read_csv('playlists.csv')

# wide to long
weather_long = weather %>% pivot_longer(cols=-date, 
                         names_to = c("country", ".value"), 
                         names_sep = "_")
# long to wide
socials_wide = socials %>% pivot_wider(id_cols=all_of(c('date','artist')), 
                        names_from=c('platform','metric'),
                        values_from=c('value'))

library(ISOweek)
playlists <- playlists %>% mutate(date = ISOweek2date(paste0(iso_week,'-1')))
# super complex!

#all dates

# Define parameters
n_days <- 365  # One years of data
artists <- unique(read_csv('realistic_fake_artists_with_numbers.csv')$Artist)
dates <- seq(from = as.Date("2024-01-01"), by = "day", length.out = n_days)


# Create data set for all artists
streams <- expand.grid(artist=artists,country=unique(weather_long$country), date=dates)

streams <- streams %>% left_join(weather_long, by = c('date','country'))
streams <- streams %>% left_join(socials_wide, by = c('date','artist'))

streams <- streams %>% left_join(playlists, by = c('date','artist'))

streams=streams %>% group_by(artist, country) %>% arrange(artist, country,date) %>% 
  mutate(playlists=zoo::na.locf(playlists, na.rm=F)) %>% ungroup()




# Load required libraries
library(tidyverse)
library(lubridate)

# Set seed for reproducibility
set.seed(42)

countries <- c("DE", "BE", "NL", "US")

# Country-specific population weight (scaling streams)
country_pop <- tibble(
  country = countries,
  pop_factor = c(80, 11, 17, 330) / 330  # Scaled relative to the US
)

# Generate artist popularity trends (unobserved)
artist_trends <- tibble(
  artist = artists,
  global_trend = runif(length(artists), -0.001, 0.003),  # Some artists grow, some decline
  country_variation = map(artists, ~ rnorm(4, mean = 0, sd = 0.002)) # Variation per country
) %>%
  unnest_wider(country_variation, names_sep = "_") %>%
  rename_with(~ paste0("trend_", countries), starts_with("country_variation"))

# Create base dataset
extra_covariates <- expand.grid(artist = artists, country = countries, date = dates) %>%
  left_join(country_pop, by = "country") %>%
  left_join(artist_trends, by = "artist")

# Function to simulate daily streams
simulate_streams <- function(temp, sun, social_followers, social_comments, playlists, base_pop, trend, day) {
  # Weather effects (e.g., bad weather → more streaming)
  weather_effect <- exp(-0.05 * temp) + 0.01 * sun
  
  # Social media impact (log transformation to avoid excessive impact)
  social_impact <- log1p(social_followers) * 0.0005 + log1p(social_comments) * 0.0003
  
  # Playlist impact (strong driver)
  playlist_impact <- log1p(playlists) * 0.01
  
  # Artist's global trend over time
  time_trend <- trend * day
  
  # Generate final streams (scaled to country)
  streams <- base_pop * 5000 +  # Country population scaling
    3000 * weather_effect + 
    5000 * social_impact + 
    10000 * playlist_impact + 
    5000 * time_trend +
    rnorm(1, mean = 0, sd = 5000)  # Random noise
  
  return(max(0, round(streams)))  # Ensure streams are non-negative
}

streams <- streams %>% left_join(extra_covariates, by = c('artist','country','date'))

# Apply simulation over all rows
streams2 <- streams %>%
  mutate(
    day_index = as.numeric(date - min(date) + 1),
    country_trend = case_when(
      country == "DE" ~ trend_DE,
      country == "BE" ~ trend_BE,
      country == "NL" ~ trend_NL,
      country == "US" ~ trend_US,
      TRUE ~ 0  # Default fallback
    ),
    streams = pmap_dbl(list(temp, sun,
                            TikTok_followers, TikTok_comments,
                            playlists, pop_factor, 
                            country_trend, day_index),
                       ~ simulate_streams(..1, ..2, ..3, ..4, ..5, ..6, ..7, ..8))
  ) %>%
  select(date, artist, country, streams)

# Display first few rows
print(head(streams2))

# Generate some missings

# Create missing data
print(nrow(streams))
streams2 <- streams2 %>% mutate(is_NA = runif(n())<.06)
streams2 <- streams2 %>% mutate(week =ISOweek::ISOweek(date))
streams2 <- streams2 %>% group_by(artist, week) %>% mutate(is_missing = first(runif(1)<.02)) %>% ungroup()
streams2 <- streams2 %>% group_by(week) %>% mutate(is_missing2 = first(runif(1)<.1)) %>% ungroup()

streams2 = streams2 %>% mutate(streams = ifelse(is_NA==T, NA, streams))
streams2 = streams2 %>% filter(!is_missing & !is_missing2) %>% select(-is_missing, -is_missing2, -is_NA, -week)
print(nrow(streams2))

# Save to CSV
write_csv(streams2, "streams.csv")

