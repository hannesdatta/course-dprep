---
title: ITO
draft: true
---

# Why do you need to prepare data for analysis?

Why is it necessary to transform raw data - i.e., data that hasn't been changed in any way after it has been collected, to a cleaned data set (which, as the name suggests, has been transformed, cleaned, and prepared in a particular way).

Well, the question isn't that hard to answer if you think about how raw data - unchanged data, stored as-is - looks.

1) Raw data can be super messy. For example, when you use data scraped from the internet to count the number of words in customer reviews, you may realize your counter is off because you misinterpreted HTML tags as words. So, you have to clean out the irrelevant text before counting words!
2) Raw data can also be stored at various places (e.g., databases, network drives, or somewhere in the cloud) or multiple files - sometimes hundreds of them. To use them, you have to gather them from these places and stitch them together.
3) Raw data can also be quite unstructured. Think of incorporating image data, such as collected from Instagram, in your study. You'd first have to run some kind of preprocessing algorithm to translate what is on the picture into data that you can work with, such as lists of objects detected on an image.
4) Finally, the raw data may just not be in the format suitable for analysis. For example, a linear regression expects each observation to be in a row and corresponding variables to be stored in columns.

So, as empirical research projects increasingly rely on data collected from various sources and stored in various formats, it is of crucial importance to carefully plan how to take your raw data (that's your input), transform it in a certain way, and store it as a resulting "final data set" that you can then use in your analysis.

I call this the "process of input - transformation - and output." It's probably *the* most essential building block of your empirical research project. And as projects become more complex - and trust me, they will -, you'll eventually start breaking down your project into multiple of these input-transformation-output blocks. The combination of these building blocks then make up the pipeline of your research project.

<!--
Let me give an example:

A first "ITO block" may load all data sets from a directory, and convert them from the SAS file format to the CSV file format.

A second "ITO block" may read in each individual file, stitch them together, and then write a few selected columns to a new temporary file.

A third "ITO block" may read in this smaller, reduced data set and generate some features: such as counts, means or sums by a particular grouping variable.

As you see, such ITO blocks each consist of an input - reading in some stuff, transformation - doing some stuff, and output - writing some stuff to the disk.
-->


<!--

# Input-Transformation-Output

One of the most essential concepts in dataset engineering is to think of your data preparation as a pipeline: you take some inputs (for example datasets stored on a network drive or in the cloud), you transform them (for example, you summarize the information in a certain way), and then you save the final output for analysis (for example, you store the resulting dataset on your local computer).

Here, I'll zoom in more on each of the different steps.

First, realize that both your inputs and outputs can have different characteristics.


Let me

Let's consider the data preparation in a recent paper of mine.


Input, transformation, and output.

Each

Comments Samuel:

- think about which data structure you need, and work towards that goal
- break it down
-->
