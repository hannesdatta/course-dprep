# Code Quest

A self-contained browser teaching app for gamified Shell, R, Git, and SQL exercises.

## Run it

Unzip the project and open `index.html` in a browser. No server or build step is required.

## Included lesson packs

- **Shell Quest** — macOS / Windows, `ls` / `dir`, `cd`, `cd ..`, `mkdir`, `git clone`
- **R Quest — Basics** — arithmetic, assignment, objects, vectors, `mean()`, indexing
- **Week 1 R Quests** — working directories, `list.files()`, `read_csv()`, `head()`, `glimpse()`
- **R Quest — Data & Plots** — data frames, `head()`, `nrow()`, `$`, `mean()`, scatter plot, histogram
- **Week 3 ggplot Quest** — `ggplot()`, `aes()`, `geom_point()`, labels, themes
- **Week 3 Make Quest** — one rule and `make -n`
- **Week 4 Join Quest** — `left_join()` and `inner_join()` on a key
- **Week 5 R Quest** — `grepl()`, `gsub()`, `pivot_wider()`, and a `lag()`/`lead()` preview
- **Week 5 SQL Quest** — retrieve rows from a mock SQLite-style table
- **Week 5 Make Quest** — multiple targets, dependency order, and missing-prerequisite debugging
- **Week 6 AI Quests** — separate prompting and agent-workflow cases, with four clickable, explained choices in each
- **Git Quest** — `status`, `add`, `commit`, branches, switching, merging
- **SQL Quest** — `SELECT`, `WHERE`, `ORDER BY`, `COUNT`, `AVG`, `GROUP BY`

## Instructor view

In `config.js`:

```js
window.CODE_QUEST_CONFIG = {
  showInstructorView: true
};
```

Change it to:

```js
showInstructorView: false
```

to hide the instructor-authoring section from students.

## Adding lessons

The main design principle is: **lessons live separately from the infrastructure**.

Normally, add or edit lessons only in `lessons/*.js`. Do not change `engine.js` or the shared UI unless a lesson genuinely requires a new engine capability.

See `AGENTS.md` for detailed instructions for future work and coding agents.

### Reading panes (concept-only missions)

You can add a non-interactive mission for explanation before practice:

```js
{
  mode: 'reading',
  title: 'Reading: Vectors',
  intro: 'Read this before coding.',
  readingTitle: 'What is a vector?',
  readingBody: () => '<p>A vector stores multiple values of one type.</p>',
  xp: 40
}
```

- Reading missions hide the command input and hints.
- Learners click **Next mission** after reading.
- XP is awarded when they continue (use a smaller value such as `30`-`50`).

Lesson packs may set optional `workspace` labels (`title`, `subtitle`, `prompt`, `stateTitle`, `stateSubtitle`, `placeholder`, and `documentLabel`) to reuse the Markdown text editor for short written responses.

### Clickable choice missions

Use `mode: 'choice'` for a question with clickable options and immediate teaching feedback:

```js
{
  mode: 'choice',
  title: 'Choose the next step',
  question: 'Which action best fits this situation?',
  choices: [
    { text: 'Option one', feedback: 'This misses the stated goal.' },
    { text: 'Option two', correct: true, feedback: 'This uses the data context and can be checked.' }
  ],
  xp: 80
}
```

Incorrect choices explain the issue and let learners try again. A correct choice explains why it fits and unlocks **Next mission**.

## Architecture

- `index.html` — shared interface
- `config.js` — configuration flags
- `engine.js` — reusable engine and mock interpreters
- `lessons/` — separate lesson packs
- `AGENTS.md` — repository-editing rules

## R plots

The current R workspace is a mock interpreter. `plot()` and `hist()` render simple browser SVG plots. A future infrastructure upgrade could replace the mock evaluator with webR while keeping the lesson-pack architecture.

## Additional mock interpreter coverage

The teaching workspace also simulates a small project directory and CSV for `getwd()`, `setwd()`, `list.files()`, `read_csv()`, and `glimpse()`. R practice includes simple `grepl()`, `gsub()`, `left_join()`, `inner_join()`, and `pivot_wider()` examples. The Make workspace accepts basic Makefile rules, accepts a tab or three spaces before recipe commands, and previews dependency plans with `make -n`; it does not run the displayed recipes. SQL quests use small in-memory teaching tables rather than connecting to a real SQLite file.

## Offline use

The current version has no external runtime dependencies, so it can be used offline by opening `index.html` directly.
