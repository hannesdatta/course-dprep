#!/bin/bash
rm -r gen
mkdir gen
#mkdir gen/reveal-old
#cp -R reveal-old gen/reveal-old

# Declare an array of string with type
declare -a FileNames=("dprep" "livestream2" "livestream3" "pipeline_automation" "livestream_final")
declare -a OutputNames=("00_dprep" "02_livestream" "03_livestream" "04_pipelineautomation" "05_finallecture")

# Iterate the string array using for loop
for i in "${!FileNames[@]}"; do
   echo ${FileNames[i]}

   pandoc -t revealjs -s -o gen/${OutputNames[i]}.html ${FileNames[i]}.md -V revealjs-url=./reveal.js -V theme=white
   sed '/::: notes/,/:::/d' ${FileNames[i]}.md > ${FileNames[i]}-nonotes.md
   sed '/\. \. \./d' ${FileNames[i]}-nonotes.md > ${FileNames[i]}-nonotes2.md
   pandoc ${FileNames[i]}-nonotes2.md --pdf-engine=xelatex -o "gen/${OutputNames[i]}.pdf"
   rm ${FileNames[i]}-nonotes.md
   rm ${FileNames[i]}-nonotes2.md
   #mv ${OutputNames[i]}.html gen/${OutputNames[i])}.html

done

cp -r reveal.js gen/reveal.js
cp *.png gen
cp images/*.png gen

#pandoc -t revealjs -s -o 01_course.html coursesetup.md -V revealjs-url=./reveal-old -V theme=white-tsh
#pandoc -t revealjs -s -o 02_theory.html theory.md -V revealjs-url=./reveal-old -V theme=white-tsh
#pandoc -t revealjs -s -o 03_practice.html practice.md -V revealjs-url=./reveal-old -V theme=white-tsh
#sed '/::: notes/,/:::/d' theory.md
