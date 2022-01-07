---
weight: 3
title: Week 2) Project Management and Version Control
description: Keep track of file changes and apply the end-to-end Git workflow!
bookCollapseSection: true
draft: false
---

# Week 2: Version control and project management <!--+ feedback-->

## Kick-starting your week
- Watch the kick-off for the week - TBA! <!--[the energizer for the week](https://youtu.be/kL-s7XHWiWI) on YouTube!-->

## Self-study and activities
- Tutorial
  - [Project Management and Version Control with Git/GitHub](docs/tutorials/version-control)
- Readings on *why* it's important to properly manage your workflow
  - [Principles of Project Setup and Workflow Management](https://tilburgsciencehub.com/learn/project-setup)
- Optional readings
  - [Code and Data for the Social Sciences: A Practitioner’s Guide](https://www.brown.edu/Research/Shapiro/pdfs/CodeAndData.pdf)
  - [Modified principles for Code and Data](https://www.shirokuriwaki.com/programming/project-organization.html)
  - [Data analysis workflow](http://www.coordinationtoolkit.org/wp-content/uploads/130907-Data-flow.pdf)
  - [Additional information on reproducing work, organizing files and version control](https://www.tse-fr.eu/sites/default/files/TSE/documents/doc/wp/2018/wp_tse_933.pdf)

## Live stream 3
- Q&A/walk-through of this week's tutorial - TBA!
- Coaching session for team projects - TBA!

## Exercises
This week, we used Git, which really becomes powerful when collaborating with others - sometimes even with people you've never met before! In fact, you can easily contribute to open source projects, simply by "forking" a public GitHub repository (= taking a copy of the repository), making changes to the source code, and proposing to the owner of the project to integrate your changes in the "head revision"/"main branch" (= the code that runs the project).

Now, start putting your Git skills into practice, by making changes to the [course website](https://dprep.hannesdatta.com), or [Tilburg Science Hub](https://tilburgsciencehub.com). For example, by fixing typos, or rewriting parts of the tutorials or building blocks. To get started, view the steps below.


{{< hint info >}}
__How to contribute to an open source project__

*The instructions below pertain to this course website and Tilburg Science Hub, both of which are websites run with the Hugo framework.*

*Step 1: Get to know the repository*

1. Familiarize yourself with the repository top which you want to contribute. Typically, each repository has a __readme__ with general instructions on what the repository is about (& how to run the code). Also, new features and bugs are discussed at the repository's __issue__ page. Finally, many repositories contain a discussion forum and project board in which you can learn about the roadmap of the project.
    - Visit the [course repository](https://github.com/hannesdatta/course-dprep), or [Tilburg Science Hub](https://github.com/tilburgsciencehub/tsh-website).
    - Browse through the repository's readme (that's what you see when you click on the links above), issue page, and project/discussion boards.


*Step 2: Run the repository's code (= run the website)*

1. Install [hugo](https://gohugo.io/getting-started/installing/) - that's the content management system we use for running these websites (Note: it may be required to install the extended version to run this course repository!).
2. Fork one of the repositories (click on the fork button in the upper right corner on Git). This creates a copy of the code in your GitHub account.
3. Clone your own fork to the disk, e.g., `git clone https://github.com/your-user-name/course-dprep`.
4. Enter the directory of the cloned repository using `cd course-dprep`, and run `hugo server`.
5. You can now open the website *locally in your browser*. Check the terminal for the exact address, but likely you just have to enter `https://127.0.0.1:1313` in your browser!
6. Check out the code in `\docs` - the websites are written in Markdown, and you can easily add/change. Observe how the site actually changes in your browser!
7. Open the course in a text editor such as [Atom](https://tilburgsciencehub.com/choose/text-editor) and put it side-to-side with the local Hugo server. You will see that any changes you make and save in Atom are visible on the server!

*Step 3: Make changes*

1. Find stuff that you want to add or fix.
2. Create a new branch (`git branch name-of-a-new-feature`) (e.g., call it `fix-typo-tutorial`, or `buildingblock-new`).
6. Work on your new feature. Throughout, apply the Git workflow (`git status`, `git add`, `git commit -m "commit message"`)
7. When you're done with all of your changes, push your changes to your GitHub repository `git push -u origin name-of-a-new-feature`
8. Fully done & happy? Issue a pull request from the website. Write a little description for what you did when sending your PR.
{{< /hint >}}


{{< hint info >}}
__Build your CV__

Many data science and marketing analytics students put their GitHub profiles and contributions on their CV. For example, check the website of [Roy Klaasse Bos](https://royklaassebos.nl), and his [GitHub profile](https://github.com/RoyKlaasseBos).

{{< /hint >}}



<br>

---
<br>
{{< button relref="week1" >}}Previous week{{< /button >}}
{{< button relref="week3" >}}Next week{{< /button >}}
