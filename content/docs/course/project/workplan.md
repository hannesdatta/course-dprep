---
weight: 5
title: "Workplan"
bookCollapseSection: true
description: " "
draft: false
---

# Work plan

## Deliverables

The deliverable of the team project is an *end-to-end, fully automized workflow*:
- it should download the (raw) data directly from its source,
- explore the raw data files with RMarkdown documents rendered as PDF or HTML files,
- transform and reshape the data into the right format, and
- address a research question and/or business problem using some of the building blocks (e.g., regression, apps, "deployment").

## Milestones

To help you structure the assignment and make sure you finish in time, we have introduced a set of milestones and guidelines. Each week there is an optional feedback session that you can use to gather feedback on your preliminary work.

| Week | Pipeline Stage | Feedback on
|:---- | :---- | :---- |
| 6 | Data preparation  | Data exploration, storing data remotely & retrieving it, version control with Git |
| 7 | Analysis | Data preparation & analysis, automation with `make` |
| 8 | Deployment | Analysis, reporting |

### Weeks 2-4

- Reach out one another to form teams
- We'll reserve some time in the live streams to talk about potential projects and research/business ideas

### Week 5

- Finalize teams (registration on Canvas)

### Week 6: Feedback on data preparation and versioning

- Prepare data sets and start versioning your files
- Define research question and scope
- Set-up directory structure (`data`, `gen`, `src`) and plan pipeline
- Download the data directly from the source
- Start versioning your files and collaborating on GitHub

### Week 7: Feedback on workflow automation and data exploration
- Run R files from the command line
- Define all scripts strictly as ITO scripts
- Transformation / clean data
<!--  - Import data from `data` folder
  - Convert the date column into date/time format
  - Merge datasets on a comon column
  - Filter for rows that satisfy selection criteria
  - Group records on a categorical or date field and reshape data
  - Export output to generated files
-->
- Test make file
- Point of discussion with coach: does your project reproduce when deleting temp files?

### Week 8: Feedback on deployment and reporting

- Choose how to deploy your insights, e.g., by means of regression analysis, or even by writing an app.
- Necessary components (e.g., for inspiration on how to write an app) are available in the building blocks section of the course site.

<!--- Import data from `gen` folder
- Plot timeseries chart and export as pdf file
- Automate workflow with make
- Discuss results, conclusions, and limitations
- Create a data report and conduct exploratory analysis (summary statistics, report on missingness, number of observations)
-->
