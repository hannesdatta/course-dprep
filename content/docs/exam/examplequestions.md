---
title: "Example questions"
bookFlatSection: true
bookHidden: false
weight: 5
draft: false
---

# Example questions

Questions will be asked along the course's learning goals, and complexity levels (e.g., knowledge, application, evaluation). For details, see [here](../exam#content).

Below, you can find a few example questions, which will be discussed with students in the final live stream of this course.


## Theoretical part

{{< hint warning >}}

This part of the exam consists of __personalized open and closed (multiple-choice) questions__, shown in __random order__. You can freely go back and forth between these questions.

{{< /hint >}}
![](../dprep_part1.png)

*Note: the number of questions depends on the points awarded to each question. The instructions during the final exam may slightly vary, so make sure to still read it accordingly.*

1. Please name a tool that can be used to automate workflows. (*knowledge*)

2. Please name three ways to deploy one's research findings. (*knowledge*)

3. What are the main benefits of exploring data using RMarkdown documents, compared to “point-and-click” interfaces (e.g., SPSS), or manually investigating data by issuing commands in the R terminal? (*comprehension*)

4. What are the benefits from automating pipelines, compared to manually executing source code files? (*comprehension*)

5. Please view the code snippet below.

```
library(dplyr)
df <- read.csv('data.csv')
df <- df %>% filter(age >= 18)
```
Please assess the completeness of the script with regard to the ITO components of a source code file. Can you identify any missing piece in the code? (*analysis*)

6. Please assess whether the makefile below will run when you type "make". (*analysis*)

__Directory Structure__
```
\readme.md
\code\makefile
\code\load.R
\data\dataset.csv
```
__Makefile__
```
data/dataset.csv: load.R
      R --vanilla < load.R
```

![](../dprep_overview.png)

## Practical part

{{< hint warning >}}

This part of the exam consists of __personalized open questions__, shown in __random order__. You can freely go back and forth between these questions.

{{< /hint >}}

![](../dprep_part2.png)

*Note: the instructions during the final exam may slightly vary, so make sure to still read it accordingly.*

### Question 1

Imagine you have just enrolled as a thesis student, and you receive the following email from your advisor:

{{< hint >}}

Dear (name of student),

I really look forward to working with you on this exciting dataset, capturing the consumption of music on Spotify. I scraped it from spotifycharts.com a while ago.

As a starting point, please explore the data set using RMarkdown. I’d love to learn more about the data myself (haven’t looked into it yet) - maybe you can figure out a way to shed some light on how the start of the global pandemic (let’s assume that was March 2020) affected music consumption?

Please render your RMarkdown as a PDF document. Please keep any code that you’re writing (e.g., to load the data, or to explore and do some minor data preparations) visible so I can learn from it!

{{< /hint >}}

Submit your PDF document for question 1, and provide a conclusion on the suitability of the explored data for the research question? (*analysis*)

### Question 2

Imagine you are a research assistant at Tilburg University, and you receive the following email from your project supervisor:

{{< hint >}}

Dear (name of student),

Tilburg University is on its way to not only publish papers, but also the code that generated the results. That’s extremely important for open science - i.e., allowing others to reproduce findings. In the attachment (download here), I’m sending you the code of my empirical project. Admittedly, it’s not very well structured (e.g., directory structures are absent), but at least I have a common R file ([run.R](https://github.com/hannesdatta/course-dprep/blob/master/content/docs/modules/week5/tutorial/run_antwerp.R)) that ties all the parts together.

Starting from `run.R`, can you apply your learnings from dPrep, and submit a link to a new repository in which you...

- Create a proper directory structure (e.g., pipeline stages, see `run.R` for some ideas),
- Separate source code from generated files,
- Have a proper readme at the repository (in an `.md` file),
- Ignore files that should not be versioned using .gitignore, and
- remove `run.R` and replace it by a proper makefile for this project.

I really look forward seeing your work. Your deliverable is just a link to a (private!) GitHub repository, provided in the answer box below.

{{< /hint >}}

a) Please submit your GitHub link with your end-to-end GitHub workflow using make (*application*)

b) How could you determine whether the GitHub workflow runs well, beyond merely executing it yourself? (*evaluation*)


<!--

{{< hint info >}}

__This section is still work-in-progress (i.e., we are still adding examples and add code/data where needed).__

{{< /hint >}}
-->
