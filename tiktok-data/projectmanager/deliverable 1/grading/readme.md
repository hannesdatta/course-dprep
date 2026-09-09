# Deliverable 1 - grading data collector

`collect_grading_data.py` gathers everything needed to grade deliverable 1
from every fork of the course template repo. It is **read-only** on GitHub:
it clones repos and reads the API, but never creates, edits, or closes
anything.

## What it produces

```
deliverable 1/
  grading/
    collect_grading_data.py
    dprep-deliverable-1-grading.xlsx  <- Overview + Grading rubric + one sheet per repository (main deliverable)
    summary.csv            <- the Overview sheet as CSV
    summary.json           <- "summary": the same flat rows, + "forks": full nested detail
  student_repos/           <- created next to grading/ (git-ignored)
    <login>/               <- full clone of that student's fork
      grading_data.json    <- per-fork git history + issue detail
    <login>/
    ...
```

### `dprep-deliverable-1-grading.xlsx`

- **Overview** sheet - one row per fork (the columns below), frozen header,
  auto-filter on.
- **Grading rubric** sheet (2nd in the workbook) - the rubric as an
  items x repos matrix (one row per item, one column per fork), grouped
  into numbered categories, each with an *Automatic grading* and/or
  *Manual grading* sub-block:
  - **1. Project management** - automatic: repo cloned, issues closed,
    checkboxes used, README present, labels added, issues assigned,
    comments given; manual: commit history evenly distributed over time /
    across people.
  - **2. Coding** - manual: qmd file is created, qmd file runs following
    the instructions, clean summary is created, summary output contains
    deep insights.
  - **3. Versioning** - automatic (from the git history): amount of commits
    higher than 5, amount of commits higher than 10; manual: quality of
    commits is high.

  Automatic items are pre-filled per fork; every cell is a dropdown. Every
  assessment cell is coloured by goodness (green best -> red worst, grey
  n/a) with conditional formatting, so it follows a grader's override.
  **Every sub-block has its own live `Score` row** per fork - Yes / All /
  Strongly agree = 1, Agree = 0.75, Some / Neutral = 0.5, Disagree = 0.25,
  others = 0, n/a and blank excluded - shown as a percentage and
  colour-scaled red -> green.
- One sheet **per repository** (named by GitHub login) with the deeper
  picture: `html_url`, authors and their commit counts, branches,
  **every commit** (date, author, kind, size, subject), **every issue**
  (state, who closed it, assignees, labels, comments, checkbox progress,
  timeline events), **every issue comment** (author, timestamp, full text),
  the assignment-issue match table, pull requests, the full key-metrics
  list, and two charts - commits per day (stacked by author) and commits
  per author.

Needs `openpyxl` (`pip install openpyxl`). Without it the script still
writes `summary.csv` / `summary.json` and just skips the workbook; pass
`--no-xlsx` to skip it deliberately.

**If a file is open in Excel** when the script runs it can't be
overwritten. The script waits, retries, then writes a
`-<timestamp>`-suffixed copy instead (e.g.
`dprep-deliverable-1-grading-<timestamp>.xlsx`) and prints a clear warning
at the end. Close the workbook and re-run to refresh the canonical files.

### Overview columns (also `summary.csv` / `summary.json` `"summary"`)

An empty cell means "not collected" (that section was skipped or errored);
a `0` means "collected, count is zero".

| Column | Meaning |
| --- | --- |
| `cloned` | `cloned` / `updated` / `reused` / `no` |
| `total_commits`, `merge_commits` | across all branches |
| `distinct_authors` / `distinct_author_names` | unique commit author emails / names |
| `authors` | `Name(commits); ...`, most active first |
| `active_days` | distinct calendar days with a commit |
| `first_commit`, `last_commit` | dates (YYYY-MM-DD) |
| `*_commits` (feature/fix/docs/refactor/test/chore/other) | commit-subject classification |
| `extra_branches` | branch names other than main/master/default |
| `insertions`, `deletions` | summed over all commits |
| `issues_total/open/closed` | all issues on the fork (PRs excluded) |
| `issues_closed_by_student` | issues closed by someone other than the course account/bots |
| `issues_with_comments`, `issues_with_assignee` | engagement counts |
| `issues_interacted` | issues closed, assigned, student-commented, checkbox-ticked, or with student timeline events |
| `checkboxes_done` / `checkboxes_total` | task-list progress summed over **all** issues |
| `assignment_found/closed/interacted` | of the issues in `../issues_data.json`, matched by title |
| `assignment_checkboxes_done/total` | task-list progress for just those matched issues |
| `prs_total/open/merged` | pull requests on the fork |
| `prs_to_upstream` | PRs whose base is a different repo (e.g. opened against the course repo) |
| `git_error`, `issues_error` | populated when that section failed |

(`assignment_*` stays 0 until `../issues_data.json` holds the real
deliverable issue titles instead of the placeholder.)

For each fork it collects:

1. **The repo, with full git history and all branches** - cloned into
   `../student_repos/<login>/` (fetched/updated if already there). No
   shallow clone, so every commit on every branch is available.
2. **Git history summary** - total commits, commits per author (to see
   which group members contributed), merge commits, distinct active days,
   first/last commit date, insertions/deletions, extra branches created,
   and a rough breakdown by commit kind (feature / fix / docs / refactor /
   test / chore / other) inferred from the commit subject. Every individual
   commit is kept in `grading_data.json`.
3. **Issue engagement** - for every issue: open/closed state, who closed it,
   assignees, labels, comment authors plus every comment's author, timestamp
   and full text, task-list checkbox progress
   (`- [x]` vs `- [ ]`), and timeline event types. An issue counts as
   *interacted* if it was closed, assigned, commented on by a student, had
   checkboxes ticked, or had student timeline events. The summary rolls
   these up across all issues (`issues_closed_by_student`,
   `issues_with_comments`, `issues_with_assignee`, `issues_interacted`,
   `checkboxes_done/total`).
4. **Assignment cross-check** - the issues in `../issues_data.json` are
   matched by title so the summary also reports, per fork, how many
   assignment issues are present / closed / touched and their checkbox
   progress (`assignment_*` columns).
5. **Pull requests** - count, open/merged, head/base branch, and whether a
   PR targets the upstream repo instead of the student's own `main`.

## Usage

From this folder:

```bash
python collect_grading_data.py --dry-run     # list the forks, do nothing else
python collect_grading_data.py --test        # only the test student (krolabola)
python collect_grading_data.py --fork-user alice --fork-user bob
python collect_grading_data.py               # every fork
python collect_grading_data.py --skip-clone  # reuse existing clones, refresh issue data only
```

| Flag | Default | Description |
| --- | --- | --- |
| `--owner` | `course-dprep` | Owner of the base repo whose forks are graded. |
| `--repo` | `TikTok-project-2026-2027` | Base repo name. |
| `--data-file` | `../issues_data.json` | Assignment issue templates to cross-check against. |
| `--repos-dir` | `../student_repos` | Where forks are cloned. |
| `--out-dir` | this folder | Where `summary.csv` / `summary.json` are written. |
| `--fork-user` | (all) | Restrict to a GitHub login; repeatable. |
| `--test` | off | Shortcut for `--fork-user krolabola` (the test student). |
| `--token` | `$GITHUB_TOKEN` / `$GH_TOKEN` | GitHub token. |
| `--limit` | (none) | Only process the first N forks. |
| `--skip-clone` | off | Don't clone/fetch; use existing clones. |
| `--skip-git` | off | Don't read git history. |
| `--skip-issues` | off | Don't query the issues API. |
| `--no-xlsx` | off | Skip the `dprep-deliverable-1-grading.xlsx` workbook. |
| `--dry-run` | off | List forks and stop. |

## Setup

`pip install requests colorama openpyxl` (`openpyxl` only for the workbook),
and a GitHub token via `GITHUB_TOKEN` / `GH_TOKEN`, `--token`, or the `.env`
next to `../../populate.py`. The token is needed for issue data and to lift
the anonymous rate limit; cloning public forks works without one. `git`
must be on `PATH`.

`../student_repos/` and the generated `summary.*` files are git-ignored via
`deliverable 1/.gitignore`.
