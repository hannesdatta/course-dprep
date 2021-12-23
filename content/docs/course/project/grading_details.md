---
weight: 30
title: "Grading details"
bookCollapseSection: true
description: "Find out how you'll be graded - and adjust your efforts accordingly!"
draft: false
---

# Grading details

## Overview
The team project is submitted as a reproducible, end-to-end workflow on GitHub, featuring a well-structured and fully automated pipeline for data exploration & cleaning, analysis, and deployment.

Points can be obtained for three assessment criteria:

1. GitHub repository (30% of the final grade)
2. Data preparation and analysis (45% of the final grade)
3. Quality of the source code and degree of automation (25% of the final grade)

Weights for each component of the grading rubric below are indicated in brackets (e.g., 5%). In calculating your final grade, percentages are converted to grade points on a ten-point scale (e.g., 5% make up 0.5 grade points on a 10-point scale), weighted by the following percentages:

* *High proficiency* and/or exceeds expectations (grade points x 100%)
* *Adequate proficiency* (grade points x 80%)
* *Some proficiency* (grade points x 60%)
* *Insufficient proficiency* (grade points x 30%)
* *No proficiency* (grade points x 0%)


{{< hint info>}}
***Example***

*A student team has shown adequate proficiency in writing source code and automating the project. This part of the team project counts towards 25% of the team project’s final grade. In grade points, this equals 2.5 points on a 10-point scale. The points are weighted with 80% for adequate proficiency. The grade for this part of the data package equals 2.5 x 80% = 2.00.*

{{< /hint>}}


## Details

### 1. Github Repository

#### 1.1 Research motivation (10%)
The research question is clearly articulated and important. The choice for the research method (e.g., regression analysis) is motivated well. The way of deployment (e.g., PDF report, dashboard, ...) is useful and accessible to potential knowledge users, and clearly communicates the conclusions of the analysis. The automated and reproducible workflow is of potential use to other students and the larger scientific community.

#### 1.2 Repository structure and documentation (10%)  

<!--Students who wish to document data collected as part of [oDCM](https://odcm.hannesdatta.com) (Online Data Collection and Management) can extend the workflow template (e.g., by adding the documentation of the raw data, any screenshots, etc.)-->

The end-to-end workflow, kickstarted with one of the workflow templates available at [Tilburg Science Hub](https://tilburgsciencehub.com/examples/simple-reproducible-workflow/), is made *publicly available* on GitHub. The repository contains a readme.md (markdown), which clearly explains the project’s goal, and provides instructions to potential contributors/replicators on how to run the project (see details and examples on the readme below). The project has a concise and accurate name, enticing the potential user to explore the workflow. An appropriate short name for the repository’s location is chosen (e.g., `github.com/yourusername/investigating-airbnb`). Additional metadata on GitHub is provided (e.g., a short project description), so that the repository feels and looks professional and complete.

{{< hint info>}}

***Tip: Structure your `README.md`***

The README file, written in markdown (`.md`) should consist (at least) of the following sections:

```
# Short project title

__Long project title, e.g., research question__

## Motivation

Motivate your research question or business problem. Clearly explain which problem is solved.

## Method and results

First, introduce and motivate your chosen method, and explain how it contributes to solving the research question/business problem.

Second, summarize your results concisely. Make use of subheaders where appropriate.

## Repository overview

Provide an overview of the directory structure and files.

## Running instructions

Explain to potential users how to run/replicate your workflow. Touch upon, if necessary, the required input data, which (secret) credentials are required (and how to obtain them), which software tools are needed to run the workflow (including links to the installation instructions), and how to run the workflow. Make use of subheaders where appropriate.

## More resources

Point interested users to any related literature and/or documentation.

## About

Explain who has contributed to the repository. You can say it has been part of a class you've taken at Tilburg University.

```

{{< /hint>}}


#### 1.3 Breadth of contributions and way-of-working (10%)
Multiple team members have actively contributed (“committed”) to the repository, for the entire duration of the project (i.e., do not just version your files at the end, but from beginning to end). Commit messages are accompanied by concise and clear commit messages (`git log`). Students have made active use of [GitHub Issues](https://guides.github.com/features/issues/) and the [GitHub Project Board](https://docs.github.com/en/issues/organizing-your-work-with-project-boards/managing-project-boards/about-project-boards) with the "scrum"-inspired columns "backlog", and the current srpint's "to do", "in progress", and "done". Students are assigning issues to one another, and integrating new features by means of pull requests from feature branches to the main branch.

### 2. Data preparation & analysis

#### 2.1 Data exploration (10%)
All raw data files are programmatically downloaded from the internet. Meaningful RMarkdown reports for (types of) raw data/input files are created, which allow potential users of your repository to understand the content of such files, and the definition of variables. The RMarkdown reports are properly formatted, rendered as HTML or PDF files, and feature information in a variety of modes (e.g., running text, tables, or figures). The rendered Markdown files are “publication-ready” - i.e., code that is not relevant to understanding the data or warning messages is hidden.

#### 2.2 Data preparation (20%)
The raw data has been prepared and cleaned, using a variety of common data operations in R, involving `dplyr`, `tidyverse`, or `data.table`. Common operations are merging, aggregating, de-deduplication, reshaping, converting dates, or using regular expressions. Basic programming concepts are made use of appropriately to increase speed and minimize errors (e.g., looping, vectorization, writing functions, handling errors/debugging). Additional variables are created from the raw data (feature engineering).

#### 2.3 Analysis and deployment (15%)
The analysis constitutes a substantial enrichment to the raw data. By using building blocks from the course site, for example, students can conduct regression analysis on the data. Other ways of enriching the data (e.g., text analysis using `textblob`, or any other material from the web) can also be incorporated. Results of the analysis are deployed/unlocked, either in the form of a “publication-ready” PDF document (think of it as a manuscript), or in the form of other ways of knowledge dissemination (e.g., an R package with an algorithm, or a Shiny app, see building blocks on the course site). The way of deployment is well aligned with the goal of the project.

### 3. Source code and automation

#### 3.1 Source code quality (15%)
The source code is clearly readable (e.g., variable names that are meaningful), self-documenting, and well-structured (e.g., headers, sections). The directory structure clearly reflects the pipeline stages (e.g., data-preparation, analysis, paper/app) of the project, and subdirectories for data components (e.g., `gen`, `src`, `data`, and `temp`, `input`, `audit`, `output`) have been used correctly. The code runs in a linear fashion (top to bottom execution, without errors), and adheres to the DRY principles (for-loops and functions).

#### 3.2 Degree of automation (10%)
Code chunks follow the input-transformation-output (“modular”) structure, and are “stitched” together in a makefile that runs the entire project pipeline automatically after issuing the `make` command in the root of the repository. All file paths are specified relative to the current script, no absolute paths are used. The repository only tracks the version of files that need to be tracked (i.e., source code), and not others (e.g., generated files).

{{< hint info>}}
__Conduct these "housekeeping" checks before the deadline!__

Ever considered your project may work exclusively on your computer, but not on somebody else's? It could just be you forgot to tell your users to install a particular package!

To avoid such common "replication traps", please check out your repository on somebody else's computer, go through the installation instructions, and try to run the entire project.

More valuable tips and tricks for submitting a clean & working repository are [documented in our checklist for "housekeeping"](https://tilburgsciencehub.com/audit/workflow-checklist).

{{< /hint >}}
