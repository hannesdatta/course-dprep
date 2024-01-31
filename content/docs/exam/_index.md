---
bookFlatSection: true
title: "Exam"
bookHidden: false
weight: 45
bookCollapseSection: true
---

# Final exam

The course content will be tested in the form of a computer exam, taken on campus (3 hours).

## Date & time

### Main sit

- On campus, 3 hours: {{< param "Course_Exam_MainsitTheory" >}}
- Exam registration: via Osiris
<!--- Time: __9.00am - 12pm (i.e., 11.59am + 1 minute)__ (Amsterdam time, you can start when you want, but *must* submit before the deadline)-->

### Resit

- On campus, 3 hours: {{< param "Course_Exam_ResitTheory" >}}
- Exam registration: via Osiris

<!--- Time: __9.00am - 12pm (i.e., 11.59am + 1 minute)__ (Amsterdam time, you can start when you want, but *must* submit before the deadline)-->

## Technicalities & support

- Receiving your exam: via [TestVision](https://TilburgU.testvision.nl/online/kandidaten) on the examination dates.
- Working on your exam: on a computer at the University.
- Submitting your exam: all questions (including file uploads) will be submitted via TestVision
<!--
- Support during the practical part of the exam: preferably WhatsApp [see support section of this website](/docs/course/support); Support only for "unforeseen" errors. No support will be given for technical issues that students *should* have solved during the course (e.g., installation of R or `make`, installing packages, running Python code in an automated workflow, etc.)
-->

## Form

- On-campus exam (closed book except selected course material that students can download on the instruction page of the exam)
- Several sections with subquestions (all open questions; both in written, or by means of code/file uploads)
<!--- Some questions will be personalized (i.e., there is only one correct answer per student)
-->

{{< hint warning >}}

- Communication with anybody about the exam content is strictly prohibited.
- Students must not copy-paste from websites, academic papers. The use of ChatGPT or similar AI-based tools is only allowed if stated explicitly for selected questions on the pratical part of the exam (given questions permit the use of the internet).
- Students must not mention their names or student numbers in any of the submitted files, except when being explicitly asked to do so. This is to ensure the exam can be graded anonymously.

{{< /hint >}}


## Content

### Theoretical questions

- This part of the exam consists of __personalized open and closed (multiple-choice) questions__, shown in __random order__ (i.e., not in order of difficulty or weight/points).
<!--- Students __*cannot* go back between questions__ (i.e., questions need to be answered in the order in which they appear).-->
<!--- Allocate approximately 45 minutes to work on this part.-->
- Cognitive skills that will be tested are knowledge, comprehension, and analysis.

### Practical questions

- This part of the exam consists of __personalized open questions__, shown in __random order__ (i.e., not in order of difficulty or weight/points).
- Expect two questions (potentially w/ smaller subquestions), mixing "mix" various learning goals. For example:
  - Work on an issue posted at a publicly available GitHub repository, which focuses on data exploration and transformation (e.g., using RMarkdown, tidyverse).
  - Automate an existing workflow, and cast it into a repository structure that you share (privately) with the course coordinator for grading. Alternatively, add a module to an existing workflow (e.g., regression analysis), and integrate new module in automation pipeline.
  - Cognitive skills that will be tested are application, evaluation, and synthesis/creation.

## Preparing for the exam

### Ideas for developing your proficiency

- Please work through the tutorials. While this has been difficult in when you did it for the first time, can you do it on your own now?
- Share with each other the (public) links to your teams' GitHub repositories. Fork them, clone them to your computers, and then try to run them using `make` (and reading the readme).
  - Can you run the workflows of others?
  - Work on the project of others (e.g., by creating a new feature branch, improving code, committing to your fork, and making a PR) - "receiving teams": revise the work of others and integrate the PRs.
  - Add "deployment" steps in your forks, e.g., by adding an app to somebody's regression, or adding a regression to somebody's app
- Create your own, end-to-end GitHub workflow using the publicly available AirBnB data that teams could use for their projects. Fork that repository and collaboratively work on it with everyone!
- Familiarize yourself with [Tilburg Science Hub](https://tilburgsciencehub.com)
  - Work through tutorials
  - Integrate new building blocks into your projects
  - Clone the examples and extend them

Above all, see this exam preparation *not* as a way to merely study for the exam, but as a way to further develop and make more accessible your existing skill set.

### Work on the example questions

Please [view the list of example questions here](examplequestions).

### Familiarize yourself with TestVision

- [Take a practice test](https://oefentoetsen.testvision.nl/online/fe/login_ot.htm?campagne=tlb_demo_eng&taal=2) to familiarize yourself with TestVision!
- Learn [more about TestVision](https://www.tilburguniversity.edu/students/studying/exams/e-assessment/testvision)

### Technical tips & beyond

- Verify your software setup (you should be able to produce RMarkdown documents as PDF documents, run `make`, and even run existing Python code on your computer).
- Know how to zip and unzip files
- Make use of cheat sheets (e.g., available on this site, or elsewhere) (you can also print them)
- Revise your code before submission, so that you ensure it runs from top to bottom without problems.

<!--

{{< hint info >}}
__Stay up-to-date__

As we develop the exam questions, please keep an eye on the content of this page for important updates (e.g., with regard to the questions asked, any new tips & tricks that will help you to work on the questions, any example questions, etc.)

{{< /hint >}}
-->
