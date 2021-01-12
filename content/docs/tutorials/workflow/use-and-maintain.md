---
bookFlatSection: true
title: "Using, Distribution, and Maintenance"
description:
bookHidden: false
weight: 60
description: "Use your data in your research project, distribute it to team members or the public, and maintain it throughout the duration of your research project."
---


# Using, Distribution, and Maintenance

## Using

## Distribution

### Internal distribution

There are many ways in which to distribute your dataset to members of your research time, that all come with their advantages and disadvantages.

If you have already set up a shared folder on your institution's research drive or cloud provider (e.g., Dropbox, Google Cloud), you could just put the final data set in there. The advantage is to use an accepted and common way to exchange files (your co-author will likely be thankful to you they don't have to create a login for a new system they're unfamiliar with). Even simpler is using (secure) file transfer services (e.g., like filesender.surf.nl for users at Dutch research institutions).

An alternative way of sharing data is to provide your co-authors with a little code snippet (e.g., which you could put in your team's GitHub repository). Ask members of the team to run that code to pull in the (most recent) version of your data set. This works especially well in data-intensive research projects in which data sets keep on changing throughout the research project (e.g., because the raw data is updated, or because you implement changes to the data preprocessing).

### External distribution and licensing

When you would like to publish your data to the journal's office (e.g., for reproducibility) or the public (e.g., because you want to enable others to build upon your work), there three broad considerations to make:

First, you need to choose how to host the data. In the past, many researchers have hosted data on their personal websites, but such hosting is not very durable (e.g., you may forget to pay your server bills, so there's a chance the data may get offline), or accessible (e.g., your personal website is likely not indexed by Google Scholar). Therefore, we recommend you use publicly recognized data repositories, such as [Dataverse](https://dataverse.nl).

Second, you need to choose __when to make public the data__. For example, you could deposit your data set already at a publicly available repository *during the research*, but only make it *public* after an embargo period like a year, or after publication of your study. The benefit of keeping data stored at a public repository is that you have a backup copy stored at a secure location.

Finally, you need to decide under which license to publish your data. Sometimes there are restrictions as to which license you need to pick. For example, if you scraped data from Wikipedia, then the resulting data set "inherits" the license under which Wikipedia has made available their content.

## Maintaining

Especially long-term data collections benefit from rigorous workflows to maintain the data. Even single-shot data collections give rise to the opportunity of maintenance, e.g., if you see the need of revisiting your variable operationalization (e.g., remove or define new variables), or find bugs in your code (e.g., wrong merges). It's best to set up your workflow in a way so that updating is effortless. Principles of reproducible science come in quite handy: automize your data preprocessing and distribution of data for as much as possible.



{{< button relref="/preprocessing.md" >}}Previous{{< /button >}}

<!--
4.5.1	Update and maintain

a.	Common updating requirements
a.	Re-validate updates to “existing” data
b.	Add documentation for newly added data
b.	Workflow (where to inform users about an update; how to “automize” the updating procedure)


- Data packaging and distribution *prerecorded*
  - Preprocessing
  - Validation
  - Documentation
  - Distribution

-->
