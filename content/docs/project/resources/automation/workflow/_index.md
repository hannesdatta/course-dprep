---
weight: 60
title: Starting up a new empirical research project on your local computer
description: Start working on a new project, using the principles of workflow management and reproducible science
bookCollapseSection: true
draft: true
---

# Starting up a new empirical research project on your local computer

## Getting started

When working on a new project, it's efficient to kick-start your work with a well-documented "repository template" that sets up your workflow, and provides you with some minimal documentation so that team members can quickly contribute to your work.

In this tutorial, we walk you through the steps of setting up a project on your computer. Throughout, you'll use one of our project templates on GitHub.


## The 5-step plan

### 1. Assess project requirements

Before we dive right into the nitty gritty details, here are a couple of things to consider when you set up new projects.

* Will you collaborate with others on writing code?

  If you do, using a version control system like Git is a must-have, as you need to be able to work on a project simultaneously, without running the risk of overwriting each other's work.

* What's the technical proficiency of your team members?

  It's not uncommon that your team members may be unfamiliar with tools like Git, make, or the terminal. First, that's not a problem at all. You can stay in charge of the main workflow, and integrate others' work as it is being updated (e.g., on Dropbox). However, it's way better to help team members develop the skills to use Git and automation, just to name a few.

<!--This workflow assumes some experience with

  * *Technical proficiency*
    - Are you co-workers familiar with tools like Git, make, and the terminal? In other words, can they independently set-up their machine and install required dependencies? And what high-level programming languages do they know (Python / R)?

   integrate those somehow
-->

* What minimum security levels do you have to ensure? Can you make your code public?

  Are you working on a data consultancy project for a Fortune 500 client? Have you signed a NDA for the data that requires you to treat it with a great sense of responsibility? If so, then you better make sure that you have configured your systems securely (e.g., private Github repositories, 2-factor authentication, etc.).

* How will you manage your data?

  Can the raw data be managed in a cloud storage service like Dropbox or Google Drive, or does the sheer amount of data requires us to look for alternatives (e.g., database storage).

* How long will the workflow run?

  While importing a dataset and running a bunch of regression models typically happens with a matter of seconds, you may encounter circumstances in which you need to factor in the run time. For example, if you throttle API calls, experiment with a variety of hyperparameters, run a process repeatedly (e.g., web scraping). In these cases, the hardware of your machine may not suffice nor do you want to keep your machine running all day long. Creating a virtual instance (e.g., EC2) adjusted to your specific needs can overcome these hurdles.

<!--

  * *Public Availability*
    - If you advocate for open science and strive for reproducibility, open sourcing your data and code online is almost a given. This in turn means you need to put in the extra effort to write comprehensive documentation and running instructions so that others - who may lack some prior knowledge - can still make sense of your repository.

-->
Together, these considerations can guide your decision making in terms of (a) code versioning, (b) raw data storage, and (c) computation (local vs remote).

### 2. Set up computing environment

* *Programming Language & Environment*
  - [Install Python & Jupyter Notebook](https://tilburgsciencehub.com/building-blocks/configure-your-computer/statistics-and-computation/python/)
  - [Install R and RStudio](https://tilburgsciencehub.com/building-blocks/configure-your-computer/statistics-and-computation/r/)

* *Version control*
  - [Install Git and Github](https://tilburgsciencehub.com/building-blocks/configure-your-computer/statistics-and-computation/git/)

* *Automation*
  - [Install make](https://tilburgsciencehub.com/building-blocks/configure-your-computer/automation-and-workflows/make/)

### 3.  Setup the repository

  1. Initalize a [new Github](../version-control/version-control.html)  repository (section 1.3) and clone it to your local machine.
     * Based on your project requirements (section 1), consider whether you need a public or private repository.
  2. Download [this](./directory_structure.zip) directory structure.

```txt
├── README.md
├── data
├── gen
│   ├── analysis
|   ├── data-preparation
|   └── paper
└── src
    ├── analysis
    ├── data-preparation
    └── paper
```

  3. Update the README.md file (e.g., add a project description and title)
  4. [Commit your changes](../../building-blocks/automation/git/) and push them to Github.
  5. Create a gitignore file (`touch .gitignore`) that skips the `data` and `gen` folder (after all, your code in the `src` folder should download the data and store the intermediate results in `gen`).
  6. Visit your repository on Github and check whether it works as expected. Please keep in mind that only folders that contain files will be visible (i.e., empty folders are ignored by Git). Once you start working on your project and create new files these folders will automatically become visible.
  7. Invite your team members to contribute to the repository!


### 4. Setup the data environment
  1. Put your data file in Google Drive or Dropbox and generate a public sharing link.
  2. Create a [script](../../building-blocks/automation/download-data.md) in the `src` folder that downloads the data from your cloud storage (or external website) and stores it in the `data` folder.

### 5. Automate your pipeline
- Create a [makefile](../../building-blocks/automation/make-commands.md) that handles the end-to-end process (e.g., download data, preprocess data, estimate linear model, generate regression table and plot).
- Start automating your project early on - even if it's just downloading the data and producing a little overview of the data. Expand your `makefile` while you're working on the project.

{{< hint info >}}

__What's next? Continue working on your project!__

Think you're done? No way! This is just the start of your reproducible research project. So take some time to go through our suggestions on how to continue your work on the project.

- [Inspect raw data after data delivery](/docs/tutorials/data-exploration-in-r)
  - Write an RMarkdown file, exploring your raw data (e.g., with summary statistics, reporting on missingness, number of observations, interesting relationships, etc.)
- [Prepare data for analysis](docs/tutorials/data-preparation), and [document the resulting dataset](https://tilburgsciencehub.com/tutorials/project-setup/principles-of-project-setup-and-workflow-management/documenting-data/)
- Pull in changes from GitHub (and push your own changes to the remote)
- Create issues, and assign team members to these issues
- Work on your repository's readme - the *first* thing users of your repository will view when visiting it on GitHub

<!--
  - [Document your data sets]
  - [Document your source code](https://tilburgsciencehub.com/tutorials/project-setup/principles-of-project-setup-and-workflow-management/documenting-code/)
-->

{{< /hint >}}
