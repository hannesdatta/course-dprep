---
title: "Data Management and Directory Structure"
date: 2020-11-11T22:01:14+05:30
draft: false
weight: 30
---

## Overview

From the [previous section in this guide](pipeline.md#project-components), recall that a project can be logically structured in
the following **components**: raw data (e.g., data sets), source code (e.g., code to prepare your data and to analyze it), generated files (e.g., some diagnostic plots or the result of your analysis), a file exchange, and notes (e.g., literature, meeting summaries).

Below, we give you some more guidance on how to *manage these components*, by casting a
prototypical directory structure that you need to set up on your computer.

!!! hint "Principles"
    We adhere to the following principles in managing our project's data and code:

    - others should understand the project and its pipeline, merely by looking at your directory and file structure,
    - each step in the pipeline is self-contained, i.e., it can be executed without actually having
    to run previous stages in the pipeline ("portability"), and
    - the project is versioned (source code), and backed up (raw data, source code, notes)

<!---!!! hint
		Remember that next to the components (i.e., the most basic building blocks of the projects),
		your project has a **pipeline** which defines the different tasks to accomplish (e.g.,
		such as preparing and analyzing the data, writing the paper, etc.).
--->

!!! tip "Obtain approval for using external services"
    Below, we're mentioning the use of several external services, such as Amazon Web Services (AWS), Dropbox, or Google Drive. Please make sure to obtain the approval of your organization to make use of these services. Typically, organizations also have a range of alternatives available in-house (e.g,. such as SurfDrive as a replacement for Dropbox for Dutch research institutions).

## Data Management for Each of the Project's Components

Here's our advice on how to manage and store each component of your project.
Of course, check with your own institution and their rules on data storage
and management.

To start, let's assume we're working on a project, called `my_project`. Let us
create that directory somewhere on our computer, preferably not in the cloud
(i.e., not in a Dropbox or Drive folder).

### 1. Raw data

Raw data gets downloaded into the `data` folder of your project (`my_project/data`) from either
a network drive, or a remote file storage that is securely backed up.

** Which data format to use**

- Raw data needs to be stored in text-based data files, such as CSV or JSON files.
This ensures highest portability across different platforms, and also stability
should certain software packages be discontinued or data formats being substantially
changed.
- Do you use databases to handle data storage (e.g., such as a MySQL or MongoDB server)?
Then still, take CSV/JSON extracts from that server from time to time. The reason
is that, somewhere down the road, you are going to shut down these database servers,
but you still need access to the "last version" of your data.

** Which directory structure to adhere to**

- Please structure data in logically consistent "subfolders". For example, by data provider
(e.g., website A, company B, data provider C).
- If you receive multiple versions
of the same data (e.g., a dump in 2012, a dump in 2015), then also create subfolders
for these particular years. It is not necessary to use file versioning for your raw data,
as this may greatly exceed the capacity of services such as GitHub.

See below for an example directory structure for your raw data:

    /data/website_A/...
    /data/company_B/...
    /data/data_provider_C/2019-11-04/...
    /data/data_provider_C/2020-03-01/...

- We also recommend you to use self-explanatory file names for your data,
[document the data yourself with a `readme`](documenting-data.md), or include
an overview about how the data was collected from your data provider.

- Last, it may happen that you code up some data yourself, and that you
still wish to store multiple versions of that file. In that case,
please only keep *the head copy* (i.e., the most recent version) in your folder,
and move all outdated files to a subfolder (which you can call `/legacy` or `/outdated`).

** Where to store the data**

- Ideally, the folder with your raw data is stored on a secure server that (a) project members have access to, and (b) gets backed up frequently. Good locations are:
    - a secure network folder in your organization
    - file hosting services such as Amazon S3
    - public cloud services such as Dropbox or Google Drive

<!-- just click on the links to get instruction on how to do that**-->

- When working on the project, download copies of your raw data to your `my_project/data/` folder.

- No time to think about remote storage locations right now? Then just store your
data in `my_project/data/` on your PC, and set yourself a reminder to move it
to a more secure location soon. Do make backups of this folder though!

### 2. Source code

Source code is made available in the `src` folder of your main project: `my_project/src/`.
Create subdirectories for each stage of your pipeline.

**Which files are source code**

- Source code are all files that are required to execute your project's pipeline.
- In addition, source code consists of a [`makefile`](automation.md) which makes explicit how the source code needs to be run, and in which order, and
- Scripts which put the `/gen/[pipeline-stage]/output` files from the current pipeline stage to the file exchange (`put_output`), so that other pipeline stages can pull in that data to its `/gen/[pipeline-stage]/input` folder (`get_input`). More about this [here](directories.md#4-file-exchange).

**Version your source code**

- Source code must be [*versioned*](versioning.md) so that you can
roll back to previous versions of the same files, and engage into
"housekeeping" exercises to improve the readability of your code.

- Of course, versioning also is a requirement when you work with multiple
team members on a project.

**Which directory structure to adhere to**

- Create subfolders for each stage of your [project's pipeline](pipeline.md),
and store source code pertaining to these stages in their respective directories.

- For example, let's assume your pipeline consists of three stages (ordered from "upstream" to "downstream" stages):
    - the pipeline stage `data-preparation` is used to prepare/clean a data set
    - the pipeline stage `analysis` is used to analyze the data cleaned in the previous step, and
    - the pipeline stage `paper` produces tables and figures for the final paper.

Your directory structure for the `/src` directory would then become:

    /src/data-preparation/
    /src/analysis/
    /src/paper/

** Where to store the source code**

- First of all, the source code is available on your local computer.
- Second, the source code is versioned using Git, and
synchronized with GitHub.com (so, automatic backups are guaranteed).

### 3. Generated files

- Generated files are all files that are generated by running your source code (`/src`)
on your raw data (`/data`).
- Generated files are stored in the `gen` folder of your main project: `my_project/gen/`.
- You can use subdirectories that match your pipeline stages to further bring structure to your project.

**Which directory structure to adhere to**

Each subdirectory contains the following subdirectories:

- `input`: This subdirectory contains any required input files to run this
step of the pipeline. Think of this as a directory that holds files from
preceding modules (e.g., the analysis uses the *file exchange* to pull in the
dataset from its preceding stage in the pipeline, `/data-preparation`).

- `temp`: These are temporary files, like an Excel dataset that
needed to be converted to a CSV data set before reading it in
your statistical software package.

- `output`: This subdirectory stores the *final* result of the module.
For example, in the case of a data preparation module, you would expect this
subdirectory to hold the final dataset. In the case of the analysis module,
you would expect this directory to contain a document with the results of
your analysis (e.g., some tables, or some figures).If necessary,
pass these to a file exchange	for use in other stages of your pipeline.

- `audit`: Checking data and model quality is important. So use this
directory to generate diagnostic information on the performance of each
step in your pipeline. For example, for a data preparation, save a txt
file with information on missing observations in your final data set.
For an analysis, write down a txt file with some fit measures, etc.

Your directory structure for the generated data is:

    /gen/data-preparation/input
    /gen/data-preparation/temp
    /gen/data-preparation/output
    /gen/data-preparation/audit
    /gen/analysis/input
    /gen/analysis/temp
    /gen/analysis/output
    /gen/analysis/audit
    /gen/paper/input
    /gen/paper/temp
    /gen/paper/output
    /gen/paper/audit

** Where to store the data**:

- Since generated files are purely the result of
running source code (which is versioned) on your raw data (which is backed up),
it's sufficient to store generated files locally only.
- If you are
working with other team members that may need access to the `/output` of preceding
pipeline stages, you can make use of the file exchange (see next section).

### 4. File exchange

- File exchanges are used to easily "ping-pong" (upload or download)
generated temporary or output files between different stages of the pipeline. Review
the use situations for file exchanges [here](pipeline.md#project-components).

- In simple terms, a file exchange "mirrors" (parts of) your generated files in `/gen`,
so that you or your team members can download the outputs of previous pipeline stages.

!!! example "Use cases for file exchanges"
    - A file exchange to **collaborate with others**:
        - A co-author builds a prototype model on his laptop.
        He/she can work on a dataset that you have prepped using a high-performance
    workstation (this part of the pipeline), without having to actually build
    the dataset him/herself from scratch.

    - A file exchange **without any collaboration**:
        - You have built a data set on a high-performance workstation,
        and would like to work with a sample dataset on your laptop, without
        having to actually build the dataset from scratch.

- For hosting, you have the same options as for storing your raw data:
    - a secure network folder in your organization,
    - file hosting services such as Amazon S3, or
    - public cloud services such as Dropbox or Google Drive.

- To upload or download data from your file exchange, put scripts in the
`src` folder of the relevant pipeline stage:

    - have a script in `src/data-preparation` that uploads the output of this pipeline stage from
`gen/data-preparation/output` to the file exchange (`put_output`)
    - have a script in `src/analysis` which downloads the data from the file exchange to
    `gen/analysis/input` (`get_input`)

- For details on setting up and using a file exchange, follow our [tutorial](../tips/fileexchanges.md) here.

### 5. Managing notes and other documents

- Notes and other documents are NOT part of your `my_project` directory, but are kept on a conveniently accessible cloud provider.
The conditions are: files are accessible for all team members, and files are automatically backed up. Services that meet these requirements typically are Dropbox, Google Drive, or - if you're located in The Netherlands - Surfdrive.

- Do create subdirectories for each type of files (e.g., notes, literature, etc.)


## Summary

### Complete Project Directory Structure

- Below, we reproduce the resulting directory structure for your entire project, called `my_project`
(of course, feel free to relabel that project when you implement this!).
- This example project has three pipeline stages:
    - the pipeline stage `data-preparation` is used to prepare/clean a data set
    - the pipeline stage `analysis` is used to analyze the data cleaned in the previous step, and
    - the pipeline stage `paper` produces tables and figures for the final paper.

```
Contents of folder my_project
=============================
├───data
│   ├───company_B
│   │       coding.csv
│   │       readme.txt
│   │       
│   ├───data_provider_C
│   │   ├───2019-11-04
│   │   │       coding.csv
│   │   │       readme.txt
│   │   │       
│   │   └───2020-03-01
│   │           coding.csv
│   │           readme.txt
│   │           
│   └───website_A
│           file1.csv
│           file2.csv
│           readme.txt
│           
├───gen
│   ├───analysis
│   │   ├───audit
│   │   │       audit.txt
│   │   │       
│   │   ├───input
│   │   │       cleaned_data.csv
│   │   │       
│   │   ├───output
│   │   │       model_results.RData
│   │   │       
│   │   └───temp
│   │           imported_data.csv
│   │           
│   ├───data-preparation
│   │   ├───audit
│   │   │       checks.txt
│   │   │       
│   │   ├───input
│   │   │       dataset1.csv
│   │   │       dataset2.csv
│   │   │       
│   │   ├───output
│   │   │       cleaned_data.csv
│   │   │       
│   │   └───temp
│   │           tmpfile1.csv
│   │           tmpfile2.RData
│   │           
│   └───paper
│       ├───audit
│       │       audit.txt
│       │       
│       ├───input
│       │       model_results.RData
│       │       
│       ├───output
│       │       figure1.png
│       │       figure2.png
│       │       tables.html
│       │       
│       └───temp
│               table1.tex
│               table2.tex
│               
└───src
    ├───analysis
    │       analyze.R
    │       get_input.txt
    │       put_output.txt
    │       
    ├───data-preparation
    │       clean_data.R
    │       get_input.txt
    │       load_data.R
    │       put_output.txt
    │       
    └───paper
            figures.R
            get_input.txt
            paper.tex
            tables.R


```

!!! revise "Description of the workflow"

    1. **Raw data** is stored in `my_project/data`, logically
        structured into data sources and backed up securely.
    2. **Source code** is written in the `src` folder, with each step of
        your pipeline getting its own subdirectory.
    3. **Generated files** are written to the `gen` folder, again with subdirectories
        for each step in your pipeline. Further, they have up to four subdirectories:
        `/input` for input files, `/temp` for any temporary files, `/output` for any
        output files, and `audit` for any auditing/checking files.
    4. **Notes** are kept on an easily accessible cloud provider, like
    Dropbox, Google Drive, or - if you're located in The Netherlands - Surfdrive.

### Download example directory structure

!!! hint
	- [Download our example directory structure here](dir_structure.zip), so you can get started right away.
	- Remember that horrible [directory and file structure](structure_phd_2013.html) from Hannes' project from back in 2013? Well, things have been getting a bit better since then, and by 2018, Hannes' project on [how streaming services change music consumption](https://pubsonline.informs.org/doi/pdf/10.1287/mksc.2017.1051) looked [like this](structure_spotify_2018.html#spotify).
	- You've seen those readme.txt's?! These are super helpful to include to [describe your project](documenting-code.md), and to [describe raw data](documenting-data.md).

### Most important data management policies by project component

!!! tip "Data management for your project's components"
    1. Raw data
        * Store where: On a secure server that project members have access to
        (e.g., could also be a network folder; later, we show to you how to use
        a variety of systems like Amazon S3, Dropbox, or Google Drive to
        "host" your raw data). No time to think about this much? Well, then
        just have your data available locally on your PC, and set yourself a
        reminder to move it to a more secure environment soon.
        * Backup policy: Regular backups (e.g., weekly)
        * Versioning (i.e., being able to roll back to prior versions): not necessary, although
        you need to store different versions of the same data (e.g., a data set delivered in 2012, an updated dataset delivered in 2015) in
        different folders.
    2. Source code
        * Store where: on Git/GitHub - which will allow you to collaborate efficiently on code
        * Backup policy: Inherent (every change can be rolled back - good if you
          want to roll back to previous versions of a model, for example)
        * Versioning: complete versioning
    3. Generated temp (temporary and output) files
        * Store where: only on your local computer.
        * Backup policy: None. These files are entirely produced on the basis of raw data and source code,
        and hence, can always be "reproduced" from 1. and 2. if they get wiped.
    4. Notes
        * Store where: anywhere where it's convenient for you! Think about tools like
        Dropbox or Google Drive, which also offer great features that you may
        enjoy when you work in a team.
        * Backup policy: Automatic backups (standard for these services)
        * Versioning: not necessary (but typically offered for free for 1 month)

<!--
!!! summary
	Each submodule contains five subdirectories:

	- `/code` for the code
	- `/temp` for any temp files that are generated on the fly
	- `/input` for any input files required to run your code (e.g., datasets)
	- `/output` for the final "output" of your module (e.g., dataset, analysis report)
	- `/audit` for some auditing files such as plots or text files, which will you allow to check whether the module was executed well.

-->
