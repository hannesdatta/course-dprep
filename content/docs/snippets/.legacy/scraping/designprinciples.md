---
title: Overview
weight: 1
description: How to design
---

# Design principles

- with specific research focus vs. investment in future

## archival _vs._ live

- backward-looking (historical, archival) vs. forward-looking
- prototype & test, minimize errors
- modularity


- Awareness of purpose
  - entities (e.g., users, products)
    - single entities: e.g., products + associated prices, titles, average stars
    - multiple entities: e.g., products + their reviews
    - assess dependencies; draw a "robot map"; is it dynamic?
    - assess linkages to existing data sets (worst is by clear-text; maybe some meta identifiers?)
  - seeding
    - random (internal, external)
    - sort by alphabet, not by popularity (or, at least, be aware of the possibilities)
  - what to extract?
    - data type: plain text, rich text, multimedia (e.g., images, videos)
    - role in research project: meta data, dependent variable, obtaining seeds
  - is it "live" data, or archival data?
  - what other "relevant" data to capture?
    - monitor the firms' blogs, and put it in the paper.
    - save screenshots
    - check whether page is archived on archive.org
    - ...
  - assess legality

  --> assessment: is the data really there? will it be reliable to use?

- Extraction technology
  - Identifiers, CSS
  [...]
  - Interacting with site
    - Clicking
    - Submitting
    - Scrolling
    - Downloading (click + capture)
    - Examples
      - Logging in and out
  - Looping
    - through seeds
    - through results and write them
  - Parsing
    - to single CSV file w/ headers
    - new file per scrape
    - to DB (set up DB)
    - store meta data when the site was extracted

- Technical specs
  - data storage
    - locally, BUT [...]!
    - databases: structured versus unstructured --> is it dynamic? --> database-approach
      - how to set one up + what are the principles in DBs
    - file remotes: pushing to S3 (e.g. HTML, sync)
      - how to set it up? what are the principles?
    - assess space requirements (# files, HD space); storage may be transitory (e.g., database to support extraction); or permanent (CSV) -> if permanent, choose files

  - deployment
    - frequency (once - historical (do multiple times to see fake reviews), multiple times - live)
    - locally (server restarts? laptop?), vs. remotely (geo requirements)
    - EC2 VM (+ different regions); Windows vs. Linux
    - Job scheduling on Windows, Linux
    - Refetch upon error?
    - Store __raw__ data
    - Enriching raw data with time stamps of data retrieval
    - Documenting errors + monitoring: Retrieval errors (e.g., blocking)
  - Monitoring: Server capacity, billing, diskspace

- Technical tricks
  - record IP address and location from where scraper is run
  - start browser headless
  - writing timestamps to CSV or file names (+ different versions of timestamps)
  - changing iterators, look up later
  - scroll up and down to load the site
  - monitor functions
  - change IP addresses
  - killing interfering processes
  - automated zipping
  - increasing limits (&limit=100), or elements on pages.
  - sleeping
  - check flags - antyhing excluded?
  - validity of data (e.g., only recent data).
  - keeping screenshots
  - regular CSV capture as downloads

  - display options (not recommended; or sorted by date)



      - store raw data
      - monitoring
      - critical to project (informs backup, etc.)
      -   - dependencies
        - e.g., relying on internal seeds + querying? relying on some outcome of an experiment?
        - of executing one job,
        - of executing multiple jobs;
          dynamic nature? (e.g., dynamic seeds, querying)


- SORT CHAPTERS
- SORT OVERVIEW

- Testing, testing, testing (e.g., pages may look different later)
- Data auditing
- Reconnect to open browser; versus open a new one
- Keeping cookies / logins alive

# Start from templates



## 0: Planning

- Determine depth of data collection
  - 1: Have list of seeds, scrape
  - 2: For each seed in 1: get links, go down one level deeper
  - 3: ... (typically: two stages deep)
  - Can go in parallel:
  - 1a: Have seeds, scrape here | 1b: Get API, too
  - It's like a tree! / write up like a DAG?
  - Dependencies between stages
- Familiarize with site(s)
- Determine fair-use retrieval limits
- Plan "endpoints"
  - What is the URL scheme?
  - How to insert the seeds?

## 1: Getting the raw data



## 2: Storing the raw data


## Stage 3: Extract/structure the data

- How? to csv.


## Validate

e.g., plots of errors

## Stage 4: Documenting and releasing

- What decisions are important to say? e.g., seeding, precleaning, when where they executed
- Reporting in paper
- web scraping is the process of designing and deploying code that automatically extracts and parses information from websites/APIs.


# NOTES TO JOHANNES

- provide a structured workflow
  - explore and prototype
  - design
  - deploy
  - document and share

To be discussed w/ Johannes:
- broaden use cases:
  - capture recommendations
  - monitor / execute experiments
  - browser-based apps
  - mobile apps
- paper is about collecting data, not about WORKING with such data
- sample size implications of scraping
- internal sites versus publicly accessible sites
- clearly separate out processing from getting/parsing
- unit of analysis: user - time; page.
- building panel data
- include "booleans" in overview

NOtes Johannes:
- does web scraping encompass APIs?
  - APIs share concepts: endpoints; but extraction is more automatic
  - Figure 3: "innovation"/"gut feeling of good idea"
  - SERVICES provide websites or APIs; it's nt that websites provide apis. APIs / like websites, offer recent data. so that's general.
