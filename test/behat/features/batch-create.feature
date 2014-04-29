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
    And I should see "test1.feature"
    And I fill in "batch-search" with "test2.feature"
    Then I should not see "test1.feature"
		And I fill in "batch-search" with ""
		And I should see "test1.feature"
    And I press the element "body > div > snap-content > div > div:nth-child(4) > ng-include > div.col-md-2.column.ng-scope > span > accordion > div > div.tokens-admin.panel.panel-default.ng-isolate-scope"
    Then I should see "Select Batch Tags"
    And I press the element "body > div > snap-content > div > div:nth-child(4) > ng-include > div.col-md-8.column.ng-scope > div:nth-child(2) > ng-include > div:nth-child(3) > ul > li:nth-child(2) > label > input"
    Then I should not see "(require @scheduled tag to be selected)"
    And I check "W"
    And I should see "Default Browser"
    And I should see "Choose environment"
    And I press "save new batch job"
    And I wait
    Then I should see "Batch Tests"

