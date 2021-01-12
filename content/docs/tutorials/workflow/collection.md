---
bookFlatSection: true
title: "Collection and Monitoring"
description:
bookHidden: false
weight: 50
description: "Run and monitor your data collection."
---


# Data Collection

It's now time to move your data collection into production. Keep in mind that, even in this phase of your research, your collection is considered "work-in-progress". Stay agile, and adapt your code if needed. Common situations that warrant updates to your collection scripts are:

- changes to the content of the website or API (e.g., such that the data that you want to capture cannot be located anymore using the selection procedure you've programmed, or the data disappears altogether)
- changes to the legal and/or ethical evaluation of your data collection (e.g., the ethical review board deems your data collection inappropriate)
- code bugs that you notice after long-term execution of your code (e.g., server time outs, unintended restarts of the computer that collects the data, database outages)
- changes to the institutional context (e.g., a new competitor enters the market, and capturing user behavior for that competitor is important to still meet the identification requirements of your study).

We recommend you subscribe to the website's or API's social media and news feeds (e.g., Twitter, Google News), and monitor its blog for important announcements on feature changes or service failures, all of which can impact the validity of your data collection.

{{< button relref="/collection.md" >}}Previous{{< /button >}}
{{< button relref="/preprocessing.md" >}}Next{{< /button >}}


<!--
a.	Software stack
i.	Packages (many ready-made packages in Python and R, directly from the service that has the API)
ii.	Self-programmed (if packages are not available for APIs, or generally for navigation in web scraping with full flexibility)
iii.	WYSIWYG tools (particularly in use for web scraping, but limited in functionality)
b.	Infrastructure
i.	Execution/running scrapers (one instance versus multiple instances, local versus remote)
c.	Monitoring
ii.	Status messages (e.g., time taken, units scraped, last time of data retrieval)
iii.	Detection of errors (e.g., time outs, empty data, changes in versions of API)
iv.	Notification on errors (e.g., manual lookup in log file, dashboard, phone push messages)


4.4.1	Monitor and debug
Monitor health, and debug.

-->
