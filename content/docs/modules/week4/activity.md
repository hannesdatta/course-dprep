---
title: After-class exercises
draft: false
---

# After-class exercises

## Overview

- Duration 15-20 minutes
- Goals
  - Understand the process of input-transformation-output
  - Apply process in an R script


## Task

Write an R script, which transforms the input data, and writes an output file ("input-transformation-output").

Actively make use of the [cheat sheets](../../../building-blocks/cheat-sheets) (especially the one on `dplyr` in the data wrangling section).

### Input

Use this snippet to download and import the data, which originally was retrieved from [https://spotifycharts.com](https://spotifycharts.com).

```r
# Load packages
library(dplyr)
library(tidyverse)
library(writexl)

#########
# Input #
#########

## Open data
df <- read_delim('https://raw.githubusercontent.com/hannesdatta/course-dprep/master/content/docs/modules/week4/regional-global-daily-latest.csv', delim = ',', skip = 1)

# view the data in the console
head(df)

# view the data in a new tab in RStudio
View(df)

##################
# Transformation #
##################

#
#
#

##########
# Output #
##########

# use ?write_xlsx to view the help file of this function

```

The script downloads data from the web, and that may take a few seconds.

### Transformation

Work on *one or many* of the transformation steps below.

1. Generate a list of unique artists, and their total number of streams in the data. Output file name: `artist_streams`.

2. Generate a list of unique artists, and the corresponding count of tracks they have had in the data. Output file name: `artist_tracks`.

3. Transform the data from a long format to a wide format. The new data set will have the songs in rows, and the dates on which they were streamed in columns. The values in the cell indicate the number of streams on a given day. Output file name: `wide`.

### Output

Write the resulting data sets to *Excel*, using [the `writexl` package](https://www.rdocumentation.org/packages/writexl/versions/1.4.0/topics/write_xlsx).

<!--
## Code written in class

```

#################
##### INPUT #####
#################

# generate a list of dates
urls <-
  c(
    "https://spotifycharts.com/regional/nl/daily/2021-01-01/download",
    "https://spotifycharts.com/regional/nl/daily/2021-01-02/download",
    "https://spotifycharts.com/regional/nl/daily/2021-01-03/download",
    "https://spotifycharts.com/regional/nl/daily/2021-01-04/download",
    "https://spotifycharts.com/regional/nl/daily/2021-01-05/download",
    "https://spotifycharts.com/regional/nl/daily/2021-01-06/download",
    "https://spotifycharts.com/regional/nl/daily/2021-01-07/download"
  )

# download files in batch
# lapply(1:10, function(i) i^2)

# lapply(1:10, function(i) {
#   i+1
#   return(i^2)
#   i
# })

all_data = lapply(urls, function(url) {
  print(url)
  tmp <- read.table(url, sep = ',', skip = 1, quote = '"', header = TRUE)
  tmp$filename <- url
  return(tmp)
})

# str(all_data)
df = do.call('rbind', all_data)

# ?read.table
# head(tmp)
# View(tmp)
# cat(readLines(urls[1]), sep = "\n")

# view the data in the console
head(df)

colnames(df) <- tolower(colnames(df))
colnames(df) <- gsub('[.]', '', colnames(df))

# grepl('amazing', 'This is really an amazing book that you should read.')
# gsub('hannes','shrabastee', 'hannes is teaching a good class.')
# gsub('[.]', '', 'artist.title')


########################
#### TRANSFORMATION ####
########################

library(dplyr)

# sum of streams by artists
tmp <-
  df %>% group_by(artist) %>% summarise(total_streams = sum(streams))

tmp2 <- df %>% group_by(artist) %>% count(trackname)


# data.table
# library(data.table)
# data.table(df)[, list(.N),by=c('artist', 'trackname')][, list(N=.N),by=c('artist')]


#View(tmp)

library("xlsx")
# install.package('xlsx')    # ' '    ""    ' " '     " ' "
tmp <- data.frame(tmp)

write.xlsx(tmp, 'spotify.xlsx', sheetName = "artists",
           col.names = TRUE, row.names = FALSE, append = FALSE)



write.table(df, 'spotify_output.csv')
# explore workspace

```
-->
