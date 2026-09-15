#!/usr/bin/env python3
"""Deliverable 2 grading workbook builder.

Reads ``branches_summary.json`` (written by ``scrape_branches.py``) and
writes ``dprep-deliverable-2-grading.xlsx``: an Overview sheet (one row per
individual branch), a Grading rubric sheet matching the week 3 rubric from
``syllabus/project/grading.qmd`` (Project management / Coding / Versioning
/ Automation, each on a Fail-Sufficient-Good-Very good scale, one column
per individual), and one detail sheet per individual with their commits,
new files, README/Makefile/PNG findings and pull request.

This script never touches GitHub or git - it only reads the JSON that
``scrape_branches.py`` already collected, same as ``dprep-deliverable-1
-grading.xlsx`` is built from that deliverable's summary data.

Usage (from this folder):

    python scrape_branches.py            # collect first
    python build_grading_xlsx.py         # then build the workbook
"""
from __future__ import annotations

import argparse
import datetime as dt
import json
import os
import re
import sys
import time

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
DEFAULT_SUMMARY_FILE = os.path.join(SCRIPT_DIR, "branches_summary.json")
XLSX_NAME = "dprep-deliverable-2-grading.xlsx"

_XL_BAD_CHARS = re.compile(r"[:\\/?*\[\]]")

SUMMARY_COLUMNS = [
    "login", "full_name", "branch", "creator", "folder", "worktree_action",
    "commits_unique", "distinct_authors", "insertions", "deletions", "files_changed",
    "active_days", "first_commit", "last_commit",
    "new_src_folders", "readme_present", "makefile_present", "png_outputs_count",
    "pr_found", "pr_number", "pr_state", "pr_merged", "pr_to_own_main", "pr_created_at",
    "git_error", "pr_error",
]


def _sheet_name(creator: str, used: set[str]) -> str:
    name = _XL_BAD_CHARS.sub("_", creator).strip() or "student"
    name = name[:31]
    base, i = name, 2
    while name.lower() in {u.lower() for u in used}:
        suffix = f"_{i}"
        name = base[:31 - len(suffix)] + suffix
        i += 1
    used.add(name)
    return name


def _cell_value(v):
    if isinstance(v, bool):
        return "yes" if v else "no"
    if isinstance(v, (list, tuple)):
        return "; ".join(str(x) for x in v)
    if isinstance(v, dict):
        return json.dumps(v, ensure_ascii=False)
    return v


# ------------------------------------------------------------------- rubric

# Every rubric item is graded manually - nothing here is auto-prefilled.
# (item label, scale key) per section, in display order.
_YESNO = "yesno"
_LIKERT = "likert"
_MAKE3 = "make3"

_SCALE_OPTIONS = {
    _YESNO: ["No", "Yes"],
    _LIKERT: ["Strongly disagree", "Disagree", "Neutral", "Agree", "Strongly agree"],
    _MAKE3: ["No", "Neutral", "Yes"],
}

_SECTIONS = [
    ("Project management", [
        ("Issue is assigned", _YESNO),
        ("Issue checkboxes are used", _YESNO),
        ("Issue summary is typed", _YESNO),
        ("Extra items like labels, formatting and milestones are added", _YESNO),
    ]),
    ("Coding", [
        ("There are visual outputs", _YESNO),
        ("Content of summary is of high quality", _LIKERT),
        ("Visuals are personalised and novel", _LIKERT),
    ]),
    ("Versioning", [
        ("Branch is created", _YESNO),
        ("PR is opened", _YESNO),
        ("Clean multiple commits of quality", _LIKERT),
    ]),
    ("Automation", [
        ("Make runs", _MAKE3),
        ("Make target destruction and rerun works", _MAKE3),
        ("Quality of make and code is high", _LIKERT),
    ]),
]

# Section scores are graded manually on this same scale - not computed from
# the item rows above them - then turned into points for the overall grade.
_LEVELS = ["Fail", "Sufficient", "Good", "Very good"]
_LEVEL_POINTS = {"Fail": 40, "Sufficient": 60, "Good": 80, "Very good": 100}
_LEVEL_NOTE = "Fail=40, Sufficient=60, Good=80, Very good=100 points"


def _level_points_formula(cellref: str) -> str:
    """Excel formula mapping a Fail/Sufficient/Good/Very good cell to points
    (empty string, not 0, when blank - so AVERAGE() skips ungraded sections)."""
    expr = '""'
    for level in reversed(_LEVELS):  # build innermost-first: Very good, Good, Sufficient, Fail
        expr = f'IF({cellref}="{level}",{_LEVEL_POINTS[level]},{expr})'
    return expr


def rubric_matrix(ws, start_row, records, bold, title_font, head_fill, wrap_top,
                   value_fills, level_fills, CellIsRule, ColorScaleRule, DataValidation, get_column_letter):
    creators = [rec["creator"] for rec in records]
    n = len(creators)
    first_col = get_column_letter(3)
    last_col = get_column_letter(2 + max(n, 1))
    r = start_row
    section_score_rows: list[int] = []

    def _paint(first_row, last_row, fills):
        if not n:
            return
        rng = f"{first_col}{first_row}:{last_col}{last_row}"
        for value, fill in fills:
            ws.conditional_formatting.add(rng, CellIsRule(operator="equal", formula=[f'"{value}"'], fill=fill))

    for section_name, items in _SECTIONS:
        ws.cell(row=r, column=1, value=section_name).font = title_font
        r += 1
        for ci, h in enumerate(["item", "scale", *creators], 1):
            cell = ws.cell(row=r, column=ci, value=h)
            cell.font = bold
            cell.fill = head_fill
        r += 1
        item_first = r

        for item_label, scale_key in items:
            options = _SCALE_OPTIONS[scale_key]
            ws.cell(row=r, column=1, value=item_label).alignment = wrap_top
            ws.cell(row=r, column=2, value=" / ".join(options)).alignment = wrap_top
            dv = DataValidation(type="list", formula1='"%s"' % ",".join(options), allow_blank=True)
            ws.add_data_validation(dv)
            for j in range(n):
                cell = ws.cell(row=r, column=3 + j)
                cell.alignment = wrap_top
                dv.add(cell)
            r += 1
        item_last = r - 1
        _paint(item_first, item_last, value_fills)

        # Notes row - free text, no dropdown, not scored.
        ws.cell(row=r, column=1, value="Notes").font = bold
        for j in range(n):
            ws.cell(row=r, column=3 + j).alignment = wrap_top
        r += 1

        # Score row - manual Fail/Sufficient/Good/Very good, not derived
        # from the item rows above.
        ws.cell(row=r, column=1, value=f"{section_name} score").font = bold
        ws.cell(row=r, column=2, value=" / ".join(_LEVELS)).alignment = wrap_top
        dv = DataValidation(type="list", formula1='"%s"' % ",".join(_LEVELS), allow_blank=True)
        ws.add_data_validation(dv)
        for j in range(n):
            cell = ws.cell(row=r, column=3 + j)
            cell.alignment = wrap_top
            dv.add(cell)
        _paint(r, r, level_fills)
        section_score_rows.append(r)
        r += 1
        r += 1  # blank row before next section

    # Overall aggregate: average of the 4 section scores converted to points
    # (40/60/80/100); AVERAGE skips any section left blank ("" is text).
    ws.cell(row=r, column=1, value="Overall score").font = title_font
    ws.cell(row=r, column=2, value=_LEVEL_NOTE).alignment = wrap_top
    for j in range(n):
        col = get_column_letter(3 + j)
        point_terms = ",".join(_level_points_formula(f"{col}{row}") for row in section_score_rows)
        c = ws.cell(row=r, column=3 + j, value=f'=IFERROR(AVERAGE({point_terms}),"n/a")')
        c.number_format = "0"
        c.font = bold
    ws.conditional_formatting.add(
        f"{first_col}{r}:{last_col}{r}",
        ColorScaleRule(start_type="num", start_value=40, start_color="F8696B",
                        mid_type="num", mid_value=70, mid_color="FFEB84",
                        end_type="num", end_value=100, end_color="63BE7B"),
    )
    r += 1

    return r


# --------------------------------------------------------------------- xlsx

def write_xlsx(path: str, records: list[dict], rows: list[dict], base_repo: str, collected_at: str) -> None:
    from openpyxl import Workbook
    from openpyxl.formatting.rule import CellIsRule, ColorScaleRule
    from openpyxl.styles import Alignment, Font, PatternFill
    from openpyxl.utils import get_column_letter
    from openpyxl.worksheet.datavalidation import DataValidation
    from openpyxl.chart import BarChart, Reference

    bold = Font(bold=True)
    title_font = Font(bold=True, size=12, color="1F4E78")
    head_fill = PatternFill("solid", fgColor="DDEBF7")
    wrap_top = Alignment(vertical="top", wrap_text=True)
    rubric_fills = {
        "good": PatternFill("solid", fgColor="C6EFCE"),    # green - Yes / Strongly agree
        "okgood": PatternFill("solid", fgColor="E2EFDA"),  # light green - Agree
        "neutral": PatternFill("solid", fgColor="FFD966"), # orange - Neutral
        "warn": PatternFill("solid", fgColor="FCE4D6"),    # light red - Disagree
        "bad": PatternFill("solid", fgColor="FFC7CE"),     # red - No / Strongly disagree
    }
    value_fills = [
        ("Yes", rubric_fills["good"]),
        ("Strongly agree", rubric_fills["good"]),
        ("Agree", rubric_fills["okgood"]),
        ("Neutral", rubric_fills["neutral"]),
        ("Disagree", rubric_fills["warn"]),
        ("No", rubric_fills["bad"]),
        ("Strongly disagree", rubric_fills["bad"]),
    ]
    level_fills = [
        ("Very good", rubric_fills["good"]),
        ("Good", rubric_fills["okgood"]),
        ("Sufficient", rubric_fills["neutral"]),
        ("Fail", rubric_fills["bad"]),
    ]

    def autosize(ws, max_width=80):
        for col in ws.columns:
            letter = get_column_letter(col[0].column)
            longest = max((len(str(c.value)) for c in col if c.value is not None), default=0)
            ws.column_dimensions[letter].width = min(max(longest + 2, 10), max_width)

    def table(ws, start_row, title, headers, data_rows):
        r = start_row
        if title:
            c = ws.cell(row=r, column=1, value=title)
            c.font = title_font
            r += 1
        for ci, h in enumerate(headers, 1):
            c = ws.cell(row=r, column=ci, value=h)
            c.font = bold
            c.fill = head_fill
        r += 1
        for dr in data_rows:
            for ci, v in enumerate(dr, 1):
                ws.cell(row=r, column=ci, value=_cell_value(v)).alignment = wrap_top
            r += 1
        return r + 1

    wb = Workbook()

    # --------------------------------------------------------------- Overview
    ov = wb.active
    ov.title = "Overview"
    ov.cell(row=1, column=1, value=f"Deliverable 2 grading overview - {base_repo}").font = title_font
    ov.cell(row=2, column=1, value=f"collected {collected_at}  |  {len(rows)} individual(s)")
    header_row = 4
    for ci, col in enumerate(SUMMARY_COLUMNS, 1):
        c = ov.cell(row=header_row, column=ci, value=col)
        c.font = bold
        c.fill = head_fill
    for ri, row in enumerate(rows, header_row + 1):
        for ci, col in enumerate(SUMMARY_COLUMNS, 1):
            ov.cell(row=ri, column=ci, value=_cell_value(row.get(col, "")))
    last_col = get_column_letter(len(SUMMARY_COLUMNS))
    ov.auto_filter.ref = f"A{header_row}:{last_col}{header_row + len(rows)}"
    ov.freeze_panes = f"E{header_row + 1}"
    autosize(ov, max_width=45)

    # ---------------------------------------------------------- Grading rubric
    rb = wb.create_sheet("Grading rubric", 1)
    rb.cell(row=1, column=1, value=f"Grading rubric (week 3) - {base_repo}").font = title_font
    rb.cell(row=2, column=1, value=f"collected {collected_at}  |  {len(rows)} individual(s)")
    rubric_matrix(rb, 4, records, bold, title_font, head_fill, wrap_top, value_fills, level_fills,
                  CellIsRule, ColorScaleRule, DataValidation, get_column_letter)
    autosize(rb, max_width=45)

    # ---------------------------------------------------------- per-individual
    used = {"Overview", "Grading rubric"}
    for rec, row in zip(records, rows):
        ws = wb.create_sheet(_sheet_name(rec["creator"], used))
        git = rec.get("git") or {}
        pr = rec.get("pull_request")

        ws.cell(row=1, column=1, value=f"{rec['creator']} - {rec['full_name']} @ {rec['branch']}").font = title_font
        r = table(ws, 3, "Branch", ["field", "value"], [
            ("fork", rec["full_name"]),
            ("branch", rec["branch"]),
            ("checkout folder", rec["folder"]),
            ("worktree_action", rec.get("worktree_action", "")),
        ])

        if git.get("commits"):
            r = table(
                ws, r, f"Commits ({len(git['commits'])}) - ahead of main only",
                ["authored", "author", "email", "files", "insertions", "deletions", "subject"],
                [
                    (c["authored_at"][:16].replace("T", " "), c["author_name"], c["author_email"],
                     c["files_changed"], c["insertions"], c["deletions"], c["subject"])
                    for c in git["commits"]
                ],
            )

        if git.get("new_files"):
            r = table(ws, r, f"New files added on this branch ({len(git['new_files'])})",
                      ["path"], [(f,) for f in git["new_files"]])

        if pr:
            r = table(ws, r, "Pull request", ["field", "value"], [
                ("number", pr["number"]), ("title", pr["title"]), ("state", pr["state"]),
                ("merged", pr["merged"]), ("created_at", pr["created_at"]),
                ("base", f"{pr['base_repo']}:{pr['base_ref']}"),
                ("to_own_main", pr["to_own_main"]), ("still_open", pr["still_open"]),
            ])
        else:
            r = table(ws, r, "Pull request", ["field", "value"], [("found", "no")])

        r = table(ws, r, "Key metrics", ["metric", "value"],
                  [(m, row.get(m, "")) for m in SUMMARY_COLUMNS if m not in ("login", "full_name", "branch", "creator", "folder")])

        if git.get("commits"):
            per_day: dict[str, int] = {}
            for c in git["commits"]:
                day = (c.get("authored_at") or "")[:10]
                if day:
                    per_day[day] = per_day.get(day, 0) + 1
            days = sorted(per_day)
            if days:
                ws.cell(row=r, column=1, value="Charts").font = title_font
                r += 1
                hdr = r
                ws.cell(row=hdr, column=1, value="day").font = bold
                ws.cell(row=hdr, column=2, value="commits").font = bold
                r += 1
                first = r
                for day in days:
                    ws.cell(row=r, column=1, value=day)
                    ws.cell(row=r, column=2, value=per_day[day])
                    r += 1
                last = r - 1
                bar = BarChart()
                bar.type = "col"
                bar.title = "Commits per day"
                bar.y_axis.title = "commits"
                bar.add_data(Reference(ws, min_col=2, min_row=hdr, max_row=last), titles_from_data=True)
                bar.set_categories(Reference(ws, min_col=1, min_row=first, max_row=last))
                bar.height, bar.width = 8, 18
                ws.add_chart(bar, f"F{hdr}")

        autosize(ws, max_width=70)

    wb.save(path)


def _timestamped(path: str) -> str:
    root, ext = os.path.splitext(path)
    return f"{root}-{dt.datetime.now():%Y%m%d-%H%M%S}{ext}"


def _save_with_retry(path: str, saver, label: str) -> tuple[str, bool]:
    for attempt in range(3):
        try:
            saver(path)
            return path, False
        except (OSError, PermissionError) as exc:
            if attempt < 2:
                print(f"  {label}: locked ({exc}); close it in Excel - retrying in 2s...")
                time.sleep(2)
            else:
                alt = _timestamped(path)
                print(f"  {label}: still locked - wrote {os.path.basename(alt)} instead.")
                saver(alt)
                return alt, True


def main() -> int:
    parser = argparse.ArgumentParser(description="Build the deliverable 2 grading workbook.")
    parser.add_argument("--summary-file", default=DEFAULT_SUMMARY_FILE,
                        help="branches_summary.json written by scrape_branches.py.")
    parser.add_argument("--out-dir", default=SCRIPT_DIR)
    args = parser.parse_args()

    if not os.path.isfile(args.summary_file):
        print(f"error: {args.summary_file} not found - run scrape_branches.py first.", file=sys.stderr)
        return 1

    with open(args.summary_file, "r", encoding="utf-8") as fh:
        payload = json.load(fh)

    records = payload.get("individuals", [])
    rows = payload.get("summary", [])
    if not records:
        print("No individuals in branches_summary.json - nothing to build.", file=sys.stderr)
        return 1

    try:
        import openpyxl  # noqa: F401
    except ImportError:
        print("openpyxl not installed - run: pip install openpyxl", file=sys.stderr)
        return 1

    out_dir = os.path.abspath(args.out_dir)
    os.makedirs(out_dir, exist_ok=True)
    path, fallback = _save_with_retry(
        os.path.join(out_dir, XLSX_NAME),
        lambda p: write_xlsx(p, records, rows, payload.get("base_repo", ""), payload.get("collected_at", "")),
        XLSX_NAME,
    )
    print(f"Wrote {path}")
    if fallback:
        print(f"  (original {XLSX_NAME} was locked - close it in Excel and re-run to refresh it.)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
