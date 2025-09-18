# Load packages
library(tidyverse)
library(ggplot2)

# DOWNLOAD DATA 

## Function to download data and save as CSV
download_data <- function(url, filename){
  download.file(url = url, destfile = paste0(filename, ".csv"))
}

url_listings <- "http://data.insideairbnb.com/belgium/vlg/antwerp/2021-02-25/visualisations/listings.csv"
url_reviews <- "http://data.insideairbnb.com/belgium/vlg/antwerp/2021-02-25/visualisations/reviews.csv"

download_data(url_listings, "listings")
download_data(url_reviews, "reviews")

# CLEAN DATA 

reviews <- read_csv("reviews.csv")
listings <- read_csv("listings.csv")

## filter for reviews published since 01/01/2015
reviews_filtered <- reviews %>% filter(date > "2015-01-01")

## filter for `listings` that have received at least 1 review.
listings_filtered <- listings %>% filter(number_of_reviews > 1)

## merge the `reviews` and `listings` dataframes on a common columns (the type of join doesn't really matter since we already filtered out listings without any reviews)
df_merged <- reviews_filtered %>% inner_join(listings_filtered, by = c("listing_id" = "id"))

## group the number of reviews by month and neighborhood.
df_grouped <- df_merged %>%
  mutate(month = format(date, "%m"), year = format(date, "%Y")) %>%
  group_by(year, month, neighbourhood) %>%
  summarise(num_reviews = n())

## create date column
df_grouped <- df_grouped %>% mutate(date = as.Date(paste0(year, "-", month, "-01")))

## store the final data frame in `gen/data-preparation` as `aggregated_df.csv`
write_csv(df_grouped, "aggregated_df.csv")


# CREATE PIVOT TABLE

## import the data from `gen/data-preparation/aggregated_df.csv`
df <- read_csv("aggregated_df.csv")

## create pivot table 
df_pivot <- df %>%  pivot_wider(id_cols=date, names_from = neighbourhood, values_from = num_reviews)

## export results
write_csv(df_pivot, "pivot_table.csv")


# PLOT ANTWERP 

## import the data from `gen/analysis/pivot_table`
df_pivot <- read_csv("pivot_table.csv")

pdf("plot_Antwerp.pdf")
library(tidyverse)

df_pivot <- read_csv("pivot_table.csv")

pdf("plot_Antwerp.pdf")

ggplot(df_pivot, aes(x = date)) +
  geom_line(aes(y = Universiteitsbuurt, color = "Universiteitsbuurt"), linewidth = 1) +
  geom_line(aes(y = `Sint-Andries`, color = "Sint-Andries"), linewidth = 1) +
  geom_line(aes(y = `Centraal Station`, color = "Centraal Station"), linewidth = 1) +
  labs(
    x = "",
    y = "Total number of reviews",
    title = "Effect of COVID-19 pandemic on Airbnb review count",
    color = "Neighborhood"
  ) +
  scale_color_manual(values = c("Universiteitsbuurt" = "red",
                                "Sint-Andries" = "blue",
                                "Centraal Station" = "green")) +
  theme_minimal()

dev.off()

# PLOT ALL

## import the data from `gen/data-preparation/aggregated_df.csv`
df <- read_csv("aggregated_df.csv")

## group by date and calculate the sum of all reviews across neighbourhoods.
df_groupby <- df %>% group_by(date) %>% summarise(num_reviews = sum(num_reviews))

## plot the chart and store the visualisation.
pdf("plot_all.pdf")

ggplot(df_groupby, aes(x = date, y = num_reviews)) +
  geom_line(color = "black", size = 1) +
  labs(
    x = "",
    y = "Total number of reviews",
    title = "Effect of COVID-19 pandemic on Airbnb review count"
  ) +
  theme_minimal()

dev.off()