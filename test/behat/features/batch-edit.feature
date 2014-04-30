Feature: Batch Create Interface
  To Edit a batch
  As a user
  Should have pre-filled data from settings

  Background: Refresh page
    Given I am on "/"
    #Helps when comes with other tests

  Scenario: Creating a new batch
    Given I am on "/sites/2/batches/102/edit"
    And I wait
    And the "test3_feature" checkbox should be checked
    And the "test2_feature" checkbox should be checked
    And I press the element "body > div > snap-content > div > div:nth-child(4) > ng-include > div.col-md-2.column.ng-scope > span > accordion > div > div.tokens-admin.panel.panel-default.ng-isolate-scope > div.panel-heading > h4 > a"
    And I wait
    Then I should see "Batch Settings"
    And the "@batch" checkbox should be checked
    And the "@smoke" checkbox should be checked
    And the "@regression" checkbox should not be checked
		And the "M" checkbox should be checked
		And the "F" checkbox should not be checked
		And the "occurrence" checkbox should be checked


