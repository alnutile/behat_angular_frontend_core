#!/bin/sh
TEST=$1
if [[ $TEST == 'all' ]]
then
  TEST=''
fi

echo Running test test/behat/features/$TEST
vendor/bin/behat --stop-on-failure --config behat.yml test/behat/features/$TEST



