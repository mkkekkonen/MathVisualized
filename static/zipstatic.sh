DATE=`date +%Y%m%d`
zip -r mathstatic-$DATE.zip . -x **node_modules**
