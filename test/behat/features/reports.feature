Feature: Reports Testing

  Scenario: I should see results on the Dash
    Given I am on "/"
    And I wait
    Then I should see "Tests Created"
    Then I should see "100"

  Scenario: On the Site page I should see Reporting
    Given I am on "/sites/2"
    And I wait
    Then I should see "Report: Passing Failing"
    And I should see "Tests Created"
    And I should see "($1,244.00)"
    And I should see "test5.feature"
    Then I select "passing" from "pass_fail_filter"
    Then I should not see "test5.feature"
