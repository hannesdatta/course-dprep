from __future__ import annotations
import argparse
import json
import os
import sys
import time
from dataclasses import dataclass
from typing import Any
import requests
from colorama import Fore, Style, init as colorama_init

colorama_init(autoreset=True)

GITHUB_API = "https://api.github.com"
DEFAULT_OWNER = "course-dprep"
DEFAULT_REPO = "TikTok-project-2026-2027"
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
DEFAULT_DATA_FILE = os.path.join(SCRIPT_DIR, "issues_data.json")
DEFAULT_ENV_FILE = os.path.join(SCRIPT_DIR, ".env")


def _c(text: str, color: str) -> str:
    return f"{color}{text}{Style.RESET_ALL}"


def header(text: str) -> str:
    return _c(text, Fore.CYAN + Style.BRIGHT)


def info(text: str) -> str:
    return _c(text, Fore.CYAN)


def success(text: str) -> str:
    return _c(text, Fore.GREEN)


def warn(text: str) -> str:
    return _c(text, Fore.YELLOW)


def error(text: str) -> str:
    return _c(text, Fore.RED)


def dim(text: str) -> str:
    return _c(text, Style.DIM)


def load_dotenv(path: str = DEFAULT_ENV_FILE) -> None:
    """Load KEY=VALUE pairs from a .env file into os.environ.

    Real environment variables always take precedence: a key already set in
    os.environ is left untouched. Blank lines and lines starting with '#'
    are ignored. Surrounding single/double quotes around the value are
    stripped.
    """
    if not os.path.isfile(path):
        return

    with open(path, "r", encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            key, _, value = line.partition("=")
            key = key.strip()
            value = value.strip().strip('"').strip("'")
            if key and key not in os.environ:
                os.environ[key] = value


load_dotenv()


@dataclass
class IssueTemplate:
    title: str
    body: str = ""
    labels: list[str] | None = None

    def to_payload(self) -> dict[str, Any]:
        payload: dict[str, Any] = {"title": self.title, "body": self.body}
        if self.labels:
            payload["labels"] = self.labels
        return payload


def load_issue_templates(data_file: str) -> list[IssueTemplate]:
    with open(data_file, "r", encoding="utf-8") as f:
        raw = json.load(f)

    if not isinstance(raw, list) or not raw:
        raise ValueError(f"{data_file} must contain a non-empty JSON array of issues")

    templates = [
        IssueTemplate(
            title=item["title"],
            body=item.get("body", ""),
            labels=item.get("labels"),
        )
        for item in raw
    ]
    return templates


def make_session(token: str | None) -> requests.Session:
    session = requests.Session()
    session.headers.update(
        {
            "Accept": "application/vnd.github+json",
            "X-GitHub-Api-Version": "2022-11-28",
            "User-Agent": "issuepopulator-script",
        }
    )
    if token:
        session.headers["Authorization"] = f"Bearer {token}"
    return session


def _raise_for_status(response: requests.Response) -> None:
    """Like response.raise_for_status(), but includes GitHub's own error
    message (e.g. 'Bad credentials', 'Resource not accessible by
    integration', SSO enforcement notices) in the exception, since that
    detail is what actually explains 401/403s and isn't in the default
    requests error message."""
    if response.ok:
        return
    detail = ""
    try:
        body = response.json()
        detail = body.get("message", "")
    except ValueError:
        pass
    try:
        response.raise_for_status()
    except requests.HTTPError as exc:
        if detail:
            raise requests.HTTPError(f"{exc} | GitHub says: {detail}", response=response) from None
        raise


def _get_paginated(session: requests.Session, url: str, params: dict | None = None) -> list[dict]:
    results: list[dict] = []
    params = dict(params or {})
    params.setdefault("per_page", 100)
    page = 1

    while True:
        params["page"] = page
        response = session.get(url, params=params)
        _handle_rate_limit(response)
        _raise_for_status(response)
        batch = response.json()
        if not batch:
            break
        results.extend(batch)
        if len(batch) < params["per_page"]:
            break
        page += 1

    return results


def _handle_rate_limit(response: requests.Response) -> None:
    if response.status_code == 403 and response.headers.get("X-RateLimit-Remaining") == "0":
        reset_at = int(response.headers.get("X-RateLimit-Reset", time.time() + 60))
        wait_seconds = max(reset_at - int(time.time()), 1)
        print(warn(f"  Rate limited by GitHub API. Waiting {wait_seconds}s..."))
        time.sleep(wait_seconds)


def get_forks(session: requests.Session, owner: str, repo: str) -> list[dict]:
    url = f"{GITHUB_API}/repos/{owner}/{repo}/forks"
    return _get_paginated(session, url, params={"sort": "newest"})


def get_open_and_closed_issues(session: requests.Session, owner: str, repo: str) -> list[dict]:
    """Return issues for a repo, excluding pull requests (which the API also
    returns from the /issues endpoint)."""
    url = f"{GITHUB_API}/repos/{owner}/{repo}/issues"
    all_items = _get_paginated(session, url, params={"state": "all"})
    return [item for item in all_items if "pull_request" not in item]


def get_repo_labels(session: requests.Session, owner: str, repo: str) -> dict[str, str]:
    """Return the repo's existing labels as {lowercase name: actual name}.

    Reading labels is a public GET, so this works even without push access —
    unlike creating a label, which is what fails when we ask GitHub to
    attach a label that doesn't exist yet on a repo we don't have write
    access to.
    """
    url = f"{GITHUB_API}/repos/{owner}/{repo}/labels"
    labels = _get_paginated(session, url)
    return {label["name"].lower(): label["name"] for label in labels}


def create_issue(
    session: requests.Session,
    owner: str,
    repo: str,
    issue: IssueTemplate,
    available_labels: dict[str, str] | None = None,
) -> tuple[dict, list[str]]:
    """Create an issue, returning (created_issue, dropped_labels).

    Only labels that already exist on the repo are attached — attaching a
    label that doesn't exist yet requires push access to create it, which we
    may not have on someone else's fork. Requested labels that aren't found
    on the repo are silently dropped (reported back to the caller) rather
    than failing the whole issue.
    """
    url = f"{GITHUB_API}/repos/{owner}/{repo}/issues"
    payload = issue.to_payload()
    dropped: list[str] = []

    if payload.get("labels"):
        if available_labels is None:
            dropped = list(payload["labels"])
            payload.pop("labels")
        else:
            keep = [available_labels[l.lower()] for l in payload["labels"] if l.lower() in available_labels]
            dropped = [l for l in payload["labels"] if l.lower() not in available_labels]
            if keep:
                payload["labels"] = keep
            else:
                payload.pop("labels")

    response = session.post(url, json=payload)
    _handle_rate_limit(response)

    if response.status_code == 403 and "labels" in payload and "label" in response.text.lower():
        # Safety net: even a label that appeared to exist could still fail
        # (e.g. race condition). Retry once without labels.
        dropped = list(payload["labels"])
        payload = {k: v for k, v in payload.items() if k != "labels"}
        response = session.post(url, json=payload)
        _handle_rate_limit(response)

    _raise_for_status(response)
    return response.json(), dropped


def _normalize_title(title: str) -> str:
    return " ".join(title.strip().lower().split())


def populate_fork(
    session: requests.Session,
    fork: dict,
    templates: list[IssueTemplate],
    dry_run: bool,
) -> None:
    full_name = fork["full_name"]
    owner = fork["owner"]["login"]
    repo = fork["name"]

    print(header(f"\n- {full_name}"))

    if not fork.get("has_issues", False):
        print(warn("  Issues are disabled on this fork. Skipping."))
        return

    try:
        existing_issues = get_open_and_closed_issues(session, owner, repo)
    except requests.HTTPError as exc:
        print(error(f"  Could not read issues ({exc}). Skipping."))
        return

    existing_titles = {_normalize_title(issue["title"]) for issue in existing_issues}
    missing = [t for t in templates if _normalize_title(t.title) not in existing_titles]

    if not missing:
        print(success(f"  All {len(templates)} predefined issue(s) already exist. Nothing to do."))
        return

    print(
        info(
            f"  {len(existing_issues)} existing issue(s) found; "
            f"{len(missing)} of {len(templates)} predefined issue(s) are missing."
        )
    )

    try:
        available_labels = get_repo_labels(session, owner, repo)
    except requests.HTTPError as exc:
        print(warn(f"  Could not read labels ({exc}); issues will be created without labels."))
        available_labels = {}

    if dry_run:
        for template in missing:
            if template.labels:
                keep = [l for l in template.labels if l.lower() in available_labels]
                drop = [l for l in template.labels if l.lower() not in available_labels]
                label_note = f" (labels: {keep}" + (f", skipping {drop}" if drop else "") + ")"
            else:
                label_note = ""
            print(info(f"    [dry-run] Would create: {template.title!r}{label_note}"))
        return

    for template in missing:
        try:
            created, dropped = create_issue(session, owner, repo, template, available_labels)
            note = warn(f" (skipped labels not on repo: {dropped})") if dropped else ""
            print(success(f"    Created issue #{created['number']}: {template.title!r}") + note)
        except requests.HTTPError as exc:
            print(error(f"    Failed to create {template.title!r}: {exc}"))


def main() -> int:
    parser = argparse.ArgumentParser(description="Populate issues on forks of a GitHub repository.")
    parser.add_argument("--owner", default=DEFAULT_OWNER, help="Owner of the base repository.")
    parser.add_argument("--repo", default=DEFAULT_REPO, help="Name of the base repository.")
    parser.add_argument(
        "--data-file",
        default=DEFAULT_DATA_FILE,
        help="Path to the JSON file with predefined issues.",
    )
    parser.add_argument(
        "--token",
        default=os.environ.get("GITHUB_TOKEN") or os.environ.get("GH_TOKEN"),
        help="GitHub personal access token (defaults to GITHUB_TOKEN/GH_TOKEN env var).",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="List what would be created without actually creating any issues.",
    )
    args = parser.parse_args()

    if not args.token and not args.dry_run:
        print(
            warn(
                "Warning: no GitHub token provided (set GITHUB_TOKEN or use --token). "
                "Forks will be listed but issue creation will likely fail due to missing permissions."
            ),
            file=sys.stderr,
        )

    templates = load_issue_templates(args.data_file)
    session = make_session(args.token)

    print(header(f"Fetching forks of {args.owner}/{args.repo}..."))
    forks = get_forks(session, args.owner, args.repo)

    if not forks:
        print(warn("No forks found."))
        return 0

    print(header(f"Found {len(forks)} fork(s):"))
    for fork in forks:
        print(dim(f"  - {fork['full_name']}"))

    for fork in forks:
        populate_fork(session, fork, templates, dry_run=args.dry_run)

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
