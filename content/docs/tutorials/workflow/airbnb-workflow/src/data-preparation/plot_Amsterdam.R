# import the data from `gen/analysis/pivot_table`
df_pivot <- read.csv("gen/data-preparation/pivot_table.csv")

# convert the `date` column into date format.
df_pivot$date <- as.Date(df_pivot$date)

pdf("gen/plots/plot_Amsterdam.pdf")
plot(x = df_pivot$date, 
     y = df_pivot$Centrum.West, 
     col = "red", 
     type = "l", 
     xlab = "",
     ylab = "Total number of reviews", 
     main = "Centrum-West hit hardest by COVID-19 (Airbnb rentals)")

lines(df_pivot$date, df_pivot$De.Pijp...Rivierenbuurt, col="blue")
lines(df_pivot$date, df_pivot$De.Baarsjes...Oud.West, col="green")

legend("topleft", c("Centrum-West", "De Pijp", "De Baarsjes"), fill=c("red", "blue", "green"))
dev.off()