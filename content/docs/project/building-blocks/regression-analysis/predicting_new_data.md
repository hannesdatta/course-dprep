---
weight: 103
title: Make predictions
description: Make predictions for unseen data
bookCollapseSection: true
keywords: "regression, linear regression, forecasting, predictions"
draft: false
---

## Overview 
Given a linear regression model (`mdl`), make predictions for unseen input data (`explanatory_data`).

## Code 

```R
explanatory_data <- c(..., ..., ...)

prediction_data <- explanatory_data %>% 
  mutate(   
    y = predict(
      mdl, 
      explanatory_data, 
      type = "response"
    )
  )

# See the result
prediction_data
```

## See Also
* This [tutorial](https://dprep.hannesdatta.com/docs/building-blocks/regression-analysis/) walks you through how to step-by-step run a regression analysis.
* The example above is for a simple linear regression model. For multiple linear regression models, you need to pass an `explanatory_data` object with multiple columns.


