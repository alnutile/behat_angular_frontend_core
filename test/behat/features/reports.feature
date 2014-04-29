Feature: Reports Testing

 Scenario: I should see results on the Dash
    Given I am on "/"
    And I wait
    Then I should see "Tests Created"
    Then I should see "100"

  Scenario: On the Site page I should see Reporting
    Given I am on "/sites/2"
    And I wait
    Then I should see "Report Summary"
    And I should see "Tests Created"
    And I should see "($1,244.00)"
    And I should see "test5.feature"
    Then I select "passing" from "pass_fail_filter"
    Then I should not see "test5.feature"

  Scenario: Main Reports Site Filter
    Given I am on "/"
    And I follow "reporting"
    Then I should see "Filter by Site"
    And I should see "test763.feature"
    And I select "Site 3" from "site_filter"
    Then I should not see "test763.feature"

  Scenario: Main Reports Search Filter
    Given I am on "/"
    Given I am on "/reports"
    And I wait
    And I should see "test763.feature"
    And I fill in "search_tests" with "test2.feature"
    Then I should not see "test763.feature"

  Scenario: Main Reports Tag Filter
    Given I am on "/"
    Given I am on "/reports"
    And I wait
    And I should see "test763.feature"
    And I select "@janrain" from "tag_filter"
    Then I should not see "test763.feature"

  Scenario: Main Reports Pass Fail Filter
    Given I am on "/"
    Given I am on "/reports"
    And I wait
    And I should see "test763.feature"
    And I select "passing" from "pass_fail_filter"
    Then I should not see "test763.feature"

  Scenario: Main Reports URL Filter
    Given I am on "/reports?siteid=2"
    And I wait
    Then I should not see "test331.feature"
    And I should see "test126.feature"

  Scenario: Sites own report
    Given I am on "/sites/2"
		And I wait
    And I follow "reporting"
    And I wait
    Then I should not see "test331.feature"
    And I should see "test2.feature"