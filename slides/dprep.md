% Data Preparation and Workflow Management
% [Hannes Datta](https://hannesdatta.com)
% February 2, 2021

# Live stream #1

## Hi there!

Please turn on your camera :)

If you haven't done so, navigate to the course page at [https://dprep.hannesdatta.com](https://dprep.hannesdatta.com)



::: notes

- drafted this course for a long time
- finally got the chance to teaching it now
- what is it about: radical change in the way to work on data-intensive projects
- anything you've learnt so far is about stats, or substantive areas, not about HOW to work on projects
- happy to share that vision, and share practical tips

:::

## Agenda

(before we *really* start)

- About myself
- (More elaborate) motivation for the course
- Course framework and learning goals
- Agenda and practical arrangements

## Disclaimer

> - Slow me down & use the chat
- Streams are complements, not substitutes for self-study & course website
- Minimal use of slides; will post
- Course runs for the first time (buggy!)
- Mix of students at various levels; public (but streams are not)
- I'm a marketer, not a data or computer scientist
- Consider me your coach, not your *distant professor*

# About myself

## Background

- born and raised in Germany
- moved to NL 12 years ago
- married, 2 kids (2 and 5 years old)
- streaming from 'de zolderkamer' in 's-Hertogenbosch
- geek at heart (got a 3D printer for Christmas), love listening & playing music, starting new hobbies every few months...
- now Associate Prof at Tilburg University

<!--
## Professional background

- PhD, quantitative marketing (Maastricht University)
- Associate professor Tilburg University
- Visiting professor
    - Duke University (Sept - Nov 2018)
    - University of New South Wales, Sydney (Jan 2020)
-->

## Key areas of expertise

- Substantive
    - subscription-based business models
    - marketing-mix modeling and optimization
    - branding

- Method
    - data management of structured and unstructured data
    - online data collection via APIs and web scraping
    - causal effects with observational data

## Teaching activities

- MSc Marketing Analytics and Management
    - Data preparation and workflow management (*new*, dprep.hannesdatta.com)
    - Online data collection and management (*new*, odcm.hannesdatta.com)
    - MSc Thesis supervision (thesis.hannesdatta.com)
    - Research in Social Media (*legacy*)
- Tilburg Science Hub (http://tilburgsciencehub.com)

::: notes

* prototyped some content with managers, but now... release to students
* foreshadow that I'll talk about how dprep differs from ODCM (and vice versa)
  - talk about how dPrep and oDCM differ (and how students may benefit from taking both courses).
  - Why R and Python (rather than just one of them)?

:::

<!--
## Current research interest

__Impact of digitization on consumers, producers__

- How did [online streaming](https://tiu.nu/spotify) (Spotify, Netflix) change behavior?
- Bunch of follow-ups
    - "Who runs Spotify?" (measuring power of platforms)
    - [Music "filter" bubbles](https://research.tilburguniversity.edu/en/publications/streaming-services-and-the-homogenization-of-music-consumption)
    - Covid-19 & music consumption
    - Platform incentives & production of music
- More: see [website](https://hannesdatta.com)
-->

# About you

## Getting to know you

<!--
> - Where are you located? (city, country)
> - Why are you interested in Marketing *Analytics*?
> - Where do you see yourself in a few years from now (professionally)?
> - What's your experience with R?
> - How much are you willing to invest in this course?

<!--(map of NL & Europe - use Zoom annotation!)
-->

::: notes

Consider using polling software for these questions (to increase response rate)

- What stage of your education are you in?
- What are you working on right now? (put it in the chat)
- What's your ambition with your study program?

## Covid-19
- Where are you at right now?
- How much do you like your home office, on a scale from 1 to 10...?
- How lonely are you?
- Wanna have the last half-an-hour of this with a borrel (eventually) - we can plan it? ;)

:::

# Motivation for course

## Mr. Chaos

- did my PhD in quant marketing
- coded a lot (data prep, modeling), but didn't *learn how to structure my workflows*
- created a complete chaos (but still got published) <!--; [see here](http://tilburgsciencehub.com/workflow/structure_phd_2013.html)-->

## Can't find stuff...

- Cannot find code that prepped the dataset
- Cannot find code of the econometric model that eventually got published

::: notes

- Show directory structure (e.g., on Dropbox), or ask them to replicate
- Ask students what's bad about it?

ADD SCREENSHOT OF MESSY DIRECTORY OF PHD PAPER
PROVIDE EXAMPLES OF CONFUSING FILE_NAMES (e.g., report, final_report, final_final_report)

:::

## What was so bad about it?

- Reproducibility
    - I couldn't reproduce results whenever I wanted to
- Replicability
    - My community doesn't really see how I did things
- Efficiency
    - when making changes to data, I had to go the the beginning, repeating all steps
    - a colleague asked me for the data years after; it wasn't properly documented!

## Why should *you* care?

- You will soon work on data-intensive projects - whether in academia (e.g., theses) or in business
- You will change code *continuously* before a project is final
- Team members or colleagues will look at and use your code
    - to help you
    - to continue your work
- Costly investment in terms of time and effort, but...
- __Small efficiency gains will pay off soon!__

# This course

## Course objective

- familiarize yourself with data structures in (data-intensive) empirical marketing research
- learn how to efficiently engineer data sets from complex raw data and document them for (re)use
- manage the research workflow with state-of-the-art tools used in industry: `make` and Git/GitHub

## Course positioning

<img width="1000" alt="Course framework" src="dprep_positioning.png">

## What's efficient?

> - prototype the "final pipeline", refine later
- reduce setup costs to return to a project
- reduce mistakes (or catching them at all!)
- rotating on tasks, or collaboration on tasks
- sharing/reusing code in packages
- enabling team members to take over part of your work
- receive feedback from others

## What's *not* efficient?

> - Waiting (e.g., for results, for estimation)
- Getting distracted while waiting
- Forgetting how things *are* or *were* done
- Losing data
- Using code which isn't properly documented ("don't know how to use it")
- Becoming frustrated, feeling lost

## What's a *data*-intensive project?

- Big data: volume, variety, veracity, velocity
- "Where prototyping on small data makes sense"

&#8594; memory-intensive (RAM)

## What's a *computation*-intensive project?

- Small data, but long computation time
- "Potential for running things in parallel"

&#8594; CPU-intensive

## What about *your* projects (e.g., projects, theses, PhD dissertations)?

- What do *you* feel has been __efficient__ or __inefficient__ in the way you've run your projects?

- To what extent do your projects fit the criteria of __data- and computation-intensiveness__?

::: notes
Running this analysis for my paper would take X days on my local machine (and forces me to keep my computer running 24/7). Thanks to AWS I do the same in X hours -> quickly log in to EC2 and show that you can open a "computer in a computer"


:::


## Course structure

- Part 1: Skill building (modules in weeks 1-5)
  - Self-study (readings, activities)
  - Self-guided tutorials to practice skills (plan, learn, apply, create)
  - Live stream for feedback & immersive activities

- Part 2: Project phase (weeks 6-8)
  - Apply skills in a team project
  - Building blocks / code snippets used to customize projects

## Course framework

<img width="1000" alt="Course framework" src="dprep_framework_detail.png">

## Course website

dprep.hannesdatta.com

::: notes

- Will show you the course website now
* show on the website where they can find the information they need
* how to download the files (right click)

:::

## Canvas versus the web

- The course website is your #1 resource

- Canvas only used for
  - posting important announcements,
  - sign up for teams,
  - submitting data challenges/projects, and
  - discussion board.

::: notes

all students have Canvas access?

:::

## Live streams

- use the public chat
- use it like on Twitch or YT (massively); question to me: prefix with `???`
- help me as a moderator if I miss questions
- maybe share screen (install [TeamViewer](http://tilburgsciencehub.com/building-blocks/configure-your-computer/automation-and-workflows/teamviewer/))
- if you have, use two screens (one to code, one to view colleagues/slides)

## Project

- based on public data from AirBnb
- build a research pipeline; specifics on the course site
- self- and peer assessment
  - "proof of investment in skills" (submitted tutorials/data challenges on Canvas)
  - written feedback to team members
  - assessment of own performance and that of team members

## Tutorials

- consist of three parts: learn, practice, apply
- make use of (simplistic) Datacamp courses (e.g., "copy-paste") - should not take too long
- Data Challenges are more challenging, take more time, and are representative of the level we expect in this course

## Grading

  - Team project, with self- and peer assessment (40%)
  - (Online) computer exam (60%)

::: notes

* Exam: Both multiple choice and open questions (you can't pass this course if you don't learn programming -> make sure you actively participate in the team project so that you can replicate it individually)
- more specs on exam later

:::

## My commitment

- Boost your own efficiency by making your work reproducible & transparent
- Help you boost the efficiency of others by being able to share work and collaborate on projects
- Learn R, __but__, becoming an expert requires years of practice
- Open software only (usable right away, no admin)
- Discuss own work and ideas, __but__ requires interaction & working hard

## Brain-dead by coding

- Coding can be extremely frustrating if you're starting out
- I tend to become semi-"brain-dead" after a day of coding
- Take breaks! Stop coding. Go for a run. Start again.
- You will learn from your mistakes
- Use cheat sheets and our support section.

&#8594; quick feedback loops in first few weeks

::: notes

Mention how we aim to remedy this initial hurdle? (quick feedback loops especially in the first few weeks)

:::

## Steps of escalation & getting in touch

When you run into trouble, this is your way out!

1. Ask Google and Stackoverflow
2. Ask friend/classmate (form groups!)
3. Can it wait? Defer to live streams.
4. If it can't wait: be in touch with me

::: notes

* Google/Stackoverflow are your best friends
* Live demonstration of how to search on Google and Stackoverflow
* Comment on experiment with live coding sessions (start a call - talk to fellow classmates who're facing the same struggles)


:::

## Use of WhatsApp

- Please use WhatsApp for short questions: +31 13 466 8938.
- Send me your names (first and last names) now (so I can create contacts on my phone and know whom I'm talking to)
- More info on the support section of the course website
- Email is not so optimal

## What's in for you?

- Essential job market skills
  - get the jargon, know your tools
  - marketing is much more than blabla - high-tech!

- Essential to show expertise
  - potential for follow-ups here in Tilburg and beyond

- Exciting area
  - new business models
  - new methods
  - new technologies

## Success factors

Please tell me __what would make this course a success__ for you

::: notes

(for me): become more efficient, use Tilburg Science Hub, give me feedback

:::

## Getting started

- Watch the "week kickoff" on YouTube (link on course page) - explains all of the material you need to cover this week

- Any questions?! If not -- I'll see you in the live stream on Friday! (--> course schedule).

- (Installation) issues from "prep week": stay on Zoom.

## Any questions?

Stick around now if you have questions.

Thanks a lot, and have fun with the course!


## Contact

Hannes Datta

https://hannesdatta.com
