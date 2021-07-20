---
weight: 20
title: Project Management and Version Control with Git and GitHub
description: Manage your project professionally, keep track of file changes and apply the end-to-end Git workflow.
bookCollapseSection: true
draft: false
---

# Tutorial: Project Management and Version Control with Git/GitHub

## Learning goals

* Setup Git and GitHub, and know what both are
* Apply the end-to-end Git workflow, using simple text files created in the editor
* Experience the power of file versioning (e.g., restoring, branching)
* Learn to collaborate on projects using GitHub

## Planning

* Please plan about half a day to work through this tutorial.

## Getting Started

- Develop your command line (Windows) / terminal (Mac) skills
  - Follow the [DataCamp Introduction to Shell](https://learn.datacamp.com/courses/introduction-to-shell) (chapter 1).
  - We recommend Mac users to also take a look at [this tutorial](https://generalassembly.github.io/prework/cl) (optional).

- Learn Git
  - We'll focus on using Git at the command line. Get started with applying the end-to-end GitHub workflow ([View tutorial](version-control.html))
  - Curious how to use Git directly from within R? Then follow this [optional, but very helpful material](https://swcarpentry.github.io/git-novice/14-supplemental-rstudio/)

{{< hint info >}}

__Can't wait to put your skills into practice?__

Forking is *the* way to contribute to __somebody else's open source project.__ So... in this section, you can put your Git skills into practice - to the benefit of anybody on the web interested in data preparation and workflow management. Specifically, you can __make contributions to the [course website](https://dprep.hannesdatta.com)__, or [Tilburg Science Hub](https://tilburgsciencehub.com).

Yes, you've read it. You can actually change these websites yourselves. How? From fixing a typo to rewriting parts of the tutorials or building blocks. By the way - many data science and marketing analytics students put their GitHub profiles and contributions on their CV...

*Steps to follow*


1. Install [hugo](https://gohugo.io/getting-started/installing/) - that's the content management system we use for running these websites
2. Fork [the course repository](https://github.com/hannesdatta/course-dprep), or [Tilburg Science Hub](https://github.com/tilburgsciencehub/tsh-website)
3. Clone your own fork to the disk, e.g., `git clone https://github.com/your-user-name/course-dprep`
4. Enter the directory of the cloned repository, and run `hugo server`
5. You can now open the website *locally in your browser*. Check the terminal for the exact address, but likely you just have to enter `https://127.0.0.1:1313` in your browser!
6. Check out the code in `\docs` - the websites are written in Markdown, and you can easily add/change. Observe how the site actually changes in your browser!

*Making own contributions*

1. Find stuff that you want to add, fix
2. Create a new branch (`git branch name-of-a-new-feature`) (e.g., call it `fix-typo-tutorial`, or `buildingblock-new`).
6. Work on your new feature. Throughout, apply the Git workflow (`git status`, `git add`, `git commit -m "commit message"`)
7. When you're done with all of your changes, push your changes to your GitHub repository `git push -u origin name-of-a-new-feature`
8. Fully done & happy? Issue a pull request from the website. Write a little description for what you did when sending your PR.

Proud about your own work? Show off your work with a screenshot via WhatsApp, and we'll show it in class!
