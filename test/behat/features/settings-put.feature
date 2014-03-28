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
    Then I should see "Settings Updated"
    And I select "Windows 8.1" from "os"
    And I select "IE 10" from "browser"
    And I press "Submit"
    Then I should see "Settings Updated"
