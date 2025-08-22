library(tidyverse)
library(ggplot2)

## import the data from `gen/data-preparation/aggregated_df.csv`
df <- read_csv("aggregated_df.csv")

## group by date and calculate the sum of all reviews across neighbourhoods.
df_groupby <- df %>% group_by(date) %>% summarise(num_reviews = sum(num_reviews))

df_groupby %>% ggplot() + geom_line(aes(x=date, y=num_reviews)) + 
  labs(x='Date', y = 'Total number of reviews',
       title = 'Effect of COVID-19 pandemic on Airbnb review count')

ggsave('plot_all.pdf')
