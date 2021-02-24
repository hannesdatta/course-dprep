---
weight: 30
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

## Getting Started

### Plan

- Plan a full day to work through this tutorial.

### Learn

- Watch (in this order...)
  - [This is why you should automate the pipeline of your empirical research project](https://youtu.be/9aivqe-phL0)
  - [Four steps to automate & make reproducible your empirical research project](https://youtu.be/rJGGCX6bcPo)
  - The content of the slides shown in the videos is [available here](pipelineautomation.pdf)

- Read the building block ["What are makefiles"](../../building-blocks/automation/make-commands)

- Review the notes on [Automating Your Pipeline](http://tilburgsciencehub.com/tutorials/project-setup/principles-of-project-setup-and-workflow-management/automation/)

<!--
- Revisit the [slidedeck](https://github.com/STAT545-UBC/STAT545-UBC-original-website/tree/master/automation01_slides)
-->

### Practice

- Practice `make` commands by working on the tutorial ["Practicing pipeline automation using `make`"](https://tilburgsciencehub.com/tutorials/reproducible-research/practicing-pipeline-automation-make/overview/)

{{< hint warning >}}

The tutorial involves a blend of R __and__ Python code. You may be unfamiliar with Python - but that's not a bad thing. The purpose is __not__ to turn you into a Python wizard, but rather to __illustrate the value of `make`__ in a data pipeline. The fact that you can run both R and Python scripts makes it very powerful!

{{< /hint >}}

### Create

- Download the code of the "Example of a reproducible research workflow", available at https://github.com/rgreminger/example-make-workflow
- Unzip the code, open a terminal/command prompt in the folder, and run the workflow by typing `make`
- If everything works ("Nothing to be done for `make`"), start extending the workflow with the [building blocks on automation](../../building-blocks/automation/)
  - write a script that downloads datasets [for your team project](../../course/project). Use the [AirBnB data](http://insideairbnb.com/get-the-data.html), in particular `listings.csv` and `reviews.csv`
  - add the script to the `makefile`, and run `make`
  - add a RMarkdown document, which (roughly) inspects the CSV files. Don't spend much time on the exploration code here - the purpose is for you to get starting using `make`!
  - Throughout, keep on running `make` to verify your project is (still) working as expected.

If you like, you can submit your workflow as a "proof of investing in your skills" (self- and peer assessment). Please compress it before uploading!


<!--
In the live session of this week, we'll see how we can quickly make changes to the workflow (e.g., swapping around files and directories) without breaking the pipeline.
- It's important you've covered the learn & practice part yourself, before attending the live stream.
-->
<!--Make sure to fully understand the details of the practise [workflow](https://tsh-website.netlify.app/tutorials/more-tutorials/implement-an-efficient-and-reproducible-workflow/implement-an-efficient-and-reproducible-workflow-overview/), to get most out of this session!
-->
