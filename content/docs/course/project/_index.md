---
weight: 3
title: "Team Project"
bookCollapseSection: true
description: " "
---

# Team Project

## Motivation

...

## Tasks


#### 1. Research Context

Pick a [research context](researchcontext.md) and find a website or API you would like to collect data from. Explain why performing this research can be of additional value to managers (e.g. the (social media) manager of the event or a digital advertising company). Provide clear managerial implications and back up your arguments with facts and figures.

#### 2. Data Collection

In this part of the assignment, you will use either an API or website to gather the data for your team project. Revisit the code snippets of the tutorials and see whether you can make them work for your chosen research context. Think about whether you collect a "snapshot" in time (statically) or whether your problem is better suited for a more dynamic approach (e.g., collecting data every other day). Keep in mind that that the underlying HTML or API structure may change over time, so always check whether your scraper works as expected. We recommend first making a test run prior to starting your actual data collection. Moreover, you may consider doing the data collection on two computers concurrently to prevent data loss.

#### 3. Data Transformation

In this part of the assignment you have to take a close look at the  data you collected. For APIs you may want to use a [JSON viewer](jsonviewer.stack.hu) to visualize the tree structure of a JSON object. Select which elements of you have to parse, but do not overcomplicate it (stick to the goal of your research!).

Even though we do not ask you to analyze the data in this course, the outcome of the data transformation step should be a data frame that is ready for analysis. Thus, depending on your research question, you may need to clean up the data (e.g., remove trailing and leading spaces), convert the data type (e.g., date time), derive features (e.g., length of the text), or aggregate numeric data (e.g., mean or sum).

Pursue to hand in a high-quality Notebook (e.g.: have a clear structure, annotate it using Markdown cells, try to formulate every command well and make sure it contributes to the actual outcome – your parsed data). Aim to make your script free of mistakes, so that it directly runs on our computers, too. Use efficient error handlings (i.e,. don’t wrap everything in a big try/except), and clearly name your input and output files.



## Deadline and submission
- 22nd of March 2021, 9AM
- Submission via [email](mailto:h.datta@tilburguniversity.edu) to course coordinator (one email per team).

## Deliverables
- Please send one email per team to the course coordinator, containing
  - Link to published data at [DataverseNL](https://dataverse.nl)
  - Documentation, attached as a PDF file

## Schedule

- Week 1: Seek inspiration for data sources (individually)
- Week 2: Share data sources with the whole group; based upon common interest, form teams
          - Conduct your own data availability assessment using a template with your team.
- Week 3-4: Start working as a team
    - ...
    - ...
- Week 5-6:
  - ...
  - ...
- Week 7:
  - Publish your raw and cleaned datasets on [DataverseNL](https://dataverse.nl)


<!--
o	Pursue to hand in a high-quality code (e.g., have a clear structure, annotate it using Markdown cells, try to formulate every command well, and make sure it contributes to the actual outcome – your parsed data). Aim to make your script free of mistakes, so that it directly runs on our computers, too. Use efficient error handlings (i.e., don’t wrap everything in a big try/except), and name your input and output files. We have made available coding tips on http://tilburgsciencehub.com/tips/coding/.
o	We invite you to share snippets of your parsing scripts via Gists on GitHub with other teams. You can post URLs to these Gists for others to view/use/reuse on Canvas.
-->
