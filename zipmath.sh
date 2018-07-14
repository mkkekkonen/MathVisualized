DATE=`date +%Y%m%d`
zip -r mathvisualized-$DATE.zip . --exclude=*static* --exclude=*.git*
