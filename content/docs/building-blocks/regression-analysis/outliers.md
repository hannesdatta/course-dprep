---
weight: 101
title: Identify outliers
description: Identify outliers in your data set
bookCollapseSection: true
keywords: "outliers, leverage, influence, Cook's distance"
draft: false
---

## Overview 
Compute the leverage of your data records and influence on `mdl` to identify potential outliers.

## Code 

```R
leverage_influence <- mdl %>%
    augment() %>%
    select(y, x, leverage = .hat, cooks_dist = .cooksd) %>%
    arrange(desc(cooks_dist)) %>%
```

## See Also
* This [tutorial](https://dprep.hannesdatta.com/docs/building-blocks/regression-analysis/) walks you through how to step-by-step run a regression analysis.


