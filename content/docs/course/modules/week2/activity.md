---
title: Activity
draft: false
---

# Live Stream Activity

You will perform these activities during live stream #3.

## Overview

- Type: Breakout activity with 4-6 students, *or* guided "look over the shoulders of Hannes" session
- Duration 15 minutes
- Goals
  - Understand the process of input-transformation-output
  - Apply process in an R script


## Task

Write an R script, which transforms the input data, and writes an output file ("input-transformation-output").

Actively make use of the [cheat sheets](../../../building-blocks/cheat-sheets) (especially the one on `dplyr` in the data wrangling section).

### Input

Use this snippet to load the data, directly from [https://spotifycharts.com](https://spotifycharts.com).

```r
# generate a list of dates
urls <- c("https://spotifycharts.com/regional/nl/daily/2021-01-01/download", "https://spotifycharts.com/regional/nl/daily/2021-01-02/download", "https://spotifycharts.com/regional/nl/daily/2021-01-03/download", "https://spotifycharts.com/regional/nl/daily/2021-01-04/download", "https://spotifycharts.com/regional/nl/daily/2021-01-05/download", "https://spotifycharts.com/regional/nl/daily/2021-01-06/download", "https://spotifycharts.com/regional/nl/daily/2021-01-07/download")

# download files in batch
content <- lapply(urls, function(x) {
  # download raw data
  file = read.table(
    x,
    sep = ',',
    header = T,
    quote = '"',
    skip = 1
  )
  # attach date and country
  file$download_url = x
  return(file)
})

# bind everything together in one table
df <- do.call('rbind', content)

# view the data in the console
head(df)

# view the data in a new tab in RStudio
View(df)
```

The script downloads data from the web, and that may take about 10-15 seconds.

### Transformation

Work on *one or many* of the transformation steps below.

1. Generate a list of unique artists, and their total number of streams in the data. Output file name: `artist_streams`.

2. Generate a list of unique artists, and the corresponding count of tracks they have had in the data. Output file name: `artist_tracks`.

3. Transform the data from a long format to a wide format. The new data set will have the songs in rows, and the dates on which they were streamed in columns. The values in the cell indicate the number of streams on a given day. Output file name: `wide`.

### Output

Write the resulting data sets to *Excel*, using [the `xlsx` package](http://www.sthda.com/english/wiki/r-xlsx-package-a-quick-start-guide-to-manipulate-excel-files-in-r#write-data-to-an-excel-file).
