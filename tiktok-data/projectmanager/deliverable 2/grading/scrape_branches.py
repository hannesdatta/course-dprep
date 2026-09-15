#!/usr/bin/env python3
"""Deliverable 2 branch scraper.

Deliverable 2 (week 3) is *individual* work: inside each team's forked
repo, every team member does their assignment on their own branch and
never merges it into ``main`` (a PR is opened from the branch to their own
fork's ``main`` and left open for review). So the unit of grading here is
not "the fork" (as in deliverable 1) but "one branch inside one fork".

For every fork of the course template repo this script:

  1. Clones the fork as a **bare** mirror into
     ``../student_repos/.bare/<login>.git`` (fetches it if already there).
  2. Lists every branch other than the fork's default branch (main/master)
     - each one is treated as one student's individual assignment.
  3. Figures out who made the branch (the most common commit author among
     the commits the branch has that ``main`` doesn't), and checks that
     branch out into its own folder, named after that person:

         student_repos/<login>/<creator name>/

     So every *folder* inside a scraped repo folder is a checked-out
     branch. Re-running the script refreshes existing checkouts in place
     (``git reset --hard``) and prunes folders for branches that no longer
     exist upstream.
  4. Collects git stats for just that branch's own commits (the ones not
     already on main): commit count, insertions/deletions, active days,
     which new folders it added under ``src/``, whether it added a
     ``README.md`` / ``Makefile`` / any ``.png`` output.
  5. Looks up whether a pull request exists for that branch (state, base,
     whether it targets the fork's own main, whether it's still open as
     instructed).
  6. Writes one ``<creator name>.json`` per branch next to its checkout
     folder, and a combined ``branches_summary.json`` + ``.csv`` in this
     ``grading/`` folder (consumed by ``build_grading_xlsx.py``).

This is a wrapper around the shared base code in ``../../populate.py``
(session handling, fork listing, pagination, rate limiting, colour
output). It only ever reads from GitHub - it never creates, edits, or
closes anything.

Usage (from this folder):

    python scrape_branches.py --dry-run             # list forks, do nothing
    python scrape_branches.py --test                # only the test student (krolabola)
    python scrape_branches.py --fork-user alice --fork-user bob
    python scrape_branches.py                        # every fork
    python scrape_branches.py --skip-fetch            # reuse existing bare clones/checkouts

A GitHub token (``GITHUB_TOKEN`` / ``GH_TOKEN`` env var, or ``.env`` next to
``populate.py``, or ``--token``) is needed for the pull-request lookups and
to avoid low anonymous rate limits. Cloning public forks works without one.
"""
from __future__ import annotations

import argparse
import csv
import datetime as dt
import json
import os
import re
import shutil
import subprocess
import sys
from collections import Counter

# The shared base code (populate.py) lives two directories up, at the top
# level of projectmanager/, outside the per-deliverable folders.
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
if BASE_DIR not in sys.path:
    sys.path.insert(0, BASE_DIR)

import populate  # noqa: E402

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
DELIVERABLE_DIR = os.path.dirname(SCRIPT_DIR)
DEFAULT_REPOS_DIR = os.path.join(DELIVERABLE_DIR, "student_repos")
DEFAULT_BARE_DIR = os.path.join(DEFAULT_REPOS_DIR, ".bare")
DEFAULT_TEST_FORK_USER = "krolabola"

COMMON_MAIN_NAMES = {"main", "master", "head"}
_XL_BAD_CHARS = re.compile(r'[<>:"/\\|?*\x00-\x1f]')


# --------------------------------------------------------------------------- git

def _git(args: list[str], cwd: str, check: bool = True) -> str:
    env = {**os.environ, "GIT_TERMINAL_PROMPT": "0"}
    proc = subprocess.run(
        ["git", *args], cwd=cwd, env=env,
        capture_output=True, text=True, encoding="utf-8", errors="replace",
    )
    if check and proc.returncode != 0:
        raise RuntimeError(f"git {' '.join(args)} -> {proc.returncode}: {proc.stderr.strip()}")
    return proc.stdout


def clone_or_update_bare(fork: dict, bare_root: str) -> tuple[str, str]:
    """Bare-clone the fork (mirroring refs/heads directly) or fetch it.

    Returns (bare_dir, action) where action is 'cloned', 'updated', or 'reused'.
    """
    login = fork["owner"]["login"]
    bare_dir = os.path.join(bare_root, f"{login}.git")

    # Branches get checked out into worktrees below, so refs/heads/* here
    # are "checked out elsewhere" from fetch's point of view; --update-head-ok
    # tells fetch to update them anyway (the worktree's working copy is then
    # brought back in sync with `git reset --hard` in sync_worktree()).
    fetch_args = ["fetch", "--update-head-ok", "origin", "+refs/heads/*:refs/heads/*", "--prune", "--force"]

    if os.path.isfile(os.path.join(bare_dir, "HEAD")):
        _git(["config", "core.longpaths", "true"], cwd=bare_dir, check=False)
        try:
            _git(fetch_args, cwd=bare_dir)
            return bare_dir, "updated"
        except RuntimeError as exc:
            print(populate.warn(f"    fetch failed, reusing existing bare clone: {exc}"))
            return bare_dir, "reused"

    os.makedirs(bare_root, exist_ok=True)
    _git(["clone", "--bare", fork["clone_url"], bare_dir], cwd=bare_root)
    # Windows MAX_PATH (260 chars) is easily blown by deeply nested Quarto
    # render output (e.g. "*_files/libs/bootstrap/*.min.css"); this repo
    # config makes git accept long paths on checkout instead of aborting.
    _git(["config", "core.longpaths", "true"], cwd=bare_dir, check=False)
    _git(fetch_args, cwd=bare_dir)
    return bare_dir, "cloned"


def list_branches(bare_dir: str, default_branch: str) -> list[str]:
    out = _git(["for-each-ref", "--format=%(refname:short)", "refs/heads"], cwd=bare_dir, check=False)
    branches = [b.strip() for b in out.splitlines() if b.strip()]
    exclude = {default_branch.lower(), *COMMON_MAIN_NAMES}
    return sorted(b for b in branches if b.lower() not in exclude)


def branch_creator(bare_dir: str, branch: str, default_branch: str) -> str:
    """Best-guess name of the student who made this branch."""
    unique = _git(
        ["log", f"{default_branch}..{branch}", "--format=%an"], cwd=bare_dir, check=False
    ).splitlines()
    names = [n.strip() for n in unique if n.strip()]
    if not names:
        # Branch has no commits ahead of main (unusual) - fall back to the
        # branch tip's author, then to the branch name itself.
        tip = _git(["log", "-1", branch, "--format=%an"], cwd=bare_dir, check=False).strip()
        return tip or branch
    return Counter(names).most_common(1)[0][0]


def _sanitize_folder_name(name: str, used: set[str], fallback: str) -> str:
    cleaned = _XL_BAD_CHARS.sub("_", name).strip(" .")
    cleaned = cleaned or fallback
    candidate, i = cleaned, 2
    while candidate.lower() in {u.lower() for u in used}:
        candidate = f"{cleaned} ({i})"
        i += 1
    used.add(candidate)
    return candidate


def sync_worktree(bare_dir: str, branch: str, dest: str) -> str:
    """Create or refresh a checked-out worktree for one branch.

    Returns 'created', 'refreshed', or 'recreated' (stale/broken checkout
    that had to be thrown away and re-added).
    """
    git_pointer = os.path.join(dest, ".git")
    if os.path.isfile(git_pointer):
        try:
            _git(["reset", "--hard"], cwd=dest)
            _git(["clean", "-fd"], cwd=dest)
            return "refreshed"
        except RuntimeError:
            pass  # fall through to recreate

    if os.path.isdir(dest):
        _git(["worktree", "remove", "--force", dest], cwd=bare_dir, check=False)
        shutil.rmtree(dest, ignore_errors=True)
        recreated = True
    else:
        recreated = False

    _git(["worktree", "add", "--force", dest, branch], cwd=bare_dir)
    return "recreated" if recreated else "created"


def prune_stale_worktrees(bare_dir: str, repo_dir: str, keep_paths: set[str]) -> None:
    """Remove checkout folders for branches that no longer exist upstream."""
    _git(["worktree", "prune"], cwd=bare_dir, check=False)
    if not os.path.isdir(repo_dir):
        return
    for name in os.listdir(repo_dir):
        path = os.path.join(repo_dir, name)
        if os.path.isdir(path) and os.path.isfile(os.path.join(path, ".git")) and path not in keep_paths:
            _git(["worktree", "remove", "--force", path], cwd=bare_dir, check=False)
            shutil.rmtree(path, ignore_errors=True)


# ------------------------------------------------------------------ branch stats

def collect_branch_git(bare_dir: str, branch: str, default_branch: str) -> dict:
    """Stats for the commits this branch has that main doesn't (i.e. this
    student's own work), plus a file-level diff against main."""
    fmt = "\x1e" + "\x1f".join(["%H", "%an", "%ae", "%aI", "%s"])
    raw = _git(["log", f"{default_branch}..{branch}", "--no-color", "--numstat",
                f"--pretty=format:{fmt}"], cwd=bare_dir, check=False)

    commits: list[dict] = []
    for record in raw.split("\x1e"):
        record = record.strip("\n")
        if not record:
            continue
        lines = record.split("\n")
        fields = lines[0].split("\x1f")
        if len(fields) < 5:
            continue
        h, an, ae, authored, subject = fields[:5]
        files = ins = dels = 0
        for ln in lines[1:]:
            parts = ln.split("\t")
            if len(parts) != 3:
                continue
            add, rem, _ = parts
            files += 1
            ins += 0 if add.strip() in ("", "-") else int(add)
            dels += 0 if rem.strip() in ("", "-") else int(rem)
        commits.append({
            "hash": h, "author_name": an, "author_email": ae.lower(),
            "authored_at": authored, "subject": subject,
            "files_changed": files, "insertions": ins, "deletions": dels,
        })

    authors: dict[str, dict] = {}
    for c in commits:
        a = authors.setdefault(c["author_email"], {"name": c["author_name"], "commits": 0,
                                                     "insertions": 0, "deletions": 0})
        a["commits"] += 1
        a["insertions"] += c["insertions"]
        a["deletions"] += c["deletions"]
    dates = [c["authored_at"] for c in commits if c["authored_at"]]
    active_days = sorted({d[:10] for d in dates})

    # File-level diff against main: what did this branch add?
    tree_branch = set(_git(["ls-tree", "-r", "--name-only", branch], cwd=bare_dir, check=False).splitlines())
    tree_main = set(_git(["ls-tree", "-r", "--name-only", default_branch], cwd=bare_dir, check=False).splitlines())
    new_files = sorted(tree_branch - tree_main)

    new_src_folders = sorted({
        f.split("/")[1] for f in new_files
        if f.startswith("src/") and len(f.split("/")) > 1 and f.split("/")[1]
    })
    readme_present = any(os.path.basename(f).lower() == "readme.md" for f in new_files)
    makefile_present = any(os.path.basename(f).lower() == "makefile" for f in new_files)
    png_outputs = [f for f in new_files if f.lower().endswith(".png")]

    return {
        "commits_unique": len(commits),
        "insertions": sum(c["insertions"] for c in commits),
        "deletions": sum(c["deletions"] for c in commits),
        "files_changed": sum(c["files_changed"] for c in commits),
        "authors": authors,
        "active_days": len(active_days),
        "first_commit": min(dates) if dates else None,
        "last_commit": max(dates) if dates else None,
        "commits": commits,
        "new_files": new_files,
        "new_src_folders": new_src_folders,
        "readme_present": readme_present,
        "makefile_present": makefile_present,
        "png_outputs": png_outputs,
    }


def collect_branch_pr(session, owner: str, repo: str, branch: str, default_branch: str,
                       full_name: str) -> dict | None:
    api = populate.GITHUB_API
    prs = populate._get_paginated(session, f"{api}/repos/{owner}/{repo}/pulls", params={"state": "all"})
    matches = [
        pr for pr in prs
        if pr["head"]["ref"] == branch
        and (pr["head"].get("repo") or {}).get("full_name", "").lower() == full_name.lower()
    ]
    if not matches:
        return None
    pr = sorted(matches, key=lambda p: p["created_at"])[-1]  # most recent if several
    base_repo = (pr["base"].get("repo") or {}).get("full_name")
    return {
        "number": pr["number"],
        "title": pr["title"],
        "state": pr["state"],
        "merged": bool(pr.get("merged_at")),
        "created_at": pr["created_at"],
        "base_ref": pr["base"]["ref"],
        "base_repo": base_repo,
        "to_own_main": (
            bool(base_repo) and base_repo.lower() == full_name.lower()
            and pr["base"]["ref"] == default_branch
        ),
        "still_open": pr["state"] == "open",
    }


# --------------------------------------------------------------------------- main

def _now() -> str:
    return dt.datetime.now(dt.timezone.utc).isoformat(timespec="seconds")


SUMMARY_COLUMNS = [
    "login", "full_name", "branch", "creator", "folder", "worktree_action",
    "commits_unique", "distinct_authors", "insertions", "deletions", "files_changed",
    "active_days", "first_commit", "last_commit",
    "new_src_folders", "readme_present", "makefile_present", "png_outputs_count",
    "pr_found", "pr_number", "pr_state", "pr_merged", "pr_to_own_main", "pr_created_at",
    "git_error", "pr_error",
]


def summary_row(rec: dict) -> dict:
    git = rec.get("git") or {}
    pr = rec.get("pull_request")
    row = {
        "login": rec["login"],
        "full_name": rec["full_name"],
        "branch": rec["branch"],
        "creator": rec["creator"],
        "folder": rec["folder"],
        "worktree_action": rec.get("worktree_action") or "",
        "commits_unique": git.get("commits_unique", ""),
        "distinct_authors": len(git.get("authors", {})) if git else "",
        "insertions": git.get("insertions", ""),
        "deletions": git.get("deletions", ""),
        "files_changed": git.get("files_changed", ""),
        "active_days": git.get("active_days", ""),
        "first_commit": (git.get("first_commit") or "")[:10],
        "last_commit": (git.get("last_commit") or "")[:10],
        "new_src_folders": "; ".join(git.get("new_src_folders", [])) if git else "",
        "readme_present": "" if not git else ("yes" if git.get("readme_present") else "no"),
        "makefile_present": "" if not git else ("yes" if git.get("makefile_present") else "no"),
        "png_outputs_count": len(git.get("png_outputs", [])) if git else "",
        "pr_found": "yes" if pr else ("" if rec.get("pr_error") else "no"),
        "pr_number": pr["number"] if pr else "",
        "pr_state": pr["state"] if pr else "",
        "pr_merged": "" if not pr else ("yes" if pr["merged"] else "no"),
        "pr_to_own_main": "" if not pr else ("yes" if pr["to_own_main"] else "no"),
        "pr_created_at": (pr["created_at"][:10] if pr else ""),
        "git_error": rec.get("git_error") or "",
        "pr_error": rec.get("pr_error") or "",
    }
    return row


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Scrape individual assignment branches (deliverable 2) from every fork."
    )
    parser.add_argument("--owner", default=populate.DEFAULT_OWNER)
    parser.add_argument("--repo", default=populate.DEFAULT_REPO)
    parser.add_argument("--repos-dir", default=DEFAULT_REPOS_DIR,
                        help="Where per-branch checkouts go (default: ../student_repos).")
    parser.add_argument("--bare-dir", default=DEFAULT_BARE_DIR,
                        help="Where bare mirror clones go (default: ../student_repos/.bare).")
    parser.add_argument("--out-dir", default=SCRIPT_DIR,
                        help="Where branches_summary.json/.csv are written (default: this folder).")
    parser.add_argument("--fork-user", action="append", default=None,
                        help="Restrict to this GitHub login (repeatable).")
    parser.add_argument("--test", action="store_true",
                        help=f"Shortcut for --fork-user {DEFAULT_TEST_FORK_USER}.")
    parser.add_argument("--token", default=os.environ.get("GITHUB_TOKEN") or os.environ.get("GH_TOKEN"))
    parser.add_argument("--limit", type=int, default=None)
    parser.add_argument("--skip-fetch", action="store_true",
                        help="Do not clone/fetch; use whatever bare clones already exist.")
    parser.add_argument("--skip-pr", action="store_true", help="Do not query the pull-requests API.")
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()

    repos_dir = os.path.abspath(args.repos_dir)
    bare_root = os.path.abspath(args.bare_dir)
    out_dir = os.path.abspath(args.out_dir)

    if not args.token and not args.skip_pr:
        print(populate.warn(
            "Warning: no GitHub token (set GITHUB_TOKEN or --token). PR lookups will "
            "likely fail and rate limits are low. Cloning still works."
        ), file=sys.stderr)

    session = populate.make_session(args.token)

    print(populate.header("Branch scraper - deliverable 2"))
    print(populate.dim(f"  base repo:    {args.owner}/{args.repo}"))
    print(populate.dim(f"  bare clones:  {bare_root}"))
    print(populate.dim(f"  checkouts:    {repos_dir}"))

    print(populate.header(f"\nFetching forks of {args.owner}/{args.repo}..."))
    forks = populate.get_forks(session, args.owner, args.repo)

    users = [u.lower() for u in (args.fork_user or [])]
    if args.test and not users:
        users = [DEFAULT_TEST_FORK_USER.lower()]
    if users:
        forks = [f for f in forks if f["owner"]["login"].lower() in users]
    if args.limit:
        forks = forks[:args.limit]

    if not forks:
        print(populate.warn("No matching forks. Nothing to do."))
        return 1

    print(populate.header(f"Processing {len(forks)} fork(s):"))
    for f in forks:
        print(populate.dim(f"  - {f['full_name']}"))
    if args.dry_run:
        print(populate.info("\n[dry-run] stopping before any clone or API call."))
        return 0

    records: list[dict] = []
    for i, fork in enumerate(forks, 1):
        login = fork["owner"]["login"]
        repo = fork["name"]
        full_name = fork["full_name"]
        default_branch = fork.get("default_branch", "main")
        print(populate.header(f"\n[{i}/{len(forks)}] {full_name}"))

        try:
            if not args.skip_fetch:
                bare_dir, bare_action = clone_or_update_bare(fork, bare_root)
            else:
                bare_dir = os.path.join(bare_root, f"{login}.git")
                bare_action = "reused"
                if not os.path.isfile(os.path.join(bare_dir, "HEAD")):
                    raise RuntimeError("no existing bare clone and --skip-fetch set")
            print(populate.success(f"  bare repo {bare_action}: {bare_dir}"))
        except RuntimeError as exc:
            print(populate.error(f"  clone/fetch failed: {exc}"))
            continue

        branches = list_branches(bare_dir, default_branch)
        if not branches:
            print(populate.warn("  no branches beyond the default branch - nothing to check out."))
            continue
        print(populate.info(f"  {len(branches)} individual branch(es): {', '.join(branches)}"))

        repo_dir = os.path.join(repos_dir, login)
        used_names: set[str] = set()
        keep_paths: set[str] = set()

        for branch in branches:
            creator = branch_creator(bare_dir, branch, default_branch)
            folder_name = _sanitize_folder_name(creator, used_names, fallback=branch)
            dest = os.path.join(repo_dir, folder_name)
            keep_paths.add(dest)

            rec: dict = {
                "login": login, "full_name": full_name, "branch": branch,
                "creator": creator, "folder": os.path.relpath(dest, DELIVERABLE_DIR),
                "collected_at": _now(),
            }
            try:
                rec["worktree_action"] = sync_worktree(bare_dir, branch, dest)
                rec["git"] = collect_branch_git(bare_dir, branch, default_branch)
                g = rec["git"]
                print(populate.info(
                    f"    {creator!r} ({branch}): {g['commits_unique']} commit(s), "
                    f"{g['active_days']} active day(s), "
                    f"src+{len(g['new_src_folders'])} readme={g['readme_present']} "
                    f"makefile={g['makefile_present']} png={len(g['png_outputs'])}"
                ))
            except RuntimeError as exc:
                rec["git_error"] = str(exc)
                print(populate.error(f"    {creator!r} ({branch}): git failed: {exc}"))

            if not args.skip_pr:
                try:
                    rec["pull_request"] = collect_branch_pr(
                        session, login, repo, branch, default_branch, full_name
                    )
                    pr = rec["pull_request"]
                    if pr:
                        print(populate.info(
                            f"      PR #{pr['number']}: {pr['state']} "
                            f"(to own main: {pr['to_own_main']}, still open: {pr['still_open']})"
                        ))
                    else:
                        print(populate.warn("      no pull request found for this branch."))
                except Exception as exc:  # noqa: BLE001 - keep going to next branch
                    rec["pr_error"] = str(exc)
                    print(populate.error(f"      PR lookup failed: {exc}"))

            try:
                with open(os.path.join(repo_dir, f"{folder_name}.json"), "w", encoding="utf-8") as fh:
                    json.dump(rec, fh, indent=2, ensure_ascii=False)
            except OSError as exc:
                print(populate.warn(f"      could not write {folder_name}.json: {exc}"))

            records.append(rec)

        prune_stale_worktrees(bare_dir, repo_dir, keep_paths)

    os.makedirs(out_dir, exist_ok=True)
    rows = [{col: summary_row(r).get(col, "") for col in SUMMARY_COLUMNS} for r in records]
    payload = {
        "collected_at": _now(),
        "base_repo": f"{args.owner}/{args.repo}",
        "columns": SUMMARY_COLUMNS,
        "summary": rows,
        "individuals": records,
    }

    with open(os.path.join(out_dir, "branches_summary.json"), "w", encoding="utf-8") as fh:
        json.dump(payload, fh, indent=2, ensure_ascii=False)
    with open(os.path.join(out_dir, "branches_summary.csv"), "w", encoding="utf-8", newline="") as fh:
        writer = csv.DictWriter(fh, fieldnames=SUMMARY_COLUMNS)
        writer.writeheader()
        writer.writerows(rows)

    print(populate.header("\nOutputs:"))
    print(populate.header(f"  {os.path.join(out_dir, 'branches_summary.json')}"))
    print(populate.header(f"  {os.path.join(out_dir, 'branches_summary.csv')}"))
    print(populate.success(f"Done - {len(records)} branch(es) across {len(forks)} fork(s) processed."))
    print(populate.dim("Run build_grading_xlsx.py next to generate the grading workbook."))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
