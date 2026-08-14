# Student Data Guide

This guide describes the student-facing database artifact and how to interpret its tables and fields.

## Database artifact

- `tiktok_students.sqlite`

This database is intentionally masked: it contains realistic logs and metadata, but excludes simulator-internal state and score columns.

## Simulation window and metadata

Use table `dataset_meta` to inspect:

- `schema_version`
- `profile`
- `seed`
- `window_start`
- `window_end`
- `generated_at_utc`

## Core tables

- `watch_logs`: canonical event stream, one row per feed impression, including non-watched impressions.
- `users`: user identifiers and display fields.
- `creators`: creator identifiers and display fields.
- `videos`: video identifiers, publish timestamp, URL, and duration.
- `video_categories`: bridge table between videos and category IDs.
- `interactions`: like/unlike/follow/unfollow events.
- `mission_catalog`: mission metadata for assignment context.

## Analytical views

- `video_view`: aggregate exposure and watch KPIs by video.
- `user_view`: aggregate exposure, watch, and interaction KPIs by user.

## Field conventions

- Any column ending in `_at` is a Unix timestamp in UTC seconds.
- Date fields are stored as `YYYY-MM-DD` strings.
- `watch_seconds = 0` indicates non-watched impressions.

## Data-quality characteristics (intentional)

- missing values in selected event fields,
- duplicate log rows,
- noisy creator display names requiring normalization.

These characteristics support data-prep and data-quality assignments.

## Full field-level documentation

See generated PDF:

- `output/<profile>/documentation/student_database_documentation.pdf`

and the companion field dictionary source:

- `docs/student_field_dictionary.csv`
