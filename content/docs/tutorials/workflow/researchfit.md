---
bookFlatSection: true
title: "Evaluation of Research Fit and Resource Use"
description:
bookHidden: false
weight: 20
description: "Not all that glitters is gold. Does the data that's available on a site or via an API really fit your research purpose? And how costly is it to develop your scraper - both in terms of time and money?"
---

# Evaluation of Research Fit and Resource Use

Once you've gotten a better idea of which data is available, you need to assess whether it fits your research purpose.

## Sampling

*Evaluate how to sample entities from the site or API. Does your study require a random population sample? If so, how to obtain it? If random sampling is not feasible, would convenience sampling be "good enough" to inform your research?*

First, determine the *desired sampling procedure* for data extraction. Typically, you choose such sampling procedure for your *"seeds"* - the first entry point to a site. Then, obtain *complete* information on each of your sampled seeds. For example, when scraping pricing data from an e-commerce website, the "seeds" are all products listed under a particular product category page. Take a (random) sample of entities (i.e., products), and visit each product's detail page.

Common sampling procedures used in web scraping are:
- full sampling (i.e., obtain data on *all* entities)
- random sampling (i.e., obtain a list of *all* entities ("seeds"), and then take a random sample of these seeds),
- stratified sampling (i.e., obtain a list of *all* entities, along with meta data, and take (random) samples for stratas of meta dat), and
- convenience sampling (i.e., obtain data on the entities that are shown on the site when you visit the page).

After choosing a sampling procedure, check whether it is *technically feasible*. For example, in order for you to be able to draw a random sample from entities on the site, you need to be *able to collect data on all entities first* (and then take a random sample of those). Probably, the site will detect your scraper, and block you.

{{< hint info>}}
__Quasi-random sampling as a remedy to full random sampling__

To obtain data on the music listening behavior of (a random sample of) users, I needed to scrap the profile pages of customers of a social media site. It was technically infeasible to obtain a list of *all* users of the site (from which I could then have drawn a random sample). That's why I looked around on the site, and found a section in which it listed the profiles of the site's *recently active users*. That site was also updated in real-time, i.e., upon refreshing the browser, I was able to retrieve yet another list of recently active users. While arguably not a random sample from *all users* of the site, this was - indeed - a random sample of *recently active users* of the site - or, in other words, a quasi-random sample of users.
{{< /hint >}}

{{< hint info>}}
__Is random sampling always required?__

Random sampling is an honourable goal, but sometimes just not attainable. Luckily, early work in a particular domain cares more about the overall phenomenon than about full generalizability. In other words, it may be defendable to sample from a site, even though you randomness cannot be guaranteed. In the study described above, the sample was a quasi-random sample from the site's users, but the users, in turn, were not a generalizable sample of the *population of all music listeners* (their average age was 25, and there were 75% males).

{{< /hint>}}

### Effective sample size

*Sampling from web sites and APIs can be tricky: limits to server load ("retrieval limits") or snowballing effects (e.g., seed of 100 users, sample 100 of their peers (100 x 100), and obtain all of their peers' consumption patterns for 50 weeks already yields 100 + 100 x 100 + 100 x 100 x 50 requests = !)*

Important to consider is the minimum sample size to satisfy statistical power requirements (e.g., to maximize your chance of detecting a statistically significant effect when it is actually present) or conform with conventions in your field of research (e.g., if everybody else has sampled 1,000 users, a study with merely 10 users will probably be a hard sell to reviewers).

What makes sampling in web scraping difficult is that you also need to take into account the *technically feasible sample size*. Let me give an example: suppose you require data on at least 10,000 users, scraped once per hour, and the website's fair use policy imposes a retrieval limit of 1,000 requests per hour. You probably notice that such a collection is infeasible - already visiting the profile pages of 10,000 users would take 10 hours (which doesn't even account for timeouts!). So, given the sampling frequency and potential limits to making retrieval requests, your effective sample size can severely shrink.

{{< hint info>}}

__Calculating technically feasible sample sizes__

Your study's technically feasible sample size (or any other parameter) can be calculated using the following formula:

{{< katex display  >}}
req \times S = N \times r \times freq
{{< / katex >}}

whereby
- req = number of requests per time unit per scraper,
- S = number of scrapers (e.g., computers, API tokens),
- N = number of entities to extract data from (i.e., sample size),
- r = number of requests to collect data for each entity, and
- freq = desired sampling frequency per time unit.

Note you can rearrange the formula to solve it for any target parameter of interest. For example,

{{< katex display  >}}
N = \frac{req \times S}{r \times freq}
{{< / katex >}}

would solve for the maximum sample size, given the number of requests you can make on a day per scraper (retrieval limit *req* by the site), the number *S* of scrapers you're employing (e.g., you're running the scraper on multiple computers), the number of requests *r* you make per entity (e.g., visiting two product pages per sampled unit), and - finally - the desired sampling frequency *freq*.

{{< /hint>}}

<!--
I studied music behavior on Spotify a while ago, but only had access to a sample of users who listened to music on a social network - arguably not a random sample of the population. The site was updated in real-time, and I visited each user profile page every 15 minutes. As the fair use policy of the site implied no more than 5 requests per second, that limited me to around 5,000 users to include in my study - which were enough to meet statistical power requirements.
-->

## Construct measurement

*Websites and APIs provide a lot of information, but which one do you capture, and how do you convert the data into variables you can use in your analysis? Do these variables really measure what you're interested in?*

Can the constructs that you're interested in actually be measured with the data available on the site or API. The most typical extraction method when scraping is to capture text. However, information can also be extracted from the *presence* or *absence* of certain images (e.g., the "Top Reviewer Badge", that's displayed alongside a review, allowing you to potentially detect commercial reviewing activity).

Ask yourself whether the construct you're interested in can actually be measured with sufficient validity. Do the data points *really* capture the construct of interest? Are there any biases (e.g., algorithmic interference) present, and is it clear how the metric is computed (e.g., transparent reporting about the method)?

{{< hint info>}}

Suppose you're interested in measuring the number of views for Netflix movies on the public Netflix website (the one you see when you log in). Statistics on the number of views aren't even available to the directors that have *made* a movie or series, so getting this data is impossible. Yet, Netflix shows daily lists of the *top 10 movies and series people in a geographic territory have watched*. Ask yourself: can you *still* study the popularity of, let's say, movies and series on Netflix, using such a Top 10 list? My answer is: it's not views, but somewhat good enough to proxy viewing behavior. Recognize its limitations, but seize the opportunity of collecting such data!

{{< /hint>}}

## Data structure and mergeability

*Data on a website is typically not arranged in "rows and columns", and mostly not available at the unit of analysis that you need for your study. How can the data that's on the site  be structured for analysis? Is it even feasible?*

The basic thought exercise you have to do is to think about the format of the raw data (e.g., an HTML page with an identifier like a product ID, plus some product meta), and the structure of target data.

- __Cross sectional data__ is probably the easiest case when scraping data, as you likely have to visit your entities' pages once.
- When interested in __time series data__, you may have to take into account your desired sampling frequency. If your target data set is at the daily level, when and how often do you need to visit the target website to prepare such data? And does the website's updating frequency correspond with your level of aggregation? (e.g., if the website or API only refreshes data once a month, you can't claim it's daily data - even if you've scraped it daily!).
- If you are building a __panel data set__, things get more complicated. How do you need to gather data from the website, so that you can aggregate it at the entity-day level? You probably realize there are many options. For example, you could decide to visit each entity's page once a day, but then the earlier entities are likely to be visited by your scraper in the morning, while the later entities are likely to be visited in the evening or night. Would that introduce any bias - and are you able to circumvent it, e.g., by either randomizing entities every day that your scraper is running, *or*, instead, visiting your entities *several times a day*?
- Another commonly scraped data set "type" is __network data__, e.g., the "peers"/"friends" of your seed users. How do you plan to analyze the data? Aggregated at your focal users' level (e.g., "count of focal user's friends"), or do you also have to retrieve user behavior from the peers, and directly model it (making your data set being indexed at the user-pair, and maybe also time level).

## Resource use

*As "browsing the web" is largely free, scraping by many is mistakenly considered as free data.*

Developing and operating a scraper can become quite costly. When evaluting research fit, it's important to also consider the monetary and non-monetary costs of your project, and whether the investment is justified by your potential use of the data.

### Development costs

Chance is you have your first scraper running in a matter of hours, but you will soon realize it probably doesn't work as intended. To overcome technical obstacles (such as logging in to a site, wiping cookies, setting up proxy server, dealing with interactive java scripts, etc.), you need to invest a significant amount of time and effort (by the way: build your network of "fellow scrapers" to solicit for feedback on your code!). Using well-documented packages/libraries that are widely used may make quite of a difference in terms of development efforts. Even if you're not writing your own code, plan in enough time for code audits and revisions. The developer likely doesn't know much about academic research and high demands for data quality, so you need to check the code and its output rigorously.

### Legal and ethical clearance
Scraping by many is considered a legal grey area, and depending on your institution's web scraping policy, you may require  legal support before you can go ahead scraping and using data collected from the web. Also, plan in time for your research proposal to get approved by your institutional review board or ethics review board.

### Operating costs
Operating costs encompass the direct costs (e.g., license fees for the API, given your projected running time), and indirect costs (e.g., costs of deployment and storage infrastructure). Note you already incur these costs when developing the scraper!

### Maintenance costs
Finally, consider your scraper's maintenance costs. Especially if you plan on collecting data over extended periods, the likelihood that your code will have errors is relatively high. Using an official API (compared to scraping data from the service's website) may be a safer strategy to safeguard yourself against broken code.


{{ < hint info >}}
More than any other data collection method known to us, the costs of failure are completely on your account. Suppose you need data for at least one year, but two months into the data collection, the API you're using gets bought by another firm and is made proprietary (no joke: this happened recently when Facebook bought the streaming service Mixr, rendering our code and the research project useless). With live data collections, there's also no way for you to "go back in time" if you find out too late that your scraper didn't work. Try to map out "worst case scenarios", and come up with ways to mitigate the risks.
{{ < /hint > }}

### Opportunity costs
Last, consider your opportunity costs. If you were to buy comparable data from official sources, how much would that cost?


{{< hint warning>}}
__Go or no-go? Avenues to look for alternative data sources__

After having assessed the research fit of the website or API, it's time to make a call: proceed with the data collection, or look for alternative sources because the data that you need isn't there or doesn't fit your research purpose.

If you deem the data collection infeasible, you have several opportunities to look for alternative data sources:
- If you so far have only considered websites, maybe you can find (commercial) APIs that provide similar data - maybe even from the same service, to ease data collection efforst?
- Is the website or API you've looked at a *primary data provider*, or a *data aggregator*? For example, you can use the Spotify Web API to collect data from Spotify - a primary data provider -, while the API of Chartmetric.com - an aggregator - allows you to extract data not only from Spotify but also from Apple Music, Deezer, and TikTok. This may offer exciting opportunities for broadening or even simplifying the data collection.
- Are there publicly available data sets, e.g., Data Science Challenges published on sites like Kaggle? Using them tremendously cuts down your data collection efforts but may pose a threat to study rigor if the data set is poorly documented.

{{< /hint>}}

{{< button relref="/dataassessment.md" >}}Previous{{< /button >}}
{{< button relref="/extraction-plan-prototyping.md" >}}Next{{< /button >}}
