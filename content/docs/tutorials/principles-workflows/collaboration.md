---
title: "Collaborating using GitHub"
date: 2020-11-11T22:01:14+05:30
draft: false
weight: 70
---

## Overview

While you can use Git exclusively to keep track of your files' version history,
the real power of Git lies in **collaborating on coding projects with others**. Below, we outline how you can contribute to existing (open-source) projects that are hosted on GitHub.

### Repositories versus Gists

GitHub knows two types of "projects". Full-fledged projects (e.g., for software
development or research) are hosted in so-called "repositories", which offer you
the full range of development features available. Configuring a GitHub repository
to work well may take a while.

Gists, in turn, are only code snippets - e.g., a small piece of R code to
clean some data, or a bit of Python code with some data to demonstrate a feature
that you have developed. Gists are *ideal* to very quickly share stuff with
the community to receive feedback. At the same time, you can hope for members of
your wider network to comment on your code and improve it!

Below, we refer to repositories and Gists as "projects".

## Contributing to a project

GitHub hosts thousands of open-source Gists and repositories that you can
integrate in your own work, or - alternatively - that you can contribute to. Further,
Git knows "private" Gists and repositories that you can only share with selected
team members.

In following our guide, you have to ask yourself two questions:

- **Are you already a team member of the GitHub repository or Gist you would
like to contribute to?** Probably not, at least that would be the default case for open source projects you
    would like to contribute to. In that case, you have to make **"fork"** (i.e., a copy) of the
    original repository or Gist in your own GitHub profile so that you actually
    can edit files.

- **Would you like to contribute to the project using your browser, or would you instead
like to "build" the entire project on your computer?** Editing a project in the browser is way easier, but you cannot test whether
    the project still works. Building the entire project on your computer is a bit more complex, as you
    will not only have to *clone* the repository or Gist to your computer,
    but you also have to install necessary software to actually build the project
    for testing.

### Contribution Guide

Here's our contribution guide (these instructions
    also apply to [contributing to this site](https://github.com/hannesdatta/tilburg-science-hub/blob/tilburg-update/README.md)).

1. To get started... (you need to only do this once per repository)
    1. Forking required?
        1. If you would like to contribute to a project you are NOT officially a member of (such as a public open source project), you first **need to fork** the originating Gist or repository, which creates a copy of the original repository in your own GitHub profile (press the "fork" button on GitHub). You can now edit the project without breaking the original version.
        - If you are a member of the project (i.e., your user name has been added to the list of contributors in the repository's settings), then you do **not need to fork** the repository, as you can directly work in the original repository.
    2. Cloning to your local computer required?
        1. If you would like to contribute to the project using the GitHub web interface (recommended for novices), it's not required to clone the repository to your computer.
        2. If you would like to make changes to the project on your local computer, and also test whether the project still runs well (e.g., such as to engage into prototyping), you have to **clone** a copy of your Gist/repository to your computer via Git Bash.
            - Open Git Bash
            - Type `git clone https://github.com/[user-name]/repository-name.git`, followed by Enter.
            - If you forked the repository in the previous step, use the URL of the fork here. Otherwise, use the originating repository's URL.
            - Last, and finally, **get the Gist/repository working** on your computer (e.g., install the necessary software tools for it to run). Check the project's readme file, which will point you to the repository-specific installation instructions.

2. Make changes
    1. Making changes directly on the website of GitHub (i.e., if you have not cloned the repository)
        - Within your version of the repository, create a branch for each significant change you are planning to make. To do so, click on the [branch selector menu](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-and-deleting-branches-within-your-repository) and enter a name for your branch. Gists do not know branches - so no need to trying to create one.
        - Navigate to the file(s) you wish to change (within the new branch), and make revisions as required.
        - Commit all changed files within the appropriate branches.
    2. Making changes on your local computer (i.e., if you have cloned the repository)
        1. For *repositories* (which know the concept of branching):
            - Within your version of the forked repository, create a branch for each significant change you are planning to make. To do so, use Git Bash and use the command `git branch branch-name`. Create a branch for each feature you would like to implement.
            - Change to the newly created branch (instead of making changes to the master branch), by using `git checkout branch-name` in Git Bash.
            - Navigate to the file(s) you wish to change within the new branch, and make revisions as required (e.g., using your favorite software tools, like R or Python - depending on the type of source code, obviously).
            - Commit all changed files within the appropriate branches (`git status`, `git add`, `git commit -m "your description here"`). Finally, push your changes to GitHub (`git push`). Need a refresher? You can review the [necessary steps versioning files with Git/GitHub here](versioning.md).
        - For *gists*:
            - Navigate to the file(s) you wish to change, and make revisions as required (e.g., using your favorite software tools, like R or Python - depending on the type of source code, obviously).
            - Commit all changed files (`git status`, `git add`, `git commit -m "your description here"`). Finally, push your changes to GitHub (`git push`). Need a refresher? You can review the [necessary steps on working with Git/GitHub here](versioning.md).

3. Contribute your changes to the originating repository
    1. If you are a team member and have worked on the original repository or Gist, your changes
    are already fully "saved".
    2. If you are not a team member and have worked on a forked repository or Gist, do as follows
        1. For *repositories*:
            - It's time to shine! Share your changes with the world, by creating individual pull requests from each of your changed branches to the `master` branch within the originating repository.
            - To do so, navigate to the forked copy of the repository, available at your personal GitHub page. Then, click on "pull request" to notify the owner of the original repository about the new features.
            - You will likely receive feedback and may be requested to make changes using issue-specific branches of the forked repository. Repeat as needed until all feedback has been addressed.
        2. For *Gists*:
            - Navigate to the original Gist, and scroll down to the comment section. Write about the changes you have made in your Fork, and include a URL to your fork! The project owner will then get in touch with you to discuss how the changes can be implemented. (Unfortunately, GitHub does not know the concepts of pull requests for Gists.)


<iframe width="560" height="315" src="https://www.youtube.com/embed/pOhl932vbTI" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

!!! warning

    - Before starting to make any changes in your forked repository, make sure the fork is up-to-date with its originating repository.
    - Please only work from your newly-created branch(es) in a forked repository, and *not* in a clone of the originating master branch.

!!! tip
    More info? Follow this [fantastic tutorial on contributing to an open-source project on GitHub](https://akrabat.com/the-beginners-guide-to-contributing-to-a-github-project/).
