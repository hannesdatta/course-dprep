# Code Quest

A self-contained browser teaching app for gamified Shell, R, Git, and SQL exercises.

## Run it

Unzip the project and open `index.html` in a browser. No server or build step is required.

## Included lesson packs

- **Shell Quest** — macOS / Windows, `ls` / `dir`, `cd`, `cd ..`, `mkdir`, `git clone`
- **R Quest — Basics** — arithmetic, assignment, objects, vectors, `mean()`, indexing
- **R Quest — Data & Plots** — data frames, `head()`, `nrow()`, `$`, `mean()`, scatter plot, histogram
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

## Architecture

- `index.html` — shared interface
- `config.js` — configuration flags
- `engine.js` — reusable engine and mock interpreters
- `lessons/` — separate lesson packs
- `AGENTS.md` — repository-editing rules

## R plots

The current R workspace is a mock interpreter. `plot()` and `hist()` render simple browser SVG plots. A future infrastructure upgrade could replace the mock evaluator with webR while keeping the lesson-pack architecture.

## Offline use

The current version has no external runtime dependencies, so it can be used offline by opening `index.html` directly.
