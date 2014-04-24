@javascript
Feature: Test View Test
  Background: Refresh page
    Given I am on "/"
    #Helps when comes with other tests

  Scenario: I should see on the Create New Test
    Given I am on "/sites/2/tests/test2_feature/show"
    And I wait
    Then I should see "Feature: Test WikiPedia"
    Then I should see "Tokens"
    Then I should see "Results"
    Then I should see "Run a test"
    Then I should see "Clone Options"
    Then I should not see "save"
    Then I should not see "Scenarios and steps"
