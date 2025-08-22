% Running and *extending* a reproducible workflow
% [Hannes Datta](https://hannesdatta.com)
% May 29, 2020

# TSH Textmining Workflow

## Overview

## Let's inventorize how good you are already...!

__On a scale from 1 to 10, which grade would you assign yourself in mastering the steps of the TSH textmining workflow?__

::: notes

depending on the outcome, I'll adjust the course

If very confident: discuss more advanced topics

If a few are very basic: show more step-by-step

:::

## Recap: ["Installation"](http://tilburgsciencehub.com/tutorial/)

__What is the main idea of calling programs from cmd/terminal?__

. . .

__How is this achieved technically?__

. . .

__Could you have installed R also in "C:\\a-weird-path?__"

. . .

__What is this installation procedure missing to ensure portability?__

::: notes

Q1: AUTOMATION --> need to be able to call it from batch
Q2: setting path variables
Q3: yes! that's the main point of PATH variables.
Q4: package versions, operating system - that's all NOT made explicit

Lesson: portability important

Any idea what's unsolved?
- OS (--> containers)
- Packages (--> packrat)

:::

## Recap: ["Let's download the template"](http://tilburgsciencehub.com/tutorial/clone/)


. . .

__Did you encounter any issues when you first downloaded and tried to extract the files?__

. . .

__Who *downloaded* the workflow as a zip? Who *forked and cloned* it from GitHub? Motivate your choice!__

::: notes

My lessons when making this tutorial:
- Terminal/command prompt is quite powerful
- Navigation almost the same on Mac/Windows

Motivation choice for GitHub:
- ability to use versioning afterwards and all of the other features of Git

:::

## Recap: ["Running the workflow"](http://tilburgsciencehub.com/tutorial/run/)

__Did your workflow run straight away? If not, how did you fix it?__

. . .

__Let's open the makefile. Can you reconstruct what it does (and how?)__


::: notes

Probably many tried to run make but it did not work for the first time.
- That's because of the PATH variables.
- or, because of not being in Anaconda (show how to open anaconda in alternative ways)

:::

## Recap: ["Makefile of the data-preparation pipeline"](http://tilburgsciencehub.com/tutorial/pipeline-make/)

__What does `../` stand for in the directory names listed in the `makefile`?__

. . .

__How do you decide when to use `../`, versus merely using the file name?__

. . .

::: notes

Q2: everything is RELATIVE to the file that you are executing. E.g., makefile is in that dir, that's why we NAVIGATE away from there.

- how do you enter a dir? use the path name.

Extra stuff: learn from another makefile, and use variable names instead

```
TEMP_DIR = ../temp
OUTPUT_DIR = ../output
EXT_DIR = ../externals

go: $(OUTPUT_DIR)/platformpower.zip

```

:::

## Recap: ["Dry run and first modifications"](http://tilburgsciencehub.com/tutorial/wipe-rerun/)

__What are the benefits of using `Spyder` over an editor when editing code?__

. . .

__All modifications, then `make` vs. modification-make-modification-make?__

. . .

__When to use `make -n` instead of `make`?__

::: notes

Q1: Spyder allows for prototyping

Q2: It depends. When in editor, then test whether it runs iteratively. When in Spyder, then prototype in Spyder, then run make fully.

Q3: You've done some changes, and want to run the workflow. `make -n` previews what will be done, without doing it.

- Avoid surprises about what all needs to be run
- Can also do modifications, e.g., considering a specific file up-to-date (so it won't be rebuilt!).
- Identify errors in the workflow - e.g., you may have forgotten dependencies

:::

## Recap: ["More modifications"](http://tilburgsciencehub.com/tutorial/modifications/)

__What is the main idea of branching?__

. . .

__How can branching be achieved?__

. . .

__What problems did you encounter when trying to replace the download URL in `download.py`. Wanna do this again?__

. . .

__What's JSON, anyways?__


::: notes

Q1: take copies of project to prototype some features
Q2: Super easy: mere copy pasting in a new folder. Better: git branch, checkout repos
Q3: gotta adjust the dependencies
Q4: flexible format for semi-structured data

:::

## Recap: ["Modify analysis"](http://tilburgsciencehub.com/tutorial/analysis/)

__How does the analysis *pull in* the final data set?__

. . .

__Is this a good approach? Why (or why not) + circumstances?__

. . .

__How would you extend this analysis?__

::: notes

Q1: just by loading it from within the R script
Q2: bad if you work in different parts of your pipeline with different ppl (they may not have built the entire project)
Q3: any R issue

:::

## Adv. exercise 1: Portability

Let's make the pipeline stages portable!

- Define a bash script to read in scripts form one folder to another.
- Let's first *draft this by talking about it*
- You can then code it up.

::: notes

Windows and Mac users (different commands); compatibility problem (circumvented via python code)

:::

## Adv. exercise 2: Branching 101

Let's do a proper Git branch operation.

- Use the [Git cheat sheet](https://education.github.com/git-cheat-sheet-education.pdf)
- Fork to your GitHub, `git clone` to your disk
- Create branch: `git branch mynewfeature`, then checkout `git checkout mynewfeature`
- Swap back and forth


::: notes

What are the benefits of `git bash` over git gui?
--> faster
--> But can use both, depends on taste

:::

## Adv. exercise 3: Branching and comparison

- Let's checkout a branch to two different subdirectories
- Run `git clone https://..... mainproject`
- Run `git clone https://..... test` and `git checkout mynewfeature`
- Run both, then modify one, compare.


# Activities and exercises

## Overview

- Drafting a project pipeline
- Using AWS S3, FTP, Google Drive, Dropbox in your projects
- Using databases
- Versioning (local, on GitHub, implementing in your project, submodules)
- Contributing to open source projects
- Programming tips

## Drafting a project pipeline

__Develop a rough draft of a pipeline for your graduation project__

- What's your final product?
- Break down process in pipeline stages
- Break each stage down in individual steps (inputs/transformation/outputs)
- Which software tools will you use (at each step?)

::: notes

- Meet in groups by area of specialization
- Goal: - Meet back here in 20 minutes; discuss at least one pipeline per group
- See also example project pipeline in the earlier deck

:::

## Drafting a project pipeline

Discussion points

- Multiple inputs/outputs
- Arguments as inputs
- Expected running time
- Computation and memory requirements
- Parallel execution
- Portable across different OS/software/licenses?
- Automation guru versus manual god?

::: notes

-	Come back to group: discuss these pipelines – show on screen, 3-4 minutes each.
o	Identify overarching concepts – e.g., multiple inputs, multiple outputs, arguments, parallel streams of executing code, requirements in terms of computer power (what is on big computers, what is on small computers), different operating systems, using different software stack, level of sophistication (how well thought out is it? Mere prototype); need for prototyping

:::

## Using AWS S3, FTP, Google Drive, Dropbox to host data

__What's the use of integrating file sharing services in your pipeline?__

. . .

- Check out [https://github.com/hulaizh/get-data](https://github.com/hulaizh/get-data)
- Do you get one of the scripts in `\src` to work?

::: notes

Q1: file-exchange (1) for temporary files, but also (more or less securely) hosting data

Add on: show S3 on my computer
  - show interface at AWS S3 (https://aws.amazon.com/s3/)
  - Show aws configure
  - show upload/download AWS or boto3 in Python

Good practice:
- Make use of command-line tools or Python packages to retrieve data for projects, or write data for others to use

:::

## Using databases in reproducible workflows

- Databases have the benefit of “structuring” data for you (even unstructured databases!)

- Can run locally, remotely

- Any examples from your work?

. . .

- But... availability guaranteed? What could be a solution?

::: notes

1) examples:
get weather data for every day 2018-2019
scraper crashes
checks what data is available, and only gets data that is missing
    ```
    Structured databases: SQL
    Local: SQlite
    Remotely: your company’s SQL server
    Cloud: AWS RDS, …

    Unstructured databases: MongoDB
    Local: collection of JSON objects, tinyDB
    Remotely: Self-managed MongoDB distribution
    Cloud: MongoDB Atlas
    ```

2) Databases can run locally (on your PC), remotely (on a server, self-managed), or in the cloud (also on the server, but managed with tools)

3) Download stuff and extract it from there; have done so w/ Mongo, with Spotify I...

:::

## Versioning with Git bash 101 (local)

- Use the [Git cheat sheet](https://education.github.com/git-cheat-sheet-education.pdf)

```
git clone
git status
git add
git commit -m "message"
```

- Practice on [TSH tutorial workflow](http://tilburgsciencehub.com/tutorial)

::: notes

Let's use any public repos and clone that to our PC to make changes

Any suggestions?

Can use TeamViewer here

:::


## Using Git and GitHub

- Use the [Git cheat sheet](https://education.github.com/git-cheat-sheet-education.pdf)

- Show
    - `git push -u origin master`
    - `git pull` vs. `git fetch`/`git merge`
    - the GitHub web interface

::: notes

Can use TeamViewer here

:::

## Contributing to an open-source project using GitHub

- Use the [Git cheat sheet](https://education.github.com/git-cheat-sheet-education.pdf)

- Show [contribution guidelines of Tilburg Science Hub](https://github.com/hannesdatta/tilburg-science-hub/blob/tilburg-update/CONTRIBUTING.md)

- Find something you'd like to rewrite, issue a pull request!

::: notes

Can use TeamViewer here

:::

## Implementing Git in your project (1)

- pick your own project (e.g., graduation project)
- install git from git-scm.org
- use the [Git cheat sheet](https://education.github.com/git-cheat-sheet-education.pdf)


::: notes

Can use TeamViewer here



Port project to a Git repository

Start implementing things from the checklist & perform Git work cycles. See cheatsheet handout!


I will provide you with feedback.

What to do
Download Git from git-scm.org
Download Git Cheatsheet from https://education.github.com/git-cheat-sheet-education.pdf
Run Git Batch in your main directory [tip: type cmd in Windows explorer]
Type: git init to initialize a repository. Celebrate.

Perform work cycles (over and over again)
git status
git add directory
git add files (e.g., git add code.R)
git commit -m “message”

Possible “to do’s”: improve folder structure
Modules by “function” in project, e.g., raw, derived, analysis
Within each module, split by temp/code/output/external

:::


## Implementing Git in your project (2)

Exclude files from versioning using `.gitignore`

For example:
```
**/temp
~*
*.RHistory
Thumbs.db
```

## Working with submodules in Git


## Programming 101

- Have clear variable names
- Use loops where possible
    - e.g., variable operationalization
    - e.g., estimation on different slices of the data
- Modularization of functions
    - e.g., make your own module for commonly used functions
    - e.g., modularize functions itself
- Use of assrts
    - e.g., `stopifnot()` in R, `assert` in Python
