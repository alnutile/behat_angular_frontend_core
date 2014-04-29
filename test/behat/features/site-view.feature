Feature: Site View
  Background: Refresh page
    Given I am on "/"
    #Helps when comes with other tests

  Scenario: I should see the test content
    Given I am on "/sites/2"
    Then I should see "test2.feature"
    Then I should see "test1.feature"
    And I wait
    And I wait
    And I follow "Create New Test"
    And I wait
    And I wait
    Then I should see "Test Preview/Edit"

  Scenario: Should be able to view a test
    Given I am on "/sites/2"
    Then I should see "test2.feature"
    And I follow "site-view-test2_feature"
    And I wait
    Then I should see "Test WikiPedia"
    Then I should see "Feature: Test WikiPedia"

  Scenario: Should be able to edit a test
    Given I am on "/sites/2"
    Then I should see "test2.feature"
    And I follow "site-edit-test2_feature"
    Then I should see "Test Details"

  Scenario: On the Site page I should see Reporting
    Given I am on "/sites/2"
    And I wait
    Then I should see "Report Summary"
    And I should see "Tests Created"
    And I should see "($1,244.00)"
    And I should see "test5.feature"
    Then I select "passing" from "pass_fail_filter"
    Then I should not see "test5.feature"

  Scenario: On site page and I filter by tag
    Given I am on "/sites/2"
    And I wait
    Then I should see "Filter tests by Tag"
    And I should see "test6.feature"
    And I follow "@test"
    And I should not see "test6.feature"
    And I follow "clear filter"
    And I should see "test6.feature"

