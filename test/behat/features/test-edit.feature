# forces a reload by going back to /
# otherwise it just froze here

Feature: Test Edit
  Background: Refresh page
    Given I am on "/"
    #Helps when comes with other tests

  Scenario: I should see the the form and click to other form items
    Given I am on "/sites/2/tests/test2_feature/edit"
    And I wait
    Then I fill in "tag-input" with "@tag"
    And I press "add-details"
    And I wait
    And I wait
    Then I should see "Tag Added @tag.."
    And I press the element ".scenarios > div:nth-child(1) > h4:nth-child(1) > a:nth-child(1)"
    And I wait
    And I press the element "body > div > snap-content > div > div:nth-child(4) > div.col-md-2.column > span > accordion > div > div.scenarios.panel.panel-default.ng-isolate-scope > div.panel-collapse.collapse.in > div > ul > li:nth-child(2) > a"
    And I wait
    Then I fill in "cfpTarget" with "some different text"
    And I wait
    And I press "cfpFormAdd"
    And I wait
    Then I should see "Step Added And I follow"
    And I should see "Then I should"
    Then I fill in "search-steps" with "blah"
    And I should not see "Then I should"
    Then I fill in "search-steps" with ""
    And I fill in "seeFormTarget" with "some other other text"
    And I press "seeFormAdd"
    And I wait
    Then I should see "Step Added Then I should"
    Then I select "not see" from "seeFormAction"
    And I press "seeFormAdd"
    And I wait
    And I wait
    Then I should see "Step Added Then I should not see"

  Scenario: Test XSS
      Given I am on "/sites/2/tests/test2_feature/edit"
      And I wait
      Then I fill in "tag-input" with "<SCRIPT>alert('XSS')</SCRIPT » >"
      And I press "add-details"
      And I wait
      And I wait
      Then I should see "Tag Added <SCRIPT"

  Scenario: Test Form Fields
      Given I am on "/sites/2/tests/test2_feature/edit"
      And I wait
      And I fill in "backGroundTarget" with "test"
      Then I should see "Background: test"
      And I press "backgroundsFormAdd"
      And I wait
      And I wait
      Then I should see "Step Added Background: \"test\"..."

  Scenario: Test One Results
      Given I am on "/sites/2/tests/test2_feature/edit"
      And I wait
      And I press the element "body > div > snap-content > div > div:nth-child(4) > div.col-md-2.column > span > accordion > div > div:nth-child(4) > div.panel-heading > h4 > a"
      And I wait
      And I follow "report-view-102"
      And I wait
      Then I should see "Duration"
