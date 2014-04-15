Feature: Tokens Panel

  Background: Refresh page
    Given I am on "/"
    #Helps when comes with other tests

  Scenario: I should be able to see Tokens admin and update
    Given I am on "/sites/2/tests/test2_feature/edit"
    And I wait
    And I press the element "div.tokens-admin"
    Then I should see "Tokens Admin"
    And I press "add_row_tokens_0"
    And I wait
    Then I should see "New row added"
    And I should see "Foo1"
    Then I press "update_tokens_0"
    And I wait
    Then I should see "Tokens Updated"

  Scenario: Should be able to add tokens
      Given I am on "/sites/2/tests/test2_feature/edit"
      And I wait
      And I press the element "div.tokens-admin"
      Then I should see "Tokens Admin"
      And I press "add_new_token_set"
      And I wait
      Then I should see "New Set Added"
      And I should see "Foo1"

  Scenario: Select Tokens for quick test
     Given I am on "/sites/2/tests/test2_feature/edit"
     And I wait
     And I press the element "div.run-test"
     Then I should see "Use Token Set"
     And I select "12345.tokens" from "token_set_to_use"
     #the fact I made it this far means it worked