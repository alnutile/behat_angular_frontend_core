Feature: Site Review
  Scenario: I should see on the Create New Test
    Given I am on "/sites/2/tests/test2_feature"
    Then I should see "Feature: Test WikiPedia"
    And I press "run-test"
    Then I should see "Running test..."
    Then I should see "Test Completed..."
    Then I should see "2 steps (2 passed)"
    And I follow "edit"
    Then I should see "save test"