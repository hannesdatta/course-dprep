---
weight: 104
title: Export model outpout
description: Format regression coefficients 
bookCollapseSection: true
keywords: "stargazer, regression coefficients, model output"
draft: false
---

## Overview 
Convert regression coefficients of `mdl_1` and `mdl_2` into a HTML file that can be copied into a paper.

## Code 

```R
library(stargazer)

stargazer(mdl_1, mdl_2,
          title = "Figure 1",
          column.labels = c("Model 1", "Model 2"), 
          type="html",
          out="output.html"  
          )
```

## See Also
* This [tutorial](https://dprep.hannesdatta.com/docs/building-blocks/regression-analysis/) walks you through how to step-by-step run a regression analysis.


