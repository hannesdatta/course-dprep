---
weight: 60
title: Pipeline building and automation
description: Automate workflows and make them reproducible.
bookCollapseSection: true
draft: false
---

# Tutorial: Pipeline building and automation

## Learning goals

* Learn how to organize your project with a coherent directory structure
* Conceive your project as a pipeline
* Separate your code into smaller chunks (each one with inputs, transformations and outputs)
* Automate workflows and make them reproducible using `make`
<!--* Documenting Source Code and Pipeline workflows
* Describe raw data using a template
-->

## Planning

- Please plan a full day to work through this tutorial.

## Getting started

1. Watch (in this order...)
    - [This is why you should automate the pipeline of your empirical research project](https://youtu.be/9aivqe-phL0)
    - [Four steps to automate & make reproducible your empirical research project](https://youtu.be/rJGGCX6bcPo)
    - The content of the slides shown in the videos is [available here](pipelineautomation.pdf).

2. Read the building block ["What are makefiles"](https://tilburgsciencehub.com/learn/makefiles)

3. Start learning `make`! ([View](make-tutorial.html), [Download; right click - download file as](make-tutorial.Rmd))

{{< hint info >}}
__Optional readings__

- Notes on [Automating Your Pipeline](https://tilburgsciencehub.com/tutorials/project-management/principles-of-project-setup-and-workflow-management/automation/)
- Revisit the [slidedeck](https://github.com/STAT545-UBC/STAT545-UBC-original-website/blob/master/automation01_slides/slides.md)

{{< /hint >}}

{{< hint info >}}

<!--

-->

__Practice `make` commands on a real pipeline__

- Check out the tutorial ["Practicing pipeline automation using `make`"](https://tilburgsciencehub.com/tutorials/reproducible-research/practicing-pipeline-automation-make/overview/) at Tilburg Science Hub.

{{< hint warning >}}

The tutorial involves a blend of R __and__ Python code. You may be unfamiliar with Python - but that's not a bad thing. The purpose is __not__ to turn you into a Python wizard, but rather to __illustrate the value of `make`__ in a data pipeline. The fact that you can run both R and Python scripts makes it very powerful!

{{< /hint >}}

<!--
In the live session of this week, we'll see how we can quickly make changes to the workflow (e.g., swapping around files and directories) without breaking the pipeline.
- It's important you've covered the learn & practice part yourself, before attending the live stream.
-->
<!--Make sure to fully understand the details of the practise [workflow](https://tsh-website.netlify.app/tutorials/more-tutorials/implement-an-efficient-and-reproducible-workflow/implement-an-efficient-and-reproducible-workflow-overview/), to get most out of this session!
-->
