---
weight: 12
title: The most important Git commands you should know
description: "A quick recap of the essential Git commands you will be using everyday."
keywords: "git, commands, important, essential, cheat"
date: 2021-02-08
bookCollapseSection: true
draft: false
---

## Overview

This is a summary of the most important Git commands.


## Code

Makes a clone of the repository at the specified URL (never clone a repository into another repository!)

```
git clone <URL>
```

---

Adds changes to the specified file to the staging area to be committed

```
git add <file_name>
```

---

Commits staged changes and allows you to write a commit message
```
git commit -m <your_message>
```

---

Pushes local changes to the specified branch of the online repository
```
git push origin <branch_name>
```

## Advanced use cases

### Add all files that have been changed

To add all files that have been changed to the staging area (to eventually commit them), use

```bash
git add .
```

That way, you don't have to mention files individually.

### Ignore files

You can create a `.gitignore` file in the root directory of your repository to tell Git to stop paying attention to files you don’t care about.

For example, the following file will ignore any file within the my_passwords folder, as well as any csv-files (even if you call `git add .`)!

  ```
  my_passwords/*
  *.csv
  ```


## See also

* [Git Cheat Sheet](https://education.github.com/git-cheat-sheet-education.pdf) - directly from the developers at GitHub

* This [tutorial](../../../tutorials/version-control/version-control.html) walks you through how to step-by-step create a Github repository and push changes to it.

* [Version control on The Turing Way](https://the-turing-way.netlify.app/reproducible-research/vcs.html)

* [Version control at Software Carpentry](http://swcarpentry.github.io/git-novice/)
