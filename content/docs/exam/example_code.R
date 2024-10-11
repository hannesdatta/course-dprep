# Load required libraries
library(dplyr)

# Create 'data1' in wide format
set.seed(0)
data1 <- data.frame(
  id = 1:5,
  `2020_review_score` = sample(1:5, 5, replace = TRUE),
  `2021_review_score` = sample(1:5, 5, replace = TRUE),
  `2022_review_score` = sample(1:5, 5, replace = TRUE)
)

# Create 'data2' with user variables
data2 <- data.frame(
  user_id = 1:5,
  variable1 = runif(5),
  variable2 = runif(5)
)

# Create 'data3' with some cleaning required
data3 <- data.frame(
  listing_id = 1:5,
  price = c(100, 200, 300, 5000, NA),  # Outlier and missing value
  number_of_reviews = c(5, 10, NA, 25, 50),  # Missing value
  host_response_rate = c('100%', '90%', NA, '85%', '110%')  # Invalid percentage (over 100%)
)

# Save the datasets into an RData file
save(data1, data2, data3, file = "datasets.RData")

library(tidyverse)
q1 <- data1 %>%
  pivot_longer(cols = starts_with("X202"),
               names_prefix='X', 
               names_to = "year", 
               values_to = "review_score")


q2 <- data2 %>% group_by(user_id) %>% summarize(mean_var1=mean(variable1), mean_var2=mean(variable2))


Please use the dataset stored in data2. Using dplyr, 
please create an aggregated dataset, 
taking an average of variable1 and variable2 for all users in the data (i.e., you obtain a dataset with the number of rows equal to the number of users in the data).
