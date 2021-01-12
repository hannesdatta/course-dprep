---
bookFlatSection: true
title: "Data Availability Assessment"
description:
bookHidden: false
weight: 10
description: "Learn to critically look at a website or API, and really try to understand which data you can retrieve, and which not."
---

# Data Availability Assessment

Let's say you've narrowed down your search to just a few websites or APIs. A common mistake done by many is to directly go ahead and scraping that data without actually thinking through *which* particular data is available on the site or API. However, a critical assessment of data availability may surface additional, more suitable data, or offer the opportunity to address multiple stakeholders of a particular business setting. Also, a more rigorous analysis may show problems with actual research - e.g., if algorithms are detected that may invalidate the author's supposed identification strategy.

Therefore, we recommend you to first take stock about the *actual* data that's available, on each site or API that may be relevant.

## Entity Coverage and Linkages

*What entities are actually available? A typical e-commerce website, for example, not only displays information on products and their reviews, but also allows you to extract information on the sellers of products and the users that have written the reviews. Check out how these entities could potentially be linked to one another or even to a dataset you're already working on.*

__Which entities are available?__

Familiarize yourself with the structure of the website or API to understand for which entities (e.g., consumers, products, reviews) are available. Consider a typical e-commerce website like Amazon.com. Entities, are the products and product reviews. But did you know that Amazon.com also lists information on the particular *users* that are reviewing products (such as where they're from), or information on third-party sellers (such as the shipping fees they charge)? Look for entities, write them down, and think carefully about how you could use these various entities to incorporate in your study.

{{< hint info >}}
Much of the best publications I've seen use data that is *not* obviously available on the site, but data that's somewhere hidden, where you have to think twice about its potential existence, but when you do incorporate it, it can boost your relevance for practitioners tremendously.
{{< /hint >}}

__How many entities are available?__

Knowing entities exist (e.g., reviews) doesn't mean you can all retrieve them! So zoom in on how many entities are actually accessible for you. For example, via the product page of Amazon.com, you can only view at maximum 1,000 entries. So, while it seems data is abundantly available, it's not so straightforward that all data can actually be retrieved easily.

__How are entities identified?__

When building code to extract data, you need to tell a browser where to look for that data. Typically, this happens via some kind of URL/endpoint, appended with an identification number for a particular entity. For example, Amazon.com uses ASINs (UPCs) to point to a product page, and the same ID is used to also point to the review pages. In other circumstances, IDs are merely numbers without any particular meaning (e.g., such as is the case for Chartmetric's internal artist ID numbers). Other sources may use commonly accepted metrics (e.g., such as Spotify's Track ID or Album ID, that is more widely accepted and used by others).

__How are entities linked to one another?__

Another crucial assessment to make is how entities are linked to one another, if at all. For example, the product pages at Amazon.com list products together with their ID number, from which you can then visit product pages. This is an example of a consistent linking scheme that can be readily scraped. Other sections of the website or other services may not provide such linkages.
<!--[For example [...do we have an example of stuff that's NOT linked?]-->

__How can entities be linked to external entities?__

After assessing the internal linkage structure, critically reflect how entities may potentially be linked to external data sources. For example, websites may list existing identifiers (e.g., in an e-commerce setting, Amazon.com lists book ISBNs, next to their own ASINs). Music intelligence provider Echonest.com, in its early days, allowed users to query their API for so-called Musicbrainz IDs, which were at the time widely used by the "wikipedia of the music industry". This allowed the service to grow and be usuable (as Musicbrainz IDs were used widely), and offered opportunities for researchers to gather meta data for existing data sets.

Linkages need not to be explicitly present on the site. Suppose a researcher was interested in merely gathering day-level data, he/she could simply write the current date/time in their scraping code, and use that as a matching thing.

Finally, linkages could be established by some form of string-based matching (e.g., exact matching, fuzzy matching; e.g., Datta et al. 2018).

__Which lists could serve as potential seeds?__

Suppose you are interested in gathering data from a social network on users, and that network has millions of users. How could you obtain a sample from that network? You need to start with a seed. Where are these seeds located? Maybe there is an internal page using most recent active users (Datta et al. 2018), from which a sample was taken for a duration of 1 month, encompassing 100k user names, from which itself a sample of 5k users was drawn.

Other studies use "external" lists, such as the New York Times book best seller lists, to link to data sets.

Yet others use a website's search function to search for potential seeds. Like with Google Trends, specific brand keywords can be entered, which then serve as linking points.

## Time Coverage

*Check for what time period the data is available on the site or API. Some sources only display data in real-time, while others have historical data available. In the case of historical data, how long can you go back in time?*

__For what time period is data available?__

What time period does your website or API cover? Some websites, such as Amazon.com, list historical data on reviews. That means you can easily go back in time and download all of these reviews. Other sections of the website, though, only display information in realtime (such as product prices), which means that if you don't capture the data today, you probably never will be able to capture that data.

{{< hint info >}}
__Be aware of "false friends"__

Even if a website makes available historical data, that does *not* mean *all* of the data is historically available. For example, Amazon.com reports the current review valence (the average of all customer reviews) and current price on their product pages. Yet, that data changes over time. While you can re-construct review valence from historical review data, you won't be able to re-construct pricing data (at least not entirely on Amazon.com).

{{< /hint >}}


__How is time encoded, and is it accurate?__

In the case of historical data, sometimes detailed timestamps are available. How are they encoded? Are they given in a users' time zone (so if you gather from multiple locations, you have to correct it), or are they encoded in some kind of universal format (universal standard time). Yet others provided very aggregate timestamps, such as "more than a year ago", which may impact the usefulness for building panel data and warrant a real-time data collection.

{{< hint info >}}
__Verify timestamps__

Verify whether you can trust the data's timestamps. For example, social media tracker Chartmetric.com records historical playlist performance data. In their data set, most of the tracks though are reported to be added on the 1st of January, 2016. However, that does *not* mean it actually took place like this. In fact, the addition date of 1st of January, 2016 merely reflects the starting point of Chartmetric's data collection. So a bit of industry knowledge and background checks is absolutely required
{{< /hint>}}

__Can data be modified after it has been published?__

What looks like archival data does not need to be strictly archival. For example, some e-commerce websites allow users to *change* their review, after it was posted (check out [the blog post by Yelp](https://www.yelp-support.com/article/How-do-I-edit-one-of-my-reviews?l=en_US)). Do you find any traces of such events on the page? Sometimes, reviews or comments are also deleted, and this can only be detected when comparing reviews or comments over time. Other websites explicitly report when data has been deleted or reset, such as the social music network Last.fm (in their API, they set the `bootstrap` flag to 1 in the case users have reset their profiles, which may render their historical data incomplete).


{{< hint info >}}
__Recognize research opportunities__

The fact that reviews are deleted without posting a notice may sound like bad news. However, it creates amazing research opportunities. For example, scraping a page that *looks* historical twice, you can compare which (fake) reviews have been deleted, and then analyze the factors of that predict whether a review is fake, or not. [Check out how identifying fake reviews has led to published work!](https://www.nytimes.com/2020/11/19/technology/fake-reviews-amazon.html).

{{< /hint>}}

__How often is the site/endpoint refreshed?__

When you plan to scrape data in real-time from a website, try to get a feeling for how often the site is actually refreshed. This may inform the frequency of data collection later on.


## Algorithmic transparency

*Think about why the site or API displays certain content and hides others. In other words, are there any algorithms in place that could potentially distort your data collection?*

A website or API can actively choose which data to show, and which data to hide/not show/make inaccessible.

__Which mechanisms affect the display of data?__

Design choices and certain algorithms that make a site easily navigable (which we love as users) can easily cause distractions when collecting data for scientific purposes (which we dislike for obvious reasons). Let me give you an example. Suppose you want to calculate average prices in a product category, and you start scraping data from the category pages of Amazon.com. Chance is you'll end up scraping prices for only the *most popular products* - which certainly are not representative of the whole product assortment on the platform.

Typical mechanisms that affect the display and retrieval of data are:
- sorting algorithms: e.g., by popularity, relevance, etc.
- recommendation algorithms: e.g., users (i.e., your scraper) that have viewed product X also have viewed product Y; people interest in X also looked at Y
- experimental conditions: e.g., you may end up being in an experimental treatment group of a firm
- sampling: e.g., the free Twitter API only returns a random subset of Tweets, and sample size can vary over time - such data is invalid for computing total tweet volume. Instead, commercial access from the entire Twitter database may be warranted (e.g., Deer et al. 2020).

{{< hint info>}}
Also make sure to seize information on how *specific metrics* are calculated. For example, Chartmetric.com reports the *listeners* of playlists, while this data is not even available at Spotify. Looking at their blog, though, one can understand that the *listeners* have been proxied. This is important to realize when working on a paper!
{{</hint>}}


__Can the researcher exert control over the data display?__

When screening a site for data availability, its therefore crucial to look out for options to exert *control* about which data is show. For example, you can sort products also by alphabet, which - arguably - probably isn't related to popularity, and would be a safer selection filter when you're interested in the price of an average product, rather than of the most popular products.

For some, the researcher can make active decisions (e.g., sort in alphabetical order, rather than by popularity). Others are beyond the control of researchers (e.g., a personalization algorithm for the pages visited) - which could still be circumvented by resetting cookies at every browser initiation. Yet, others are completely beyond the control fo a researcher, such as in which experimental condition one is.

When working with an API, carefully screen the API documentation for possibilities to exert control over data display. Also compare the output of an API with what the service itself publishes on the website - that way, you can detect any remaining errors or inaccuracies in your data.

{{< button relref="/opportunities.md" >}}Previous{{< /button >}}
{{< button relref="/researchfit.md" >}}Next{{< /button >}}
