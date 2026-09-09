# Issue Populator

Bulk-creates a predefined set of GitHub issues on every fork of the course
template repository. Used to seed each student group's fork with the same
starter checklist (README, folder structure, AI.md, etc.) without doing it
by hand fork by fork.

## What it does

1. Fetches every fork of the base repo (`course-dprep/TikTok-project-2026-2027`
   by default).
2. For each fork:
   - Skips it if issues are disabled.
   - Reads existing issues and compares their titles (case-insensitive,
     whitespace-normalized) against the templates in `issues_data.json`.
   - Creates any template issue whose title doesn't already exist on the fork.
   - Labels are only attached if they already exist on the target repo — a
     label that doesn't exist there is silently skipped (creating a new
     label requires push access we don't have on someone else's fork).

Already-populated forks and already-existing issues are left untouched, so
the script is safe to re-run at any time (e.g. after new forks appear).

## Setup

```bash
pip install requests colorama
```

Create a `.env` file in this folder (listed in `tiktok-data/.gitignore`,
so it won't get committed) with a GitHub personal access token that has
`public_repo` scope:

```
GITHUB_TOKEN=ghp_your_token_here
```

The token needs read access to list forks/issues/labels, and is required to
actually create issues (`--dry-run` works without one, but will only be able
to read public data).

## Issue templates: `issues_data.json`

A JSON array of issue definitions:

```json
[
  {
    "title": "Add a project README",
    "body": "Markdown body of the issue...",
    "labels": ["documentation"]
  }
]
```

- `title` (required) — used both as the issue title and as the key for
  detecting whether the issue already exists on a fork.
- `body` (optional) — markdown, supports task lists.
- `labels` (optional) — only applied if the label already exists on the
  target fork.

Add, remove, or edit entries here to change what gets created.

## Coaching round 2

`populate_coaching2.py` seeds a second checklist for the next coaching
session. It is a thin wrapper around `populate.py` (same fork scanning, same
safety rules) that just defaults `--data-file` to
`issues_data_coaching2.json`.

```bash
python populate_coaching2.py --dry-run   # preview the round 2 issues
python populate_coaching2.py             # create them on every fork
```

Round 2 issue titles differ from round 1, so running it after round 1 only
adds the new issues and leaves the round 1 ones untouched. Every flag from
`populate.py` still applies (`--owner`, `--repo`, `--token`, and even
`--data-file` to point at yet another file). Edit `issues_data_coaching2.json`
the same way as `issues_data.json`.

`issues_data_coaching2.json` currently holds four copies of the same
"download → clean → visualise → makefile → PR" assignment, one per TikTok
dataset (`users`, `sessions`, `impressions`, `watch_events`). The task list
is identical in all four; only the intro paragraph and the download URL
differ. Titles are dataset-specific so `populate.py`'s title-based dedupe
treats them as four separate issues.

### Test run against a single fork

`populate_coaching2_test.py` runs the coaching round 2 checklist against
**one fork only** — by default the fork owned by GitHub user `krolabola` —
so you can sanity-check the issues before touching every fork. It filters
the fork list to that user and calls the same creation logic; nothing else
is read or modified.

```bash
python populate_coaching2_test.py --dry-run          # preview
python populate_coaching2_test.py                     # create on krolabola's fork only
python populate_coaching2_test.py --fork-user someone # aim at a different fork
```

## Per-deliverable populators

`populate.py` is the shared base code and stays at the top level of this
folder. Each deliverable has its own folder next to it:

```
projectmanager/
  populate.py                     <- shared base code (imported, not run per deliverable)
  deliverable 1/
    populate_issues.py            <- wrapper: defaults --data-file to this folder's issues_data.json
    populate_issues_test.py       <- same, but targets ONE fork only (default user: krolabola)
    issues_data.json             <- issue templates for deliverable 1
  deliverable 1/grading/
    collect_grading_data.py      <- clones every fork (full history) + collects issue engagement
    readme.md
  deliverable 2/  (same three files)
  deliverable 3/  (same three files)
  deliverable 4/  (same three files)
```

`deliverable 1/grading/collect_grading_data.py` is the read-only grading
collector: it clones every fork with full git history into
`deliverable 1/student_repos/`, summarises each repo's commits (how many,
by whom, what kind) and issue engagement (open/closed, comments,
checkboxes, timeline events), and writes
`dprep-deliverable-1-grading.xlsx` (an Overview sheet, a Grading rubric
sheet, plus one sheet per repository), `summary.csv`, and `summary.json`.
See `deliverable 1/grading/readme.md`. Its `--test` flag targets only
`krolabola`, like the populators.

`populate_issues.py` is a thin wrapper (like `populate_coaching2.py`) that
adds the parent folder to `sys.path`, imports `populate`, and defaults
`--data-file` to the deliverable's own `issues_data.json`. Every flag from
`populate.py` still applies.

`populate_issues_test.py` is the single-fork test run (like
`populate_coaching2_test.py`): it filters the fork list down to one GitHub
user (`--fork-user`, default `krolabola`) so you can sanity-check the
issues before touching every fork.

```bash
cd "deliverable 1"
python populate_issues_test.py --dry-run     # preview on krolabola's fork only
python populate_issues_test.py               # create on krolabola's fork only
python populate_issues.py --dry-run          # preview on every fork
python populate_issues.py                    # create on every fork
```

Each `issues_data.json` currently holds a single placeholder issue — edit
it with the real deliverable checklist (same schema as `issues_data.json`,
described above). Titles must be unique across deliverables so
`populate.py`'s title-based dedupe treats them as separate issues.

## Usage

```bash
# Preview what would be created, without creating anything
python populate.py --dry-run

# Actually create the missing issues on every fork
python populate.py

# Target a different base repo / template file / token
python populate.py --owner course-dprep --repo TikTok-project-2026-2027 \
    --data-file issues_data.json --token ghp_xxx
```

| Flag | Default | Description |
| --- | --- | --- |
| `--owner` | `course-dprep` | Owner of the base repository whose forks are targeted. |
| `--repo` | `TikTok-project-2026-2027` | Name of the base repository. |
| `--data-file` | `issues_data.json` | Path to the JSON file with issue templates. |
| `--token` | `$GITHUB_TOKEN` / `$GH_TOKEN` | GitHub token to authenticate with. |
| `--dry-run` | off | List what would be created without creating anything. |

Console output is color-coded (via `colorama`): cyan for progress/headers,
green for created issues, yellow for warnings/skips (rate limits, disabled
issues, missing labels), and red for errors.
