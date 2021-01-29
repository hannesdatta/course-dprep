---
weight: 4
title: "Instructions"
bookCollapseSection: true
description: " "
draft: true
---

<!-- @Roy: work on this in a "hidden" state; it should be the instructions that we make available eventually to students-->

# Instructions for Team Project

## Inside AirBnB

The team project draws on datasets from [Inside Airbnb](http://insideairbnb.com/amsterdam/) which is an independent open-source data tool developed by community activist Murray Cox who aims to shed light on how Airbnb is being used and affecting neighborhoods in large cities. The tool provides a visual overview of the amount, availability, and spread of rooms across a city, as well as an approximation of the number of bookings and occupancy rate.

This data set allows for a variety of research questions such as:
- How did the Airbnb market in Amsterdam respond to the COVID-19 pandemic in terms of bookings per neighborhood?
- What percentage of hosts violates the 30 day per year [rule](https://www.airbnb.com/help/article/860/amsterdam) imposed by the municipality of Amsterdam? What characterizes these accounts?
- How did the Airbnb market expand geographically? Which neighborhoods are upcoming, and which ones have been popular from the start?
- Do professional hosts (i.e., accounts with multiple listings) charge higher prices on average? What is their estimated income per month?
- What are the most popular cities Airbnb cities across Europe? Are those cities also the most expensive cities? Where can you go on vacation and get *good value for money*?
- How do market prices respond to changes in supply and demand? What's the typical price mark-up during the holiday periods?

<!--
You can [view](XXX) the report over here and dowload the project directory (including all R files) from [here](XXX). In the report, 3 sections can be distinguished: X, Y, and Z of which we'll mention the contents below. -->

## Potential questions

The overarching research question that we aim to investigate is:
<!--@ roy: more Qs?-->

- How did the Airbnb market in Amsterdam respond to the COVID-19 pandemic in terms of bookings per neighborhood?
- ...Supply of housing
- Housing prices over time
- Booking availability

## Workplan

The deliverable of the assignment is an end-to-end workflow: it should download the data directly from the source, transform and reshape the data into the right format, and convert it into a format that addresses the research question at hand. To help you structure the assignment and make sure you finish in time, we have introduced a set of milestones and guidelines. Each week there is an optional feedback session that you can use to gather feedback of your preliminary work.

### Week 6: Prepare data sets and start versioning your files
- Set-up directory structure (`data`, `gen`, `src`)
- Define research question and scope
- Set-up directory structure (`data`, `gen`, `src`) and plan pipeline
- Download the data directly from the source
- Versioning [...]

### Week 7: Automate workflow and explore data
- Run R files from the command line
- Define all scripts scrictly as ITO scripts
- Test make file
- Point of discussion with advisor: does your project reproduce when deleting temp files?

- Transformation steps
  - Import data from `data` folder
  - Convert the date column into date/time format
  - Merge datasets on a comon column
  - Filter for rows that satisfy selection criteria
  - Group records on a categorical or date field and reshape data
  - Export output to generated files


### Week 8: Introduce Deployment and reporting
- Import data from `gen` folder
- Plot timeseries chart and export as pdf file
- Automate workflow with make
- Discuss results, conclusions, and limitations
- Create a data report and conduct exploratory analysis (summary statistics, report on missingness, number of observations)




<!-- workflow tutorial image and output files have not been added to the master branch because of file size -->

<!-- You can [view](XXX) the report over here and dowload the project directory (including all R files) from [here](XXX). In the report, 3 sections can be distinguished: Input, Transformation, and Output of which we'll mention the contents below.
 -->
