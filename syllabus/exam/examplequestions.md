---
title: "Example questions"
bookFlatSection: true
bookHidden: false
weight: 5
draft: false
---

# Example questions

Questions will be asked along the course's learning goals, and complexity levels (e.g., comprehension, application, synthesis, evaluation). For details, see [here](../exam#content).

Below, you can find a few example questions, which will be discussed with students in the final live stream of this course.

{{< hint warning >}}

This exam consists of __open and closed (multiple-choice) questions__. You can freely go back and forth between these questions.

{{< /hint >}}
![](../dprep_part1.png)
![](../dprep_part2.png)

*Note: the number of questions depends on the points awarded to each question. The instructions during the final exam may slightly vary, so make sure to still read it accordingly.*

Q1. Please download the [`netflix_data`](../netflix_data.csv.zip) file from the exam cover page and open it in RStudio. Please answer the following questions using this data.

- `show_id`: content identifier
- `title`: Title name 
- `country_of_origin`: Country of production
- `viewership_country`: Country where the content's viewership data is recorded
- `date`: Date of recording data
- `genres`: Genres the content is classified into 
- `type`: Type of content ("Movie" or "TV Show")
- `season_count`: Number of seasons 
- `release_date`: Date when the content was released on Netflix 
- `show_rating`: Average rating given to the content 
- `viewership_count`: Number of viewers for the content


1.1. **Handing missing values**: 

a. Which columns in the dataset contain missing values, and how many missing values does each column have?

b. Check for patterns in the missing values for the column `season_count` depending on show type. Do these missing values need to be imputed? Why or why not?

c. There are missing values in both `show_rating` and `viewership_count`. Justify and use appropriate strategy to impute missing values and add a column that indicates whether the values have been interpolated or not.

**Solution:**
```
library(dplyr)
library(zoo)

# a. Count missing values per column
na_summary <- netflix_data %>%
  summarise(across(everything(), ~sum(is.na(.))))

# b. Inspecting season count missing values 
season_missing_check <- netflix_data %>%
  group_by(type) %>%
  summarise(missing_seasons = sum(is.na(season_count)), total_shows = n())
# All the movies have NA for season count which makes sense so no need to impute them. 

c. # We can use linear interpolation for show_rating as ratings gradually change over time. `viewership_count` column can be interpolated using Last Observation Carried Forward as they should be relatively stable. 

# Store original NA locations
netflix_data <- netflix_data %>%
  mutate(
    was_na_show_rating = is.na(show_rating), 
    was_na_viewership = is.na(viewership_count)
  )

# Apply interpolation (grouped by `show_id` and `viewership_country`)
netflix_data <- netflix_data %>%
  group_by(show_id, viewership_country) %>%
  mutate(
    show_rating = na.approx(show_rating, na.rm = FALSE),  # Linear interpolation
    viewership_count = na.locf(viewership_count, na.rm = FALSE)  # Last observed value carried forward
  ) %>%
  ungroup()

# Create interpolation indicator (TRUE if the value was NA before but now has a value)
netflix_data <- netflix_data %>%
  mutate(
    is_interpolated_show_rating = was_na_show_rating & !is.na(show_rating),
    is_interpolated_viewership = was_na_viewership & !is.na(viewership_count)
  ) %>%
  select(-was_na_show_rating, -was_na_viewership)  # Drop temp columns


```

1.2. **Using Regular Expressions:** Some shows belong to multiple genres which are stored in the `genre` column as comma-separated string. Use regular expressions to create a new dummy column `is_action` that is `1` if the `genre` column contains "Action" genre and 0 otherwise. 

**Solution:**
```
netflix_data <- netflix_data %>%
  mutate(is_action = ifelse(grepl("Action", genres, ignore.case = TRUE), 1, 0))

table(netflix_data$is_action)
```

1.3. **Reshaping data**

a. Let's say we want to analyze how viewership for a specific show (SHOW_10) varies across different countries over time. Subset the viewership data for this show and convert the data to wide format. 

**Solution:**
```
show_10_data <- netflix_data %>%
  filter(show_id == "SHOW_10") %>%
  select(date, viewership_country, viewership_count)

# Convert to wide format
show_10_wide <- show_10_data %>%
  pivot_wider(
    names_from = viewership_country, 
    values_from = viewership_count, 
    names_prefix = "viewership_"
  )

```

1.4. **Estimation and Plotting at Scale**: Please estimate a linear regression to examine the impact of a show being listed as "Action" genre on viewership for different viewership countries. Use a for loop to estimate at scale.

**Solution:**

```
library(ggplot2)

countries <- unique(netflix_data$viewership_country)

effect_sizes <- data.frame(viewership_country = character(), estimate = numeric(), stringsAsFactors = FALSE)

# Loop through each country and estimate regression
for (country in countries) {
  
  # Filter data for the current country
  country_data <- netflix_data %>%
    filter(viewership_country == country, !is.na(is_action), !is.na(viewership_count))
  
  # Run the regression model
  model <- lm(viewership_count ~ is_action, data = country_data)
  
  # Get the coefficient for is_action
  beta_1 <- coef(model)["is_action"]
  
  # Store the result
  effect_sizes <- rbind(effect_sizes, data.frame(viewership_country = country, estimate = beta_1))
}

# Plot the effect sizes
ggplot(effect_sizes, aes(x = reorder(viewership_country, estimate), y = estimate, fill = estimate)) +
  geom_bar(stat = "identity") +
  coord_flip() +
  labs(title = "Effect of Action Genre on Viewership by Country",
       x = "Country",
       y = "Effect Size (Coefficient of is_action)") +
  theme_minimal()
```

Q2. Imagine you have just enrolled as a thesis student, and you receive the following email from your advisor. Submit your PDF document, and provide a conclusion on the suitability of the explored data for the research question.

{{< hint >}}

Dear (name of student),

I really look forward to working with you on this exciting dataset, capturing the consumption of music on Spotify. I scraped it from spotifycharts.com a while ago. Please download this [`data.zip`](../data.zip), which contains a stripped-down version of an RMarkdown file and the data. 

As a starting point, please explore the data set using RMarkdown. I’d love to learn more about the data myself (haven’t looked into it yet) - maybe you can figure out a way to shed some light on how the start of the global pandemic (let’s assume that was March 2020) affected music consumption?

Please render your RMarkdown as a PDF document. Please keep any code that you’re writing (e.g., to load the data, or to explore and do some minor data preparations) visible so I can learn from it!

{{< /hint >}}

**Solution:** [Click here](../q2-spotify-sol.Rmd) for a sample RMarkdown exploring the data. 


Q3. Please download the [`github_repository.zip`](../github_repository.zip) file from the exam cover page and unzip it to a folder on this computer. Open this folder using Git Bash. Imagine you are a research assistant at Tilburg University, and you receive the following email from your project supervisor. Please submit your Git repository, by zipping the folder and uploading it here. 

{{< hint >}}

Dear (name of student),

Tilburg University is on its way to not only publish papers, but also the code that generated the results. That’s extremely important for open science - i.e., allowing others to reproduce findings. In the attachment (download here), I’m sending you a zipped Git repository of my empirical project. Admittedly, it’s not very well structured (e.g., directory structures are absent), but at least I have a common R file (`run.R`) that simulates some demo data and ties all the parts of my project together.

Starting from `run.R`, can you apply your learnings from dPrep, and submit a link to a new repository in which you...

- Separate the workflow into individual files corresponding to the main steps in this project (e.g., simulate data, see `run.R` for some ideas),
- Separate source code from generated files (i.e., use separate folders),
- Have a proper readme at the repository (in an `.md` file),
- Ignore files that should not be versioned using `.gitignore`, and
- remove `run.R` and replace it by a proper makefile for this project.
- throughout, make use of frequent commits and commit messages.

I really look forward seeing your work, delivered in a clean zipped Git repository, which you can upload below.

{{< /hint >}}

**Solution:** [Click here](../practice_github_workflow-sol-latest.zip) for the solution file. 

Q4. Please [download and unzip the research pipeline](../practice_workflow.zip) of an empirical project and answer the following questions. To receive points on this question, you need to zip and upload the updated research pipeline for grading. 


1) Please run make as is. Then, fix any errors that prevents make from knowing it is "up-to-date" (i.e., make may have built the entire project, but continues to re-execute the workflow even if run successfully) (5P).

2) The make pipeline is not properly configured (i.e., one call to all scripts, rather than subsequent "built recipes" that tie all source code files together). Please fix the makefile such that the entire project is being built and that all dependencies are correctly defined. (10P)

3) You may recall the value of creating subdirectories to structure your project. Create the necessary subdirectories and update your makefile so that it works on this new directory structure. (5P)

Requirements/tips:

 - Recall make is always executing the "first" recipe it encounters.

- If you need to create new directories from within R, you can use `dir.create('directory_name')`.
  
- Please use the Windows Command Prompt or Anaconda Prompt to run R or make from the command prompt. When using the command prompt through the terminal in RStudio, it may happen that some of the installed packages cannot be found.

 **Solutions:**

1) The target `logit_model.csv` was not set correctly.`analysis_and_report.R` creates a file called `logit_model_summary.csv`. Hence, `make` will be looking for a file called `logit_model.csv`, which is never created. Therefore, it will not "know" it is "up-to-date".
      
2) See below.

      ```
      # Makefile to automate the email marketing analysis

      # An overarching "all" rule that requests the final output files
      all: logit_model_summary.csv conversion_engagement_plot.png summary_stats.csv

      # Rule to create the processed dataset
      processed_email_data.csv: data_process.R
            Rscript data_process.R # Use Rscript to run the R file

      # Rule to generate final output files; depends on processed data and analysis script
      logit_model_summary.csv conversion_engagement_plot.png summary_stats.csv: processed_email_data.csv analysis_and_report.R
            Rscript analysis_and_report.R

      # Clean rule to remove generated files
      clean:
            R -e "unlink('*.csv')"
            R -e "unlink('*.png')"

      ```
3) Temporary files (i.e., `processed_email_data.csv`) need to be stored in `temp`. All source code needs to be stored in `src`, and the final output files need to be put into `output`. [See here for all modified source files](../practice_workflow_solution.zip) (which includes the `.R` scripts - see file directories and commands to create new directories!).

Q5. Other example questions.
  
  1. Please name three ways to deploy one's research findings. (*knowledge*) 
     
      **Solution:** via an app (e.g., dashboard), an API, via a Quarto document/PDF-rendered RMarkdown document (other options possible as well).

  2. What are the main benefits of exploring data using RMarkdown documents, compared to “point-and-click” interfaces (e.g., SPSS), or manually investigating data by issuing commands in the R terminal? (*comprehension*)
     
     **Solution:** You can easily generate professional-looking documents that are ready to share with non-technical colleagues. Unlike manual investigation or point-and-click methods, writing everything in code ensures consistent results when the code is re-run. Additionally, the code clearly documents each step taken, enhancing both the transparency and the understanding of the final output.
     
  3. What are the benefits from automating pipelines, compared to manually executing source code files? (*comprehension*)
      
      **Solution:** Automating pipelines makes everything more consistent and saves time by running the same steps every time without mistakes. It also helps handle larger tasks easily, keeps things organized, and makes it easier to spot errors. Plus, it’s great for teamwork because everyone follows the same process.
      
  4. Please view the code snippet below and assess the completeness of the script with regard to the Setup-ITO components of a source code file. Can you identify any missing piece in the code? (*analysis*)

      ```
      library(dplyr)
      df <- read.csv('data.csv')
      df <- df %>% filter(age >= 18)
      ```
      **Solution:** Following the Setup-ITO process, the "output" step is missing (e.g., `write_csv(df, file = 'output.csv')`). Additionally, the code snippet uses `read.csv` instead of `read_csv`, which can result in slower performance.

  5. Please assess whether the makefile below will correctly work when you type "make" in the `\code` folder of this project. (*analysis*)

      {{< hint >}}
      Directory Structure:
      
      \readme.md
      \code\makefile
      \code\load.R
      \data\dataset.csv
     
      Makefile:
      
      data/dataset.csv: load.R
            R --vanilla < load.R
      
      {{< /hint >}}
 
      **Solution:** The `makefile` is incorrectly configured due to incorrect relative directories. While the `makefile` will be found in the working directory (`code`), and it will successfully run `load.R` (since it’s also in the same directory), the workflow won’t be recognized as complete. This is because `make` expects the target to be in `data/dataset.csv`, whereas it should be relative to the current working directory, i.e., `../data/dataset.csv`. Furthermore, `load.R` might not run at all if its inputs are incorrectly pointed to `data/dataset.csv` instead of `../data/dataset.csv`.
