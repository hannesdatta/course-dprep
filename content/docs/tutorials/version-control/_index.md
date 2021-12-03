---
weight: 20
title: Version Control and Project Management with Git and GitHub
description: Manage your project professionally, keep track of file changes and apply the end-to-end Git workflow.
bookCollapseSection: true
draft: false
---

# Tutorial: Project Management and Version Control with Git/GitHub

## Learning goals

* Setup Git and GitHub, and know what both are
* Experience the power of file versioning (e.g., restoring, branching) from the command line/terminal
* Apply the end-to-end Git workflow, using simple text files created in the editor
* Learn to collaborate on projects using GitHub

## Planning

* Please plan about one day to work through this tutorial.

## Getting Started

1. Develop your command line (Windows) / terminal (Mac) skills
    - Follow the [DataCamp Introduction to Shell](https://learn.datacamp.com/courses/introduction-to-shell) (chapter 1).
    - We recommend Mac users to [also take a look at this tutorial](https://generalassembly.github.io/prework/cl) (optional).

2. Learn to use Git
    - To get an understanding of what issues, pull requests and commits are and how these work, follow [this short introduction](https://lab.github.com/githubtraining/introduction-to-github) on Github.  
    - Get started with applying the end-to-end Git workflow using Git Bash (i.e., through the command line) ([View tutorial](version-control.html))
    - Curious how to use Git with a graphical user interface? (optional, but highly useful)
      - [Sourcetreeapp](https://www.sourcetreeapp.com) is a free Git client for Windows, Mac and Linux!
      - Git also [smoothly integrates with R - find out how!](https://swcarpentry.github.io/git-novice/14-supplemental-rstudio/)

3. Put your skills into practice
    - Git really becomes powerful when collaborating with others - sometimes even with people you've never met before! In fact, you can easily contribute to open source projects, simply by "forking" a public GitHub repository (= taking a copy of the repository), making changes to the source code, and proposing to the owner of the project to integrate your changes in the "head revision"/"main branch" (= the code that runs the project).
    - So, start putting your Git skills into practice, by making changes to the [course website](https://dprep.hannesdatta.com), or [Tilburg Science Hub](https://tilburgsciencehub.com). For example, by fixing typos, or rewriting parts of the tutorials or building blocks.
    - To get started, view the steps below.


{{< hint info >}}
__How to contribute to an open source project__

*The instructions below pertain to this course website and Tilburg Science Hub, both of which are websites run with the Hugo framework.*

*Step 1: Get to know the repository*

1. Familiarize yourself with the repository top which you want to contribute. Typically, each repository has a __readme__ with general instructions on what the repository is about (& how to run the code). Also, new features and bugs are discussed at the repository's __issue__ page. Finally, many repositories contain a discussion forum and project board in which you can learn about the roadmap of the project.
    - Visit the [course repository](https://github.com/hannesdatta/course-dprep), or [Tilburg Science Hub](https://github.com/tilburgsciencehub/tsh-website).
    - Browse through the repository's readme (that's what you see when you click on the links above), issue page, and project/discussion boards.


*Step 2: Run the repository's code (= run the website)*

1. Install [hugo](https://gohugo.io/getting-started/installing/) - that's the content management system we use for running these websites.
2. Fork one of the repositories (click on the fork button in the upper right corner on Git). This creates a copy of the code in your GitHub account.
3. Clone your own fork to the disk, e.g., `git clone https://github.com/your-user-name/course-dprep`.
4. Enter the directory of the cloned repository, and run `hugo server`.
5. You can now open the website *locally in your browser*. Check the terminal for the exact address, but likely you just have to enter `https://127.0.0.1:1313` in your browser!
6. Check out the code in `\docs` - the websites are written in Markdown, and you can easily add/change. Observe how the site actually changes in your browser!

*Step 3: Make changes*

1. Find stuff that you want to add or fix
2. Create a new branch (`git branch name-of-a-new-feature`) (e.g., call it `fix-typo-tutorial`, or `buildingblock-new`).
6. Work on your new feature. Throughout, apply the Git workflow (`git status`, `git add`, `git commit -m "commit message"`)
7. When you're done with all of your changes, push your changes to your GitHub repository `git push -u origin name-of-a-new-feature`
8. Fully done & happy? Issue a pull request from the website. Write a little description for what you did when sending your PR.

<!--Proud about your own work? Show off your work with a screenshot via WhatsApp, and we'll show it in class!
-->
{{< /hint >}}


{{< hint info >}}
__Build your CV__

Many data science and marketing analytics students put their GitHub profiles and contributions on their CV. For example, check the website of [Roy Klaasse Bos](https://royklaassebos.nl), and his [GitHub profile](https://github.com/RoyKlaasseBos).

{{< /hint >}}
