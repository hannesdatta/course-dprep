# Team Assignment Rubric Draft (TikTok Data)

## Assessment Structure (Prominent)

This project grade is a **combination of team work and individual work**.

- **Team-assessed components: 65% of project grade**
  - Week 2: 25%
  - Week 4 (team part): 15%
  - Week 5: 25%
- **Individual-assessed components: 35% of project grade**
  - Week 3: 25%
  - Week 4 (individual part): 10%

## Deliverable Deadlines

All weekly deliverables are due at the **beginning of the following week**:

- Week 2 assignment -> due at the beginning of Week 3
- Week 3 assignment -> due at the beginning of Week 4
- Week 4 assignment -> due at the beginning of Week 5
- Week 5 assignment -> due at the beginning of Week 6

Use Canvas for exact date/time cutoffs.

## Week 2 (Team Grade, 25%)

All team members receive the same team grade.

### Instructor prep

- Public GitHub repository with starter code and assignment instructions
- Initial set of GitHub Issues describing Week 2 tasks

### Rubric focus

**Project management**
- Fork template repository
- Add team members as collaborators
- Add README documentation: what to install and how to run
- Work through assigned issues
- Write short completion summaries in issues and close completed issues

**Coding**
- Download starter datasets
- Produce a clean summary document on one selected CSV file via rendered Quarto output

**Versioning**
- Frequent commits (**more than 5**) with meaningful commit messages
- Correct use of `git status`, `git add`, `git commit`, `git push`, and `git pull`

**Automation**
- Scripts follow setup-input-transformation-output principles

## Week 3 (Individual Grade, 25%)

Each student receives an individual grade.

### Instructor prep

- New individual issues for each team member
- Issues focus on data visualization tasks (aligned with Week 3 ggplot content)

### Rubric focus

**Project management**
- Student works on issues assigned to them
- Issues are handled in isolation
- README updated where needed

**Coding**
- Use `ggplot2` to generate visual outputs (`.png`)
- Use tools/functions such as `dir.create`, `ggsave`, histogram, bar chart, and time-series plots
- Optional bonus scope: advanced plots/legends (e.g., with ChatGPT/Tilly support)

**Versioning**
- Work in feature branch (`checkout -b ...`)
- Commit and push in branch
- Open pull request to `main`
- Understand role of `main` vs feature branches
- Major failure condition: directly merging unfinished individual work into `main` at this stage

**Automation**
- Provide a `Makefile` for visualization workflow

## Week 4 (Individual 10% + Team 15%)

Week 4 combines individual and team grading.

### Instructor prep

- Assign reviewers for each issue/pull request

### Individual part (10%)

**Project management**
- Student addresses assigned review and revision tasks

**Automation**
- Verify that the `Makefile` runs correctly

### Team part (15%)

**Collaboration and integration**
- Team meet-up to merge all relevant pull requests
- Resolve merge conflicts jointly
- Merge one coherent integrated version to `main`
- Close remaining open issues tied to this stage

## Week 5 (Team Grade, 25%)

All team members receive the same team grade.

### Instructor prep

- New issues covering:
  - Add regression analysis
  - Implement modular folder structure: `data_prep`, `analysis`, `paper`
  - Add analysis result output as PDF (or advanced alternative: interactive dashboard with Plotly/Shiny)
  - Swap CSV input for database input (database supplied to students)
  - Work with fixed R package versions (requirements-style reproducibility)
  - Optional: Docker run (agentic implementation allowed)

### Rubric focus

**Project management**
- Students self-assign issues
- Students review each other's issues
- README finalized and complete

**Coding**
- Complete assigned coding challenges
- Complete at least one meaningful review contribution on another issue

**Versioning**
- Per feature branch: `git status`, `git add`, `git commit`, `git push`
- Correct branch merges into integration branch/`main`

**Automation**
- End-to-end `Makefile` for full workflow
- Include `make clean`
- Reproducible package versioning for R environment
