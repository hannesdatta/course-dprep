---
weight: 10
title: What are makefiles?
description: Understand the basic structure of makefiles
keywords: "make, makefile, automation, target, prerequisite"
date: 2021-02-08
bookCollapseSection: true
draft: false
---

# What are makefiles?

## Overview

Makefiles are instructions ("rules") for a computer on how to build "stuff". Think of makefiles as a recipe you may know from cooking ("Baking a cake: First, take some flour, then add milk [...]") - but then for computers.

Makefiles originate in software development, where they have been used to convert source code into software programs that can then be distributed to users.

Researchers can use makefiles to define *rules* how individual components (e.g., cleaning the data, running an analysis, producing tables) are run. When dependencies (e.g., to run the analysis, the data set first has to be cleaned) are well-defined, researchers can completely automate the project. When making changes to code, researchers can then easily "re-run" the entire project, and see how final results (potentially) change.

## Code

### Rules

A rule in a makefile generally looks like this:

```
targets: prerequisites
   commands to build
```

* The __targets__ are things that you want to build - for example, data sets, outputs of analyses, a PDF file, etc. You can define multiple targets for one rule (separate targets by spaces!). Typically, though, there is only one per rule.
  * Example: `dataset.csv` (my final, cleaned dataset)

* The __prerequisites__ are the things that you *need* before you can build the target. It's also a list of file names, separated by spaces. These files need to exist before the commands for the target are run. They are also called dependencies. The cool thing is that `make` automatically checks whether any of the dependencies has changed (e.g., a change in the source code) - so it can figure out which rules to be run, and which ones not (saving you a lot of computation time!).
  * Example: `rawdata1.csv clean.R` (before building `dataset.csv`, the raw data and a specific script to clean the raw data need to exist)

* The __commands__ are a series of steps to go through to *build* the target(s). These need to be indented with a tab ("start with a tab"), *not* spaces.
  * Example: the command `R --vanilla < clean.R` opens R, and runs the script `clean.R`.

*Final example:*

```
dataset.csv: rawdata1.csv clean.R
  R --vanilla < clean.R
```

### Multiple rules

A makefile typically consist of multiple rules, which can depend on each other.

```
# rule to build target2
target2: target1
  commands to build

# rule to build target1
target1: prerequisite1
  commands to build
```

## Advanced Use Cases

### Use directory names

You can easily use directory names in makefiles, e.g., to specify that a prerequisite is in one directory, and the target in another.

*Example*
```
gen/data-preparation/aggregated_df.csv: data/listings.csv data/reviews.csv
	Rscript src/data-preparation/clean.R
```


### "Phony" targets

Targets typically refer to output - such as files. Sometimes, it's not practical to generate outputs. We call these targets "phony targets".

* Creating a target `all` and `clean` is a convention of makefiles that many people follow.
* The phony target `all` calls all targets. Think of it as a "meta rule" to build it all!
* The target `clean` typically is used to remove generated/temp files, so you can start with a clean copy of your directory for testing.

*Example*
```
all: one two

one:
    touch one.txt
two:
    touch two.txt

clean:
    rm -f one.txt two.txt
```

### Use variables

Variables in a make script prevent you from writing the same directory names (or command to execute a program) over and over again. Variables are typically defined at the top of the file and can be accessed with the `$` command. Note that variables can only be strings.

*Example*  

```
INPUT_DIR = src/data-preparation
GEN_DATA = gen/data-preparation

$(GEN_DATA)/aggregated_df.csv: data/listings.csv data/reviews.csv
  $(INPUT_DIR)/clean.R
```

## See Also

- [The Turing Way's Guide to Reproducible Research using `make`](https://the-turing-way.netlify.app/reproducible-research/make.html)
- [Software Carpentry's Lesson on Automation and Make](http://swcarpentry.github.io/make-novice)
- [Example makefile for an analysis](https://github.com/hannesdatta/brand-equity-journal-of-marketing/blob/c8c9ff7a6904b4f6a7ad718932f21c6b87d4d881/analysis/code/makefile)
- [Example makefile for a data preparation pipeline](https://github.com/hannesdatta/brand-equity-journal-of-marketing/blob/c8c9ff7a6904b4f6a7ad718932f21c6b87d4d881/derived/code/makefile)
