---
weight: 10
title: "Grading details"
bookCollapseSection: true
description: " "
draft: true
---

# Grading details

## Overview
The team project is submitted as a reproducible, end-to-end workflow on GitHub, featuring a well-structured and fully automated pipeline for data exploration & cleaning, analysis, and deployment. 

Please use the workflow templates available at [Tilburg Science Hub](https://tilburgsciencehub.com/examples/simple-reproducible-workflow/) to kickstart your project. Students who wish to document data collected as part of [oDCM](https://odcm.hannesdatta.com) (Online Data Collection and Management) can extend the workflow template (e.g., by adding the documentation of the raw data, any screenshots, etc.)

1. Github repository (30% of the final grade)
2. Data preparation and analysis (45% of the final grade)
3. Quality of the source code and automation (25% of the final grade)

## Calculation of team grades
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

### **1. Github Repository**

#### Research Motivation (10%)
The research question/business problem is clearly articulated and important. The choice for the research method (e.g., regression analysis), and way of deployment (e.g., a PDF report, a dashboard) is motivated well. The workflow is of potential use to other students and the scientific community.

#### Repository structure and documentation (10%)  
The end-to-end workflow is made publicly available on GitHub. The repository contains a README.md file, which clearly explains the project’s goal, and provides instructions to potential contributors/replicators on how to run the project (see details and examples on the readme below). The project has a concise and accurate name, enticing the potential user to explore the workflow. An appropriate short name for the repository’s location is chosen (e.g., `github.com/yourusername/investigating-airbnb`). Additional metadata on GitHub is provided (e.g., a short project description), so that the repository feels and looks professional and complete.

{{< hint info>}}
***Tip: structure README.md***

The README file should consist (at least) of the following sections:
1. Title for the project (and corresponding short title as the GitHub repository name)
2. Motivation (e.g., research motivation, explanation of problem that is solved)
3. Overview of the directory structure and files
4. How to run the workflow  
   - Obtaining (secret) credentials/links to raw data?  
   - Which software tools are needed and how can they be installed (with links)?
   - How to run the workflow?  
5. List of any related literature and/or documentation*

{{< /hint>}}


#### Breadth of contributions and way-of-working (10%)
Multiple team members have actively contributed (“committed”) to the repository, for the duration of the project (i.e., do not just version your files at the end, but from beginning to end). Commit messages are accompanied by concise and clear commit messages. Students have made active use of the issue feature on GitHub, assigning tasks to one another, and integrating new features by means of pull requests from feature branches to the main branch. 

---

### **2. Data preparation & analysis**

#### Data exploration (10%)
All raw data files are programmatically downloaded from the internet. Meaningful RMarkdown reports for (types of) raw data/input files are created, which allow potential users of your repository to understand the content of such files, and the definition of variables. The RMarkdown reports are properly formatted, rendered as HTML or PDF files, and feature information in a variety of modes (e.g., running text, tables, or figures). The rendered Markdown files are “publication-ready” - i.e., code that is not relevant to understanding the data or warning messages is hidden.

#### Data preparation (20%)
The raw data has been prepared and cleaned, using a variety of common data operations in R, involving dplyr, tidyverse, or data.table. Common operations are merging, aggregating, de-deduplication, reshaping, converting dates, or using regular expressions. Basic programming concepts are made use of appropriately to increase speed and minimize errors (e.g., looping, vectorization, writing functions, handling errors/debugging). Additional variables are created from the raw data (feature engineering).

#### Analysis and deployment (15%) 
The analysis constitutes a substantial enrichment to the raw data. By using building blocks from the course site, for example, students can conduct regression analysis on the data. Other ways of enriching the data (e.g., text analysis using textblob, or any other material from the web) can also be incorporated. Results of the analysis are deployed/unlocked, either in the form of a “publication-ready” PDF document (think of it as a manuscript), or in the form of other ways of knowledge dissemination (e.g., an R package with an algorithm, or a Shiny app, see building blocks on the course site). The way of deployment is well aligned with the goal of the project.

---

### **3. Quality of source code and automation**
#### Source code quality (15%)
The source code is clearly readable (e.g., variable names that are meaningful), self-documenting, and well-structured (e.g., headers, sections). The directory structure clearly reflects the pipeline stages of the project, and subdirectories (e.g., `gen`, `src`, `data`) have been used correctly. The code runs in a linear fashion (top to bottom execution, without errors), and adheres to the DRY principles (for-loops and functions). 

#### Automation (10%)
Code chunks follow the input-transformation-output (“modular”) structure, and are “stitched” together in a makefile that runs the entire project pipeline automatically. All file paths are specified relative to the current script, no absolute paths are used. The repository only tracks the version of files that need to be tracked (i.e., source code), and not others (e.g., generated files). 


