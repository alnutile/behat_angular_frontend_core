Feature: Dash Review
  In order to use the application
  As the logged in user
  I should be able to go to the different resources

  Scenario: I should see the site to click
    Given I am on "/"
    Then I should see "Site 2 [working mock]"
    And I wait
    And I follow "site-2"
    And I wait
    Then I should see "test2.feature"
