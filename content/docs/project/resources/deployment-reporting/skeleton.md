---
weight: 98
title: Skeleton
description: The foundation of any Shiny app!
keywords: "skeleton, template, structure"
date: 2021-02-08
bookCollapseSection: true
draft: false
---

## Overview 
Each Shiny app consists of an user interface (`ui`), server (`server`), and a function that binds them together (`shinyApp()`).

## Code 

```R
library(shiny) 
ui <- fluidPage() 
server <- function(input, output){} 
shinyApp(ui = ui, server = server)
```

## See Also
* This [tutorial](https://dprep.hannesdatta.com/docs/building-blocks/deployment-reporting/) walks you through how to step-by-step configure a basic Shiny app.







