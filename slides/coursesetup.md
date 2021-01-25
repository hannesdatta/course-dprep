% Efficient Workflows for Data- and Computation-intensive Projects
% [Hannes Datta](https://hannesdatta.com)
% May 29, 2020

# Let's get started!

## Handouts

...are available at the course website at [https://tiu.nu/dep](https://tiu.nu/dep)

(Dropbox, `module 2`)

::: notes

worked without structure in the past
i discovered a new way of working with data- and computation-intensive projects
happy to share that vision

:::

## Agenda

(before we *really* start)

- About myself
- Motivation for course
- Learning goals
- Agenda and practical arrangements

# About myself

## Personal background

- born and raised in Germany
- moved to NL 11 years ago
- married, 2 kids (2 and 5 years old)
- streaming from 'de zolderkamer' in 's-Hertogenbosch
- geek at heart, love (to play) music

## Professional background

- PhD, quantitative marketing (Maastricht University)
- Associate professor Tilburg University
- Visiting professor
    - Duke University (Sept - Nov 2018)
    - University of New South Wales, Sydney (Jan 2020)

## Key areas of expertise

- substantive
    - marketing-mix modeling and optimization
    - branding
    - subscription-based business models

- method
    - causality in observational data
    - data management of structured and unstructured data

## Teaching activities

- MSc Marketing Analytics and Management
    - Research in Social Media
    - Data preparation and workflow management (*new*)
    - Managing large-scale online data collections (scraping and APIs, *new*)

- This class (at various levels; academic, exec)

::: notes

what i love about this class is that I use it for prototyping;
you're much closer to practice than my regular students, so it's great to incorporate your experience

:::

## Current research interest

__Impact of digitization on consumers, producers__

- How did [online streaming](https://tiu.nu/spotify) (Spotify, Netflix) change behavior?
- Bunch of follow-ups
    - "Who runs Spotify?" The power of content owners versus the platform
    - [Music "filter" bubbles](https://research.tilburguniversity.edu/en/publications/streaming-services-and-the-homogenization-of-music-consumption)
    - platform incentives & production of music
- More: see [website](https://hannesdatta.com)


# About you

## Projects

Getting to know you through your projects

- Text
- Predictive analytics
- Marketing optimization
- Process mining
- Modeling

::: notes

- What stage are you in?
- What are you working on right now?
- What's your ambition with DEP-4?
- Where are you? Kids around?
Look at the XLS sheet, talk about some projects

1) 360 degrees stakeholder impact scan (data and text analysis); How to improve the bachelor programs at UvT for both students and academic staff (1st project)
2) Mobile telecom congestion prediction for beach radio stations
3) Cluster analysis, segmentation models for loyalty programs, banking app Zalando?

## Covid-19
- Where are you at right now?
- Home office, on a scale from 1 to 10...?
- Wanna have the last half-an-hour of this with a borrel? ;)

:::

# Motivation for course

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

- You will change code *continuously* before project is final!
- Colleagues will look at your code or use it
    - to help you
    - to continue your work
- Small efficiency gains will pay off soon!
- It's a costly investment in terms of time though

# This course

## Course objective

Work __efficiently__ on __data- and computation-intensive__ projects

## What's efficient?

> - not making mistakes...
  - catching mistakes early
  - catching mistakes at all!!!
  - zero setup costs to return to a project
  - prototype the "final product" soon, refine later
  - rotating on tasks
  - sharing/reusing code
  - having *others* audit your code

## What's *not* efficient?

> - Waiting (e.g., for results, for estimation)
- Getting distracted while waiting
- Forgetting how things *are* done
- Forgetting how things *were* done
- Losing data
- Using code which isn't properly documented ("don't know how to use it")
- Becoming frustrated, feeling chaotic

## What's a *data*-intensive project?

- Big data: volume, variety, veracity, velocity
- "Where prototyping on small data makes sense"

&#8594; memory-intensive (RAM)

## What's a *computation*-intensive project?

- Small data, but long computation time
- "Potential for running things in parallel"

&#8594; CPU-intensive

## What about *your* projects?

- What do *you* feel has been __efficient__ or __unefficient__ in the way you've run your projects?

- To what extent do your projects fit the criteria of __data- and computation-intensiveness__?

Let's discuss by *type of graduation project*

## How to achieve the course objectives

- Boost your own efficiency
    - ...by making your work reproducible & transparent
- Boosting the efficiency of others
    - ...by being able to share your work and collaborate on other projects
- We require a [conceptual framework](http://tilburgsciencehub.com/workflow)
- Discuss own work, and how to implement suggestions

::: notes

- Other's efficiency
    - Not recollect what has been collected
    - Not reprogram what has been programmed
    - Learn from one's code, etc.
    - Share ideas
- Light-weight structure: no commercial tools, readily implementable, do not need admin rights [...]

:::


## Direct link to CRISP-DM

...across many stages!

<a title="Kenneth Jensen / CC BY-SA (https://creativecommons.org/licenses/by-sa/3.0)" href="https://commons.wikimedia.org/wiki/File:CRISP-DM_Process_Diagram.png"><img width="412" alt="CRISP-DM Process Diagram" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/CRISP-DM_Process_Diagram.png/512px-CRISP-DM_Process_Diagram.png"></a>

::: notes

data prep, modeling, evaluation, deployment, data

:::

## Disclaimer

> - I planned to do this in English, but...
- I assume you have viewed the [course page at tiu.nu/dep](https://hannesdatta.github.io/course-jads2020/)
- If I’m going too fast (and I will), slow me down!
- I may deviate from the announced timing
- I'm a marketer, *not* data scientist, *not* IT
- I refer to [Tilburg Science Hub](http://tilburgsciencehub.com)
- I'm using this slide deck for the first time
- <s>traditional lecture</s> interactive live stream
- I'm not the most efficient person to talk to... ;)

::: notes

- If everybody is speaking Dutch, that would be fine, too

- I'm a marketer
    - I do marketing analytics
    - It’s close to data science in terms of data acquisition, but...
    - rather distant in terms of methods (e.g., ML methods only enter the field gradually; we’re mostly applied econometricians)

- In the (spontaneous) exercises, I may not know all the answers all the time – but will deliver later if required

:::

## Success factors

Please tell me __what would make this course a success__ for you

::: notes

(for me): become more efficient, use Tilburg Science Hub, give me feedback

:::

# Agenda & practical arrangements

## Agenda (1)

- 13:15 - 14:15 (now): Introduction
  - Course setup (done that)
  - Preview of efficient workflows
  - Key building blocks
      - Pipelines & components
      - Data management & directory structure
      - Automation

## Agenda (2)

- 14:30 - 15:30: Running and *extending* a reproducible workflow
  - Putting things in practice
      - [TSH workflow tutorial](http://tilburgsciencehub.com/tutorial) + Q&A
      - Activity: Drafting your project pipeline
  - Key building blocks (*'cntd*)
      - Documentation
      - Versioning
      - Collaboration

::: notes
- skip documentation?

:::

## Agenda (3)

- 15:45 - 16:45: Advanced topics & implementation
  - Inventorizing your needs + picking activities/extra content
  - Implementation plan
  - Wrap-up

::: notes

- Schedule
    - 1-hour blocks, but may deviate

Q&A: fixing problems, automation basics

:::

## Practical arrangements

- Installation fine?
- Could run the workflow?
- All digital, interactive
    - make use of public chat (tell me if I don't see it! who can take that role?)
    - maybe share screen (install [TeamViewer](http://tilburgsciencehub.com/setup/teamviewer))
    - if you have, use two screens (one to program, one to view slides/others)

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
