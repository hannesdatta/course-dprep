% Data Preparation and Workflow Management
% [Hannes Datta](https://hannesdatta.com)

# Pipeline Automation using `make`

## Learning objectives

- Organize your project (e.g., by means of a proper directory structure)
- Automize your pipeline, and make it reproducible

::: notes

Workflow management involves various steps:
- Directory structure
- Automation
- Version control
- Documentation

Here we focus on the first two.

:::

## Motivation

- Losing sight of the project ("directory and file chaos")

- Difficulties (re)executing the project ("lack of automation")


::: notes

Show two examples:
- old PhD project (no directory structure)
  - overwriting files, changing file names, version numbers, etc.
- difficult to reexecute (no running instructions)

:::

# Organize your project

## 1. Create directories for components of a research project

Each project consists of data, source code, and generated temporary and output files. Store them separately.

```
\data
\src
\gen\temp
\gen\output
\gen\audit
\gen\input

```

::: notes

- storing them separately ensures that you can wipe gen files (or don't even have to give it to anyone)
- src makes it clear what needs to be versioned

- Important note: you do NOT modify the input files but create temporary/generated files instead

:::

## 2. Define & create pipeline stages

Think about the common steps that will be done in your project, for example:

1) Prepare dataset for analysis
2) Run model on a dataset
3) Produce tables and figures for the paper

::: notes

pipelines can vary - e.g., post-analysis; some extra ML learning, etc.

A pipeline refers to the steps that are necessary to build a project (e.g., prepare dataset, run model, produce tables and figures)

:::

# Create directories for each pipeline stage

```
\src\datapreparation
\src\analysis
\src\paper
\gen\datapreparation\temp\
\gen\datapreparation\output
\gen\analysis\temp\
\gen\analysis\output
\gen\paper\temp\
\gen\paper\output
```

::: notes

automation all starts with a proper directory structure

E.g. show students the platform power directory structure (and contents) to get a better feeling for what each of these folders represents

- all directories are self-contained, i.e., they can be run independently

- sometimes I create input folders

- They can download this folder structure as a zip file from the course website (note that: you cannot store empty folders on Git)


:::

## 3. Think about what to accomplish in each pipeline

1. Data preparation
  - Download public datasets (used for some control variables), load other data sets (e.g., from Excel)
  - Merge primary dataset with control variables and generate derivative (aggregate) datasets on a weekly and monthly level
2. Analysis
  - Estimate models on both datasets
  - Systematically compare both models
  - Choose the best model
3. Paper
  - Produce tables and figures for paper
  - Produce slide deck

## Visual Example

<img alt="Pipeline Graph" src="/images/pipeline.png">

::: notes

- Has a graph structure

- Can easily track dependencies (e.g., this needs to happen before this, etc.)

- R files are pink circles
- (Generated/downloaded) data files are orange rectangles
- Output files (e.g., images) are blue rectangles

:::

## Examples pipelines

- Platform power project
- International retail panel data

## Start writing or moving code to your pipeline

- Move existing code to pipeline stages, or write new code in pipeline stages (`src\`)

- Breaks up a monolithic make-all-the-things scripts into discrete, manageable chunks (i.e., components).
  - inputs
  - transformations
  - outputs

## Advantages of using a pipeline

1. Explicitly document the workflow, making communication with colleagues (and your future self) more efficient
2. When you modify one stage of the pipeline, you don't have to rerun the entire pipeline (e.g., save processing resources).
3. You can reproduce the entire workflow with just a single command (more about this now)

## 4. Automate your pipeline

- We use makefiles (rules, instructions for computers)
- Each rule: build a target, using prerequisites + running instructions

::: notes

- A makefile is just a plain text file called makefile (without an extension; so nothing fancy or complicated)

- Along the way we store our files in the directory structure we discussed previously

- Then Make looks at which file you have and figures out how to create the files that you want.

:::

## Using `makefiles`

Syntax:

```
targets: prerequisites
   command
   command
   command
```

::: notes
- Prerequisites are files that need to exist before the commands for the target are run (also known as dependencies)
- Commands are a series of steps used to make the targets
- This information is also accessible as code snippets on the building blocks page on the site

:::

## Example

```
gen/data-preparation/aggregated_df.csv: data/listings.csv data/reviews.csv
	Rscript src/data-preparation/clean.R
```

::: notes

For our analysis, we need to aggregate our data from two files (listings.csv and reviews.csv). The script clean.R (stored in the data preparation folder) takes care of that.

:::


## Phony targets & stitching things together

- Targets that do not produce any output
- Convention
  - `all` = call all targets
  - `clean` = remove all generated files

```
all: one two

one:
    touch one.txt
two:
    touch two.txt

clean:
    rm -f one.txt two.txt
```

::: notes

- Overview of which files are dependent on one another

- Rerunning a stage of a pipeline always produces the same results

- Often, one of the first steps in a make pipeline is downloading the data -> makes collaborating easier because you no longer have to share large files (a directory and a make file suffices)

:::


## Variables

```
INPUT_DIR = src/data-preparation
GEN_DATA = gen/data-preparation

$(GEN_DATA)/aggregated_df.csv: data/listings.csv data/reviews.csv
  $(INPUT_DIR)/clean.R
```

::: notes

Same idea as in programming language: avoiding unnecessary duplication (in this context that often refers to file paths)

Defined at the top of of the file and can cbe accessed with the `$` command

:::


## Summary

1. Create directory structure (`src`,`gen`,`data`)
2. Create pipeline stages (e.g., `datapreparation`, `analysis`)
3. Move source code to pipeline stages, or start writing new source code
4. Automate each pipeline stage

::: notes

- Document your project and raw data
- Tracking changes to your source code using versioning

We may sometimes sound a bit dogmatic (e.g., you must do this or that). Some of our instructions will only make sense to you after a while.

:::



## Any questions?

Stick around now if you have questions.

::: notes

Comment on the Airbnb practice workflow:
- Involves a blend of Python and R code -> for those students not familiar with Python follow the set-up instructions to install Python + textblob
- The purpose of the tutorial is not to turn you into a Python wizard, but rather to illustrate the value of make in a data pipeline.

- Create dependencies graph for one of your projects and put on this slide (or see Airbnb example: https://github.com/RoyKlaasseBos/tsh-website/blob/master/content/tutorials/more-tutorials/airbnb-workflow/images/dependencies.png)
- Show what happens once all files are compiled, when you remove the raw data and run make again, change the dataset for another one etc.

:::


## Contact

Thanks a lot, and have fun with the course!

Hannes Datta

https://hannesdatta.com
