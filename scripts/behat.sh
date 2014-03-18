#!/bin/sh
TEST=$1
if [[ $TEST == 'all' ]]
then
  TEST=''
fi

echo Running test test/behat/features/$TEST
vendor/bin/behat --config test/behat/behat.yml test/behat/features/$TEST



