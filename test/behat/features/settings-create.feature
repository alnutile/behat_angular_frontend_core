Feature: Test Settings Create
  Background: Refresh page
    Given I am on "/"
    #Helps when comes with other tests

  Scenario: I should see some settings
    Given I am on "/settings/create"
    And I wait
    And I wait
    Then I should see "Github Folder"
    Then I should see "Github Repo"
    Then I should see "Github Account Name"
    Then I should see "Github Branch"
    And I press "Submit"
    And I wait
    Then I should see "You have some errors. Please check below."
    And I wait
    And I wait
    Then I should see "Settings updated"
    And the "github_folder" field should contain "tests/behat"
    And I press "add url"
    And I wait
    And I wait
    Then I should see "New url added"
    And the "urls_name_3" field should contain "Foo"