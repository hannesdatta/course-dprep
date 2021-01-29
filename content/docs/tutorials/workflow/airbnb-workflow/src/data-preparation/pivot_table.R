library(dplyr)
library(reshape2)

# import the data from `gen/data-preparation/aggregated_df.csv`
df <- read.csv("gen/data-preparation/aggregated_df.csv")

# create pivot table
df_pivot <- df %>% dcast(date ~ neighbourhood, fun.aggregate = sum, value.var = "num_reviews")

# export results
write.csv(df_pivot, "gen/data-preparation/pivot_table.csv")