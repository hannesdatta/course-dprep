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

1. Please download the [`datasets.RData` workspace](../datasets.RData) file from the exam cover page and open it in RStudio. Please answer the following questions using the objects in this R workspace.
    1. Please use the dataset stored in `data1`. Using `dplyr`, reshape this dataset from wide to long, and store it in a new object, called `q1`. Paste the code snippet with the solution below.
    2. Please use the dataset stored in `data2`. Using `dplyr`, please create an aggregated dataset, taking an average of `variable1` and `variable2` for all users in the data (i.e., you obtain a dataset with the number of rows equal to the number of users in the data).
    3. Please take a look at `data3`. Please propose which data preparation steps are necessary to clean this data.
    ```
    # Solution:
    library(tidyverse)
    q1 <- data1 %>%
      pivot_longer(cols = starts_with("X202"),
      names_prefix='X', 
      names_to = "year", 
      values_to = "review_score")
    
    q2 <- data2 %>% group_by(user_id) %>% 
       summarize(mean_var1=mean(variable1), mean_var2=mean(variable2))

    # q3:
    summary(q3)

    # There are missing observations for price and number_of_reviews;
    # these cases could either be deleted or set to the sample average.

    # In addition, host_response_rate is a character column, but should
    # be converted to a numeric column. In so doing, it's important to 
    # drop the %-sign, and also decide what to do with the NA.
    ```

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

4. Please [download and unzip the research pipeline](practice_workflow.zip) of an empirical project and answer the following questions. To receive points on this question, you need to zip and upload the updated research pipeline for grading. 

      1) Please run make as is. Then, fix any errors that prevents make from knowing it is "up-to-date" (i.e., make may have built the entire project, but continues to re-execute the workflow even if run successfully) (5P).

      2) The make pipeline is not properly configured (i.e., one call to all scripts, rather than subsequent "built recipes" that tie all source code files together). Please fix the makefile such that the entire project is being built and that all dependencies are correctly defined. (10P)

      3) You may recall the value of creating subdirectories to structure your project. Create the necessary subdirectories and update your makefile so that it works on this new directory structure. (5P)

      Requirements/tips
      - Recall make is always executing the "first" recipe it encounters.
      - If you need to create new directories from within R, you can use `dir.create('directory_name')`.
      - Please use the Windows Command Prompt or Anaconda Prompt to run R or make from the command prompt. When using the command prompt through the terminal in RStudio, it may happen that some of the installed packages cannot be found.


4. Other example questions.
      1. Please name three ways to deploy one's research findings. (*knowledge*) 
     
      Solution: via an app (e.g., dashboard), an API, via a Quarto document/PDF-rendered RMarkdown document (other options possible as well).
      2. What are the main benefits of exploring data using RMarkdown documents, compared to “point-and-click” interfaces (e.g., SPSS), or manually investigating data by issuing commands in the R terminal? (*comprehension*)
     
     Solution: You can easily generate professional-looking documents that are ready to share with non-technical colleagues. Unlike manual investigation or point-and-click methods, writing everything in code ensures consistent results when the code is re-run. Additionally, the code clearly documents each step taken, enhancing both the transparency and the understanding of the final output.
     
      3. What are the benefits from automating pipelines, compared to manually executing source code files? (*comprehension*)
      
      Solution: Automating pipelines makes everything more consistent and saves time by running the same steps every time without mistakes. It also helps handle larger tasks easily, keeps things organized, and makes it easier to spot errors. Plus, it’s great for teamwork because everyone follows the same process.
      
      4. Please view the code snippet below and assess the completeness of the script with regard to the Setup-ITO components of a source code file. Can you identify any missing piece in the code? (*analysis*)

      ```
      library(dplyr)
      df <- read.csv('data.csv')
      df <- df %>% filter(age >= 18)
      ```
      Solution: Following the Setup-ITO process, the "output" step is missing (e.g., `write_csv(df, file = 'output.csv')`). Additionally, the code snippet uses `read.csv` instead of `read_csv`, which can result in slower performance.

      5. Please assess whether the makefile below will correctly work when you type "make" in the `\code` folder of this project. (*analysis*)

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
 
      Solution: The `makefile` is incorrectly configured due to incorrect relative directories. While the `makefile` will be found in the working directory (`code`), and it will successfully run `load.R` (since it’s also in the same directory), the workflow won’t be recognized as complete. This is because `make` expects the target to be in `data/dataset.csv`, whereas it should be relative to the current working directory, i.e., `../data/dataset.csv`. Furthermore, `load.R` might not run at all if its inputs are incorrectly pointed to `data/dataset.csv` instead of `../data/dataset.csv`.