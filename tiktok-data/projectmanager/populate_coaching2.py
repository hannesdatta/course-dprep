from __future__ import annotations

import os
import sys

import populate

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
COACHING2_DATA_FILE = os.path.join(SCRIPT_DIR, "issues_data_coaching2.json")


def main() -> int:
    argv = sys.argv[1:]
    passed_data_file = any(a == "--data-file" or a.startswith("--data-file=") for a in argv)
    if not passed_data_file:
        # Inject the coaching round 2 template file as the default.
        sys.argv.extend(["--data-file", COACHING2_DATA_FILE])

    data_file = sys.argv[sys.argv.index("--data-file") + 1] if "--data-file" in sys.argv else COACHING2_DATA_FILE
    print(populate.header("Issue populator - coaching round 2"))
    print(populate.dim(f"  templates: {os.path.basename(data_file)}"))
    return populate.main()


if __name__ == "__main__":
    raise SystemExit(main())
