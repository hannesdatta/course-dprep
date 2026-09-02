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
