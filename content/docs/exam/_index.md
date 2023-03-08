---
bookFlatSection: true
title: "Exam"
bookHidden: false
weight: 45
bookCollapseSection: true
---

# Final exam

The course content will be tested in the form of a computer exam, consisting of a __theoretical part__ (on campus, 1 hour), and a __practical part__ (take-home exam, 2 hours). 

## Date & time

### Main sit

- Date: __{{< param "Course_Exam_MainsitTheory" >}}__ (theoretical part, on campus), and __{{< param "Course_Exam_MainsitPractice" >}}__ (practical part, on campus).
- Time: to be announced (see also Osiris)
<!--- Time: __9.00am - 12pm (i.e., 11.59am + 1 minute)__ (Amsterdam time, you can start when you want, but *must* submit before the deadline)-->
- Exam registration: via Osiris

### Resit

- Date: __{{< param "Course_Exam_ResitTheory" >}}__ (theoretical part, on campus), and __{{< param "Course_Exam_ResitPractice" >}}__ (practical part, on campus).
- Time: to be announced (see also Osiris)
<!--- Time: __9.00am - 12pm (i.e., 11.59am + 1 minute)__ (Amsterdam time, you can start when you want, but *must* submit before the deadline)-->
- Resit exam registration: via Osiris

## Technicalities & support

- Receiving your exam: via [TestVision](https://TilburgU.testvision.nl/online/kandidaten) on the examination dates.
- The exam consists of two parts, which you will have to work on in "separate" exams:
  - The theoretical part needs to be finished within one hour (for timings, see Osiris).
  - The practical part is open for two hours (exact timing tba).
- Working on your exam: on a computer at the University (theoretical part, on campus), on your computer (practical part, take-home).
- Submitting your exam: all questions (including file uploads) will be submitted via TestVision
- Support during the practical exam: preferably WhatsApp [see support section of this website](/docs/course/support); Support only for "unforeseen" errors. No support will be given for technical issues that students *should* have solved during the course (e.g., installation of R or `make`, installing packages, running Python code in an automated workflow, etc.)


## Form

- On-campus exam (theoretical part), and open book take-home exam (practical part; i.e., for this part, you can access any material you find helpful, including material you have stored on your computers, or that you find on the internet).
- several sections with subquestions (all open questions; both in written, or by means of code/file uploads)
- Some questions will be personalized (i.e., there is only one correct answer per student)

{{< hint warning >}}

- Communication with anybody about the exam content, during *and after* the take-home exam, is strictly prohibited.
- Students must not copy-paste from websites, academic papers, or make use of ChatGPT (or similar AI-based tools) etc. when formulating answers to questions (unless otherwise instructed on the exam).
- Students must not mention their names or student numbers in submitted files, except when being explicitly asked to do so. This is to ensure the exam can be graded anonymously as much as possible.

{{< /hint >}}


## Content

### Theoretical part

- This part of the exam consists of __personalized open and closed (multiple-choice) questions__, shown in __random order__ (i.e., not in order of difficulty or weight/points).
- Students can go __*freely back and forth between questions*__ in this part.
<!--- Students __*cannot* go back between questions__ (i.e., questions need to be answered in the order in which they appear).-->
<!--- Allocate approximately 45 minutes to work on this part.-->
- Cognitive skills that will be tested are knowledge, comprehension, and analysis.

### Practical part

- This part of the exam consists of __personalized open questions__, shown in __random order__ (i.e., not in order of difficulty or weight/points).
- Students can go __*freely back and forth between questions*__ in this part.
- Allocate 2 hours to work on this part, which focuses on all learning goals of the course as practiced in the tutorials.
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
