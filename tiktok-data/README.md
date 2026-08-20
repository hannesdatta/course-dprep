# TikTok Teaching Simulation (R)

Instructor-first guide for generating and validating TikTok-style teaching data.

## Document map

- Student-facing data guide (no simulation instructions): `tiktok-data/STUDENT_DATA_GUIDE.md`
- Maintainer workflow rules: `tiktok-data/AGENTS.md`
- Generated student DB documentation PDF: `output/<profile>/documentation/student_database_documentation.pdf`

## Quick start (instructors)

Run from `tiktok-data/`:

```bash
Rscript run_simulation.R prototype 42
```

Then full-year build:

```bash
Rscript run_simulation.R full 42
```

- Full profile window: `2025-08-01` to `2026-07-31`
- Seed is required for reproducibility and is written to `output/<profile>/run_metadata.csv`

## Data products

For each profile (`output/prototype/` or `output/full/`):

- `tiktok_truth.sqlite`: instructor truth layer
- `tiktok_observed.sqlite`: internal noisy pipeline layer
- `tiktok_students.sqlite`: masked student-facing production-style layer
- `truth/`, `observed/`: CSV exports of corresponding layers
- `video_view.csv`, `user_view.csv`: CSV exports of student helper views
- `descriptives/`: diagnostics and plots
- `mission_evaluation/`: mission KPI pass/fail checks
- `documentation/student_database_documentation.pdf`: formal student DB data documentation

## Student DB contract

`tiktok_students.sqlite` contains:

- raw combined logs table: `watch_logs` (includes watched and non-watched impressions)
- dimensions: `users`, `creators`, `videos`, `video_categories`
- interaction events: `interactions`
- mission metadata: `mission_catalog`
- helper views: `video_view`, `user_view`
- metadata table: `dataset_meta`

Intentionally removed from student DB:

- simulation-internal score columns
- truth state tables
- pre-labeled watch outcomes and session table

## Temporal encoding contract

- Columns ending in `_at` are Unix timestamps (UTC seconds).
- Date columns are SQL date strings (`YYYY-MM-DD`).

## Calibration and mission QA

- `calibration_report.csv` contains baseline moments to calibrate against real TikTok aggregates.
- `mission_evaluation/mission_summary.csv` reports directional pass rates by mission.

## Production-style data documentation

Data documentation is generated from schema introspection + dictionary metadata (`docs/student_field_dictionary.csv`) by:

- script: `tiktok-data/R/08_build_student_data_docs.R`
- pipeline call inside `tiktok-data/run_simulation.R`

If PDF rendering fails due to local TeX dependencies, run:

```r
tinytex::install_tinytex()
```

and rerun the simulation.
