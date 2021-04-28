---
bookFlatSection: true
title: "Syllabus"
bookHidden: false
weight: 1
description: " "
---
# Syllabus


## Learning objectives

Data sets (e.g., retrieved from a company's database, collected via surveys, or
scraped from the Internet) need to undergo a careful cleaning and transformation
procedure before they can be used in empirical research projects [^1]. Therefore, in this course, you familiarize yourself with data structures common in empirical marketing research, and learn how to efficiently engineer complex data sets and document
them for reusability/reproducibility.

[^1]: For example, see the data sections in these papers: [Building a user panel of music consumption from Spotify](http://tiu.nu/spotify), [Preparing a panel data set on electronics sales and marketing mix activities across thousands of brands](https://research.tilburguniversity.edu/en/publications/universality-or-differences-in-marketing-elasticities-in-emerging).

After successful completion of this course, you will be able to:

- Use R to read in various data formats for further processing
- Apply common data operations in R to transform and clean your data (e.g., aggregation, merging, de-duplication, reshaping, date conversions, regular expressions)
- Use basic programming concepts to increase speed and minimize errors (e.g., looping, vectorization, writing functions, handling errors/debugging)
- Operationalize variables/engineer features from numerical, textual, and visual raw data
- Store and manage data using file-based systems and databases
- Use workflow management techniques to create and audit automated and reproducible data pipelines
- Version code and manage and contribute to GitHub repositories
- Document and archive final data sets, and learn how to make them available for public (re)use


## Format

- Hybrid format: R notebooks or lessons on Datacamp.com for preparation and self-paced lab sessions; live streams for feedback and joint coding sessions (recordings will be made available)
- Modern content: copy-paste code snippets and demos from the course page, access code on GitHub, start projects with workflow templates
- Interactive, immersive and student-centred: live coding, hackathon, working with real data sets <!--debates, -->

<!--, simulations, hackathon-->
<!-- work on VMs on AWS, code in SQL and R, compete on Kaggle, or work on own computer--; Coding Dojo student-=led analysis; while sharing screens-->

## Student profile / prerequisites

- The course is instructed to MSc students in the Marketing Analytics (TiSEM) program.
- The course expects students to have acquired working knowledge in R (e.g., from introductory courses at Datacamp).
- The course welcomes novices, of whom extra preparation prior to the start of the course is expected. Preparation material will be shared with students in advance in the form of R Notebooks or course recommendations at Datacamp. Novices may further benefit from following other courses at Tilburg University in which R is used.
- Students are recommended to use their own computer for this course (Windows, Mac or Linux). Android/Chromebook/iOS devices are not supported. Moreover, we highly recommend a computer with at least 8 GBs of RAM memory as we'll work with large data sets that require significant preprocessing.



<!--  - Project management on GitHub (versioning, issue management, collaboration)
<!-- plugin R for using Git -->
<!--  - Advanced file I/O: Data formats (e.g., CSV, JSON), systems (e.g., file-based, structured and unstructured databases), and local vs. remote architectures-->
<!--  - Data pipelines
  - Automation using `make`
  - Command-line scripting
--><!-- by producing log files and diagnostic tables and figures
<!--      - Logging into audit txt files
      - Generation of Latex and Word output
      - Report preparation in latex/Overleaf

      - Assess data quality by means of log files and automatically generated tables and figures

(e.g., command-line scripting, automation using `make`)


- Store and manage structured and unstructured data in file-based systems and databases


structured (e.g., CSV, XLSX) and unstructured (e.g., JSON) raw data from multiple sources (e.g., files, databases) for further processing

's `data.table` and `dplyr`


<!--panel data vs cross sectioneel; pair-wise; unit-of-analysis -->

<!-- exercises suggested by roy:

1) this is what i want as an output; this is the input. Do it
2) this is code that doesn't work; fix it so that I can get what I want to get.


-->
<!-- Basic R:
- load packages
- ...
-->

<!--  - Externally (EC2, launching instances, manage HPC code)
Work on VMs on AWS, code in SQL and R, compete on Kaggle, or work on own computer--; Coding Dojo student-=led analysis; while sharing screens-->
<!--
  - Logging/monitoring
    - Dynamic output:
      - Shiny
      - NodeJS/dynamic graphs
--><!--, work on virtual machines on AWS EC2, and write basic code in SQL-->

<!--, MySQL, MongoDB and Amazon Web Services (AWS) EC2 and S3-->

## Grading

- Group project (4-5 team members) with self- and peer assessment (see below) (40%)
<!-- submitted as a GitHub repository (during the course); building a dataset-->
- Computer exam (60%)


Students pass this course if the final course grade (i.e., the weighted average of the group project and exam; weights indicated above) is ≥ 5.5, and the exam is passed (≥ 5.5).

### Team project

Students will submit a final team project at the end of the course.

Students' individual grades will be corrected upwards or downwards, depending on
- their individual contribution to the overall team effort, and the extend to which they have provided feedback to team members (measured by means of scoring themselves and their team members on, among others, the quantity and quality of their contributions), and
- students' individual investment in developing the technical skills required to contribute meaningfully to the project (measured by means of students' individual submissions of answers to the tutorials/data challenges).

{{< hint info >}}
__Calculation of individual grades from team grades__

1. Students score themselves and other team members on the following questions (answered on a scale between 1 = lowest, and 5 = highest)
  - How was the pro-active attitude of the student?
  - How was the student as a team player?
  - How was the quantity of the contribution (e.g., time, energy) of the student?
  - How was the quality of the contribution of the student?
  - How was the quality of feedback to team members given by the student?

2. Compute average score from (1) for each student within a team, across all questions. ("How did team members rate the focal student?")

3. Compute average team effort score, by averaging (within each team) the scores obtained in (2). ("What was the overall team effort?")

4. Compute students' self- and peer assessment score (`SPAscore`), by dividing each student's score by the team average. ("How did the student perform, relative to the overall team effort?"

5. Multiply the `SPAscore` by 1.05 if the focal student has provided proof of skill investment (at least three submissions on Canvas).

6. Correct team grades using the following formula:

      {{< katex display >}}
      finalgrade = w * teamgrade + (1-w) * SPAscore * teamgrade
      {{< /katex >}}

  where w is set to .8, weighting individual performance against a team's overall performance.


{{< /hint >}}


<!--
*, i.e., students' grades will be corrected upwards or downwards, depending on their own contribution to the overall team effort. Students provide written feedback to each other once during the course, and score themselves and their team members on, among others, the quantity and quality of their contributions.
-->

<!-- submitted as a GitHub repository (during the course); building a dataset-->
<!--[or, take-home exam?] (can do 40%?) with a passing threshold?-->
<!--
- Share progress and learnings (e.g., open science contributions in the form of course-relevant contributions in the form of pull requests to GitHub, maintaining a public FAQ/blog, sharing one's progress with the group) (20%) [[[???]]]
-->

## Enrollment and Obtaining Course Credits

- The course (3 ECTS) will be taught in the Marketing Analytics Program at Tilburg University (please check Osiris for the specifics). The course code is 328059-M-3.
- Interested Research Master or PhD students who seek to advance their data collection skills are encouraged to apply for a seat.
  - Students from Tilburg University can enroll in this course upon the approval of [the instructor](mailto:h.datta@tilburguniversity.edu) and their coordinator (please notify the course coordinator by 15 December 2020).
  - Students outside of Tilburg University are invited to audit this course. For admission, please [email](mailto:h.datta@tilburguniversity.edu) a brief research statement and motivation of why you want to join this class, and your CV by 15 December 2020. Eligible candidates will be notified via email by 22 December 2021.
