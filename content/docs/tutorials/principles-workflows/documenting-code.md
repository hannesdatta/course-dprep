---
title: "Documenting Source Code and Pipeline Workflows"
date: 2020-11-11T22:01:14+05:30
draft: false
weight: 50
---

## Overview

Documenting your project's *workflow*, not only for others, but also for your future self (i.e., if you plan to continue working on the project
after a while) is **absolutely crucial** to the long-term success of you as a researcher or analyst.

Typically, you would like to

- include a main project documentation, and
- one documentation each for each [stage of your pipeline](pipeline.md).

## Main Project Documentation

You should place a main project documentation in the root directory of your project (`/my_project`),
and call it `readme.txt`. Keep the document *brief and simple*, but include at
least the following information:

* Project name
* Details about the project
	* Project description ("what does the project do?")
	* Authors and email addresses
	* Date of last update
* Build instructions
	* Dependencies ("what software is needed to replicate the project?")
	* Explaining the [directory structure](directories.md) ("where to find what?")
	* How to run/build the project

Here is an example documentation you can use as a template:


```
===================================================================
PROJECT NAME
===================================================================

DESCRIPTION:
------------
Put project description here. You can use multiple lines, but keep
the width of the text limited to the
header.

AUTHORS:
--------
Hannes Datta, h.datta@tilburguniversity.edu (maintainer)

LAST UPDATED:
-------------
29 NOVEMBER 2019


BUILD INSTRUCTIONS
==================

1) Dependencies

Please follow the installation guide on
http://www.tilburgsciencehub.com/setup for

- R and RStudio (3.6.x)
  Install the following R packages:

	packages <- c("data.table", "ggplot2")

	install.packages(packages)

- Gnu Make
  Put GnuMake and R to path so that you can run it
  from anywhere on your system. See http://www.tilburgsciencehub.com/

- Obtain raw data files and put them into /data/

2) Directory structure

The project pipeline consists of the following stages:

/src/collect                Code required to collect/download raw data
/src/data-preparation       Data preparation
/src/analysis               Data analysis
/src/paper                  Stores literature reference, paper, and slides

Each directory has a makefile, with running descriptions
for each stage of the pipeline.

For each pipeline stage, the /gen directory contains
files generated on the basis of the /data and
source code stored in /src.

Each directory contains subdirectories,
	/input (for input files)
	/output (for final output files)
	/temp (for any temporary files)
	/audit (for any auditing files)

3) How to run the project

Navigate to the project's root directory, open a terminal,
and run

> make

```

## Documentation for each stage of the pipeline

Ideally, a `makefile` lists all the necessary steps to
run your pipeline. If you do not have a `makefile` yet, include
a `readme.txt` instead.

Here is a `readme.txt` template to start from:

```
OVERVIEW
====================================================
- Provide a two or three sentence overview of the directory.

DESCRIPTION
==========================================================
- If you are using a makefile (strongly recommended!),
  please refer to the content of that file for running instructions.

- If you do not make use of a makefile, please briefly describe
  the contents of the subdirectory and its files.
  Also provide instructions how to run the files, and in which order.

```
