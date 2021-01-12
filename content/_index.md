---
title: Introduction
type: docs
---

# Data preparation and Workflow Management (dPrep)

**Engineer data sets from complex raw data and manage research projects efficiently**

_Tilburg University, Block 3, 2020/2021 (February - April 2021)_

_Instructor: [dr. Hannes Datta](https://hannesdatta.com)_




## Learn how to prepare data for empirical analysis

Welcome to the course website of dPrep. This course teaches you how to engineer data sets for statistical analysis. Many students and researchers perceive the process of “creating” a data set for analysis as rather simplistic: a bit of cleaning here, a bit of merging there, and you’re done. In this course, we take data preparation to the next level, by considering *highly complex data preparation workflows* (think multiple sources, structured and unstructured data, data from databases and data from files, multiple delivery batches, lots of missing data, different file versions, etc.). Throughout the course, we'll be using workflow principles of reproducible science that are documented at [Tilburg Science Hub](http://tilburgsciencehub.com). 

## This website

This website is the backbone of the course, and features the following main sections.

- The __course__ section holds a list of weekly [modules](docs/course/modules), consisting of live streams, readings, and prerecorded clips. Even if you're not enrolled in this course, you can watch these clips, but interaction with the course instructor is reserved for enrolled students only.

- The [__tutorial__](docs/tutorials) section offers a workflow for collecting online data, and self-guided Jupyter Notebooks that teach the *basics* of data retrieval via web scraping and APIs. Use these to start your own scraping projects!

<!--- Finally, the [__building block__](docs/snippets) section offers a collection of code snippets in Python that you can use to build and extend your own scrapers and API retrieval projects.
-->


## Enroll in this class

- Head over to the [course syllabus](docs/course/syllabus) for all the details. The course offers seats to Research Master and PhD students from outside of Tilburg University.

- Curious about obtaining a MSc degree? Then explore the [Marketing Analytics program](https://www.tilburguniversity.edu/education/masters-programmes/marketing-analytics), offered by faculty of Tilburg University's [Marketing Department](https://tilburguniversity.edu/marketing).

- Want to pursue a PhD at Tilburg University? Check out the [Research Master in Business - Marketing track](https://www.tilburguniversity.edu/education/masters-programmes/research-master-marketing).

<!--


# Some more content notes (to be integrated elsewhere)

## Possible activities

- Data collection pitch (group) / presentation
- Legal battle + anonymization outcome
- Building a prototype for either a web scraper or API
- Deployment as large project with the team
- Data sharing / auditing of data
- Real-time analytics (use database (learnt here), in combination with research method (e.g., regression), to create insights in realtime

session chair, presentations, pitches, discussions
-->


<!--
## Glossary search

Already know what you're looking for? Search the __Glossary__ here.



Comments Roy:
- voorkennis eigenlijk verplicht

QUESTIONS SUSAN:
- dprep eerst laten lopen, dan pas web scraping
- niveau toetsen met python; entry exam ("encore")
- voorgangstoets

- duidelijk maken dat het geen peer review is!


- no need to prep each and every "deep" level

SESSIONS
++++++++

1) open session + #1 website exploration

2) website pitches from teams + advice on what could be interesting research settings/questions, or how data could be linked to other sources

-- SELF STUDY: prototype scraping

3) #2 Prototype: proof of concept laten zien
+ LECTURE: deployment

-- SCRAPER #3 deployment, databases [...]

4) Feedback

5) SESSION: #4 Data sharing, documentation

6) Poster session w/ powerpoint/ "verhaal" maken

-->


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

- Group project (4-5 team members) with self- and peer assessment [^2] (40%)
<!-- submitted as a GitHub repository (during the course); building a dataset-->
- Computer exam (60%)
<!--[or, take-home exam?] (can do 40%?) with a passing threshold?-->
<!--
- Share progress and learnings (e.g., open science contributions in the form of course-relevant contributions in the form of pull requests to GitHub, maintaining a public FAQ/blog, sharing one's progress with the group) (20%) [[[???]]]
-->

Students pass this course if the final course grade (i.e., the weighted average of the group project and exam; weights indicated above) is ≥ 5.5, and the exam is passed (≥ 5.5).

[^2]: The team project is subject to *self- and peer assessment*, i.e., students' grades will be corrected upwards or downwards, depending on their own contribution to the overall team effort. Students provide written feedback to each other once during the course, and score themselves and their team members on, among others, the quantity and quality of their contributions.


## Format

- Hybrid format: Jupyter notebooks or pre-recorded web clips for preparation and self-paced lab sessions; live streams on Zoom for feedback and joint coding sessions (recordings will be made available)
- Modern content: copy-paste code snippets and demos from the course page, access code on GitHub, start projects with workflow templates
- Interactive, immersive and student-centred: live coding, hackathon, debates, working with real data sets

<!--, simulations, hackathon-->
<!-- work on VMs on AWS, code in SQL and R, compete on Kaggle, or work on own computer--; Coding Dojo student-=led analysis; while sharing screens-->

## Student profile / prerequisites

- The course is instructed to MSc students in the Marketing Analytics (TiSEM) program.
- The course expects students to have acquired working knowledge in R (e.g., from introductory courses at Datacamp).
- The course welcomes novices, of whom extra preparation prior to the start of the course is expected. Preparation material will be shared with students in advance in the form of R Notebooks or course recommendations at Datacamp. Novices may further benefit from following other courses at Tilburg University in which R is used.
- Students are recommended to use their own computer for this course (Windows, Mac or Linux). Android/Chromebook/iOS devices are not supported.


## Enrollment and Obtaining Course Credits

- The course (3 ECTS) will be taught in the Marketing Analytics Program at Tilburg University (please check Osiris for the specifics). The course code is 328059-M-3.
- Interested Research Master or PhD students who seek to advance their data collection skills are encouraged to apply for a seat.
  - Students from Tilburg University can enroll in this course upon the approval of [the instructor](mailto:h.datta@tilburguniversity.edu) and their coordinator (please notify the course coordinator by 15 December 2020).
  - Students outside of Tilburg University are invited to audit this course. For admission, please [email](mailto:h.datta@tilburguniversity.edu) a brief research statement and motivation of why you want to join this class, and your CV by 15 December 2020. Eligible candidates will be notified via email by 22 December 2021.

## License

This course is licensed under a [Creative Commons Attribution-NonCommercial 4.0 International License](http://creativecommons.org/licenses/by-nc/4.0/). In other words, you're invited to contribute to it, or even copy and modify it to suit your needs.

Spread the word about this open education initiative!

![Creative Commons Licence](https://i.creativecommons.org/l/by-nc/4.0/88x31.png)
