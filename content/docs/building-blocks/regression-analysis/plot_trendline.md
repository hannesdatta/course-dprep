---
weight: 102
title: Plot trend line
description: Visualize a dataset and add a trend line
bookCollapseSection: true
keywords: "ggplot2, ggplot, chart, plot"
draft: false
---

## Overview 
Plot a scatter plot of two numeric variables and add a linear trend line on top of it.

## Code 

```R
library(ggplot2)

ggplot(data = data, aes(x, y)) + 
geom_points() + 
geom_smooth(method = "lm", se = FALSE)
```

## See Also
* This [tutorial](https://dprep.hannesdatta.com/docs/building-blocks/regression-analysis/) walks you through how to step-by-step run a regression analysis.


