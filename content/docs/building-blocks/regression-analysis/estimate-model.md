---
weight: 100
title: Estimate model
description: Estimate a linear model for y and evaluate the model assumptions
bookCollapseSection: true
draft: false
---

## Overview 
Estimate a linear model for `y`, evaluate the model assumptions (mean residuals is 0, residuals are normally distributed, homskedascticiy), and inspect the regression coefficients and fit statistics.

## Code 

```R
mdl <- lm(formula = y ~ x, data = data)

autoplot(
  mdl,
  which = 1:3,
  nrow = 1,
  ncol = 3
)

summary(mdl)
```

## See Also
* This [tutorial](https://dprep.hannesdatta.com/docs/building-blocks/regression-analysis/) walks you through how to step-by-step run a regression analysis.
* Model transformations can be incorporated into the formula, for example: `formula = log(y) ~ I(x^2)`.
* The coefficients (`coefficients(mdl)`), predictions for the original data set (`fitted(mdl)`), and residuals (`residuals(mdl)`) can be directly derived from the model object.
* Linear regression is suitable for a response variable that is numeric. For logical values (e.g., did a customer churn: yes/no), you can estimate a logistic regression model

```R
glm(formula = y ~ x, data = data, family = binomial)
```
