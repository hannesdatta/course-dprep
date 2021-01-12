jupyter nbconvert raw-python.ipynb --to markdown --NbConvertApp.output_files_dir=.

# Copy the contents of Untitled.md and append it to index.md:
#cat raw-python.md | tee -a python.md
cat .python.md raw-python.md > ../python.md
# Remove the temporary file:
rm raw-python.md
