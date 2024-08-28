---
weight: 10
title: "Data"
bookCollapseSection: true
description: "Kickstart your team project with these data sets."
draft: false
---

<!-- @Roy: work on this in a "hidden" state; it should be the instructions that we make available eventually to students-->

# Data

Please pick one of these data sets as your primary source data for the team project.

## Dataset 1: Yelp Reviews

### About

[Yelp](https://www.yelp.com) is a widely-used platform for discovering local businesses, including restaurants, shops, services, and more. It hosts a vast collection of user-generated reviews, photos, and detailed business information. The Yelp dataset is a curated subset of this data, designed to support academic research and educational purposes. 

The Yelp dataset can be used to answer various research questions and practical applications, such as:

- What factors influence the ratings and reviews that businesses receive?
- Can we predict business success based on review sentiment?
- What are the key characteristics of businesses in different metropolitan areas?
- How do visual elements in user-uploaded photos relate to review sentiment or business ratings?
- What are the trends in customer feedback across different industries and regions?
- How can mobile apps leverage user-generated content to enhance local business discovery?
- What are the characteristics of businesses that receive a high volume of tips?
- What role do tips play in influencing other users' perceptions and decisions?
- What role do review photos play in influencing user decisions and conversion rates?

### Download the data

Multiple datasets are available for download.

- Visit the [Yelp Dataset documentation page](https://www.yelp.com/dataset/documentation/main) to download the data in JSON format.
- To convert the JSON files to CSV format, follow these steps:
1. Obtain the conversion script by downloading or copying the code from this [Gist](https://gist.github.com/srosh2000/b6f10b8ec9c7b318acb706a9189d0f68).
2. Save the script as `json_to_csv_converter.py` in your working directory. 
3. Run the script from your terminal with the following command:

```bash
python json_to_csv_converter.py yelp_academic_dataset.json
```

Replace `yelp_academic_dataset.json` with the path to the JSON file you wish to convert.

The script will generate a CSV file with the same name as your input JSON file, located in the same directory. For example, the input `yelp_academic_dataset.json` will produce `yelp_academic_dataset.csv`.

<!--

## Dataset 1: Twitch Live Streaming

### About

[Twitch](https://www.twitch.tv) is a leading platform for live streaming, primarily focused on gaming, but also including streams of music, creative content, and "in real life" (IRL) broadcasts. This dataset captures user engagement within Twitch's streaming ecosystem over a 43-day period. By collecting data on all active streamers and the users participating in their chat rooms every 10 minutes, it provides a rich source for understanding community interactions, content consumption patterns, and the overall structure of live streaming networks.

The Twitch dataset can be used to explore various research questions, such as:

- How does viewer engagement fluctuate throughout the day or week across different streamers and genres?
- What is the relationship between streamer popularity and chat activity?
- Can we identify patterns of user migration between streamers over time?
- How do external events or trends influence live streaming activity on Twitch?
- Are there distinct user behaviors or engagement patterns associated with different types of content (e.g., gaming vs. non-gaming streams)?
- What are the characteristics of highly engaged communities within the Twitch ecosystem?

### Download the data

To access this dataset and start your analysis:

- Visit [the Twitch dataset page](https://cseweb.ucsd.edu/~jmcauley/datasets.html#twitch) to download the data. Start with the smaller data set!

-->

## Dataset 2: IMDb

### About

[IMDb (Internet Movie Database)](https://imdb.com) is a go-to online platform for information about movies, TV shows, actors, directors, and more. It offers details like titles, release dates, cast info, ratings, and reviews, making it a popular resource for entertainment enthusiasts and professionals.
Subsets of IMDb data can be accessed for personal/non-commercial purposes.

The IMDb data can allow you to answer a variety of research questions, such as:

- How have trends in genre popularity evolved over time in the entertainment industry?
- Is there a connection between the format of a title (movie, TV series, etc.) and its audience reception?
- Does the involvement of specific creators (directors, writers) impact the success of their projects?
- Which types of titles generate the most online-word-of-mouth (as indicated by user-generated content like reviews and ratings)?
- What factors most strongly influence the average rating of a movie or a TV show?
- Are there differences in audience engagement between content targeted at adults and non-adults?
- How does popularity of crew member(s) influence a title's viewer engagement (e.g. votes, ratings)?

### Download the data

Multiple datasets are available for download.

- Visit [the data section at IMDb now](https://developer.imdb.com/non-commercial-datasets/)

<!--
You can [view](XXX) the report over here and dowload the project directory (including all R files) from [here](XXX). In the report, 3 sections can be distinguished: X, Y, and Z of which we'll mention the contents below. -->


<!-- workflow tutorial image and output files have not been added to the master branch because of file size -->

<!-- You can [view](XXX) the report over here and dowload the project directory (including all R files) from [here](XXX). In the report, 3 sections can be distinguished: Input, Transformation, and Output of which we'll mention the contents below.
 -->


<!--
## Dataset 2: AirBnB

### About

[Inside Airbnb](http://insideairbnb.com/amsterdam/) is an independent, open-source data tool developed by community activist Murray Cox who aims to shed light on how Airbnb is being used and affecting neighborhoods in large cities. The tool provides a visual overview of the amount, availability, and spread of rooms across a city, as well as an approximation of the number of bookings and occupancy rate.

This data set allows for a variety of research questions, such as:
- How does the presence of specific neighborhood amenities impact the pricing of Airbnb listings in different cities?
- Do properties with a higher number of positive reviews command a price premium, and does this relationship differ across neighborhoods?
- Can the availability of Airbnb listings be predicted based on historical booking patterns, seasonal trends, and local events?
- What are the key factors influencing the popularity of certain neighborhoods for Airbnb stays, as indicated by booking frequency and review sentiment?
- To what extent do superhosts outperform regular hosts in terms of occupancy rates and pricing adjustments, and is this consistent across different city markets?
- How do different types of property amenities (e.g., pool, gym, balcony) impact occupancy rates and nightly prices across diverse neighborhoods?
- Does the presence of local events, such as concerts or festivals, influence the pricing strategy of Airbnb hosts in proximity to those events?
- Can machine learning models accurately predict the popularity of newly listed Airbnb properties based on their features and neighborhood characteristics?

### Download the data

The data is available per city (e.g., Amsterdam) and entity (e.g., listings, calendar, reviews, neighbourhoods, etc.).

- Visit [the data section at InsideAirbnb now](http://insideairbnb.com/get-the-data.html)

{{< hint info >}}
__Pick the city that you find interesting!__

Inside AirBnB offers datasets for various cities around the world. Feel free to explore the city/cities that spark your interest!
{{< /hint >}}
-->