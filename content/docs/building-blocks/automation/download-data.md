---
weight: 11
title: Download data
description: Get your data right from the source and store it locally!
keywords: "download, import data, download datasets internet"
date: 2021-02-08
bookCollapseSection: true
draft: false
---

## Overview 
Download a file from a URL and store it on your local machine.

## Code 
Here's an example of how to import data in the R programming language:

```R
download_data <- function(url, filename, file_path){
  download.file(url = url, destfile = paste0(file_path, filename))
}

download_data(url, filename)
```

*Example:*

```R
download_data("http://data.insideairbnb.com/the-netherlands/north-holland/amsterdam/2020-12-12/visualisations/reviews.csv", "airbnb_listings.csv", "../data")
```


### See Also
* Keep in mind that the `file_path` is dependent on the location of your R script.
* The `url` can also be a link to a data file in your personal Dropbox or Google Drive.
* Suppose that you saved the code snippet above as `download.R`, then you can run the script from the terminal with (e.g., part of a make workflow): 

```
R < download.R --save
```




