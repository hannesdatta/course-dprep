"""Issue populator for deliverable 1.

Thin wrapper around the shared base code in ``../populate.py``. Same fork
scanning, same dedupe-by-title, same re-run safety - it just defaults
``--data-file`` to this folder's ``issues_data.json``.

Usage (from this folder):

    python populate_issues.py --dry-run   # preview deliverable 1 issues
    python populate_issues.py             # create them on every fork

Every flag from ``populate.py`` still applies (``--owner``, ``--repo``,
``--token``, ``--data-file``).
"""
from __future__ import annotations

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
DELIVERABLE_LABEL = "deliverable 1"


def main() -> int:
    argv = sys.argv[1:]
    passed_data_file = any(a == "--data-file" or a.startswith("--data-file=") for a in argv)
    if not passed_data_file:
        # Inject this deliverable's template file as the default.
        sys.argv.extend(["--data-file", DELIVERABLE_DATA_FILE])

    data_file = (
        sys.argv[sys.argv.index("--data-file") + 1]
        if "--data-file" in sys.argv
        else DELIVERABLE_DATA_FILE
    )
    print(populate.header(f"Issue populator - {DELIVERABLE_LABEL}"))
    print(populate.dim(f"  templates: {os.path.basename(data_file)}"))
    return populate.main()


if __name__ == "__main__":
    raise SystemExit(main())
