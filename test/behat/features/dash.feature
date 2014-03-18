Feature: Dash Review
  Scenario: I should see the site to click
    Given I am on "/"
    Then I should see "Test 2 working mock"
    And I follow "site-2"
    Then I should see "test2.feature"
