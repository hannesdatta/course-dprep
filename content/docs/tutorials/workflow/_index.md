---
draft: true
title: workflow
---

# Tutorial: Setting up project on own computer

## Motivation

- when starting a new project, don't start from scratch
- Here: simple project with code on Git, and raw data on Google Drive or Dropbox.

## Workflow

### 1. Assess proejct requirements

- take into consideration needs of project
  - Number of collaborators (technical ability) --> setup cloud environment FOR them
  - Do people jointly collaborate on code?
  - Security-level
  - Need for sharing during or after the project
  - Where do people collaborate (e.g., Dropbox)
  - To be developed publicly?

  --> make decisions on (a) code versioning, (b) raw data storage, (c) computation (local vs remote)

### 2. Setup computing environment
  - Install Anaconda
  - Install R and RStudio
  - Install make

(link to building blocks)  

### 3.  Set up code base
  - Choose a template
  - Clone locally
  - Update the readme with your project title
  - Choose directory structure (copy from examples)
  - Commit

*Buildling blocks:*
- project template
- prototypical directory structure to copy-paste/generate?!

### 4. Set up data environment
  - put data to secure location ("data independence")
  - test whether you can load data locally

*Required building block:*
  - put data to Drive, get sharing link, have code snippets in R, Python to download data to local computer
  - put data on Dropbox, get sharing link, have code snippets in R and Python to download data to local computer

### 5. Write your first workflow
  - download raw data into the data folder
  - write script that opens raw data

### 6. Continue working on your project
  - Further customize pipeline stages
  - Inspect raw data after data delivery
  - Automate your pipeline
  - Prepare data for analysis
  - Documenting derived data
