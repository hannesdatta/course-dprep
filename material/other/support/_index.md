---
title: "Support"
bookCollapseSection: true
weight: 20
description: " "
---


# Support

Are you experiencing technical difficulties, e.g., when working through the tutorials?

## Chatbot

In collaboration with tilburg.ai, we offer a Chatbot trained on course materials. Powered by the latest OpenAI Chat Completion API, it provides an interface similar to ChatGPT. Use it to get quick feedback or ask course-related questions. [Start your chat now!](https://dprep.tilburgai.nl)

Please note that the Chatbot is in a pilot phase and may make mistakes. Conversations may be monitored anonymously by tilburg.ai and the course coordinator to improve the tool and potentially roll it out to other courses at Tilburg University.

## WhatsApp

For quick questions, please use *WhatsApp* to get in touch with us (+31 13 466 8938).

- Be as specific as possible (e.g., include screenshots, your Jupyter Notebooks or other source code, errors) so that we can help you better.
- Informal language is perfectly fine.
- Be prepared that we call you back if that makes solving a question easier.

<!--- We may ask you for permission to share the conversation with other students on the course's FAQ page. Names/etc. are of course taken out! If you don't wish your issue to be shared with others, simply say so!
-->

[Text us on WhatsApp now!](https://wa.me/31134668938)


## E-Mail
You can also send us an email to get in touch with us, but note that response times may be slower than through WhatsApp.

- h.datta@tilburguniversity.edu
- r.sudhaharan@tilburguniversity.edu



{{< hint warning >}}
__Running out of memory?__  
Older machines may face difficulties storing large datasets into memory. Fortunately, you can make use of cloud environments like Kaggle to “outsource” the processing tasks for you. On Kaggle, you can create a so-called notebook that has similar functionalities as the popular Jupyter Notebooks (that you may have seen before in [oDCM](https://odcm.hannesdatta.com))) with the important difference that the execution of the script occurs in the cloud rather than on your local machine. Therefore, computer hardware never has to be a limiting factor anymore.

Sign up for a [Kaggle account](https://www.kaggle.com/account/login), visit the "Code" tab, and click on "New Notebook". By default, it opens a Python notebook but in the right sidebar you can change the settings to R (only R scripts are supported; no markdown files). Note that you first need to upload your datasets to Kaggle before you can use them (click "Add data" button in the top right). Take note of the file path of your datasets: `../input/{DATASET-TITLE}/{DATASET-NAME}.csv` which may be somewhat different than you're used to in RStudio.

{{< /hint >}}

{{< hint warning >}}
__Git complains about "support for password authentication"__  

If you're trying to run `git push` or `git clone`, it may happen you receive an error message that *"Support for password authentication was removed on August 13, 2021"*. In short, Git doesn't accept passwords anymore, but instead of using a password, you can generate and use a so-called "token".

Here is how to do that:

1. Go to https://github.com/settings/tokens and click "Generate new token"
2. Set an expiration date for your token (long enough for this course, at least)
3. Under "select scopes", check the "repo", "gist", and "project" boxes.
4. At the bottom of the page, click "Generate token"
5. Copy your token.
6. After trying to push your change using git (e.g., `git push -u origin master`), enter your GitHub username when prompted, and __paste the copied token when asked for your password.__

{{< /hint >}}

