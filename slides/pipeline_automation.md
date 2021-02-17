% Data Preparation and Workflow Management
% [Hannes Datta](https://hannesdatta.com)

# Pipeline Automation Tutorial


## Guiding Principles 

- Learn how to organize and track the evolution of your projects (e.g., by means of a proper directory structure, and code versioning)

- Learn how to automize your workflows, and make them reproducible (e.g., by using automation)


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

Examples: overwriting files, changing file names, version numbers, etc.

:::

## Pipelines

- Breaks up a monolithic make-all-the-things script into discrete, manageable chunks (i.e., components).

- You define the:
  - inputs
  - transformations
  - outputs 

::: notes 

A pipeline refers to the steps that are necessary to build a project (e.g., prepare dataset, run model, produce tables and figures)

Components refer to a project’s most nuclear building blocks (e.g., data, source code, and generated temporary and/or output files)

Important note: you do NOT modify the input files but create temporary/generated files instead

:::

## Simple Example 

1. Prepare dataset for analysis
2. Run model on a datset
3. Produce tables and figures for the paper

## More Complex Example 
1. Download public datasets (used for some control variables)
2. Have a RA code some auxiliary variables (to be delivered in Excel)
3. Merge primary datset with control variables and generate  derivative datasets on a weekly and monthly level
4. Estimate models on both datasets
5. Systematically comparet both models
6. Choose the best model and produce tables and figures for a paper.


## Visual Example

<img alt="Pipeline Graph" src="/images/pipeline.png">


::: notes 

- Has a graph structure
- Can easily track dependencies (e.g., this needs to happen before this, etc.)

- R files are pink circles
- (Generated/downloaded) data files are orange rectangles
- Output files (e.g., images) are blue rectangles

:::

## What Are The Advantages?

1. Explicitly document the workflow, making communication with colleagues (and your future self) more efficient
2. When you modify one stage of the pipeline, you don't have to rerun the entire pipeline (e.g., save processing resources). 
3. You reproduce the entire workflow with just a single command


::: notes 

- Overview of which files are dependent on one another

- Rerunning a stage of a pipeline always produces the same results

- Often, one of the first steps in a make pipeline is downloading the data -> makes collaborating easier because you no longer have to share large files (a directory and a make file suffices)

:::

## Directory Structure

<img alt="Pipeline Graph" src="/images/directory_structure.png">


::: notes 
But automation all starts with a proper directory structure 

E.g. show students the platform power directory structure (and contents) to get a better feeling for what each of these folders represents

They can download this folder structure as a zip file from the course website (note that: you cannot store empty folders on Git)

:::


## Make

- Makefile constists of a set of rules   
- You need to define:
  - How to create one type of file from another
  - Which files you want to create

::: notes 
- A makefile is just a plain text file called makefile (without an extension; so nothing fancy or complicated)
  
- Along the way we store our files in the directory structure we discussed previously

- Then Make looks at which file you have and figures out how to create the files that you want.

:::


## Syntax

```
targets: prerequisites
   command
   command
   command
```

::: notes
- Prerequisites are files that need to exist before the commands for the target are run (also known as dependencies)
- Commands are a series of steps used to make the targets

- This information is also accessible as code snippets on the building blocks page

:::


## Example

```
gen/data-preparation/aggregated_df.csv: data/listings.csv data/reviews.csv
	Rscript src/data-preparation/clean.R 
```

::: notes

For our analysis, we need to aggregate our data from two files (listings.csv and reviews.csv). The script clean.R (stored in the data preparation folder) takes care of that.

:::


## Phony Commands

- Targets that do not produce any output
- Convention
  - `all` = call all targets
  - `clean` = remove all generated files



## Example

```
all: one two
 
one:
    touch one.txt
two:
    touch two.txt
 
clean:
    rm -f one.txt two.txt
```

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


## Gradual Implementation of Pipelines

  - Directory structure
  - Automating (parts) of your pipeline
  - Document your project and raw data
  - Tracking changes to your source code 

::: notes

We may sometimes sound a bit dogmatic (e.g., you must do this or that). Some of our instructions will only make sense to you after a while. 

:::


## Demo

::: notes

- Create dependencies graph for one of your projects and put on this slide (or see Airbnb example: https://github.com/RoyKlaasseBos/tsh-website/blob/master/content/tutorials/more-tutorials/airbnb-workflow/images/dependencies.png)
- Show what happens once all files are compiled, when you remove the raw data and run make again, change the dataset for another one etc.

:::


## Any questions?

Stick around now if you have questions.

::: notes 

Comment on the Airbnb practice workflow: 
- Involves a blend of Python and R code -> for those students not familiar with Python follow the set-up instructions to install Python + textblob
- The purpose of the tutorial is not to turn you into a Python wizard, but rather to illustrate the value of make in a data pipeline. 

:::


## Contact

Thanks a lot, and have fun with the course!

Hannes Datta

https://hannesdatta.com
