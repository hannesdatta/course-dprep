---
weight: 10
title: Make commands
description: The basic structure of any makefile
keywords: "make, makefile, automation, target, prerequisite"
date: 2021-02-08
bookCollapseSection: true
draft: false
---

## Overview 
Makefiles are used to help decide which parts of a large program need to be recompiled. A makefile consists of a set of rules. 


## Code 
A rule generally looks like this:

```
targets: prerequisites
   command
   command
   command
```

* The targets are file names, seperated by spaces. Typically, there is only one per rule.
* The prerequisites are also file names, seperated by spaces. These files need to exist before the commands for the target are run. These are also called dependencies.
* The commands are a series of steps typically used to make the target(s). These need to start with a tab character, not spaces.


*Example:*
```
gen/data-preparation/aggregated_df.csv: data/listings.csv data/reviews.csv
	Rscript src/data-preparation/clean.R 
```
  

## See Also
* Phony commands are targets that do not produce any output. Creating a target `all` and `clean` is a convention of Makefiles that many people follow. The former calls all targets while the latter is used to quickly remove all generated files (to start with a clean copy of your directory so to say).

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
  
* Variables in a make script prevent you from writing the same file paths over and over again. They are typically defined at the top of the file and can be accessed with the `$` command. Note that variables can only be strings. 

*Example:*  
```
INPUT_DIR = src/data-preparation
GEN_DATA = gen/data-preparation

$(GEN_DATA)/aggregated_df.csv: data/listings.csv data/reviews.csv
  $(INPUT_DIR)/clean.R 
```





