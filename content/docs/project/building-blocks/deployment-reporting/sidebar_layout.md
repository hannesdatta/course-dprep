---
weight: 99
title: Sidebare lay-out
description: Add a download button to your Shiny app
keywords: "column structure, sidebar, layout, 2 column"
date: 2021-02-08
bookCollapseSection: true
draft: false
---

## Overview 
Create a 2-column structure with a small panel on the left and a main panel on the right.

## Code 

```R
ui <- fluidPage(
	sidebarLayout(
		sidebarPanel(
			"This is the sidebar"
		), 
		mainPanel(
			"Main panel goes here"
		)
	)
)
```

## See Also
* This [tutorial](https://dprep.hannesdatta.com/docs/building-blocks/deployment-reporting/) walks you through how to step-by-step configure a basic Shiny app.



