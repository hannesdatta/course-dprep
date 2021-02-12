---
weight: 60
title: Workflow management
description: Setting up a project on own computer
bookCollapseSection: true
draft: true
---

# Tutorial: Setting up project on own computer

## Getting started
When starting a new project, you don't need to reinvent the wheel but can rely on proven workflow methodologies. This not only saves you time, but also helps you to stay consistent and stick to best-practices. Here we go over each of the steps required to set up a project on your computer. 


### 1. Assess project requirements

Before we dive right into the nitty gritty, here are a couple of pointers you should take into consideration before you start any project: 

  * *Joint collaboration*
    - How many people will be involved in your project? With more than a few collaborators a version control system like Git is a must because you want to be able to work on the project simultaneously without running the risk of overwriting each other's work.


  * *Technical proficiency*
    - Are you co-workers familiar with tools like Git, make, and the terminal? In other words, can they independently set-up their machine and install required dependencies? And what high-level programming languages do they know (Python / R)? 

    
  * *Security-level*
    - Are you working on a data consultancy project for a Fortune 500 client? Have you signed a NDA for the data that requires you to treat it with a great sense of responsibility? If so, then you better make sure that you have configured your systems securely (e.g., private Github repositories, 2 factor authentication, etc.). 
    

  * *Data Volume*
    - Can the raw data be managed in a cloud storage service like Dropbox or Google Drive, or does the sheer amount of data requires us to look for alternatives (e.g., database storage).


  * *Run Time*
    - While importing a dataset and running a bunch of regression models typically happens with a matter of seconds, you may encounter circumstances in which you need to factor in the run time. For example, if you throttle API calls, experiment with a variety of hyperparameters, run a process repeatedly (e.g., web scraping). In these cases, the hardware of your machine may not suffice nor do you want to keep your machine running all day long. Creating a virtual instance (e.g., EC2) adjusted to your specific needs can overcome these hurdles. 


  * *Public Availability*
    - If you advocate for open science and strive for reproducibility, open sourcing your data and code online is almost a given. This in turn means you need to put in the extra effort to write comprehensive documentation and running instructions so that others - who may lack some prior knowledge - can still make sense of your repository.

          
  Together, these considerations can guide your decisionmaking in terms of (a) code versioning, (b) raw data storage, and (c) computation (local vs remote).


### 2. Set up computing environment

* *Programming Language & Environment*
  - [Install Python & Jupyter Notebook](https://tilburgsciencehub.com/building-blocks/configure-your-computer/statistics-and-computation/python/)
  - [Install R and RStudio](https://tilburgsciencehub.com/building-blocks/configure-your-computer/statistics-and-computation/r/)


* *Version control*
  - [Install Git and Github](https://tilburgsciencehub.com/building-blocks/configure-your-computer/statistics-and-computation/git/)
  

* *Automation*
  - [Install make](https://tilburgsciencehub.com/building-blocks/configure-your-computer/automation-and-workflows/make/)


### 3.  Set-up repository
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
  7. (Optional): invite your team mates to contribute to the repository. 
  

### 4. Set-up data environment
  1. Put your data file in Google Drive or Dropbox and generate a public sharing link.
  2. Create a [script](../../building-blocks/automation/download-data.md) in the `src` folder that downloads the data from your cloud storage (or external website) and stores it in the `data` folder. 
  
### 5. Continue working on your project
  - [Inspect raw data after data delivery](../../tutorials/data-exploration-in-R)
    - Data exploration
    - Write a R Markdown file with a summary of the data
      - Summary statistics
      - Report on missingness
      - Number of observations
      - Interesting relationships
  - [Prepare data for analysis](../../tutorials/data-preparation) (input, transformation, output)
  - Pull in changes from Github (and push your own changes to the remote)
  - Documentation
    - Update README.md file 
    - [Document data sets](https://tilburgsciencehub.com/tutorials/project-setup/principles-of-project-setup-and-workflow-management/documenting-data/)
    - [Document source code](https://tilburgsciencehub.com/tutorials/project-setup/principles-of-project-setup-and-workflow-management/documenting-code/)


### 6. Automate your workflows 
  - Create a [makefile](../../building-blocks/automation/make-commands.md) that handles the end-to-end process (e.g., download data, preprocess data, estimate linear model, generate regression tabel and plot).


