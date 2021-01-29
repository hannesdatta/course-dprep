## Assignment Structure


### Requirements
* Create a makefile from scratch
* Should work out-of-the-box (no need to install external packages)
* Specify a list of requirements but leave it open on how to incorporate them
  - You're hired as a consultant to ... (high level requirements; clients may not be technically proficient)
  - Provide a suggested workflow to students (e.g., see [this](https://stat545.com/automating-pipeline.html) page)
* Real-world dataset (no dummy data!)
* R-based
  - Revisit knowledge from earlier tutorials (data exploration & data cleaning)
    - Load raw data
    - Transformations
      - Merge files
      - Clean data
      - Word count
      - Aggregate by week or category
      - Change structure (e.g., pivot table)
    - Create plots from preprocessed data
    - Create summary statistics (e.g., regression output)
* No LaTeX output but a table they can easily copy into Word/Pages/Google Docs, or a HTML output generated from R Markdown ([example](https://github.com/STAT545-UBC/STAT545-UBC-original-website/blob/master/automation10_holding-area/03_automation-example_render-without-rstudio/Makefile))
* Demonstrate usefulness of make
  - Build machine learning / linear regression model on training data -> let them test workflow by swapping training data with test data set


### Research Question
  - Explore the pricing dynamics on the Airbnb market since the start of the pandemic (how did hosts respond to plummeting demand as a result of travel restrictions?)
    - Availability of rooms / number of bookings
      - How about hosts that rent multiple rooms in a single appartment? And how about hosts that live in the same appartment (priortise their own health)?
    - Within and between neighborhoods dynamics

### Make Workflow
1. Download dataset from source (workflow should still run once new data is added on `insideairbnb.com`)
2. Merge datasets (each dataset only covers a month) + combine with COVID-19 measures dataset (see Platform power paper)
3. Select listings which satisfy data requirements (e.g., available from January 1st to December 31st)
4. Transform into panel data structure
5. Run regression model + timeseries plot
6. Export results as HTML (from RMarkdown)




### Data

* [Airbnb Boston dataset](https://www.kaggle.com/airbnb/boston)
  - **Listings**
    - Basically all the info you also find on the page on Airbnb. The datasets from Inside Airbnb, however, contain fewer columns (only the most important features).
  - **Reviews**
    - Except for some NLP stuff cannot really think how this would make for an intersting dataset
  - **Calendar**
    - Includes the price and availability of a listing on a given date
  - Possibly, replace with Airbnb data from [Amsterdam, The Netherlands](http://insideairbnb.com/get-the-data.html)
      - Archived data available for:
        - 12 December 2020
        - 3 November 2020
        - 9 October 2020
        - 9 September 2020
        - 18 August 2020
        - 9 July 2020
        - 8 June 2020
        - 8 May 2020
        - 16 April 2020
        - 13 March 2020
        - 14 February 2020
        - 5 January 2020


* Inspiration
  - [Interactive Data Visualization](http://insideairbnb.com/amsterdam/) (Amsterdam)
  - [Term paper](https://drive.google.com/file/d/1t3CMr_nChFJUlXUxK8WwaD9H-kqTOnEP/view?usp=sharing) named *Price Determinants of Airbnb listings* I wrote over two years ago for an Empirical Research class
    - Used a different data set of Airbnb listings in 6 cities in the US


-----

## Helpful tutorials


### [Automating data-analysis pipelines](https://stat545.com/automating-pipeline.html)
* Download the data (from R in makefile)
```
words.txt:
    Rscript -e 'download.file("https://svnweb.freebsd.org/base/head/share/dict/web2?view=co", destfile = "words.txt", quiet = TRUE)'
```

* only `all` and `clean` (phony targets) can be accessed through RStudio


### [Learn Make by Examples](https://the-turing-way.netlify.app/reproducible-research/make/make-examples.html?highlight=make)
* Makefiles can look complex
* Create a MakeFile for a data analysis pipeline:
  - Given some datasets, create a summary report (pdf) that contains the histograms of these datasets.

Voorbeeld:
* We genereren 2 figuren in Python vanuit 2 Excel bestanden -> vervolgens


input_file_1.csv
* 2240 getallen (1 kolom - zonder tabel header)

input_file_2.csv
* 6064 getallen (1 kolom - zonder table header)

`-i` = import flag (bijv. `generate_histogram.py -i`)
`o` = output flag (bijv. `data/input_file_2.csv -o`)

* Make executes the first target when no explicit target is given

* Calling the main target `all` is a convention of Makefiles that many people follow.

* Hele clean gebeuren is meer om het je zelf makkelijk te maken als je de hele repository weer even vanaf 0 wilt opbouwen

* phony target als het zelf geen output aanmaakt


* `$<` = first prerequisite (= array that points to the beginning)
* `$@` = target (the target you're aiming at)


*Pattern rules*
Werkt zowel voor figuur 1, 2, 3 etc.
```
output/figure_%.png: data/input_file_%.csv scripts/generate_histogram.py
	python scripts/generate_histogram.py -i $< -o $@

```

*Wildcard function*
A code convention for Makefiles is to use all capitals for variable names and define them at the top of the file.
* Gebruikt `$` voor variablen en functies


`ALL_CSV = $(wildcard data/*.csv)`



---



## Basics
Makefiles are used to help decide which parts of a large program need to be recompiled.
A Makefile consists of a set of rules. A rule generally looks like this:
```
targets: prerequisites
   command
   command
   command
```

* The targets are file names, seperated by spaces. Typically, there is only one per rule.
* The prerequisites are also file names, seperated by spaces. These files need to exist before the commands for the target are run. These are also called dependencies.
* The commands are a series of steps typically used to make the target(s). These need to start with a tab character, not spaces.

## Variables
Variables can only be strings. Here's an example of using them:
```
files = file1 file2
some_file: $(files)
    echo "Look at this variable: " $(files)
    touch some_file

file1:
    touch file1
file2:
    touch file2

clean:
    rm -f file1 file2 some_file
```

## Multiple targets
```
all: one two three

one:
    touch one
two:
    touch two
three:
    touch three

clean:
    rm -f one two three
```
