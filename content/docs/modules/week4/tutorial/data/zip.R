# zip
files <- list.files(pattern='*.csv')
files <- grep('realistic', files, value=T, invert=T)
unlink('week4_data.zip')

# Create a zip file
zip("week4_data.zip", files = files)
