---
weight: 50
title: Version control with Git and GitHub
description: Keep track of file changes and apply the end-to-end Git workflow.
bookCollapseSection: true
draft: false
---

# Tutorial: Version control

## Learning goals

* Setup Git and GitHub, and know what both are
* Apply the end-to-end Git workflow, using simple text files created in the editor
* Experience the power of file versioning (e.g., restoring, branching)
* Learn to collaborate on projects using GitHub

## Getting Started

### Plan

- Plan a full day to work through this tutorial.

### Learn
- Develop your command line (Windows) / terminal (Mac) skills
  - Follow the [DataCamp Introduction to Shell](https://learn.datacamp.com/courses/introduction-to-shell) (chapter 1).
  - We recommend Mac users to also take a look at [this tutorial](https://generalassembly.github.io/prework/cl) (optional).

### Practice
- Learn to use Git from the command line, and apply the end-to-end GitHub workflow ([View tutorial](version-control.html)).

{{< hint info >}}

__Investing in your skills__

If you like, you can submit your exercises as a "proof for investing in your skills" (self- and peer assessment). As the exercises are done in the terminal and directly synchronized with GitHub, you can just submit a link to your personal Github repository in which you've worked on the exercises (e.g., `https://github.com/your-user-name/version-control-exercises`).

{{< /hint >}}

### Create

__Forking is *the* way to contribute to somebody else's open source project.__ So... in this section, you can put your Git skills into practice - to the benefit of anybody on the web interested in data preparation and workflow management. Specifically, you can __make contributions to the [course website](https://dprep.hannesdatta.com)__, or [Tilburg Science Hub](https://tilburgsciencehub.com).

Yes, you've read it. You can actually change these websites yourselves. How? From fixing a typo to rewriting parts of the tutorials or building blocks. By the way - many data science and marketing analytics students put their GitHub profiles and contributions on their CV - check out [Roy's work, for example](http://royklaassebos.nl/)!)


{{< hint info >}}

__Getting started to "run" the websites on your computer__

1. Install [hugo](https://gohugo.io/getting-started/installing/) - that's the content management system we use for running these websites
2. Fork [the course repository](https://github.com/hannesdatta/course-dprep), or [Tilburg Science Hub](https://github.com/tilburgsciencehub/tsh-website)
3. Clone your own fork to the disk, e.g., `git clone https://github.com/your-user-name/course-dprep`
4. Enter the directory of the cloned repository, and run `hugo server`
5. You can now open the website *locally in your browser*. Check the terminal for the exact address, but likely you just have to enter `https://127.0.0.1:1313` in your browser!
6. Check out the code in `\docs` - the websites are written in Markdown, and you can easily add/change. Observe how the site actually changes in your browser!

{{< /hint >}}


{{< hint info >}}
__Making own contributions__

1. Find stuff that you want to add, fix
2. Create a new branch (`git branch name-of-a-new-feature`) (e.g., call it `fix-typo-tutorial`, or `buildingblock-new`).
6. Work on your new feature. Throughout, apply the Git workflow (`git status`, `git add`, `git commit -m "commit message"`)
7. When you're done with all of your changes, push your changes to your GitHub repository `git push -u origin name-of-a-new-feature`
8. Fully done & happy? Issue a pull request from the website. Write a little description fo what you did when sending your PR.

Proud about your own work? Show off your work with a screenshot via WhatsApp, and we'll show it in class!
