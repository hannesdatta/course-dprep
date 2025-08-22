library(tidyverse)

# CREATE PIVOT TABLE

## import the data from `gen/data-preparation/aggregated_df.csv`
df <- read_csv("aggregated_df.csv")

## create pivot table 
df_pivot <- df %>% pivot_wider(names_from=neighbourhood, values_from = num_reviews, id_cols = c('date'))

## export results
write_csv(df_pivot, "pivot_table.csv")

