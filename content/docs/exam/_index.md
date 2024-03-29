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

- On-campus exam (__closed book__ except selected course material that students can download on the instruction page of the exam)
- Several sections with subquestions (open and closed questions; open questions both in writing or by means of code/file uploads)
<!--- Some questions will be personalized (i.e., there is only one correct answer per student)
-->

{{< hint warning >}}

- Communication with anybody about the exam content is strictly prohibited.
- Internet access is unavailable during the exam.
- You will be able to download ["cheatsheets"](cheatsheets-exam.zip) from the exam's introduction page.
- Students must not mention their names or student numbers in any of the submitted files, except when being explicitly asked to do so. This is to ensure the exam can be graded anonymously.


<!--

- Students must not copy-paste from websites, academic papers. The use of ChatGPT or similar AI-based tools is only allowed if stated explicitly for selected questions on the pratical part of the exam (given questions permit the use of the internet).
-->

{{< /hint >}}


## Content

- The exam consists of __personalized open and closed (multiple-choice, ranking, matching) questions__, structured along the [learning goals](../course/) of this course, and shown in __random order__.
- Cognitive skills that will be tested are knowledge, comprehension, analysis, application, synthesis and evaluation.
- You can expect to work three hours on the exam.
- Expect questions using 
  - Git/GitBash (e.g., work on a repository using `git` commands)
  - Automate an existing workflow using make, or debug existing makefiles
  - Generate RMarkdown documents
  - Clean/transform data using dplyr/tidyverse.

## Preparing for the exam

### Ideas for developing your proficiency

- Please work through the tutorials. While this has been difficult in when you did it for the first time, can you do it on your own now?
- Share with each other the (public) links to your teams' GitHub repositories. Fork them, clone them to your computers, and then try to run them using `make` (and reading the readme).
  - Can you run the workflows of others?
  - If make does not work - try to fix the makefiles!
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

- Verify that you are familiar with the on-campus computers so that you know how to use them (e.g., Windows, how to open RStudio, how to navigate on the command prompt, how to set working directories, etc.)
- Know how to zip and unzip files
- Make use of cheat sheets (e.g., available on this site, or elsewhere) (you can also print them)
- File and code management
  - Rename files from TestVision (e.g., `download.csv`, `download.rdata`, `download.zip`) for clarity and organization.
  - Sort renamed files into separate folders to prevent confusion.
  - Revise your code before submission, so that you ensure it runs from top to bottom without problems.
  - Do not mention your name or student number in your code.
- Working with data
  - Familiarize yourself with opening .RData files and accessing their contents, as outlined in [YaRrr](https://bookdown.org/ndphillips/YaRrr/rdata-files.html).
  - For Git repository submissions, zip the entire folder containing the repository before uploading to ensure completeness.
- Setting the working directory in R (preferred method):
    - Create a new .R file and save it in the folder where your data files are downloaded.
    - Set the working directory to this location via `Session -> Set Working Directory -> To Source File Location`.
- Local package installation
  - Practice installing packages locally, especially since internet access will not be available during the exam.
  - Test local package installation with [package_test.zip](package_test.zip) by unzipping and running `install_packages.R` via `RScript install_packages.R` after navigating to the correct directory.

<!--
- Verify your software setup (you should be able to produce RMarkdown documents as PDF documents, run `make`, and even run existing Python code on your computer).
-->

<!--

{{< hint info >}}
__Stay up-to-date__

As we develop the exam questions, please keep an eye on the content of this page for important updates (e.g., with regard to the questions asked, any new tips & tricks that will help you to work on the questions, any example questions, etc.)

{{< /hint >}}
-->
