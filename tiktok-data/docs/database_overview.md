# Database Overview for Exercise Generation

This document is designed as a handoff artifact for agents/instructors creating analytics and data-prep exercises.

Scope is intentionally split into:

1. The **observed layer** (`output/<profile>/observed/` and `tiktok_observed.sqlite`)
2. The **student package** (`tiktok_students.sqlite` plus `video_view.csv` and `user_view.csv`)

It does **not** focus on mission mechanics.

## 1) Observed Layer (Internal Raw)

### What it is

The observed layer is the noisy, pipeline-like event store exported by the simulator. It contains both high-volume event logs and supporting state tables.

Main location per run:

- CSVs: `output/<profile>/observed/*.csv`
- SQLite: `output/<profile>/tiktok_observed.sqlite`

### Core high-volume tables (best for general exercises)

- `impressions`: one row per feed impression event.
- `watch_events`: one row per watch outcome event (linked to impressions).
- `sessions`: one row per app session.
- `interactions`: one row per social action (`like`, `unlike`, `follow`, `unfollow`).

Typical prototype magnitudes (seed-dependent):

- `impressions`: ~30k
- `watch_events`: ~30k
- `sessions`: ~8k
- `interactions`: ~7k

### Supporting dimensions and state tables

- Identity/content dimensions: `users`, `creators`, `videos`, `video_categories`, `categories`, `creator_categories`
- Follow/state dynamics: `follows_initial`, `follow_events`, `current_follows`
- Daily latent process traces: `daily_user_state`, `daily_category_state`, `mission_daily_effects`

For most student exercises, treat daily latent tables as advanced/internal context rather than primary starting points.

### Grain and key joins

Recommended canonical join paths:

- Session funnel path:
  - `users.user_id -> sessions.user_id`
  - `sessions.session_id -> impressions.session_id`
  - `impressions.impression_id -> watch_events.impression_id`
- Interaction path:
  - `users.user_id -> interactions.user_id`
  - `videos.video_id -> interactions.video_id`
  - `creators.creator_id -> interactions.creator_id`
- Content/category path:
  - `videos.video_id -> video_categories.video_id`
  - `video_categories.category_id -> categories.category_id`

Practical cardinality expectations:

- One user has many sessions.
- One session has many impressions.
- One impression has zero or one watch event in clean logic, but corruption can create edge cases.
- One video appears in many impressions and watch events.

### Data quality characteristics to exploit in exercises

- Missing values in selected event fields.
- Duplicate or near-duplicate event rows in logs.
- Noisy `creator_display_name` values requiring normalization.
- Mixed timestamp representations in some fields (for parsing/standardization tasks).

These are intentional teaching hooks.

## 2) Student Package (Shared)

### What students get

Primary artifact:

- `output/<profile>/tiktok_students.sqlite`

Helper CSV exports:

- `output/<profile>/video_view.csv` (export of SQL view `video_view`)
- `output/<profile>/user_view.csv` (export of SQL view `user_view`)

### Objects in `tiktok_students.sqlite`

Core tables:

- `watch_logs`: canonical student event stream, one row per impression with watch outcome merged in.
- `users`, `creators`, `videos`, `video_categories`: dimensions/bridges.
- `interactions`: social actions.
- `dataset_meta`: generation metadata (`profile`, `seed`, window bounds).
- `mission_catalog`: mission metadata table (can be ignored for non-mission exercises).

Analytical views:

- `video_view`: per-video exposure/watch KPIs.
- `user_view`: per-user exposure/watch/interaction KPIs.

### Student-model join map (simplified)

- `users.user_id -> watch_logs.user_id`
- `videos.video_id -> watch_logs.video_id`
- `creators.creator_id -> watch_logs.creator_id`
- `videos.video_id -> video_categories.video_id`
- `users.user_id -> interactions.user_id`
- `videos.video_id -> interactions.video_id`
- `creators.creator_id -> interactions.creator_id`

Interpretation note:

- In student data, the raw observed pair `impressions` + `watch_events` is intentionally collapsed into `watch_logs`.

### What is intentionally excluded vs observed layer

- Session table (`sessions`) is not present in student DB.
- Internal scoring columns from ranking/impression generation are removed.
- Simulator-internal latent/state tables are removed.

This enforces derivation-style analysis from event logs rather than direct access to internal process states.

## 3) Observed vs Student Crosswalk

- `observed.impressions` + `observed.watch_events` -> `students.watch_logs`
- `observed.users` -> `students.users`
- `observed.creators` -> `students.creators`
- `observed.videos` -> `students.videos`
- `observed.video_categories` -> `students.video_categories`
- `observed.interactions` -> `students.interactions`
- derived in student DB -> `video_view`, `user_view` (also exported as helper CSVs)

Key consequence for exercise design:

- If you need explicit session-level analytics, use the observed layer.
- If you want realistic student-facing analytics with less simulator leakage, use the student package.

## 4) Exercise-Agent Handoff Block

### Recommended entry points by task type

- Funnel and engagement decomposition:
  - observed: `sessions` + `impressions` + `watch_events`
  - student: `watch_logs` + `user_view`
- Content performance:
  - observed/student: `videos` + `watch_*` + `video_categories`
  - quick-start: `video_view`
- User segmentation:
  - observed/student: `users` + watch table + `interactions`
  - quick-start: `user_view`
- Data-prep exercises:
  - use raw event tables (`impressions`, `watch_events`, `watch_logs`) before helper views

### SQL skeletons

Observed watch rate by user:

```sql
SELECT
  i.user_id,
  COUNT(*) AS impressions_n,
  SUM(CASE WHEN w.watch_event_id IS NOT NULL THEN 1 ELSE 0 END) AS watched_n,
  1.0 * SUM(CASE WHEN w.watch_event_id IS NOT NULL THEN 1 ELSE 0 END) / COUNT(*) AS watch_rate
FROM impressions i
LEFT JOIN watch_events w ON w.impression_id = i.impression_id
GROUP BY i.user_id;
```

Student watch rate by user:

```sql
SELECT
  user_id,
  COUNT(*) AS impressions_n,
  SUM(CASE WHEN was_watched = 1 THEN 1 ELSE 0 END) AS watched_n,
  1.0 * SUM(CASE WHEN was_watched = 1 THEN 1 ELSE 0 END) / COUNT(*) AS watch_rate
FROM watch_logs
GROUP BY user_id;
```

### Common pitfalls to include in exercise prompts

- Clarify table grain before asking learners to aggregate.
- Warn about possible duplicate/noisy records in raw logs.
- Specify UTC handling for `_at` columns.
- For student DB, remind that session boundaries are not directly available.
