Feature: Batch Interface
  To Manage Batches for a site
  As a user
  Should be able to create edit and run batches

  Background: Refresh page
    Given I am on "/"
    #Helps when comes with other tests

  Scenario: Batches Index
    Given I am on "/sites/2/batches"
    And I wait
    Then I should see "Batch Tests"
    And I should see "@example"
    And I select "@example" from "tagged"
    Then I should not see "104"
    Then I follow "clear filter"
    And I wait
    And I should see "104"
    Then I fill in "search" with "104"
    And I should not see "103"
    Then I fill in "search" with ""
    Then I should see "103"
    And I select "passing" from "pass_fail_filter"
    Then I should not see "102"


