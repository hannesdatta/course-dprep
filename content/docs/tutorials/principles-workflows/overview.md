---
title: "Overview"
date: 2020-11-11T22:01:14+05:30
draft: false
isParent: true
weight: 2
description: "Motivation for Professionally Managing Data-Intensive Research Projects"
---

## Motivation

When working on a project, most of us spend time thinking about *what* to create (e.g., a cleaned data set, a new algorithm, an analysis, and/or a paper with corresponding slides), but not about *how* and *where* to manage its creation.

{{< hint info>}}

First, we may lose sight of the project ("directory and file chaos"). For example, we gradually write code and edit data sets, and put those files somewhere on our computer. When we update files, we may either overwrite them, or save new versions under different file names (e.g., including dates like `20191126_mycode.R` or version numbers like `mycode_v2.R`). Even with *best intentions to keep everything tidy*, months or years of working on a project will very likely result in chaos. Have a look at the intransparent [directory and file structure of a PhD project](structure_phd_2013.html) Hannes once was working on (back in 2013). Can you find the code used to estimate the final models?! (e-mail us if you do...)

{{</hint >}}

2. We may find it difficult to (re)execute the project ("lack of automation")
    - The way you have set up your project may make it cumbersome to execute the project. Which code files to run, which not? How long does it take for a code file to complete running?
    - For example, you wish to re-do your analysis on a small subset of the data (either for prototyping, or as a robustness check), or you would like to try out new variables or test whether a new package provides speed gains...
    - However, re-running your project takes a lot of time - if at all you remember how to "run" the various code files you have written.


The primary mission of **managing data- and computation-intensive projects** is to build a transparent project infrastructure, that allows for easily (re)executing your code potentially many times.

## Guiding Principles

The objectives of this boot camp are:

- learn how to organize and track the evolution of your projects (e.g., by means of a proper [directory structure](directories.md), and [code versioning](versioning.md))
- learn how to automize your workflows, and make them reproducible (e.g., by using [automation](automation.md))
- learn how to [work on projects with others](collaboration.md) (e.g., by means of Git/GitHub)
- learn how to [document datasets](documenting-data.md) and [workflows](documenting-code.md)
- learn how to write clean code (e.g., see our [tips here](../tips/coding.md))

## Gradual Implementation

!!! tip "Gradually implement our tips"
    * We may sometimes sound a bit dogmatic (e.g., you must do this or that). Some of our instructions will only make sense to you after a while. So, please stick with our recommendations during the course of your first few projects. Later on, take the liberty to re-design the workflows to your needs.
    * Consider adopting our suggestions **gradually**
        1. Start with a proper [directory structure on your local computer](directories.md#data-management), which
        may already be sufficient to start collaborating. For example,
        do you need feedback from your advisor? Just zip (the relevant parts of) your pipeline
        and use [SURF's filesending service (for researchers affiliated with Dutch institutions)](https://filesender.surf.nl/) to send it!

        !!! warning "Uhh, email, really?!"
            - Indeed, email is not what we want to advocate.
            - But then again, we want you to get started with managing your workflows right away, and adhering to the directory structure outlined above already increases your efficiency.
            - So, before you proceed to the future chapters of this guide, sit back, and relax, and keep on using good old email.

        2. Start [automating](automation.md) (parts of) your pipeline
        3. Document your [project](documenting-code.md) and [raw data](documenting-data.md)
        4. Start to [track changes to your source code](versioning.md), and [clean up your source/"do your housekeeping"](checklist.md) regularly

## Configure your Computer

!!! tip "Configure your computer"
    - Note that to implement our workflow suggestions, your computer needs to be configured properly - so we [suggest you to do that first](../setup/index.md).
    - Of course, you need not to install all software tools - but pick *at least* your statistical software package (e.g., [we use R](../setup/r.md), but others prefer [Stata](../setup/stata.md)), [Python](../setup/python.md), and [`make`](../setup/make.md).

<!---* You should be able to complete this subchapter in  sitting within 90-150 minutes.-->

<!--
!!! warning
	This site is under development, and will be updated continuously. Please check back frequently.
--!>

<!--#* Please follow the steps one-by-one in the order they appear on the side bar and do not deviate from them, unless you really know what you are doing.
#* Where necessary, we have provided instructions for Mac, Windows and Linux machines.
--!>
<!--
[^1]:  As you will quickly realize, the folder structure is a mess, and it is close to impossible to find the code that prepared the datasets, or the code that was used to estimate the econometric model that eventually got published (if you do find these files, please let us know). ;-)

-->
