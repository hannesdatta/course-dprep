---
bookFlatSection: true
title: "Syllabus"
bookHidden: false
weight: 1
description: " "
---
# Syllabus


## Learning objectives

The increasing complexity of data (e.g., scraped from the Internet)[^1] and analytics (e.g., requiring high-performance computing) require a novel way-of-working to efficiently manage empirical marketing research projects. Therefore, in this course, you (1) develop your coding skills in R ("code"), (2) collaborate on research projects using GitHub ("collaborate"), (3) automate your research pipeline end-to-end ("automate"). The three principles ("code-collaborate-automate") are applied along the typical research workflow (i.e., data exploration, preparation, analysis, and reporting), and particularly zoom in on engineering data sets from complex raw data, and disseminating research findings in a novel way (e.g., using apps).

[^1]: For example, see the data sections in these papers: [Building a user panel of music consumption from Spotify](http://tiu.nu/spotify), [Preparing a panel data set on electronics sales and marketing mix activities across thousands of brands](https://journals.sagepub.com/doi/10.1177/00222437211058102).

After successful completion of this course, you will be able to:

- Use GitHub for managing empirical research projects (e.g., GitHub Issues and Project Boards)
- Use Git/GitHub for versioning files and collaborating on privately-shared and publicly-available (open science) GitHub repositories
- Use R to clean and transform data for analysis (e.g., aggregation, merging, de-duplication, reshaping, data conversions, regular expressions)
- Use R for generating automatic reports (e.g., to assess data quality, to report research findings in a paper), and deploying research findings in novel ways (e.g., apps)
- Use Workflow Management Tools to create and run portable, automated and reproducible data pipelines
- Track, evaluate and share your progress on the course's learning goals

## Format

- Online-only
- Combination of self-paced tutorials (e.g., using R Notebooks), and interactive live streams for feedback and coaching (recordings are shared with students)
- Learn state-of-the-art tools popular among scientists, marketing analysts and data scientists (e.g., R, GitHub)
- Open education & open science (all material is open; publicly accessible course page that stays with you, even after the end of the course)

<!--- Prepare for life-long learning (Open education (publicly accessible course page, copy-pasting code snippets and examples, starting projects with workflow templates)
- Life-long learning (course material will stay with you indefinitely
-->
<!--- Interactive, immersive and student-centred: live coding, working with real data sets <!--debates, -->
<!--, simulations, hackathon-->
<!-- work on VMs on AWS, code in SQL and R, compete on Kaggle, or work on own computer--; Coding Dojo student-=led analysis; while sharing screens-->

## Student profile / prerequisites

- The course is instructed to MSc students in the Marketing Analytics (TiSEM) program.
- The course expects students to have acquired working knowledge in R (e.g., from introductory courses at Datacamp).
- The course welcomes novices, of whom __extra preparation prior to the start of the course is expected.__ Preparation material will be shared with students in advance in the form of R Notebooks or course recommendations at Datacamp. Novices may further benefit from following other courses at Tilburg University in which R is used.
- Students are recommended to use their own computer for this course (Windows, Mac or Linux). Android/Chromebook/iOS devices are not supported. Moreover, we highly recommend a computer with at least 8 GBs of RAM memory as we'll work with large data sets that require significant preprocessing.


## Grading

- Exam, taken on a computer (55%)
- Team project (4-5 team members), with self- and peer assessment (see below) (40%)
- Tracking, evaluating, and sharing one's progress on the course's learning goals

Students pass this course if
- the final course grade (i.e., the weighted average of the group project and exam; weights indicated above) is ≥ 5.5, and
- the exam grade is higher than or equal to 5.0 (≥ 5.0).

Final course grades are rounded to multiples of half points (e.g., 6, 6.5, 7, etc.).

<!--Grades are made available on Canvas.
-->

## Resit policy

Students can fail this course in three situations:

1. If students do not pass the exam, they cannot pass this course.
        Required action: Students will have to take the exam resit.
    If students are not part of a team, they cannot obtain a grade for the team project, and hence cannot pass this course.
        Required action: Re-enroll in this course’s next edition, and ensure you are part of a team.
    If students pass the exam, but fail the team project (after SPA correction), their total course grade may be lower than 5.5, and hence students fail this course.
        Required action: Correct team project on the basis of the course coordinator’s grading report, and hand it in again within 2 weeks after publication of the final grades in this course (submission on Canvas). Only students who fail this course are eligible to have their team projects re-graded.

### Team project

Students will work on a team project throughout the course.

Students' individual grades will be corrected upwards or downwards, depending on their individual contribution to the overall team effort (e.g., measured by means of scoring themselves and their team members on, among others, the quantity and quality of their contributions)



<!--
- their individual contribution to the overall team effort (measured by means of scoring themselves and their team members on, among others, the quantity and quality of their contributions), and
- students' individual investment in developing the technical skills required to contribute meaningfully to the project (measured by means of students' individual submissions of answers to the tutorials/data challenges).

-->



<!--
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

-->

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
