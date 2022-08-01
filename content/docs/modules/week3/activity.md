---
title: After-class exercises
draft: false
---

# After-class exercises

## Overview
- Duration: 25 minutes, with 15-minute post discussion
- Goals
  - Let's assume you've just received data from a data provider or finished scraping your data. You'll learn how to explore the data set best!
  - Generate questions to ask your data supplier to help you understand the data better!

## Breakout session structure

1. Work on your "breakout challenge"
    - You've been added to a break-out group with a specific theme/data set attached to it. All group members are asked to run the code snippet to load the data into R (see below).
    - One group member shares the screen (pick one that already has some R experience)
    - All team members try to explore the data independently.
      - How many rows and columns?
      - What's the unit of analysis/primary key?
      - What's in the data?!
      - Do you know what all variables/columns mean?
      - Are there any missing observations?
      - Are there any odd values?
      - Which variables could be dependent variables, which ones independent variables?
      - Which variables could be generated based on the raw data?
      - ...

2. Generate a list of *questions* to ask about the data so that you can resolve some of the things you've run into. Think of this session as the only "meetup with the data delivery guy" - what will you have to ask so that you can work with this data in the future?

4. Pick a team captain who can ask your questions in the large group after the breakout sessions are closed.

Recall - it's a challenge, so things may not always run smoothly! Ask Hannes for help (he'll be "walking around" in the breakout groups). <!--Also, you can use WhatsApp to ask Hannes to join your groups in case you're stuck!-->


## Data sets

### Data set 1: Firm's proprietary data (New releases at Spotify)

The data set captures new music albums that have been released to Spotify.

Note: This data set is not *strictly* proprietary, as it has been collected via a website that uses the Spotify API. Still, the data will probably be similar to data that's internally available at Spotify.

```r
df <-
  read.table(
    'https://www.dropbox.com/s/xuskz4fnr9byhdn/releases-dprep.csv?dl=1',
    sep = '\t',
    quote = "",
    comment.char = '',
    header = T,
    encoding = 'UTF-8'
  )

# view the data in the console
head(df)

# view the data in a new tab in RStudio
View(df)

```

### Data set 2: Publicly available data (Spotifycharts.com)

This data shows insights into the streaming behavior on Spotify, by country and date.

The data is available at https://spotifycharts.com.


```r


# generate a list of dates
dates <-
  seq(
    from = as.Date('2021-01-01'),
    to = as.Date('2021-01-07'),
    by = '1 day'
  )

# assemble download URLs from dates
urls <-
  paste0('https://spotifycharts.com/regional/nl/daily/',
         dates,
         '/download')

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

<!--
### Data set 2: Publicly available data: Community Mobility Reports

This data shows insights on movement trends over time and geography, across different categories of retail and recreation, groceries and pharmacies, etc.

The data is documented at https://www.google.com/covid19/mobility/.


```r
df <-
  read.table(
    'https://www.gstatic.com/covid19/mobility/Global_Mobility_Report.csv',
    sep = ',',
    quote = '"',
    nrow = 1E5,
    comment.char = '',
    header = T,
    fill = T,
    encoding = "UTF-8"
  )
```

-->

### Data set 3: Commercially available market research data (Retail panel)

This data is an (anonymized) data set, capturing sales data as it is available via commercial data providers such as GfK, IRI, or Nielsen. While the data structure resembles what you would receive from such parties, the data itself is "simulated" (the NDA keeps me from sharing the *actual* data).

```r
df <-
  read.table(
    'https://www.dropbox.com/s/lvvo8x00epb0wsm/sales-china.csv?dl=1',
    sep = ',',
    header = T
  )

# view the data in the console
head(df)

# view the data in a new tab in RStudio
View(df)

```
