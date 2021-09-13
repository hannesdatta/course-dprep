---
title: Live Stream Activity
draft: false
---

# Live Stream Activity

## Overview

- Type: Breakout activity
<!--with 4-6 students<!--, *or* guided "look over the shoulders of Hannes" session-->
<!--- Duration: 25 minutes
<!--- Goals
  - Understand the process of input-transformation-output
  - Apply process in an R script
-->

## Getting started

1. Download the code of the "Example of a reproducible research workflow", available at https://github.com/rgreminger/example-make-workflow
2. Unzip the code, open a terminal/command prompt in the folder, and run the workflow by typing `make`

## Task

If everything works ("Nothing to be done for `make`"), start extending the workflow with the [building blocks on automation](../../building-blocks/automation/)

- write a script that downloads datasets [for your team project](../../course/project). Use the [AirBnB data](http://insideairbnb.com/get-the-data.html), in particular `listings.csv` and `reviews.csv`
- add the script to the `makefile`, and run `make`
- add a RMarkdown document, which (roughly) inspects the CSV files. Don't spend much time on the exploration code here - the purpose is for you to get starting using `make`!
- Throughout, keep on running `make` to verify your project is (still) working as expected.
