# Agent Guidelines for `course-dprep`

## Build/Lint/Test Commands
- **No build/lint/test commands** are defined in this repository. Use standard R tools for testing.
- To run a single test, use `Rscript -e "testthat::test_file('path/to/test.R')"`.

## Code Style Guidelines
- **Imports**: Use `library()` for packages in R scripts.
- **Formatting**: Follow standard R style (e.g., snake_case for variables/functions).
- **Types**: Use explicit type annotations where applicable (e.g., `function(x: numeric)`).
- **Naming Conventions**: Use descriptive names (e.g., `calculate_mean` instead of `calc`).
- **Error Handling**: Use `tryCatch` for robust error handling in R.
- **File Structure**: Organize code into logical directories (e.g., `material/lectures/`, `material/tutorials/`).

## Repository-Specific Rules
- **No Cursor or Copilot rules** found in this repository.
- **Documentation**: Use `.qmd` for Quarto documents and `.Rmd` for R Markdown files.
- **Images**: Store images in `images/` subdirectories (e.g., `material/tutorials/git/images/`).