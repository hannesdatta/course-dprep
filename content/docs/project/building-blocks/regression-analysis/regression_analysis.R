library(ggplot2)
library(ggfortify) # required for autoplot
library(broom)
library(dplyr)

data(cars) # imports built-in car dataset
cars$speed_kmh <- cars$speed * 1.60934 # convert miles per hour to kilometer per hour
cars$dist_m <- cars$dist * 0.3048 # convert foot to meters

# aanvankelijke model: stop distance = -5.4 + 0.75 km/h
mdl_cars <- lm(dist_m ~ speed_kmh, data=cars)
summary(mdl_cars)

# check linear model assumptions
autoplot(
  mdl_cars, 
  which = 1:3,
  nrow = 1, 
  ncol = 3
)

leverage_influence <- mdl_cars %>%
  augment() %>%
  select(speed_kmh, dist_m, leverage = .hat, cooks_dist = .cooksd) %>%
  arrange(desc(cooks_dist)) %>%
  head()


# data punten 23 (22.5; 24.4), 35 (29.0; 25.6), 49 (38.6; 36.6)
# Residuals vs Fitted: residuals evenly centered around the 0 axis
# Normal Q-Q plot: right tail somewhat higher than expected (maar niet gelijk een enorm probleem)
# Scale-Location: Home-skedastic maar record 23, 35, 49 wel een hogere error dan verwacht


leverage_influence <- mdl_cars %>%
  augment() %>%
  select(speed_kmh, dist_m, leverage = .hat, cooks_dist = .cooksd) %>%
  arrange(desc(cooks_dist)) %>%
  head()

################################
# (dit deel mogelijk weglaten) # 
################################

# exclude outlier 
cars_cleaned <- cars %>%
  filter(dist_m < 36.5)

# rerun model; stop distance = -4.3 + 0.69 km/h -> dus door dat ene punt is de slope veel steiler
mdl_cars_cleaned <- lm(dist_m ~ speed_kmh, data=cars_cleaned)
tidy(mdl_cars_cleaned)
summary(mdl_cars_cleaned) # verder niet ingaan op model fit (wordt niet per se beter)




# vergelijking tussen data met en zonder outlier
ggplot(cars, aes(speed_kmh, dist_m)) + 
  geom_point(alpha = 0.5) + 
  geom_smooth(method = "lm", se = FALSE, aes(color="Full model")) + 
  geom_smooth(method = "lm", se = FALSE, data = cars_cleaned,  aes(color="Outlier excluded"))  +
  labs(x = "Speed (km/h)", y = "Stop distance (m)") + 
  ggtitle("Figure 2: Linear trend between speed and stop distance") + 
  scale_colour_manual(name="Legend", values=c("red", "blue"))


# make predictions
library(dplyr)
explanatory_data <- data.frame(speed_kmh=c(45, 50, 60))

# hier wordt het gelijk in een dataframe gezet (als je predict los gebruikt krijg je enkel een vector met voorspellingen)
prediction_data <- explanatory_data %>%
  mutate( 
    dist_m = predict(
      mdl_cars, explanatory_data
    )
  )


