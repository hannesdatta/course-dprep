---
title: "Checklist to Audit Data- and Computation-intensive Projects"
date: 2020-11-11T22:01:14+05:30
draft: false
weight: 80
---

There is quite some material to cover to make sure your workflows
become efficient, reproducible, and well-structured.

Here's a checklist you can use to audit your progress.

<!--
| Makefile available at the root of the project (tying together individual makefiles) | &#9744;        | &#9744;     | &#9744;     | &#9744; |    |
-->

|                                                                         | data-preparation | analysis    | paper       | ...     |
| ------------------------------------------------------------------------|:--------------:|:-----------:|:-----------:|:-------:|
| **At the project level**
| Implement a consistent [directory structure](directories.md#working-example): data/src/gen
| Include [readme with project description](documenting-code.md#main-project-documentation) and technical instruction how to run/build the project
| Store any authentication credentials outside of the repository (e.g., in a JSON file), NOT clear-text in source code
| Mirror your `/data` folder to a secure backup location; alternatively, store all raw data on a secure server and download relevant files to `/data`
|
| **At the level of each stage of your pipeline**
| *File/directory structure*
| Create [subdirectory for source code](directories.md#working-example): `/src/[pipeline-stage-name]/` | &#9744;        | &#9744;     | &#9744;     | &#9744; |    |
| Create [subdirectories for generated files](directories.md#working-example) in `/gen/[pipeline-stage-name]/`: `temp`, `output`, and `audit`. | &#9744;        | &#9744;     | &#9744;     | &#9744; |    |
| Make all file names relative, and not absolute (i.e., never refer to C:/mydata/myproject, but only use relative paths, e.g., ../output) | &#9744;        | &#9744;     | &#9744;     | &#9744; |    |
| Create directory structure from within your source code, or use .gitkeep | &#9744;        | &#9744;     | &#9744;     | &#9744; |    |
| *Automation and Documentation*
| Have a [`makefile`](automation.md) | &#9744;        | &#9744;     | &#9744;     | &#9744; |    |
| Alternatively, include a [readme with running instructions](automation.md#are-there-alternatives-to-make) | &#9744;        | &#9744;     |
| Make dependencies between source code and files-to-be-built explicit, so that `make` automatically recognizes when a rule does not need to be run [(properly define targets and source files)](automation.md) | &#9744;        | &#9744;     | &#9744;     | &#9744; |    |
| Include function to delete temp, output files, and audit files in makefile | &#9744;        | &#9744;     | &#9744;     | &#9744; |    |
| *Versioning*
| Version all source code stored in `/src` (i.e., add to Git/GitHub) | &#9744;        | &#9744;     | &#9744;     | &#9744; |    |
| Do not version any files in `/data` and `/gen` (i.e., do NOT add them to Git/GitHub) | &#9744;        | &#9744;     | &#9744;     | &#9744; |    |
| Want to exclude additional files (e.g., files that (unintentionally) get written to `/src`? Use .gitignore for files/directories that need not to be versioned | &#9744;        | &#9744;     | &#9744;     | &#9744; |    |
| *Housekeeping*
| Have short and accessible variable names | &#9744;        | &#9744;     | &#9744;     | &#9744; |    |
| Loop what can be looped | &#9744;        | &#9744;     | &#9744;     | &#9744; |    |
| Break down "long" source code in subprograms/functions, or split script in multiple smaller scripts | &#9744;        | &#9744;     | &#9744;     | &#9744; |    |
| Delete what can be deleted (including unnecessary comments, legacy calls to packages/libraries, variables) | &#9744;        | &#9744;     | &#9744;     | &#9744; |    |
| Use of asserts (i.e., make your program crash if it encounters an error which is not recognized as an error)| &#9744;        | &#9744;     | &#9744;     | &#9744; |    |
| *Testing for portability*
| Tested on own computer (entirely wipe `/gen`, re-build the entire project using `make`) | &#9744;        | &#9744;     | &#9744;     | &#9744; |    |
| Tested on own computer (first clone to new directory, then re-build the entire project using `make`) | &#9744;        | &#9744;     | &#9744;     | &#9744; |    |
| Tested on different computer (Windows) | &#9744;        | &#9744;     | &#9744;     | &#9744; |    |
| Tested on different computer (Mac) | &#9744;        | &#9744;     | &#9744;     | &#9744; |    |
| Tested on different computer (Linux) | &#9744;        | &#9744;     | &#9744;     | &#9744; |    |


!!! warning "Versioned any sensitive data?"
    Before making a GitHub repository public, we recommend you check that you have not stored any sensitive information in it (such as any passwords).
    This tool has worked great for us: [GitHub credentials scanner](https://geekflare.com/github-credentials-scanner/).
