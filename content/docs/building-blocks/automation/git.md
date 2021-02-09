---
weight: 12
title: Git commands
description: A quick recap of the most important Git commands
keywords: "download, import data, download datasets internet"
date: 2021-02-08
bookCollapseSection: true
draft: false
---

## Overview 
An overview of the most important Git commands: 

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

### See Also
* This [tutorial](../../../tutorials/version-control/version-control.html) walks you through how to step-by-step create a Github repository and push changes to it.
* `git add .` adds all changes to the staging area to be committed (without having you to mention all files separately).
* You can create a `.gitignore` file in the root directory of your repository to tell Git to stop paying attention to files you don’t care about. For example, the following file will ignore any file within the my_passwords folder, as well as any csv-files (even if you call `git add .`)!
```
my_passwords/*
*.csv
```



