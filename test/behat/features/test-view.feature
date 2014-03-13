Feature: Test View
  Scenario: I should see the test content
    Given I am on "/sites/2"
    Then I should see "test2.feature"
    Then I should see "test1.feature"
    And I follow "Create New Test"
    Then I should see "Test Preview/Edit"

  Scenario: Should be able to view a test
    Given I am on "/sites/2"
    Then I should see "test2.feature"
    And I follow "site-view-test2_feature"
    Then I should see "Test Preview/Edit"
    Then I should see "Test WikiPedia"

  Scenario: Should be able to edit a test
    Given I am on "/sites/2"
    Then I should see "test2.feature"
    And I follow "site-edit-test2_feature"
    Then I should see "Test Details"