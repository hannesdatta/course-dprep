# AGENTS.md — Code Quest repository guidance

## Project purpose

Code Quest is a browser-based teaching app for interactive, gamified exercises in:

- Shell / terminal navigation on macOS and Windows
- R
- Git
- SQL

The app is intentionally designed around a **stable shared infrastructure** plus **separate lesson-pack files**.

## Core development rule

**When adding, editing, or removing lessons, change lesson files only whenever possible.**

Lesson work belongs in `lessons/` and should normally *not* require edits to:

- `engine.js`
- `index.html`
- `config.js`

Only change the infrastructure when a requested lesson needs a capability the current engine genuinely does not support (for example, a new R function, a new Git operation, a new SQL construct, a richer plot type, or a new workspace type).

Before changing infrastructure, first ask:

1. Can the lesson be expressed with the existing mission schema?
2. Can the checker use the existing state/result objects?
3. Can the exercise be implemented entirely inside a new or existing `lessons/*.js` file?

If yes, **do not modify the infrastructure**.

## Repository structure

```text
code-quest/
├── index.html                 # Shared UI shell
├── config.js                  # Instructor-facing configuration flags
├── engine.js                  # Shared lesson engine + mock interpreters
├── README.md                  # Human-facing project instructions
├── AGENTS.md                  # Instructions for coding agents / future edits
└── lessons/
    ├── shell.js               # macOS + Windows shell lesson pack
    ├── r-basics.js            # basic R lesson pack
    ├── r-data-plots.js        # R data + plotting lesson pack
    ├── git.js                 # Git workflow/branching lesson pack
    └── sql.js                 # SQL lesson pack
```

## Adding a new lesson pack

Create a new file in `lessons/`, for example:

```text
lessons/r-regression.js
```

Register it with:

```js
window.CODE_QUEST.registerPack({
  id: 'r-regression',
  type: 'r',
  title: 'R Quest — Regression',
  description: 'Learn lm(), coefficients, and prediction.',
  missions: [
    // mission objects here
  ]
});
```

Then add **one `<script src="lessons/r-regression.js"></script>` line** in `index.html` before `window.CODE_QUEST.start()`.

That script include is considered a minimal registration change, not an infrastructure redesign.

## Adding lessons to an existing pack

Edit only the relevant file in `lessons/` and add a mission object to its `missions` array.

Typical mission fields:

```js
{
  title: 'Create x',
  difficulty: 'Warm-up',
  intro: 'Short teaching explanation.',
  task: () => 'Create <strong>x</strong> containing 1, 2, 3.',
  concept: 'Optional concept explanation.',
  hints: () => ['Use c().', 'Try x <- c(1,2,3).'],
  solution: () => 'x <- c(1,2,3)',
  check: (state, result, code, helpers) =>
    JSON.stringify(state.env.x) === '[1,2,3]',
  unlock: () => ['c()'],
  xp: 100
}
```

Prefer **outcome-based checkers** over exact string matching. If two different commands correctly solve the task, both should normally pass.

## Infrastructure changes

Infrastructure changes are appropriate only when required by lesson functionality. Examples:

- supporting a new R command such as `lm()` or `ggplot()`
- implementing a new SQL feature such as `JOIN`
- implementing Git conflicts, rebasing, remotes, or tags
- supporting a new plot type
- moving from the mock R interpreter to webR
- adding persistence or LMS integration

When infrastructure must change:

1. Keep the public lesson schema backward compatible whenever practical.
2. Avoid coupling engine behavior to one specific lesson.
3. Put lesson-specific content in `lessons/`, not in `engine.js`.
4. Test all existing lesson packs after the change.
5. Document any new mission fields or engine capabilities here and in `README.md`.

## Instructor-view flag

`config.js` contains:

```js
window.CODE_QUEST_CONFIG = {
  showInstructorView: true
};
```

Set `showInstructorView` to `false` to hide the instructor-authoring section from students.

Do not remove the instructor markup just to hide it; use the configuration flag.

## Offline-first constraint

The current project has no runtime dependency on external CDNs and should work by opening `index.html` directly in a browser.

Preserve this offline-first behavior unless an explicit request requires a network dependency.

If a future feature uses webR or another library, prefer a locally vendored/pinned dependency for distributable teaching builds, or clearly document the online requirement.

## Coding style

- Plain HTML, CSS, and vanilla JavaScript.
- No build step is currently required.
- Keep lesson files readable by instructors who are not frontend developers.
- Favor small declarative lesson objects over custom UI logic.
- Avoid introducing frameworks unless the project has outgrown the current architecture and the change is explicitly desired.
