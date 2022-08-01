---
weight: 103
title: Download button 
description: Add a download button to your Shiny app
keywords: "download, button, get data, share, dataframe, datasets, download button, Excel"
date: 2021-02-08
bookCollapseSection: true
draft: false
---

## Overview 
Add a download button to your Shiny app so that users can directly download their current data selection in csv-format and open the data in a spreadsheet program (e.g., Excel).


## Code 

```R
ui <- fluidPage(
  downloadButton(outputId = "download_data", label = "Download")
)

server <- function(input, output) {
    output$download_data <- downloadHandler(
        filename = "download_data.csv",
        content = function(file) {
            data <- filtered_data()  
            write.csv(data, file, row.names = FALSE)
        }
    )

}
```

## See Also
* This [tutorial](https://dprep.hannesdatta.com/docs/building-blocks/deployment-reporting/) walks you through how to step-by-step configure a basic Shiny app.
* [Here](https://royklaassebos.shinyapps.io/dPrep_Demo_Google_Mobility/) you can see a live demo of the "Download button" in action.


