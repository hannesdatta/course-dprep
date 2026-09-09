"""Test populator for deliverable 4 - touches ONE fork only.

Safety wrapper around the shared ``../populate.py`` for trying the
deliverable 4 checklist against a single fork before unleashing it on every
fork.

It reuses ``populate.py``'s real logic (session, fork listing, issue
creation, label handling, dedupe-by-title, re-run safety). The only
difference: the fork list is filtered down to a single GitHub user, so at
most one fork is ever read or modified. Default target user: ``krolabola``.

Usage (from this folder):

    python populate_issues_test.py --dry-run          # preview only
    python populate_issues_test.py                    # create on krolabola's fork only
    python populate_issues_test.py --fork-user someone # aim at a different fork
"""
from __future__ import annotations

import argparse
import os
import sys

# The shared base code (populate.py) lives one directory up, outside the
# per-deliverable folders. Put that directory on the import path.
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if BASE_DIR not in sys.path:
    sys.path.insert(0, BASE_DIR)

import populate  # noqa: E402

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
DELIVERABLE_DATA_FILE = os.path.join(SCRIPT_DIR, "issues_data.json")
DELIVERABLE_LABEL = "deliverable 4"
DEFAULT_FORK_USER = "krolabola"


def main() -> int:
    parser = argparse.ArgumentParser(
        description=f"Populate {DELIVERABLE_LABEL} issues on a SINGLE fork (test run)."
    )
    parser.add_argument("--owner", default=populate.DEFAULT_OWNER,
                        help="Owner of the base repository whose forks are searched.")
    parser.add_argument("--repo", default=populate.DEFAULT_REPO,
                        help="Name of the base repository.")
    parser.add_argument("--data-file", default=DELIVERABLE_DATA_FILE,
                        help="Path to the JSON file with issue templates.")
    parser.add_argument("--fork-user", default=DEFAULT_FORK_USER,
                        help=f"Only the fork owned by this GitHub user is populated "
                             f"(default: {DEFAULT_FORK_USER}).")
    parser.add_argument("--token",
                        default=os.environ.get("GITHUB_TOKEN") or os.environ.get("GH_TOKEN"),
                        help="GitHub token (defaults to GITHUB_TOKEN/GH_TOKEN env var).")
    parser.add_argument("--dry-run", action="store_true",
                        help="List what would be created without creating anything.")
    args = parser.parse_args()

    if not args.fork_user:
        print(populate.error("Refusing to run without a --fork-user (would target every fork)."),
              file=sys.stderr)
        return 2

    if not args.token and not args.dry_run:
        print(populate.warn(
            "Warning: no GitHub token provided (set GITHUB_TOKEN or use --token). "
            "Issue creation will likely fail due to missing permissions."
        ), file=sys.stderr)

    templates = populate.load_issue_templates(args.data_file)
    session = populate.make_session(args.token)

    print(populate.header(f"TEST RUN - {DELIVERABLE_LABEL} - target fork user: {args.fork_user!r}"))
    print(populate.dim(f"  templates: {os.path.basename(args.data_file)} "
                       f"({len(templates)} issue(s))"))

    print(populate.header(f"\nFetching forks of {args.owner}/{args.repo}..."))
    forks = populate.get_forks(session, args.owner, args.repo)

    target = [f for f in forks if f["owner"]["login"].lower() == args.fork_user.lower()]

    if not target:
        print(populate.error(
            f"No fork owned by {args.fork_user!r} found among {len(forks)} fork(s). Nothing to do."
        ))
        return 1

    if len(target) > 1:
        print(populate.warn(
            f"{len(target)} forks matched {args.fork_user!r}; using the first: "
            f"{target[0]['full_name']}"
        ))

    fork = target[0]

    # Belt-and-suspenders: nothing below this point may write anywhere except
    # the requested user's fork.
    fork_owner = fork["owner"]["login"]
    if fork_owner.lower() != args.fork_user.lower():
        print(populate.error(f"Guard tripped: matched fork {fork['full_name']!r} is not "
                             f"owned by {args.fork_user!r}. Aborting."))
        return 2
    if fork_owner.lower() == args.owner.lower():
        print(populate.error("Guard tripped: target resolves to the base-repo owner, "
                             "not a student fork. Aborting."))
        return 2

    print(populate.header(f"Populating ONLY: {fork['full_name']}"))
    populate.populate_fork(session, fork, templates, dry_run=args.dry_run)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
