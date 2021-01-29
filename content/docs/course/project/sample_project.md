---
weight: 4
title: "Instructions"
bookCollapseSection: true
description: " "
draft: true
---

<!-- @Roy: work on this in a "hidden" state; it should be the instructions that we make available eventually to students-->

# Instructions for Team Project

## Inside AirBnB (introduction)

This project draws on datasets from Inside Airbnb which is an independent open-source data tool developed by community activist Murray Cox who aims to shed light on how Airbnb is being used and affecting neighborhoods in large cities. The tool provides a visual overview of the amount. availability, and spread of rooms across a city, an approximation of the number of bookings and occupancy rate, and the number of listings per host.

## Workplan

### Week 6: Prepare data sets and start versioning your files

<!-- revise-->

- Set-up directory structure (`data`, `gen`, `src`)
- Define research question and scope
- Create a data report and conduct exploratory analysis (summary statistics, report on missingness, number of observations)
- Download the data directly from the source
- Run R files from the command line

### Week 7: Automate workflow and explore data


#### Transformation
- Import data from `data` folder
- Convert the date column into date/time format
- Merge datasets on a comon column
- Filter for rows that satisfy selection criteria
- Group records on a categorical or date field and reshape data
- Export output to generated files


#### Output
- Import data from `gen` folder
- Plot timeseries chart and export as pdf file
- Automate workflow with make
- Discuss results, conclusions, and limitations
--> book

### Week 8: Introduce Deployment and reporting, final touch



The overarching research question that we aim to investigate is:
<!--@ roy: more Qs?-->

- How did the Airbnb market in Amsterdam respond to the COVID-19 pandemic in terms of bookings per neighborhood?
- ...
- ...




<!-- workflow tutorial image and output files have not been added to the master branch because of file size -->

You can [view](XXX) the report over here and dowload the project directory (including all R files) from [here](XXX). In the report, 3 sections can be distinguished: Input, Transformation, and Output of which we'll mention the contents below.
