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
- what is it about: radical change to how you look at data-intensive projects.
- happy to share that vision

:::

## Agenda

(before we *really* start)

- About myself
- (More elaborate) motivation for the course
- Course framework and learning goals
- Agenda and practical arrangements

# About myself

## Background

- born and raised in Germany
- moved to NL 12 years ago
- married, 2 kids (2 and 5 years old)
- streaming from 'de zolderkamer' in 's-Hertogenbosch
- geek at heart (got a 3D printer for Christmas), love listening & playing music, start new hobbies every few months...
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

- substantive
    - subscription-based business models
    - marketing-mix modeling and optimization
    - branding

- method
    - data management of structured and unstructured data
    - online data collection via APIs and web scraping
    - causality in observational data

## Teaching activities

- MSc Marketing Analytics and Management
    - Research in Social Media (*legacy*)
    - Data preparation and workflow management (*new*)
    - Online data collection and management (*new*)

::: notes

prototyped some content with managers, but now... release to students

:::

## Current research interest

__Impact of digitization on consumers, producers__

- How did [online streaming](https://tiu.nu/spotify) (Spotify, Netflix) change behavior?
- Bunch of follow-ups
    - "Who runs Spotify?" (measuring power of platforms)
    - [Music "filter" bubbles](https://research.tilburguniversity.edu/en/publications/streaming-services-and-the-homogenization-of-music-consumption)
    - Covid-19 & music consumption
    - Platform incentives & production of music
- More: see [website](https://hannesdatta.com)


# About you

## Getting to know you

> - Where are you located? (city, country)
> - Why are you interested in Marketing *Analytics*?
> - Where do you see yourself in a few years from now (professionally)?
> - What's your experience with R?
> - How much are you willing to invest in this course?

<!--(map of NL & Europe - use Zoom annotation!)
-->

::: notes

- What stage are you in?
- What are you working on right now?
- What's your ambition with your study program?

## Covid-19
- Where are you at right now?
- Home office, on a scale from 1 to 10...?
- Wanna have the last half-an-hour of this with a borrel? ;)

:::

# Motivation for course

## Disclaimer

> - Course runs for the first time (buggy!)
- Course is public, live streams are not
- Streams are complements, not substitutes for working through self-study material
- Mix of students at various levels
- Consider me your coach, not your professor
- Slow me down
- Know the course website inside-out
- I'm a marketer, not a data or computer scientist

::: notes


- I'm a marketer
    - I do marketing analytics
    - It’s close to data science in terms of data acquisition, but...
    - rather distant in terms of methods (e.g., ML methods only enter the field gradually; we’re mostly applied econometricians)

- In the (spontaneous) exercises, I may not know all the answers all the time – but will deliver later if required

:::

## Mr. Chaos

- did my PhD in quant marketing
- coded a lot (data prep, modeling), but didn't *learn how to structure my workflows*
- created a complete chaos (but still got published); [see here](http://tilburgsciencehub.com/workflow/structure_phd_2013.html)

::: notes

## Can't find stuff...

- Cannot find code that prepped the dataset
- Cannot find code of the econometric model that eventually got published

Ask students what's bad about it?

:::

## What was so bad about it?

- Replicability
    - I couldn't reproduce results whenever I wanted to
- Efficiency
    - when making changes to data, I had to go the the beginning, repeating all steps
    - a colleague asked me for the data years after; it wasn't properly documented!

## Why should *you* care?

- You will soon work on data-intensive projects - whether in academia or in business
- You will change code *continuously* before the project is final
- Team members or future colleagues will look at your code or use it
    - to help you
    - to continue your work
- __Small efficiency gains will pay off soon!__
- It's a costly investment in terms of time and effort though

# This course

## Course objective

- familiarize yourself with data structures in (data-intensive) empirical marketing research, and
- learn how to efficiently engineer data sets from complex raw data and document them for (re)use

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
- Forgetting how things *are* done
- Forgetting how things *were* done
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

- What do *you* feel has been __efficient__ or __unefficient__ in the way you've run your projects?

- To what extent do your projects fit the criteria of __data- and computation-intensiveness__?


## Course framework mimics a research pipeline

<img width="1000" alt="Course framework" src="dprep_framework.png">

## Course structure

- Part 1: Skill building (modules in weeks 1-5)
  - Self-study (readings, activities)
  - Self-guided tutorials to practice skills (plan, learn, apply, create)
  - Live stream for feedback

- Part 2: Project phase (weeks 6-8)
  - Apply all of your learnt skills in a team project
  - Building blocks / code snippets used to customize projects

## Course framework (with details)

<img width="1000" alt="Course framework" src="dprep_framework_detail.png">

## Canvas versus the web

- Canvas is only used for
  - posting important announcements,
  - submitting data challenges/projects, and
  - discussion board.

- The course website shows the syllabus and grading details

## Live streams

- use the public chat (tell me if I don't see it! who can take that role?)
- maybe share screen (install [TeamViewer](http://tilburgsciencehub.com/setup/teamviewer))
- if you have, use two screens (one to program, one to view slides/others)


## Project

- specifics to be made available on the course website
- self- and peer assessment
  - "proof of investment in skills" (submitted tutorials/data challenges)
  - written feedback to team members (tba)
  - assessment of own performance and that of team members

## My commitment

- Boost your own efficiency
    - ...by making your work reproducible & transparent
- Boost the efficiency of others
    - ...by being able to share your work and collaborate on other projects
- Learn R, __but__, becoming an expert requires years of practice
- Discuss own work and ideas
- __But__: requires interaction, talking to me, working hard


::: notes

- Other's efficiency
    - Not recollect what has been collected
    - Not reprogram what has been programmed
    - Learn from one's code, etc.
    - Share ideas
- Light-weight structure: no commercial tools, readily implementable, do not need admin rights [...]

:::

## Comments on coding

- Coding can be extremely frustrating if you're starting out
- You will learn from your mistakes
- Take breaks! Stop coding. Go for a run. Start again.
- Use cheat sheets. See course site.

## What's in for you?

- Essential job market skills
  - get the jargon, know your tools
  - marketing is much more than blabla - high-tech!

- Essential to show expertise
  - potential for follow-ups here in Tilburg and beyond

- Exiting area
  - new business models
  - new methods
  - new technologies

## Success factors

Please tell me __what would make this course a success__ for you

::: notes

(for me): become more efficient, use Tilburg Science Hub, give me feedback

:::

## Being in touch

- WhatsApp
  - Please use WhatsApp for short questions: +31 13 466 8938
  - Submit your name and telephone number on Canvas (so I can create contacts on my phone and know whom I'm talking to)
- More info on the support section of the course website


## Getting started

- Watch the "week kickoff" on YouTube (link on course page) - explains all of the material you need to cover this week

- Any questions?! If not -- I'll see you in the live stream on Friday! (--> course schedule).

- Installation issues: stay on Zoom.

::: notes

can use the break for installation problems

:::

## Any questions?

# Preview of efficient workflows

## Reproducibility & transparency

- Running [text mining tutorial](http://tilburgsciencehub.com/tutorial) on TSH

- Why is it useful?
    - Runs with one command (`make`)
    - Template to kickstart your projects
    - Endless possibilities to extend

__What "standard workflow" templates would be useful in your area?__

## A bird eye's view

- What is it about?
    - Build entire pipeline first
    - Then refine steps

- Good for
    - quick prototype
    - swapping/upgrading modules
    - focus on the "big" picture


::: notes

how i Use what I teach

:::

## Portability across computers, operating systems

- What is it about?
    - Prototype on Mac and Windows
    - Move to Linux Cloud

- Good for
    - performance issues
    - collaboration

## Branching out

- What is it about?
    - Take a "copy" of your project
    - Do changes there, test those without breaking the main project

- Good for
    - Testing
    - Robustness checks
    - Going back in time

## Time capsule

- What is it about?
    - Use version history on Git to view code (from the past)

- Good for
    - Because you *can*, you delete code and keep your project clean
    - Finding code that you want to use again
    - Search code *across* projects

## Software agility

- What is it about?
    - Use automation to connect different programs (e.g., R, Python, ...)
    - Use outputs of one as inputs of another

- Good for
    - Use a program what it's best for (e.g., R for data preparation, Python for ML)
    - Extreme flexibility

::: notes

show EC2

:::

# Wrap-up

## Summary

What are __your__ takeaways?

## Met the objective?

Work __efficiently__ on __data- and computation-intensive__ projects

## Your feedback

- About this course
    - About me
    - The format of this course
    - Communication
- About Tilburg Science Hub
    - About the text mining tutorial
    - About the installation instructions
    - About the overall workflows
- ...anything else

## Contact

Hannes Datta

https://hannesdatta.com
