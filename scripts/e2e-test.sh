#!/bin/bash

BASE_DIR=`dirname $0`

echo ""
echo "Updating WebDriver"
echo $BASE_DIR
echo "-------------------------------------------------------------------"

/usr/local/bin/webdriver-manager update


echo ""
echo "Starting Protractor tests"
echo $BASE_DIR
echo "-------------------------------------------------------------------"

/usr/local/bin/protractor $BASE_DIR/../config/protractor-conf.js $*
