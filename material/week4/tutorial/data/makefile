all: streams.csv week4_data.zip

playlists.csv: playlists.R
	Rscript playlists.R
	
socials.csv: socials.R
	Rscript socials.R
	
weather.csv: weather.R
	Rscript weather.R
	
streams.csv: combine.R playlists.csv socials.csv weather.csv
	Rscript combine.R

wipe:
	R -e "unlink('artist_streams.csv')"
	R -e "unlink('playlists.csv')"
	R -e "unlink('weather.csv')"
	R -e "unlink('socials.csv')"
	R -e "unlink('streams.csv')"
	
week4_data.zip: streams.csv playlists.csv socials.csv weather.csv zip.R
	Rscript zip.R
	
# create duplicaet rows (exact duplicates) in streams