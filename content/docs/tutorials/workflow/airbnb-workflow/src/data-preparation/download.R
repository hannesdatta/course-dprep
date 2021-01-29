download_data <- function(url, filename){
  download.file(url = url, destfile = paste0("data/", filename, ".csv"))
}

url_listings <- "http://data.insideairbnb.com/the-netherlands/north-holland/amsterdam/2020-12-12/visualisations/listings.csv"
url_reviews <- "http://data.insideairbnb.com/the-netherlands/north-holland/amsterdam/2020-12-12/visualisations/reviews.csv"

download_data(url_listings, "listings")
download_data(url_reviews, "reviews")

