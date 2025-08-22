% Data Preparation and Workflow Management
% [Hannes Datta](https://hannesdatta.com)

# Pipeline Automation using `make`

## Motivation & learning objectives

- Directory and file chaos, can't find my work
  - Let's __organize__ files and directories

- Difficulties (re)executing the project
  - Let's define a project pipeline, and __automate__ it fully

::: notes

Workflow management involves various steps:
- Directory structure
- Automation
- Version control
- Documentation

There are other important areas that help you to efficiently work on projects, in particular version control and documentation. But - these steps are not covered here.


Show two examples:
- old PhD project (no directory structure)
  - overwriting files, changing file names, version numbers, etc.
- difficult to reexecute (no running instructions)

:::

## Disclaimer

>- this is just *one* way to set up a project (many alternative directory structures and build tools exist)
- project setup varies with project characteristics (e.g., degree of collaboration, necessity to run code on multiple machines)
- here: chosen a relatively simple setup on a local computer
- start *doing* it

# How to organize your project?

## 1. Create project folder & structure

Each project consists of data, source code, and generated temporary and output files. Store them separately.

```
\data         <- your raw data, unmodified
\src          <- any source code
\gen\temp     <- any files that are not really needed later
\gen\output   <- any "final" files produced
\gen\audit    <- any files that allow you
                 to "check" your work

```

::: notes

- storing them separately ensures that you can wipe gen files (or don't even have to give it to anyone)
- src makes it clear what needs to be versioned

- Important note: you do NOT modify the input files but create temporary/generated files instead

:::

## 2. Define & create pipeline stages

Think about the common steps that will be done in your project, for example:

1) __Prepare__ dataset for analysis
2) __Analyze__ dataset using a statistical model
3) Produce __paper__

::: notes

A pipeline refers to the steps that are necessary to build a project (e.g., prepare dataset, run model, produce tables and figures)

Pipelines stages can vary - e.g.,
- post-analysis;
- some auxilary algorithm

Pipeline stages create structure, but later will also allow team members to work independently on some parts. Even think about outsourcing one entire pipeline stage to a developer trained in machine learning models! May help you work together.

:::

## Create directories for each pipeline stage

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

## 3. Plan each pipeline stage

- In each stage of the pipeline, __multiple source code files__ will "produce" an output
- Output varies per pipeline stage
  - e.g., dataset, analysis, PDF report, launch of an App, populating a dashboard

::: notes

next: some examples


:::

## Example: Data preparation

>- Download public datasets (used for some control variables),
- Load other data sets from various sources (e.g., from Excel)
- Merge primary dataset with control variables
- Generate derivative (aggregate) datasets on a weekly and monthly level
- Save final datasets
- Audit data using RMarkdown

## Example: Analysis

>- Load final datasets from previous pipeline stage
- Estimate models on both datasets
- Systematically compare both models
- Choose the best model, and save it

## Example: Paper

>- Load final analysis results from previous pipeline stage
- Produce tables and figures for paper
- Produce slide deck

## Visualization (of a different example)

<img width="600" alt="Pipeline Graph" src="pipeline.png">

::: notes

- Pipeline has a graph structure
- Definitions:
  - R files are pink circles
  - (Generated/downloaded) data files are orange rectangles
  - Output files (e.g., images) are blue rectangles

- Can easily track dependencies (e.g., this needs to happen before this, etc.)

- Try mapping out the example from the previous stage in your own time!

:::

## Examples pipelines

::: notes

- Platform power project
- International retail panel data

:::

## Start building your pipeline

- Move existing code to pipeline stages, or write new code in pipeline stages (`src\`)

- Breaks up a long make-all-the-things scripts into discrete, manageable chunks (i.e., components).
  - inputs
  - transformations
  - outputs

## Advantages of using a pipeline

>1. Structure documents the workflow, making communication with colleagues (and your future self) more efficient
2. When you modify one stage of the pipeline, you don't have to rerun the entire pipeline (e.g., save processing resources).
3. Eventually reproduce entire workflow

::: notes

(more about this now)
just ONE command
:::

## 4. Automate your pipeline

- What's automation?
  - A set of rules (instructions for the computer)
  - We write them in `makefiles`
- Each rule consists of
  - what to build? ("target")
  - what do I need to build it? ("prerequisites"), and
  - how to build it? (i.e., commands)
- `Make` then builds project

::: notes

- A makefile is just a plain text file called makefile (without an extension; so nothing fancy or complicated)

- Along the way we store our files in the directory structure we discussed previously

- Then Make looks at which file you have and figures out how to create the files that you want.

:::

## A simple `make` rule

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
../../gen/data-preparation/aggregated_df.csv: ../../data/listings.csv ../../data/reviews.csv clean.R
	Rscript clean.R
```

::: notes

For our analysis, we need to aggregate our data from two files (listings.csv and reviews.csv). The script clean.R (stored in the data preparation folder) takes care of that.

R and make need to be run from the command line directly. You need to make R and make discoverable from anywhere on your computer, and that's in the setup instructions.

:::

## Example

::: notes

I now show how make works

- makefile
- when I run it

- awesome make commands
  - make `n`

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
3. Move source code to pipeline stages, or start writing new source code. Break up code in small code chunks rather than one giant script.
4. Automate each pipeline stage

::: notes

- Document your project and raw data
- Tracking changes to your source code using versioning

We may sometimes sound a bit dogmatic (e.g., you must do this or that). Some of our instructions will only make sense to you after a while.

:::


<!--

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
-->
