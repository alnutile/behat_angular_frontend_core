Feature: Test the Quick test area

  Background: Refresh page
    Given I am on "/"
    #Helps when comes with other tests

  Scenario: I should be able to choose settings
    Given I am on "/sites/2/tests/test2_feature/edit"
    And I wait
    And I press the element "div.run-test"
    Then I should see "Quick Test"
    And I select "Safari 6" from "browser"
    And I select "Custom 1-http://local.google.com" from "url-run"

  Scenario: Batch jobs
    Given I am on "/sites/2/tests/test2_feature/edit"
    And I wait
    And I press the element "div.run-test"
    And I press the element "div:nth-child(8) > label > input"
    And I press "Run Batch"
    And I wait
    Then I should see "Running Batch job"
