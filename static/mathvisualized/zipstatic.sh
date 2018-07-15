DATE=`date +%Y%m%d`
zip -r mathstatic-$DATE.zip . --exclude=*.zip -x **node_modules**
