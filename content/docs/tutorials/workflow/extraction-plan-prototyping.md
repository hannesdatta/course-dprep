---
bookFlatSection: true
title: "Technical Extraction Plan and Prototyping"
description:
bookHidden: false
weight: 30
description: "Make a technical plan for data extraction and storage, and prototype your data collection."
---


# Technical Extraction Plan and Prototyping

Once you’ve chosen (one or multiple) websites or APIs for data extraction, define the exact data that you would like to get, how to retrieve it (e.g., using software running on your local computer), and where to store it (e.g., files, databases in the cloud). Throughout, build a prototype to reassure yourself about the technical feasibility.

{{< hint info >}}
__Hiring a programmer or consultant__

Conducting web scraping does require good coding skills, and it's definitely advisable to ask an experienced programmer for help. When doing so, brief the programmer about your research purpose, and provide details with regard to the decisions explained below. Remember that a programmer is likely *not* a researcher, so verify whether the data has been collected properly, and still fits your research purpose. The same holds for commercial data providers: a firm can easily promise to deliver "customer review data", but can you defend sampling choices in a paper, let alone know whether the data collection threw some errors (you don't have their log files)?

{{< /hint >}}


## Data extraction

### Entities and extraction frequency

Select the entities for which you would like to extract data from the website or API. Recall that not all entities available may be relevant for your research. Adding many entities seems "safe" for data coverage, but may inadvertently increase the complexity and costs of your data collection.

Next, determine the extraction frequency for each entity. In broad terms, do you require data only once, or at regular intervals (e.g., hours, days, weeks)? Alternatively, are there any external events that may trigger your data collection (e.g., such as when participation in a survey triggers the collection of your survey participant's data on social media).

### Seeds and sampling procedure

Choose the "seeds" for your data collection. Seeds serve as a starting point for your data collection, and we distinguish two types:

- Internal seeds originate on the site or API that you are about to scrape. For example, to obtain pricing data for a sample of books from Amazon.com, you could first gather the product IDs of all products listed on the product overview page for a particular category, and subsequently visit their product pages.

- External seeds do not originate on the focal site or API. They come from different, *external* sources. For example, you could start your data collection using a list of books from the New York Times Bestseller list. External seeds are widely used, for example because they convince readers of your study about your sampling scheme ("of course, the books on the NYT bestseller list are highly popular books!"), and may free you from the criticism that an unknown algorithm interfered in your sample selection, such as may be the case with internal seeds that may be ambiguously defined. Of course, using external seeds requires you to be able to link your seeds to your website or API (which, in the case of ISBNs is straightforward, but which may be more difficult in the absence of common, searchable identifiers).

### Navigation path

Imagine you would like to manually collect the data for your study from the web. Imagine how many times you would have to click (and copy-paste!), until you would have navigated the entire site! To free you from the effort (and time) involved in manually clicking, you need to define your scraper's *navigation path*.

#### Single entities

Information - even for single entities (such as the reviews for the latest iPhone) - is rarely available without "extra" clicks (e.g., on a single page). How does your scraper needs to navigate to obtain all necessary data? In the case of product reviews for the iPhone, you need to deal with *pagination*, by understanding *how* to make your scraper navigate through all of the available pages of reviews. Typically, you can iterate through all pages by slightly modifying the website URL (e.g., by swapping page numbers), or the arguments of an API endpoint (`&page=2`, `&page=3`, etc.). For most websites, unfortunately, merely modifying the arguments is not sufficient and you need to *simulate user behavior* (e.g., by opening a browser, and programmatically "clicking" on the button to accept cookies or proceed to a next page).

#### Multiple, connected entities

If you're planning on obtaining data on multiple entities that are related to one another (e.g., products, and the reviews for each of the products), you need to map the navigation from one entity to the other. Let's extend the example from before, except that now, we are interest in the reviews for *all smartphones*, not only the most recent iPhone. The navigation path becomes:
- obtain a list of seeds (e.g., loop through all pages of the product overview page),
- visit each product's product overview page (e.g., to gather product attributes), and
- visit each review page (pagination!) for each of the products in your sample.

{{< hint info>}}
If you haven't written code up to this point, it's high time you start prototyping your data retrieval. Can you reach particular pages by modifying the website's URL, or do you have to simulate clicking or scrolling behavior? Also, is any user interaction required to load all data that you would like to get from a page?

{{< /hint >}}

### Select data

Finally, for each entity, select the data you would like to extract. Determine how to "tell" your scraper where the particular data is located on a page. This process of making searchable a website's content or the results of an API call is called *parsing*. We give details on parsing data from websites and APIs next.

#### Data from websites

Numerous packages (e.g., `BeautifulSoup` in Python) exist which parsing and structure data for you. Still, the challenge is to identify *how to locate the elements* to extract information on. It's not without a good reason that the Python package is called __`BeautifulSoup` - the "soup" of information can easily be overwhelming!

Luckily, unstructured web data is actually pretty organized. The reason is that many years ago, the pioneers of the world wide web developed a standard for how code is visually rendered on websites. Even decades after the invention of this standard - HTML (or, hypertext markup language) -, the web relies on more or less of the same conventions: elements in your website's HTML source code - such as headers, bodies of texts, links, or images, all have particular characteristics. Once you know the characteristics of your target elements, extracting information from it becomes straightforward.

{{< hint info>}}

To find out how to identify the elements that you would like to extract, point your browser to the target page and open your browser's development tools. You can now concurrently browse the visual website, and take a look at the website's underlying source code. In particular, you can explore which attributes, classes or styles are associated with a particular target element. Also, you can experiment with writing some code to see whether you can actually capture what you're interested in.

Beware that a website's underlying source can change over time, rendering your extraction code useless. Also, a website's source code depends on the type of device or operating system that you're using to visit the page. So, if you've developed your scraping code on a Windows PC with Firefox, it probably won't run when scraping with Chrome on Linux...

{{< /hint >}}

#### Data from APIs

Extraction from data provided via APIs is much easier than extracting data from websites. Most APIs provide their data in the JSON (Java Script Object Notation) format, which boils down to a tree of attributes and values. Once parsed in Python (e.g., using the `json.loads` function), the tree is searchable, and information can be extracted simply by referring to its attribute names.

{{< hint info>}}

Parsing becomes more demanding when encountering *lists* rather than single values (this occurs in so-called *nested* JSON trees). Carefully think about *how* to extract and store the information. For example, you could concatenate multiple values, using commas as separators. In some situations, this could create a mess - especially when you're concatenating strings that contain the separation character you've used to tell them apart!). The rule of thumb here is that if information stored in arrays is individually important (i.e., each value of it), it's much safer to store it *normalized* (i.e., in its own table).

{{< /hint >}}

### Dealing with technical hurdles

The likelihood of encountering technical difficulties when scraping data is high. A hurdle which is easy to deal with has to do with the maximum retrieval limit from a site. To limit server load (and keep the site running well for users), web sites typically limit the amount of requests that you can do via scraping or APIs. As a consequence, you need to build in timers in your script, so that you don't run over your limits. Some websites even seem to make it their top priority to block scrapers from monitoring their sites (e.g., see [this interesting example from Amsterdam](https://dirkmjk.nl/en/86/scraping-airbnb)).

{{< hint info>}}
__Giving your scraper a break__

It's crucial to build in pauses when requesting data from websites to prevent being blocked - sometimes even permanently!
{{< /hint >}}

Other difficulties may arise from the way the website is built - e.g., "getting at some data" that's hidden in the website's source code. Other difficulties have been specifically built in to check that the site's data is *not* scraped, such as CAPTCHAs.

{{< hint info >}}
Check out this [interview with a PhD student in *Nature*](https://www.nature.com/articles/d41586-018-04190-5) on how a team of researchers has dealt with CAPTCHAs encountered when scraping data from [Google Scholar](https://scholar.google.com).

{{< /hint>}}

{{< hint info >}}
__Interacting with a website__

As sites require interaction (e.g., clicking, scrolling, filling in forms), we recommend you use a library that allows you to *see* the browser while the scraper is running. That way, you can check how content is dynamically loading. `Selenium` is our preferred library in Python for this. It launches an actual instance of Chrome (called Chrome driver). You can then either use the selenium library to extract information, or use `BeautifulSoup`, a package you may already be familiar with.

{{< /hint >}}



### Preprocessing on-the-fly

#### Cleaning

Some data that you extract from websites isn't "clean". For example, it may still contain HTML tag words, and you can decide to remove those before you store your data. Also, reassure yourself that your storage format is universal. For example, in The Netherlands, the meaning of commas and dots in numbers is reversed: 10,000 means ten, and 10.000 means ten thousand. When storing data for (potentially international) use, it's wise adhering to the English notation, which will also ease importing the data to your statistical software packages.

{{< hint info >}}

__Why should I clean my data on-the-fly?__

The type of cleaning we advise you to do at this stage concerns "practical cleaning decisions" that guarantee your data is interpreted the way it *should*. We do not suggest to *fully* clean your data at this stage (e.g., such as aggregating the data or removing certain observations which may limit the use of your data for modified or new research questions).


In practice, cleaning on-the-fly is achieved by stripping out unnecessary characters ("$", ",", non-printing characters), extracting substrings, or simply by (programmatic) search-and-replace. If you're a bit more advanced already, regular expressions provide a powerful interface for extracting the type of information you need.

{{< /hint  >}}

#### Enrichment

Suppose you are building a panel data set on prices at an e-commerce website. In particular, you're extracting prices and product IDs for smartphones. That data alone is insufficient for your analyze - you're missing the single one component that *makes* it a panel data set in the first place: timestamps!

When scraping data, you need to consider about adding variables already during the scraping process to enrich the data, or provide context to it. Next to timestamps (either of when the data was observed, or when your scraper was initiated; choose UTC time, or adhere to the American encoding YYYY/MM/DD hh:mm:ss), storing the IP address of your scraper or derivates like locational details may be advisable under certain circumstances for certain research purposes.

## Storage and deployment

### Storage format, location, and technology

When storing data, you need to choose how exactly to store it *during* the collection, *after the collection* (e.g., for using the data), and *for long-term use in a data archive* (e.g., so that others can use the data).

Storage format refers to the structure of the data. For example, image data is best kept in its original file format (unless you want to compress it), while numeric or textual information is best stored in tabular format with a primary key that you can later use to merge other data to. Typically, each entity that you capture gets its own "table" of data. Of course, there are exceptions to this rule, such as when the information of your focal entity, in fact, contains data on multiple entities (e.g., the (one or many) artist names associated with song releases). Another way to think about this is to evaluate whether normalization of your resulting data seems warranted.

Location consists of two main "types" of locations: first, the geography of data storage (e.g., within the EU), and whether you're storing the data locally (e.g., on your office PC), or remotely (e.g., in the cloud).

Finally, choose how to organize your data. The choice is between a file-based system, versus a database. For example, if you're extracting image data, you may decide to store them as files. Also tabular CSV files belong to this category. Alternatively, you can store data in databases, which are collections of tables with clearly defined relationships to one another. Databases are more durable than file systems, and they allow you to easily separate extraction (e.g., on remote computers on AWS), from storage (e.g., in a safely secured database on campus).


{{< hint info >}}
__Store data immediately as it comes in__

The basic rule of thumb here is that you store data immediately after its retrieval. Never ever write data to a variable in, let's say Python, and wait for your whole scraping script to have finished before writing it to a file. The likelihood of loosing data would be just too high!

{{< /hint >}}

{{< hint info >}}
__Should you store the *raw data*, or preprocessed data during collection?__

We have encountered two predominant "scraping philosophies" among researchers. The first group scrapes from websites, and directly saves the required and parsed data in files or to databases. Such a data collection is optimized for simplicity, speed and storage usage.

The second group *separates data collection from data storage*. In particular, a researcher would obtain a website's source code or JSON objects, and store it as is. Then, in a post-processing step, the desired information is extracted from these stored raw data files. The upside of such a process is that you can also extract data that you haven't even planned on getting (e.g., sometimes unexpected data pops up, which proves to be very valuable!). Also, one can easily debug the data extraction and parsing scripts should website updates render your initial parsing code faulty, or should you discover that *actually* an API returns unexpected data. The downside of following this process is that storing *all data* - even if only temporarily - may breach privacy laws or exceed your disk space.

If you decide to separate data collection from storage, think *where* to store the raw data. For websites, we make use of S3 remote storage on AWS. For JSON objects from APIs, unstructured data bases are perfect (e.g., MongoDB Atlas databases).

{{< /hint >}}

### Software toolkit

Pick the software tool to run your data collection. The basic choice is between ready-made scraping toolkits (e.g., point-and-click interfaces), packages that require some coding (e.g., scraply in Python), or self-developed code that interface with some high-level scraping libraries (e.g., selenium, BeautifulSoup).

With increasing complexity of your data collection, self-developed code is recommendable. While developing a scraper can adhere significant investments of time and effort, you can be reassured about the data quality and fit with your research purpose.

APIs frequently provide some higher-level libraries, and we recommend you to check them out before writing your data collection code from scratch.

{{< hint info >}}
__Visible versus headless scraping__

You may be familiar with the concept of "what you see is what you get". For example, compare Microsoft Word to a coding editor: when typing text in Word, you can be (almost) sure it renders the exact same way on paper or as a PDF (hence: "what you see [on the screen] is what you get [on paper or in a PDF]"). When typing text in a coding editor, instead, the visual rendering depends on the software program you use for printing or converting it to PDF.

A similar concept holds when scraping websites. You can either use a *visible browser instance* (so that "what you see is what you scrape"), or an *invisible, so-called "headless" browser instance* (in which you do not see what you scrape).

Looking "over the shoulder" of your (visible) browser is great for prototyping your code or developing new features. We recommend this mode for visually complex websites that require user interaction (such as accepting cookies); also, we generally recommend beginners to use visible browser instances, as it eases the understanding of how data extraction code affects the type of information displayed. Our recommendation is the `selenium` package in Python, which essentially remote-controls Chrome (`chromium`). We recommend headless browsers, in turn, for simple websites, any type of API, or data collections that need to be optimized in speed.

{{< /hint >}}

### Deployment infrastructure

Choose from where to run your data collection. As with choosing your storage location, you need to choose for local deployment (e.g., on your local office computer or laptop), or remote deployment (which in turn can be remotely but on-campus, or somewhere in the cloud). Your own computer may be preceived "as free" (after all, you already own it), but local equipment performs very poorly over time. For example, you may have to restart your laptop once in a while, or its Wifi connection may drop when you hop on a train. Even local office computers have reportedly been cut off from power for several days... Especially for long data collections, therefore, a remote computer, such as a computer in the cloud, may be much safer.

### Monitoring

Finally, decide how to monitor your data collection for any unforeseen errors. For one-shot data collections, it may be advisable to generate log files that record the website URL or API call, along with a timestamp and the server's status code (e.g., 200 for ok, 404 for not found, etc.). That way, you may be able to detect errors after your collection. For example, timeouts or exceeding your API retrieval limit may cause dozens of consecutive requests to fail (i.e., return error codes or no data). If the site starts with serving data, but stops eventually, it may be a sign of being blocked from it.

For real-time data collectinos that run over extended periods, it's extremely important to implement a monitoring system to check whether (a) the data collection is still running, and (b) whether the data it is extracting is valid. Note that a local computer whose power has been cut for a short while will unlikely be able to serve as a "monitoring tool" (after all, also *that* code snippet has been stopped). In other words, we advise you to set up a monitor using a second computer.

{{< hint info >}}
__How I lost data when I went on vacation (without monitoring)__

A few years ago, I scraped data from a social network for listening to music, think of this like an early version of Spotify. My scraper ran on my office computer, and extracted data from the profile pages of about 5,000 users of the site, every 15 minutes, for about 1.5 years. I once went on a short holiday while the scraper was running, and when I returned to my office, my computer was off. Turns out there was a power cut in the building over the weekend. I switched my computer back on, checked the files on the disk, and shockingly noticed that the power cut happened early Saturday morning. I returned back to office after a long weekend on a Wednesday - so I lost four days of valuable data - data that I can't recover because the site doesn't list users' historical profile pages.

{{< /hint >}}

{{< hint info >}}
__Monitoring data collections via push messages to your smartphone__

In a recent implementation, our real-time scraper is deployed in the cloud, and stores the collected raw data - HTML files of each page that we have captured - on a remote server. Our monitoring script runs on our local office computer, and checks daily for the *most recent time stamp* of *any file larger than 300 KB*. If time stamps are too old (i.e., older than a day), or too small (i.e., the website returned an error rather than the actual website), we know something went wrong. Finally, the script sends a push message to our smartphone, and plays back a sound (either a (positive-sounding) wizard sound, or a noisy alarm tone) at 8.30am every day. Over time, you get used to receiving that push message daily, and are "at ease" that everything is running as planned.

{{< /hint >}}

{{< button relref="/researchfit.md" >}}Previous{{< /button >}}
{{< button relref="/legalfit.md" >}}Next{{< /button >}}
