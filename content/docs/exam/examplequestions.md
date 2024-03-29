---
title: "Example questions"
bookFlatSection: true
bookHidden: false
weight: 5
draft: false
---

# Example questions

Questions will be asked along the course's learning goals, and complexity levels (e.g., comprehension, application, synthesis, evaluation). For details, see [here](../exam#content).

Below, you can find a few example questions, which will be discussed with students in the final live stream of this course.

{{< hint warning >}}

This exam consists of __open and closed (multiple-choice) questions__. You can freely go back and forth between these questions.

{{< /hint >}}
![](../dprep_part1.png)
![](../dprep_part2.png)

*Note: the number of questions depends on the points awarded to each question. The instructions during the final exam may slightly vary, so make sure to still read it accordingly.*

1. Please download the `datasets.RData` workspace file from the exam cover page and open it in RStudio. Please answer the following questions using the objects in this R workspace.
    1. Please use the dataset stored in `data1`. Using `dplyr`, reshape this dataset from wide to long. Paste the code snippet with the solution below.
    2. Please use the dataset stored in `data2`. Using `dplyr`, please create an aggregated dataset, taking an average of `variable1` and `variable2` for all users in the data (i.e., you obtain a dataset with the number of rows equal to the number of users in the data).
    3. Please take a look at `data3`. Please propose which data preparation steps are necessary to clean this data.
2. Imagine you have just enrolled as a thesis student, and you receive the following email from your advisor. Submit your PDF document, and provide a conclusion on the suitability of the explored data for the research question.

{{< hint >}}

Dear (name of student),

I really look forward to working with you on this exciting dataset, capturing the consumption of music on Spotify. I scraped it from spotifycharts.com a while ago. Please download this `data.zip`, which contains a stripped-down version of an RMarkdown file and the data. 

As a starting point, please explore the data set using RMarkdown. I’d love to learn more about the data myself (haven’t looked into it yet) - maybe you can figure out a way to shed some light on how the start of the global pandemic (let’s assume that was March 2020) affected music consumption?

Please render your RMarkdown as a PDF document. Please keep any code that you’re writing (e.g., to load the data, or to explore and do some minor data preparations) visible so I can learn from it!

{{< /hint >}}

3. Please download the `github_repository.zip` file from the exam cover page and unzip it to a folder on this computer. Open this folder using Git Bash. Imagine you are a research assistant at Tilburg University, and you receive the following email from your project supervisor. Please submit your Git repository, by zipping the folder and uploading it here. 

{{< hint >}}

Dear (name of student),

Tilburg University is on its way to not only publish papers, but also the code that generated the results. That’s extremely important for open science - i.e., allowing others to reproduce findings. In the attachment (download here), I’m sending you the code of my empirical project. Admittedly, it’s not very well structured (e.g., directory structures are absent), but at least I have a common R file ([run.R](https://github.com/hannesdatta/course-dprep/blob/master/content/docs/modules/week5/tutorial/run_antwerp.R)) that ties all the parts together.

Starting from `run.R`, can you apply your learnings from dPrep, and submit a link to a new repository in which you...

- Create a proper directory structure (e.g., pipeline stages, see `run.R` for some ideas),
- Separate source code from generated files,
- Have a proper readme at the repository (in an `.md` file),
- Ignore files that should not be versioned using .gitignore, and
- remove `run.R` and replace it by a proper makefile for this project.
- throughout, make use of frequent commits and commit messages.

I really look forward seeing your work. Your deliverable is the zipped Git repository, which you can upload in the answer box below.

{{< /hint >}}

4. Other example questions.
      1. Please name three ways to deploy one's research findings. (*knowledge*)
      2. What are the main benefits of exploring data using RMarkdown documents, compared to “point-and-click” interfaces (e.g., SPSS), or manually investigating data by issuing commands in the R terminal? (*comprehension*)
      3. What are the benefits from automating pipelines, compared to manually executing source code files? (*comprehension*)
      4. Please view the code snippet below and assess the completeness of the script with regard to the ITO components of a source code file. Can you identify any missing piece in the code? (*analysis*)

      ```
      library(dplyr)
      df <- read.csv('data.csv')
      df <- df %>% filter(age >= 18)
      ```

      5. Please assess whether the makefile below will run when you type "make". (*analysis*)

      {{< hint >}}
      Directory Structure:
      
      \readme.md
      \code\makefile
      \code\load.R
      \data\dataset.csv
     
      Makefile:
      
      data/dataset.csv: load.R
            R --vanilla < load.R
      
      {{< /hint >}}
      