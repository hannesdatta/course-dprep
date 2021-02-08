---
weight: 100
title: Tabs
description: Distribute your data across multiple tabs
keywords: "column structure, sidebar, layout, 2 column"
date: 2021-02-08
bookCollapseSection: true
draft: false
---

## Overview 
Distribute your data across multiple tabs (alternative to a sidebar layout).

## Code 

```R
tabsetPanel(
	tabPanel(title = "tab 1", 
    "Content goes here"),
	tabPanel(title = "tab 2", "The content of the second tab"),
	tabPanel(title = "tab 3", "The content of the third tab")
)
```

*Example*   

![Tabs](./../images/tabs.png)








