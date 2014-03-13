#!/bin/sh
FEATURE=$1

if [ $FEATURE == 'all' ]
  then
    vendor/bin/behat --config test/behat/behat.yml
  end
fi
