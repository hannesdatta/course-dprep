---
bookFlatSection: true
title: "Course"
bookHidden: false
weight: 10
bookCollapseSection: true
---


# Syllabus

## Instructor

This course is instructed by [dr. Hannes Datta](https://hannesdatta.com), Associate Professor at the Marketing Department of Tilburg University. 

{{< hint info >}}
Join Hannes' professional network on [LinkedIn](https://www.linkedin.com/in/hannes-datta/), subscribe to his [YouTube Channel](https://youtube.com/c/hannesdatta), and start following him on [GitHub](https://github.com/hannesdatta) and [Twitter](https://twitter.com/hannesdatta) to stay up-to-date!
{{< /hint >}}

## Course description

### Learning goals

The increasing complexity of data (e.g., scraped from the Internet)[^1] and analytics (e.g., requiring high-performance computing) need a novel way of working to efficiently manage empirical marketing research projects. Therefore, in this course, you (1) develop your coding skills in R/RStudio (“code”), (2) collaborate on research projects using Git/GitHub (“collaborate”), and (3) automate your research pipeline end-to-end (“automate”). The three principles (“code-collaborate-automate”) are applied along the typical research workflow (i.e., data exploration, preparation, analysis, and reporting). The course specifically zooms in on engineering data sets from complex raw data and disseminate research findings in a novel way (e.g., using Markdown documents or apps).

[^1]: For example, see the data sections in these papers: [Building a user panel of music consumption from Spotify](http://tiu.nu/spotify), [Preparing a panel data set on electronics sales and marketing mix activities across thousands of brands](https://journals.sagepub.com/doi/10.1177/00222437211058102).

After successful completion of this course, you will be able to:

- Use GitHub (or similar tools) for managing empirical research projects (e.g., Issues and Project Boards)
- Use Git/GitHub (or similar tools) for versioning files and collaborating on privately-shared and publicly-available (open science) code repositories
- Use R to clean and transform data for analysis (e.g., aggregation, merging, de-duplication, reshaping, data conversions, regular expressions)
- Use R for generating automatic reports (e.g., to assess data quality, to report research findings in a paper) and deploying research findings in novel ways (e.g., apps)
- Use Workflow Management Tools to create and run portable, automated, and reproducible data pipelines

<br>
<img style="width:75%" src="dprep_framework.png" />

The specification matrix for this course can be [downloaded here](../specification_tables_dprep.pdf). This matrix gives an overview of all the learning goals and their weights in each graded component of the course (i.e., in the final exam, team project and Pulse). 

### Positioning of the course in the study program

The course is instructed to MSc students in the Marketing Analytics (TiSEM) program. Seats are also offered to interested Research Master and PhD students. Learn more about enrollment [here](enroll).


This course zooms in on ways to professionalize working on empirical research projects. Rather than focusing on one particular aspect of the research workflow (like collecting data or only conducting an analysis), this course *connects* all components of the research workflow. Along the way, students learn how to write better code (in R, especially concerning preparing complex data for analysis), collaborate in teams (using GitHub), and automate their research workflows (using the automation tool `make`).

Students are recommended to follow this course before embarking on thesis projects. Research Master and Ph.D. students are advised to take this course early on, as it will likely provide them with many tools that will help them conduct their research efficiently.

## Prerequisites

- The course is instructed to MSc students in the Marketing Analytics (TiSEM) program.
- [Preparation material](../modules/prep) is available, and students need to have acquired working knowledge in R before the start of the course. Novices may further benefit from following other courses at Tilburg University in which R is used.
- Students can use their own computer for the duration of this course (Windows, Mac, or Linux). Android/Chromebook/iOS devices are not supported. We recommend laptop with 16 GB+ of RAM as we work with larger data sets requiring preprocessing capacity. The exam is held on campus, using Windows computers. Mac and Linux users are advised to practice on the on-campus computers before the exam.

## Teaching format

- Blended (a mix of online/offline lectures and tutorials, and online/offline coaching sessions)
- Combination of self-paced tutorials (e.g., using R Notebooks or pre-recorded clips), and interactive live streams for feedback and coaching <!--(recordings are shared with students)-->
- Learn state-of-the-art tools popular among scientists, marketing analysts, and data scientists (e.g., R, GitHub, `make`)
- Open education & open science (all material is open; publicly accessible course page that stays with you, even after the end of the course)

<!--- Prepare for life-long learning (Open education (publicly accessible course page, copy-pasting code snippets and examples, starting projects with workflow templates)
- Life-long learning (course material will stay with you indefinitely
-->
<!--- Interactive, immersive and student-centred: live coding, working with real data sets <!--debates, -->
<!--, simulations, hackathon-->
<!-- work on VMs on AWS, code in SQL and R, compete on Kaggle, or work on own computer--; Coding Dojo student-=led analysis; while sharing screens-->

## Assessment

- [Team project](/docs/project) (40%, out of which 10% are based on students' individual contribution, measured by [self- and peer assessment](/docs/project/grading))
- [Computer exam](/docs/exam) (60%)


<!--
[^2]: Students use a web app to monitor their progress on the course's learning goals by "ticking off" items from a to-do list (e.g., "I have installed Python," "I have finished Tutorial X," etc.). The instructor can use the app to learn which topics to highlight during live streams. Students, in turn, can use the app to see how far others in the class have already proceeded, giving them direct feedback on their performance.

[^3]: In particular, students regularly monitor their progress on the course's learning goals. At least one evaluation per course week is required to obtain points on this component of the course grade.
-->

### Passing requirements

Students pass this course if
- the final course grade (i.e., the weighted average of the following two components: (1) the group project, and (2) the exam; weights indicated above) is ≥ 5.5, and
- the exam grade is higher than or equal to 5.0 (≥ 5.0).

Final course grades are rounded to multiples of half points (e.g., 6, 6.5, 7, etc.).

### Resit policy


- If students have a grade lower than 5.0 on the exam, they cannot pass this course.
  - Required action: Students will have to take the [exam resit](/docs/exam).
- If students are not part of a team, they cannot obtain a grade for the team project and hence cannot pass this course.
  - Required action: Re-enroll in this course's next edition, and ensure you are part of a team.
- If students have an exam grade higher or equal to 5.0 but fail the team project (after SPA correction), their total course grade may be lower than 5.5, and hence students fail this course.
  - Required action: Correct team project based on the course coordinator's grading report, and hand it in again within two weeks after publication of the final grades in this course (submission on Canvas). Only students who fail the team project can have their projects re-graded.
- Students who have passed the course, but wish to retake the exam, can take the exam resit. The highest exam grade counts. Grades for the team project are retained. In other words, the resit exam still counts for 50% of the final course grade.
- Students who fail the exam and wish to re-take the course in the subsequent semester can *retain* their assignment grades upon approval of the course coordinator (grades remain valid for the *next* edition of the course).

### Bonus points

The course is designed as an open education course, with all of its source code publicly available at [the course's GitHub repository](https://github.com/hannesdatta/course-dprep). Students can earn bonus points for contributing to the course in the form of source code (e.g., to provide solutions for assignments, to write a tutorial for a new package, for debugging code, for maintaining the course's issue board, etc.). Some contributions may also qualify for publication at [Tilburg Science Hub](https://tilburgsciencehub.com) (see also [here](https://github.com/tilburgsciencehub/website) for the platform's GitHub repository).

Bonus points are awareded to motivate students and reward excellence (e.g., students showing a performance exceeding the normally expected learning outcomes of the course). The award of bonus points can only lead to a mark-up of a sufficient grade, not of an insufficient grade. Moreover, the mark-up is not higher than 0.5 points and is only be awarded once at the level of the final grade. 

Each award of a bonus point is accompanied by an individualized argumentation (i.e. for each student). The award of bonus points is used sparsingly.


## Code of Conduct

- Please always use English as the default language so that non-Dutch speakers can follow the conversations, even if it concerns topics not directly related to the class (e.g., during breaks).
- Please head over the course's [support section](support) to solve problems or get in touch with the instructor.
- Stay up-to-date by checking this website, Canvas, and watch out for updates on Hannes' social media channels.
- Be on time, and start on time
- Feel invited to provide informal feedback!
- It's totally fine calling the instructor by his first name. 
- When meeting on Zoom, please turn on your camera, which will facilitate interaction with the course instructor and other students.


{{< hint info >}}
__We value diversity and inclusion__

We do our best to embrace diversity and stimulate integration in this course. We encourage students to be proud of their background (e.g., ethnicity, nationality), personal interest (e.g., hobbies), or any other thing that characterizes them. 

Two ways in which students can bring in *their perspective* is 

- choosing with whom to collaborate (e.g., purposefully bring in people of diverse backgrounds or technical skill levels to a team), and 
- choosing which topic to work on in the team project (e.g., spending sufficient time getting to know each other, creating a safe space, and being open to work on topics off the mainstream).

Curious to learn more? Check out [Tilburg's Diversity & Inclusion Policy](https://www.tilburguniversity.edu/about/working/gender-policy), and learn how Tilburg [supports student diversity](https://www.tilburguniversity.edu/students/studying/campus/diversity). Also feel invited to talk to the course coordinator at any point in time!

{{< /hint >}}

### Structure of the course

Please head over to the course's [modules](../modules) and check out the weekly schedule!

## More links

{{<section>}}
