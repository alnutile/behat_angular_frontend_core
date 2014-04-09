# forces a reload by going back to /
# otherwise it just froze here

Feature: Test Settings Get and Put
  Background: Refresh page
    Given I am on "/"
    #Helps when comes with other tests

  Scenario: I should see some settings
    Given I am on "/sites/2/settings"
    Then I should see "Github Username"
    And I press "Submit"
    And I wait
    Then I should see "Settings updated"
    And I select "Safari 6" from "browser"
    And I press "Submit"
    And I wait
    Then I should see "Settings Updated"
    And the "github_user" field should contain "test"
    And the "sauce_user" field should contain "testuser"
    And I press "add url"
    And I wait
    Then I should see "New url added"
    And the "url_name_3" field should contain "Foo"