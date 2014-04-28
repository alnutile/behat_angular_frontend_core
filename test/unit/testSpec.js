'use strict';

/* jasmine specs for services go here */

describe('test_helpers', function() {
    var scope, feature_name;

    beforeEach(module('test_helpers'));

    beforeEach(inject(function(){
        scope = {};
        scope.feature_name = 'Test';
    }))

    describe('should get feature name from text', function() {
        it('should return feature name', inject(function(TestHelpers) {
            var test = "@test1 \n" +
                "Feature: Test Test \n" +
                "@test2 \n" +
                "Scenario: Test \n";

            var output = TestHelpers.featureName(test, scope);
            expect(scope.feature_name).toContain('Test Test');
        }));
    });
});
