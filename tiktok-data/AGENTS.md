# AGENTS.md - TikTok Simulation Workspace Guide

This file documents how to iteratively improve the TikTok teaching simulation.

## Project intent

- Build a reproducible, structural TikTok-style simulator for teaching.
- Export both clean truth data and messy observed data.
- Support mission-based assignments and data-prep exercises.

## Architecture map

- `run_simulation.R`: entry point
- `R/00_config.R`: parameters, profile settings, mission catalog
- `R/01_generate_entities.R`: categories, creators, users, initial follows
- `R/02_generate_videos.R`: video catalog, categories, synthetic URLs
- `R/03_simulate_daily.R`: user-day/session/impression/watch/interactions state model
- `R/04_apply_corruption.R`: observed-data corruption operators
- `R/05_export_data.R`: CSV + SQLite export, indexes, data dictionary
- `R/06_descriptives_plots.R`: diagnostics and teaching visuals

## Operating rules

- Start with `prototype` profile before touching `full`.
- Keep random seeds explicit; never remove seed controls.
- Do not commit generated outputs unless explicitly requested.
- Prefer adding new logic in modular functions instead of editing `run_simulation.R` heavily.
- Maintain both truth and observed layers after each feature change.

## How to run

From `tiktok-data/`:

- `Rscript run_simulation.R prototype 42`
- `Rscript run_simulation.R full 42`

## Mission engine extension protocol

To add a mission:

1. Add one row to `mission_catalog` in `R/00_config.R`.
2. Use existing generic fields (`*_shift`, `target_category`, time window).
3. If new intervention types are needed, extend `get_mission_effects()` in `R/03_simulate_daily.R`.
4. Add mission-level KPI checks to descriptives if needed.

## Calibration workflow

Use real TikTok aggregate moments externally, then update config:

1. Populate target moments in `calibration_report.csv` template.
2. Tune blocks in order: login -> watch actions -> social interactions -> feed mix.
3. Re-run prototype until directional fit is good.
4. Re-run full and compare drift.

## Validation checklist

- Row counts plausible by profile.
- Timestamp monotonicity within session (`login_at <= started_at <= ended_at <= logout_at`).
- Feed source mix near configured target after mission effects.
- Watch seconds in valid range before corruption.
- Follow and unfollow events affect final follow graph plausibly.
- Category trend regimes show intended growth/stability/decline patterns.

## Data-prep teaching hooks

Corruption intentionally induces:

- interpolation/LOCF tasks
- regex normalization tasks
- deduplication tasks
- timestamp parsing tasks
- unit harmonization tasks

Keep these hooks explicit and documented in `README.md` and `mission_catalog.csv`.

## Safe change strategy

- Small commits by module.
- Verify prototype after each module change.
- When changing schema, update:
  - SQLite export
  - `data_dictionary.csv`
  - README table descriptions

## Future extension ideas

- Add country-level heterogeneity and mission localization.
- Add ad-impression events and monetization outcomes.
- Add A/B test assignment table for randomized interventions.
- Add benchmark notebook for automated QA plots.
