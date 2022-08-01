---
weight: 20
title: How to debug makefiles?
description: "Learn how to fix the most common mistakes when using `make`."
keywords: "make, makefile, automation, target, prerequisite, recipes"
date: 2021-02-08
bookCollapseSection: true
draft: false
---

# How to debug makefiles?

Makefiles are instructions ("rules") for a computer on how to build "stuff". We've documented their use for empirical research projects [here](make-commands.md).

But, what to do when they don't work as expected?

Here are a few pointers to debug your makefiles.


1. Is `make` properly installed?


  To run makefiles, you have to have `make` installed on your system. So if you see a message like this: `'make' is not recognized as an internal or external command, operable program or batch file.`.

  So... head over to Tilburg Science Hub [to see how to install `make`](https://tilburgsciencehub.com/get/make).

2. Does your code run without make?

  There are two things that can go wrong when working with makefiles. Either there's a problem with the `makefile` itself, or there's a problem with the code that the `makefile` executes.

  So, a first check is to copy-paste the commands to build (e.g., `python script.py` or `RScript myscript.R`) into the console, and see whether the Python or R code runs as expected.

  Does the script run? Then you need to debug your makefile (see next). If it doesn't run, first try to debug your source code in R/Python etc.

3. Is your `makefile` structured properly?

  One of the most common mistakes in a `makefile` is to not adhere to the syntax:

  ```
  source: prerequisites [separated by spaces]
     COMMANDS TO RUN
  ```

  The commands need to be separated by a tab character. Try to open the makefile in another editor, and verify that you have correctly made use of the tab. Note that some editors replace tabs by spaces (and you don't want that here!).
