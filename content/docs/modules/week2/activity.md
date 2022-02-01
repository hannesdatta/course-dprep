---
title: Live Stream Activity
draft: False
---

# Live Stream Activity

You will work on this activity during the live stream.

## Overview

- Type: Breakout activity
- Duration: 25 minutes, with 15-minute post discussion
- Goals
  - Able to clone any open-source repository from Github locally and run it using Hugo!
  - Make changes to such repository by following the Git workflow and creating a pull request!

## Breakout session structure

This week, we used Git, which really becomes powerful when collaborating with others - sometimes even with people you've never met before! In fact, you can easily contribute to open source projects, simply by "forking" a public GitHub repository (= taking a copy of the repository), making changes to the source code, and proposing to the owner of the project to integrate your changes in the "head revision"/"main branch" (= the code that runs the project).

Now, start putting your Git skills into practice, by making changes to the [course website](https://dprep.hannesdatta.com), or [Tilburg Science Hub](https://tilburgsciencehub.com). For example, by fixing typos, or rewriting parts of the tutorials or building blocks. To get started, view the steps below.


{{< hint info >}}
__How to contribute to an open source project__

*The instructions below pertain to this course website and Tilburg Science Hub, both of which are websites run with the Hugo framework.*

__Step 1: Get to know the repository__

1. Familiarize yourself with the repository top which you want to contribute. Typically, each repository has a __readme__ with general instructions on what the repository is about (& how to run the code). Also, new features and bugs are discussed at the repository's __issue__ page. Finally, many repositories contain a discussion forum and project board in which you can learn about the roadmap of the project.
    - Visit the [course repository](https://github.com/hannesdatta/course-dprep), or [Tilburg Science Hub](https://github.com/tilburgsciencehub/tsh-website).
    - Browse through the repository's readme (that's what you see when you click on the links above), issue page, and project/discussion boards.


__Step 2: Run the repository's code (= run the website)__

1. Install [hugo](https://gohugo.io/getting-started/installing/) - that's the content management system we use for running these websites (Note: it may be required to install the extended version to run this course repository!).
2. Fork one of the repositories (click on the fork button in the upper right corner on Git). This creates a copy of the code in your GitHub account.
3. Clone your own fork to the disk, e.g., `git clone https://github.com/your-user-name/course-dprep`.
4. Enter the directory of the cloned repository using `cd course-dprep`, and run `hugo server`.
5. You can now open the website *locally in your browser*. Check the terminal for the exact address, but likely you just have to enter `https://127.0.0.1:1313` in your browser!
6. Check out the code in `\docs` - the websites are written in Markdown, and you can easily add/change. Observe how the site actually changes in your browser!
7. Open the course in a text editor such as [Atom](https://tilburgsciencehub.com/choose/text-editor) and put it side-to-side with the local Hugo server. You will see that any changes you make and save in Atom are visible on the server!

__Step 3: Make changes__

1. Find stuff that you want to add or fix.
2. Create a new branch (`git branch name-of-a-new-feature`) (e.g., call it `fix-typo-tutorial`, or `buildingblock-new`).
6. Work on your new feature. Throughout, apply the Git workflow (`git status`, `git add`, `git commit -m "commit message"`)
7. When you're done with all of your changes, push your changes to your GitHub repository `git push -u origin name-of-a-new-feature`
8. Fully done & happy? Issue a pull request from the website. Write a little description for what you did when sending your PR.
{{< /hint >}}


{{< hint info >}}
__Build your CV__

Many data science and marketing analytics students put their GitHub profiles and contributions on their CV. For example, check the website of [Roy Klaasse Bos](https://royklaassebos.nl), and his [GitHub profile](https://github.com/RoyKlaasseBos).

{{< /hint >}}
<!--
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
