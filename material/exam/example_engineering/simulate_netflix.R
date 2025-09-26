library(dplyr)
library(tidyr)
library(lubridate)

# Set random seed for reproducibility
set.seed(42)

# Define parameters
num_shows <- 100  # Number of unique shows
num_countries <- 10  # Number of unique countries
start_date <- as.Date("2020-01-01")
end_date <- as.Date("2025-02-01")
dates <- seq(start_date, end_date, by = "month")  

# Define possible genres, show types, and countries
genres_list <- c("Action", "Drama", "Comedy", "Sci-Fi", "Horror", "Fantasy", 
                 "Romance", "Documentary", "Thriller", "Adventure")
show_types <- c("Movie", "TV Show")
countries <- c("USA", "UK", "Canada", "Germany", "France", 
               "India", "Japan", "Brazil", "South Korea", "Australia")

# Function to randomly assign multiple genres
generate_genre <- function() {
  paste(sample(genres_list, sample(1:3, 1)), collapse = ", ")
}

# Generate unique show IDs, titles, and fixed country of origin
shows <- data.frame(
  show_id = paste0("SHOW_", 1:num_shows),
  title = paste("Title", 1:num_shows),
  genres = replicate(num_shows, generate_genre()),
  type = sample(show_types, num_shows, replace = TRUE),
  country_of_origin = sample(countries, num_shows, replace = TRUE)  # Fixed origin country
) %>%
  mutate(
    season_count = ifelse(type == "TV Show", sample(1:10, num_shows, replace = TRUE), NA),
    release_date = sample(seq(start_date, end_date, by = "day"), num_shows, replace = TRUE)  # Assign release dates
  )

# Expand data to create monthly observations while ensuring country of origin is fixed
netflix_data <- expand.grid(
  viewership_country = countries,  # Viewership recorded across all countries
  date = dates,  
  show_id = shows$show_id,
  stringsAsFactors = FALSE
) %>%
  left_join(shows, by = "show_id") %>%
  filter(date >= release_date) %>%  # Ensure ratings are after release date
  mutate(
    # Assign ratings first
    show_rating = round(runif(n(), 5, 9) + rnorm(n(), 0, 0.5), 1), # Ratings fluctuate slightly but remain in range
    show_rating = pmin(pmax(show_rating, 1), 10), # Ensure rating is within 1-10
    
    # Ensure missing values in specific months for ratings
    show_rating = ifelse((month(date) == 6 & year(date) == 2021) | 
                           (month(date) == 8 & year(date) == 2022) |
                           (month(date) == 1 & year(date) == 2023), NA, show_rating),
    
    # Now create viewership_count **based on show_rating** with added variation
    base_viewership = 50000 + (show_rating * 100000) + rnorm(n(), 0, 20000), # Ensuring a direct positive correlation
    viewership_count = round(base_viewership), # Round for realism
    viewership_count = pmax(100, viewership_count), # Ensure minimum value of 100
    
    # Introduce missing values in specific months for viewership count
    viewership_count = ifelse((month(date) == 2 & year(date) == 2022) | 
                                (month(date) == 4 & year(date) == 2023), NA, viewership_count)
  ) %>%
  select(show_id, title, country_of_origin, viewership_country, date, genres, type, season_count, release_date, show_rating, viewership_count)

# Check correlation to ensure it's positive
cor(netflix_data$show_rating, netflix_data$viewership_count, use = "complete.obs")

# Save datasets
write.csv(netflix_data, "netflix_data.csv", row.names = FALSE)
