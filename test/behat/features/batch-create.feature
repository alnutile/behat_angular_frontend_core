Feature: Batch Create Interface
  To Manage Batches for a site
  As a user
  Should be able to Create a new batch

  Background: Refresh page
    Given I am on "/"
    #Helps when comes with other tests

  Scenario: Creating a new batch
    Given I am on "/sites/2/batches"
    And I wait
    And I follow "Create new batch test"
    And I wait
    Then I should see "Create new batch test"
    And I should see "Name this batch test"
    And I fill in "name" with "Test Batch Create"
    Then I should not see "test1_feature"
    And I fill in "choose_tag" with "@example"
    Then I should see "test1_feature"
