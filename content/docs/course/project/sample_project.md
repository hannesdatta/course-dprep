---
weight: 4
title: "Sample Project"
bookCollapseSection: true
description: " "
draft: false
---

# Sample Project

This project draws on datasets from Inside Airbnb which is an independent open-source data tool developed by community activist Murray Cox who aims to shed light on how Airbnb is being used and affecting neighborhoods in large cities. The tool provides a visual overview of the amount. availability, and spread of rooms across a city, an approximation of the number of bookings and occupancy rate, and the number of listings per host.

The overarching research question that we aim to investigate is:
*How did the Airbnb market in Amsterdam respond to the COVID-19 pandemic in terms of bookings per neighborhood?*

<!-- workflow tutorial image and output files have not been added to the master branch because of file size -->

You can [view](XXX) the report over here and dowload the project directory (including all R files) from [here](XXX). In the report, 3 sections can be distinguished: Input, Transformation, and Output of which we'll mention the contents below.


## Input
- Set-up directory structure (`data`, `gen`, `src`)
- Define research question and scope
- Create a data report and conduct exploratory analysis (summary statistics, report on missingness, number of observations)
- Download the data directly from the source
- Run R files from the command line


## Transformation
- Import data from `data` folder
- Convert the date column into date/time format
- Merge datasets on a comon column
- Filter for rows that satisfy selection criteria
- Group records on a categorical or date field and reshape data
- Export output to generated files


## Output
- Import data from `gen` folder
- Plot timeseries chart and export as pdf file
- Automate workflow with make
- Discuss results, conclusions, and limitations
