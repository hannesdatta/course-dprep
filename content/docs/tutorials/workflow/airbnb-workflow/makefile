INPUT_DIR = src/data-preparation
GEN_DATA = gen/data-preparation
GEN_PLOT = gen/plots
Rscript = /Library/Frameworks/R.framework/Versions/4.0/Resources/bin/Rscript


all: $(GEN_PLOT)/plot_all.pdf $(GEN_PLOT)/plot_Amsterdam.pdf


$(GEN_PLOT)/plot_all.pdf: $(GEN_DATA)/aggregated_df.csv
	$(Rscript) $(INPUT_DIR)/plot_all.R 

$(GEN_PLOT)/plot_Amsterdam.pdf: $(GEN_DATA)/pivot_table.csv
	$(Rscript) $(INPUT_DIR)/plot_Amsterdam.R 

$(GEN_DATA)/aggregated_df.csv: data/listings.csv data/reviews.csv
	$(Rscript) $(INPUT_DIR)/clean.R 

$(GEN_DATA)/pivot_table.csv: $(GEN_DATA)/aggregated_df.csv
	$(Rscript) $(INPUT_DIR)/pivot_table.R 

data/listings.csv: 
	$(Rscript) $(INPUT_DIR)/download.R 

data/reviews.csv: 
	$(Rscript) $(INPUT_DIR)/download.R


clean:
	rm -f $(GEN_PLOT)/plot_all.pdf
	rm -f $(GEN_PLOT)/plot_Amsterdam.pdf