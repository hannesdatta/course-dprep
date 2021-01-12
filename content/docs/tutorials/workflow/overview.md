---
bookFlatSection: true
title: "Overview"
bookHidden: false
weight: 1
description: "See the big picture & familiarize yourself with each stage of the workflow."
---

# Workflow for collecting online data

Gathering data from the web requires careful planning and execution, to a similar degree that econometricians calibrate statistical models, or consumer psychologists opt for a particular design for their experimental study.

The numerous decisions you need to make when collecting data from the web affect your study's *relevance* and *rigor*. *Relevance* means that managers or public policymakers can make better decisions based on your findings. *Rigor* implies that your study does not contain any errors or inaccuracies to increase the degree of confidence that other researchers can place in the generated knowledge.

To guide you in making optimal decisions when collecting online data, we provide you with a toolkit that helps you *think conceptually* about how to gather data from the web. We call this toolkit the "workflow for collecting web data".

## 1. Opportunity Identification

Start by identifying an opportunity for gathering data from the web. Such an opportunity could arise from a research project you're already working on (but where you may just not have managed to find useful field data yet). Alternatively, you may just have a vague feeling that a particular data context may soon become important to study, which may motivate the start of this workflow.

Once you've identified an opportunity, make a list of potential websites to scrape or APIs to retrieve data from.

## 2. Data Availability Assessment

From your list of websites and APIs, pick your best candidate and assess what data can be extracted from it.

A typical e-commerce website, for example, lists information on products and its reviews. Yet, such sites *also* offer information on other, less obvious entities, such as the *users* that have written product reviews (e.g., where they are from), or the *sellers* of products (e.g., in which other product categories they are active in). Also check for what period the website or API offers data, and try to understand how algorithms - such as ranking or recommendation algorithms - may affect which data you can retrieve.

## 3. Research Fit Evaluation

After becoming aware of the available data, you need to evaluate whether the data *fits your research purpose*. For example, you may have learned that the website or API does not provide historical data that fits your study's requirements. Suppose such a requirement amounts to at least two years of data, is it feasible to run a real-time data collection for that long?

When evaluating research fit, also think about how to obtain a sample from the website (e.g., users or products): if your study's goal is to generalize to a population, obtaining a *(quasi-)random* sample from the site or API seems like a must. How can that be practically achieved?

{{< hint info >}}
__Does the available data fit your research purpose?__

If the available data fits your research purpose, you can proceed to step 4 - making a data extraction plan. If not, you should explore alternative data sources, e.g., data aggregators, commercial APIs, similar websites, or even published and publicly accessible data sets (e.g., on Kaggle.com). Be aware though that pre-existing datasets may have been insufficiently documented or formatted, which may compromise your study's rigor.

Re-conduct your data availability assessment and evaluate the research fit of the alternative data source.
{{< /hint>}}

## 4. Technical Extraction Plan and Prototype Development

Once you've chosen (one or multiple) websites or APIs for data extraction, make a plan on how to specifically retrieve data from it. We recommend you prototype the extraction plan concurrently to assess its technical feasibility.

1. Define for which entities you would like to gather data, and in what frequency to retrieve such data. Then, map out the exact navigation path you would like your scraper to follow (e.g, open specific website URLs, logging in, clicking, scrolling, or looping through the results of an API call). Finally, decide *which specific data* you would like to capture, and how to store it (e.g., in database in the cloud, or simply as files in your local computer).

2. Pick the software tool to execute your scraper. If you're capturing data from an API, does this API have a package available in Python you could use? Or is it more advisable to self-program your data collection? If you're using a website, can you reliably extract data without actually seeing the website, or do you need to (virtually) open a browser and *simulate user behavior*, such as clicking? Alternatively, do you know of any commercial data providers from which you could buy the data to save time?

3. Choose the hardware infrastructure on which to deploy your scraper. Your laptop may be cheap (you already own it), but probably you will have to restart it once a while, or its Wifi connection may drop - making it an error-prone tool. Even local office computers have reportedly been cut off from power for several days... Especially for long data collections, therefore, a remote computer, such as a computer in the cloud, may be much safer.

4. Decide how to monitor the data collection while it is running. That's particularly important for real-time data collections that run over extended periods. Still, even one-shot data collections may benefit from monitoring, e.g., to verify that all requested data, in fact, has been obtained.

{{< hint info >}}
__Is your data collection legally compliant, ethically justifiable, and resource-supportive?__

When making your data extraction plan and prototype, you need to think about its legal and ethical compliance, and keep an eye on resource use.

Sometimes websites prohibit the use of scrapers, but with a good research purpose, you may be able to justify your data collection. Some data may be considered personal data under the GDPR, which may prevent you from storing it in the first place. Sometimes, a data extraction is technically advanced - e.g., when its deployed across multiple cloud computers - yet, projecting costs in the future, you may realize your budget is insufficient. In all of these situations, you may have to modify your extraction plan, and re-assess whether the data you can still get is "good enough" to fit your research purpose.

{{< /hint>}}

## 5. Collection

After planning your data collection, it's finally time to start collecting the data. In this phase of your research, monitor the data collection regularly. Also subscribe to the service's social media and news feeds (e.g., Twitter, Google News), and keep an eye on its blog to stay up-to-date about server downtimes or service announcements that may impact your data collection.

## 6. Preprocessing, documentation, and distribution

After you've collected your data, it's time to preprocess and document it. When working on a live data collection, preprocessing and documenting the data typically takes place already while the data is being collected. Finally, you can distribute the data to team members, or post it on a public data repository.

1. __Clean__ the data so that it can be used in your project. For example, you may have to remove unnecessary HTML tags from it, or disguise users' identities to make data storage GDPR-compliant.

2. __Structure__ the data for durable storage. Choose a sustainable storage format (e.g., storing data as a CSV file is more durable than storing it as an .RData file), then can be read by multiple statistical packages (e.g., your coauthors may work with different tools than you do), and determine the desired data structure (e.g., normalization of data).

3. __Validate__ the data. For example, check the log files of your scraper: were there any interruptions while the data collection was running? How does it affect data quality? Also, check the raw data if you stored it: are there any new variables that popped up, and that may also be relevant for your study? Last, check the cleaned and structured data: are all variables GDPR-compliant? Are there any weird characters, which may signal errors in character encoding?

4. __Document__ the dataset for internal and external use. If you plan using the data set only with your direct colleagues, share information on the composition of the data set (i.e., the entities and timeframe), collection process (any errors)?, the kind of preprocessing you've done, and start gathering information on the institutional background of your data collection with screenshots, a PDF of the API documentation, or some blog articles from the service's site. Note that working on an academic study takes a long time, and chance is the site will change substantially, so making copies of how the site looked is helpful. If you plan on distributing the site externally, explain to potential users on why you collected the data in the first place. This will help potential users to make more informed choices when they think about reusing your data. Finally, decide for a license for the data.

{{< hint info >}}
Note that your dataset won't be perfect instantaneously. While you're working on your research, revisit the data preprocessing and documentation steps over and over again. By the time you publish your study, your data will be in good shape, and ready to share with the journal office (and the world).

{{< /hint >}}

5. __Distribute__
Distribute your data to team members, or post it at a public data repository.

## 7. Use and Maintain

The last step is why you've gone down the route of collecting data in the first place: to *put it into productive use* - probably for an academic paper. Use the data in your analysis, and report the results in your paper.

{{< hint summary >}}

Scraping involves numerous decisions that impact the rigor and relevance of your study. Carefully draft your data collection before embarking on your scraping project so that you can work on your best possible study.

{{< /hint >}}


{{< button relref="./_index.md" >}}Previous{{< /button >}}
{{< button relref="./opportunities.md" >}}Next{{< /button >}}
