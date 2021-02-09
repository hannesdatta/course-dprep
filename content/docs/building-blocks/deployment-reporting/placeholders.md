---
weight: 102
title: Placeholders
description: Define a placeholder for plots, tables, and text. .
keywords: "placeholder"
date: 2021-02-08
bookCollapseSection: true
draft: false
---

## Overview 
Define a placeholder for plots, tables, and text in the user interface (`ui`) and server side (`server`). 

## Code 

### User Interface

```R
plotOutput(outputId = "plot"),
tableOutput(outputId = "table"),
textOutput(outputId = "text")
```

### Server

```R
output$plot <- renderPlot({
	               plot(x, y, ...)
})

output$table <- renderTable({
	               data
})

output$text <- renderText({
	           "Some text"
})
```

## See Also
* This [tutorial](https://dprep.hannesdatta.com/docs/building-blocks/deployment-reporting/) walks you through how to step-by-step configure a basic Shiny app.
* Text can be formatted as headers (e.g., `h1()`, `h2()`) or printed in bold (`strong()`) or italics (`em()`) format.
* The [`ggplotly()` function](https://www.rdocumentation.org/packages/plotly/versions/4.9.3/topics/ggplotly) can convert a `ggplot2` plot into an interactive one (e.g., move, zoom, export image features that are not available in the standard `renderPlot()` function). 
*   Similarly, the `DT::dataTableOutput("table")` (in the `ui`) and the `DT::renderDataTable()` (in the `server`) from the `DT` package enrich the `renderTable` function. See a live example [here](https://royklaassebos.shinyapps.io/dPrep_Demo_Google_Mobility/).


