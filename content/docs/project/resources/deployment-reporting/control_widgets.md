---
weight: 101
title: Control widgets
description: Add a variety of control widgets to make your app interactive.
keywords: "download, button, get data, share, dataframe, datasets, download button, Excel"
date: 2021-02-08
bookCollapseSection: true
draft: false
---

## Overview 
Add a variety of control widgets to allow users to change the input parameters.

## Code 

### Text box

```R
textInput(inputId = "title", label="Text box title", value = "Text box content")
```
*Example:*  

<img src="./../images/text_box.png" width="450px" />

---

### Numeric input

```R
numericInput(inputId = "num", label = "Number of cars to show", value = 10, min = 1, max = 30)
```

*Example:*
  
<img src="./../images/numeric_input.png" width="450px" />

--- 

### Slider

```R
sliderInput(inputId = "temperature", label = "Body temperature", min = 35, max = 42, value = 37.5, step = 0.1)
```

*Example:*
  
<img src="./../images/slider_regular.png" width="450px" />

--- 

### Range selector

```R
sliderInput(inputId = "price", label = "Price (€)", value = c(39, 69), min = 0, max = 99)
```

*Example:*
  
<img src="./../images/range_slider.png" width="450px" />

---

### Radio buttons

```R
radioButtons(inputId = "radio", label = "Choose your preferred time slot",
	choices = c("09:00 - 09:30", "09:30 - 10:00", "10:00 - 10:30", "10:30 - 11:00", "11:00 - 11:30"), 
	selected = "10:00 - 10:30")
```

*Example:*
  
<img src="./../images/radio_button.png" width="250px" />

---

### Dropdown menu

```R
selectInput(inputId = "major", label = "Major", 
	choices = c("Business Administration", "Data Science", "Econometrics & Operations Research", "Economics", "Liberal Arts", "Industrial Engineering", "Marketing Management", "Marketing Analytics", "Psychology"),
	selected = "Marketing Analytics")
```

*Example:*
  
<img src="./../images/dropdown_menu.png" width="250px" />

---

### Dropdown menu (multiple selections)

```R
selectInput(inputId = "programming_language", label = "Programming Languages", 
	choices = c("HTML", "CSS", "JavaScript", "Python", "R", "Stata"),
	selected = "R",
  multiple = TRUE)
```

*Example:*
  
<img src="./../images/dropdown_menu_multiple.png" width="250px" />

--- 

### Checkbox

```R
checkboxInput(inputId = "agree", label = "I agree to the terms and conditions", value=TRUE)
```

*Example:*
  
<img src="./../images/checkbox.png" width="250px" />

--- 

### Colorpicker

```R
library(colourpicker)
colourInput(input = "colour", label = "Select a colour", value = "blue")
```

*Example:*
  
<img src="./../images/colour_picker.png" width="250px" />



## See Also
* This [tutorial](https://dprep.hannesdatta.com/docs/building-blocks/deployment-reporting/) walks you through how to step-by-step configure a basic Shiny app.


