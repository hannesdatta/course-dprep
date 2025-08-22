library(tidyverse)
library(ggplot2)

# PLOT ANTWERP 

## import the data from `gen/analysis/pivot_table`
df_pivot <- read_csv("pivot_table.csv")

df_pivot %>% ggplot() + geom_line(aes(x=date, y=Universiteitsbuurt, color = 'Universiteitsbuurt')) + 
  geom_line(aes(x=date, y=`Sint-Andries`, color = 'Sint-Andries')) + 
  geom_line(aes(x=date, y=`Centraal Station`, color = 'Centraal Station')) + 
  scale_color_manual(values = c('Centraal Station' = 'green', 
                                'Sint-Andries' = 'blue', 
                                'Universiteitsbuurt' = 'red')) + 
  labs(y='Total number of reviews', x = 'Date', color = 'District',
       title = 'Effect of Covid-19 on AirBnB review count')


ggsave('plot_antwerp.pdf')
