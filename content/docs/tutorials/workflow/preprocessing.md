---
bookFlatSection: true
title: "Preprocessing and Documentation"
bookHidden: false
weight: 60
description: "Prepare and document your data for analysis, for team members or the public."
---

# Preprocessing and Documentation

The goal of preprocessing and documenting your data is for co-authors (or the public) - who were *not* involved in the data collection process - can readily use the data.

Since we use computer code for preprocessing, we can easily re-run our code as new data comes in. Therefore, we typically start preprocessing and inspecting the data already while it is being collected.

## Preprocessing

### Cleaning and transformation

Typical cleaning and transformation steps in web scraping or API projects are:

- remove unnecessary information (e.g., HTML tags)
- taking out erroneous entities (e.g., data points which do not represent the entities that you meant to collect)
- removing duplicate entities (e.g., your scraper unintentionally collected panel data TWICE a day)
- relabeling columns (e.g., so that team members can understand them better)
- anonymize or pseudonimize data (e.g., personal data)
- decode non-ASCII encodings (e.g., data from different character sets)

### Data structuring

Next, choose how to store data in a logical and consistent way. For example, pick more efficient storage formats (e.g., by transforming your data from long-to-wide, or wide-to-long), and normalize your data where needed.

### Durable data storage

Choose a durable data format. CSV files are more durable than Excel files (CSV files have been around for decades, and its definition has not changed ever since; Excel updates its storage format once every few years, which requires users to use recent versions of Excel to read your data).

Also choose a durable storage technology. A database may be ideal to use during your research project, but it's impractical to keep it up and running after the project completes. Even if you were to export your data from the database after the project has ended, then your code wouldn't replicate as it is contingent on the database that you just shut down. In our experience, plain old CSV files or new-line separated JSON files are best suited for long-term storage.

## Validation

Rigorously validate your data to reassure yourself that what you intended to collect is actually what you *ended up collecting*.

### Check log files and status messages

For example, were there any interruptions during data collection?

### Skim through the raw data
Does the raw data "look good"? Are there any weird characters in your dataset, of which you're unsure what they mean? Can you notice any new variables that you did capture, but did not intend to do so?

### Verify the preprocessed data
Are all variables in this dataset GDPR-compliant (i.e., check that you cannot link observations to the identity of persons)? Are all variables labeled unambiguously?

## Documentation

Finally, document the data for potential users. Even if you're working on a project by yourself, we advise you to document the data for *your future self* (i.e., so that you still remember what variables mean six months into your project).

Provide the readme in a simple `.txt` format, or compile it as a PDF file (i.e., make it "durable"). Have at least the following sections in your documentation:
- Composition (i.e., which data have you collected, for which entities? Include any material you've produced for assessing data availability and evaluating research fit)
- Collection process (i.e., describe how you have technically implemented your data collection; include details on any errors that may have occured while collecting the data. Include any material you've produced for extracting the data.)
- Preprocessing (i.e., provide details how you have prepared the raw data for analysis)
- Institutional background (e.g., provide screen shots, the API documentation or relevant articles from the firm's blog as a PDF files)

If you are planning on sharing the data with the public, or future teams of co-authors, also explain why you have collected the data in the first place ("motivation"), and how you think the data should be used, or not used ("uses and no-uses")

{{< button relref="/collection.md" >}}Previous{{< /button >}}
{{< button relref="/use-and-maintain.md" >}}Next{{< /button >}}
