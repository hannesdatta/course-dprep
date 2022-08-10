---
weight: 90
title: Deployment & Reporting
description: Build your own interactive Shiny app!
bookCollapseSection: true
draft: false
---

# Deployment & Reporting

*Here we provide an illustrative example of how to mix and match building blocks to develop a Shiny app from scratch. More specifically, we create the [following](https://royklaassebos.shinyapps.io/dPrep_Demo_Google_Mobility/) Shiny app which allows us to interactively explore Google’s [COVID-19 Community Mobility Reports](https://www.google.com/covid19/mobility/) of the Netherlands through an intuitive visual interface. Being able to create Shiny apps is a great skill to have because it enables you to communicate your insights to non-technical stakeholders and give them the tools to conduct their own analysis!*

![demo-app](./images/demo_app.png)

---

## 1. Code Structure

The Shiny library helps you turn your analyses into interactive web applications without requiring HTML, CSS, or Javascript knowledge, and provides a powerful web framework for building web applications using R. The skeleton of any Shiny app consists of a user interface (UI) and a server. The UI is where the visual elements are placed such as a scatter plot or dropdown menu. The server is where the logic of the app is implemented, for example, what happens once you click on the download button. And this exactly where Shiny shines: combining inputs with outputs. In the next two sections, we're going to define the inside contents of the `ui` and `server` parts of our app.


 ```R
  library(shiny)
  ui <- fluidPage()
  server <- function(input, output){}
  shinyApp(ui = ui, server = server)
 ```



 ---

 ## 2. User Interface

 In our app, we have a left `sidebarPanel()` with a header, category, province, date range selector, and download button. Shiny apps support a variety of [control widgets](https://shiny.rstudio.com/tutorial/written-tutorial/lesson3/) such as dropdown menus, radio buttons, text fields, number selectors, and sliders. Each of these controls has an `inputId` which is an identifier that the `server` part of our app recognizes. The `label` is the text you see above each control. Depending on the widget, you may need to specify additional parameters such as `choices` (list of selections in dropdown), `selected` (the default choice), `multiple` (whether only one or more selections are allowed), or the `start` and `end` values of the date picker.

 On the right, there is a `mainPanel()` that shows the plot, figure description, and table. The `plotlyOutput` turns a static plot into an interactive one in which you can select data points, zoom in and out, view tooltips, and download a chart image. Similarly, the `DT::dataTableOutput()` makes the data table interactive so that you can sort by column, search for values, and show a selection of the data.


 ```R
 ui <- fluidPage(
    sidebarLayout(
        sidebarPanel(
          h2("COVID-19 Mobility Data"),
          selectInput(inputId = "dv", label = "Category",
                      choices = c("Retail_Recreation", "Grocery_Pharmarcy", "Parks", "Transit_Stations", "Workplaces", "Residential"),
                      selected = "Grocery_Pharmarcy"),
          selectInput(inputId = "provinces", "Province(s)",
                      choices = levels(mobility$Province),
                      multiple = TRUE,
                      selected = c("Utrecht", "Friesland", "Zeeland")),
          dateRangeInput(inputId = "date", label = "Date range",
                         start = min(mobility$Date),
                         end   = max(mobility$Date)),
          downloadButton(outputId = "download_data", label = "Download"),
          ),
        mainPanel(
          plotlyOutput(outputId = "plot"),
          em("Postive and negative percentages indicate an increase and decrease from the baseline period (median value between January 3 and February 6, 2020) respectively."),
          DT::dataTableOutput(outputId = "table")
        )
    )
)
```

---

## 3. Server

The `server` function requires the `input` and `output` parameters where `input` refers to the `inputIds` of the `ui`, for example, `input$provinces` denotes the current selection of provinces. In the same way, `input$date[1]` and `input$date[2]` represent the selected start and end date in the date picker.

First, we create a `reactive` variable `filtered_data`. Any time the user manipulates the province selection or date picker, this variable is re-evaluated. To access the data, you can call the variable name followed by parentheses: `filtered_data()`.

Second, we build up the plot with the [`ggplot`](https://rstudio.com/wp-content/uploads/2015/03/ggplot2-cheatsheet.pdf) library by defining the dataset, horizontal and vertical axes, and color categories. Next, we add a scatter plot with reduced transparency, remove the default legend, and change the vertical axis label. Note that `output$plot` refers the `outputId` of the `plotlyOutput()` function.

Third, we make sure that the current selection of data is shown in a table and that the download button  becomes functionable by writing `filtered_data()` to a csv-file.

```R
server <- function(input, output) {
    filtered_data <- reactive({
        subset(mobility,
               Province %in% input$provinces &
               Date >= input$date[1] & Date <= input$date[2])})

    output$plot <- renderPlotly({
        ggplotly({
                p <- ggplot(filtered_data(), aes_string(x = "Date", y = input$dv, color = "Province")) +
                geom_point(alpha = 0.5) + theme(legend.position = "none") + ylab("% change from baseline")
            p
        })
    })

    output$table <- DT::renderDataTable({
        filtered_data()
    })

    output$download_data <- downloadHandler(
        filename = "download_data.csv",
        content = function(file) {
            data <- filtered_data()
            write.csv(data, file, row.names = FALSE)
        }
    )

}

```


---

## 4. Source Code
As the last step, we put everything together in a single [code snippet](app.R) that you can re-use for your own projects (just 65 lines of code!). A couple of additional changes we have made include: importing the required packages and the [mobility dataset](./mobility_data.zip), converting the data type of the date end province columns, and adding some white space here and there.

To publish your app online, you can simply hit the "Publish" button in the R preview window and follow the steps in the wizard.

```R
library(shiny)
library(plotly)
library(DT)

mobility <- read.csv("mobility_data.csv", sep = ';')
mobility$Date <- as.Date(mobility$Date)
mobility$Province <- as.factor(mobility$Province)


ui <- fluidPage(
    sidebarLayout(
        sidebarPanel(
            h2("COVID-19 Mobility Data"),
            selectInput(inputId = "dv", label = "Category",
                        choices = c("Retail_Recreation", "Grocery_Pharmarcy", "Parks", "Transit_Stations", "Workplaces", "Residential"),
                        selected = "Grocery_Pharmarcy"),
        selectInput(inputId = "provinces", "Province(s)",
                        choices = levels(mobility$Province),
                        multiple = TRUE,
                        selected = c("Utrecht", "Friesland", "Zeeland")),
            dateRangeInput(inputId = "date", "Date range",
                           start = min(mobility$Date),
                           end   = max(mobility$Date)),
            downloadButton(outputId = "download_data", label = "Download"),
        ),
        mainPanel(
            plotlyOutput(outputId = "plot"), br(),
            em("Postive and negative percentages indicate an increase and decrease from the baseline period (median value between January 3 and February 6, 2020) respectively."),
            br(), br(), br(),
            DT::dataTableOutput(outputId = "table")
        )
    )
)

server <- function(input, output) {
    filtered_data <- reactive({
        subset(mobility,
               Province %in% input$provinces &
               Date >= input$date[1] & Date <= input$date[2])})

    output$plot <- renderPlotly({
        ggplotly({
                p <- ggplot(filtered_data(), aes_string(x="Date", y=input$dv, color="Province")) +
                geom_point(alpha=0.5) + theme(legend.position = "none") +
                    ylab("% change from baseline")

            p
        })
    })

    output$table <- DT::renderDataTable({
        filtered_data()
    })

    output$download_data <- downloadHandler(
        filename = "download_data.csv",
        content = function(file) {
            data <- filtered_data()
            write.csv(data, file, row.names = FALSE)
        }
    )

}

shinyApp(ui = ui, server = server)
```


<!--


https://royklaassebos.shinyapps.io/dPrep_Demo_Google_Mobility/



https://bookdown.org/paulcbauer/idv2/8-3-example-for-starters.html




# [DataCamp](https://campus.datacamp.com/courses/case-studies-building-web-applications-with-shiny-in-r/shiny-review?ex=2)
 The UI is where the visual elements are placed—it controls the layout and appearance of your app. The server is where the logic of the app is implemented—for example, where calculations are performed and plots are generated.

 In reactive programming, an expression gets re-evaluated whenever any of its dependencies are modified. In Shiny, all inputs are reactive variables. This means that any time the user manipulates an input control to change its value, any code block that depends on that variable (such as a render function) reacts to the input variable's new value by re-evaluating.

 Reactive values are special constructs in Shiny; they are not seen anywhere else in R programming. As such, they cannot be used in just any R code, reactive values can only be accessed within a reactive context.

 This is the reason why any variable that depends on a reactive value must be created using the reactive() function, otherwise you will get an error. The shiny server itself is not a reactive context, but the reactive() function, the observe() function, and all render*() functions are.

 The real benefit of using Shiny comes when inputs are combined with outputs. The table created in the last exercise is static—it cannot be changed—but for exploration, it would be better if the user could decide what subset of the data to see.

This can be achieved by adding an input that lets the user select a value to filter the data. This way, the table we created in the previous exercise can be made dynamic.


 Mogelijk de COVID dataset
 Wat er echt in moet komen:
 * Continents (meerdere selecteren)
 * Slider (voor de jaren)
 * Plotly plots
   - Eerst als ggplot en vervolgens omszetten naar plotly
 * sidebarPanel
   - Gebruikelijker dan de panel structuur
 * Best line fit
 * Reactive variables
 * Download data button
 * Verwijzing naar aanvullende input opties
   - `textInput` (bijv. titel interactief maken)
   - `numericInput` (bijv. aantal datapunten wat je wilt laten zien)
   - `colourInput` (bijv. kleur plots wijzigen)


* COVID-datset van week 1
  - Selecteren van een provincie (nadeel: niet ingebouwd; maar wel bij iedereen bekend)
  - Selecteren van datum range
  - Selecteren van een of meerdere provincies (als losse datapunten) + all optie
  - Dropdown voor de DV (of mogelijk toch meerdere zodat je ze makkelijk kunt vergelijken)
  - Trendlijn alleen doen als het zin heeft



Customized Shiny app
* Filter by region
* Add trend line
* Plotly functionality
* All button

 ```
 # Load the plotly package
 library(plotly)

 ui <- fluidPage(
   sidebarLayout(
     sidebarPanel(
       textInput("title", "Title", "GDP vs life exp"),
       numericInput("size", "Point size", 1, 1),
       checkboxInput("fit", "Add line of best fit", FALSE),
       colourInput("color", "Point color", value = "blue"),
       selectInput("continents", "Continents",
                   choices = levels(gapminder$continent),
                   multiple = TRUE,
                   selected = "Europe"),
       sliderInput("years", "Years",
                   min(gapminder$year), max(gapminder$year),
                   value = c(1977, 2002))
     ),
     mainPanel(
       # Replace the `plotOutput()` with the plotly version
       plotlyOutput("plot")
     )
   )
 )

 # Define the server logic
 server <- function(input, output) {
   # Replace the `renderPlot()` with the plotly version
   output$plot <- renderPlotly({
     # Convert the existing ggplot2 to a plotly plot
     ggplotly({
       data <- subset(gapminder,
                      continent %in% input$continents &
                        year >= input$years[1] & year <= input$years[2])

       p <- ggplot(data, aes(gdpPercap, lifeExp)) +
         geom_point(size = input$size, col = input$color) +
         scale_x_log10() +
         ggtitle(input$title)

       if (input$fit) {
         p <- p + geom_smooth(method = "lm")
       }
       p
     })
   })
 }

 shinyApp(ui = ui, server = server)


 ```




 # table + download button
 ```
 ui <- fluidPage(
   h1("Gapminder"),
   sliderInput(inputId = "life", label = "Life expectancy",
               min = 0, max = 120,
               value = c(30, 50)),
   selectInput("continent", "Continent",
               choices = c("All", levels(gapminder$continent))),
   downloadButton(outputId = "download_data", label = "Download"),
   plotOutput("plot"),
   tableOutput("table")
 )

 server <- function(input, output) {
   # Create a reactive variable named "filtered_data"
   filtered_data <- reactive({
     # Filter the data (copied from previous exercise)
     data <- gapminder
     data <- subset(
       data,
       lifeExp >= input$life[1] & lifeExp <= input$life[2]
     )
     if (input$continent != "All") {
       data <- subset(
         data,
         continent == input$continent
       )
     }
     data
   })

   output$table <- renderTable({
     # Use the filtered_data variable to render the table output
     data <- filtered_data()
     data
   })

   output$download_data <- downloadHandler(
     filename = "gapminder_data.csv",
     content = function(file) {
       # Use the filtered_data variable to create the data for
       # the downloaded file
       data <- filtered_data()
       write.csv(data, file, row.names = FALSE)
     }
   )

   output$plot <- renderPlot({
     # Use the filtered_data variable to create the data for
     # the plot
     data <- filtered_data()
     ggplot(data, aes(gdpPercap, lifeExp)) +
       geom_point() +
       scale_x_log10()
   })
 }

 shinyApp(ui, server)

 ```


 # interactive table + beter table
 ```
 ui <- fluidPage(
    h1("Gapminder"),
    # Create a container for tab panels
    tabsetPanel(
        # Create an "Inputs" tab
        tabPanel(
            title = "Inputs",
            sliderInput(inputId = "life", label = "Life expectancy",
                        min = 0, max = 120,
                        value = c(30, 50)),
            selectInput("continent", "Continent",
                        choices = c("All", levels(gapminder$continent))),
            downloadButton("download_data")
        ),
        # Create a "Plot" tab
        tabPanel(
            title = "Plot",
            plotOutput("plot")
        ),
        # Create "Table" tab
        tabPanel(
            title = "Table",
            DT::dataTableOutput("table")
        )
    )
)

server <- function(input, output) {
  filtered_data <- reactive({
    data <- gapminder
    data <- subset(
      data,
      lifeExp >= input$life[1] & lifeExp <= input$life[2]
    )
    if (input$continent != "All") {
      data <- subset(
        data,
        continent == input$continent
      )
    }
    data
  })

  output$table <- DT::renderDataTable({
    data <- filtered_data()
    data
  })

  output$download_data <- downloadHandler(
    filename = "gapminder_data.csv",
    content = function(file) {
      data <- filtered_data()
      write.csv(data, file, row.names = FALSE)
    }
  )

  output$plot <- renderPlot({
    data <- filtered_data()
    ggplot(data, aes(gdpPercap, lifeExp)) +
      geom_point() +
      scale_x_log10()
  })
}

shinyApp(ui, server)

 ```



https://www.youtube.com/watch?v=IgHHXcSfM7c
* Shiny is an open source R package which combintes the computational power of R with the interactivity of the modern web.
* It provides a powerful web framework for building web applications using R.
* Shiny helps you turn your analyses into interactive web applications without requiring HTML, CSS, or Javascript knowledge.
* Enables standalone apps on a webpage or embed them in R Markdown documents or build dashboards


A Shiny application has 2 parts
1. UI code (HTML5)
2. Server code (R)

Kunt ervoor kiezen om ze samen te voegen tot 1 bestand (`app.R`)

```
library(shiny)
ui <- fluidPage(
  # the design, look and feel
  )
server <- function(input, output){
  # logic / algorithms / charts
}

# initate basic Shiny app
shinyApp(ui = ui, server=server)

```

* Run App button
* Can also open the app in your browser


* Generate template with:
  - File > New File > Shiny Web App
-->
