'use strict';

/* jasmine specs for services go here */

describe('tagsService', function() {

    beforeEach(module('tagsService'));

    describe('tags from current model', function() {
        it('It should return the tags in the current model', inject(function(tagsPresent) {
            var test = "@test1 \n" +
                "Feature: Test Test \n" +
                "@test2 \n" +
                "Scenario: Test \n";
            var output = tagsPresent(test);
            expect(output).toContain('@test1');
            expect(output).toContain('@test2');
        }));
        it('It should not repeat a tag', inject(function(tagsPresent) {
            var test = "@test1 \n" +
                "Feature: Test Test \n" +
                "@test2 @test1\n" +
                "Scenario: Test \n";
            var output = tagsPresent(test);
            expect(output).toContain('@test1');
            expect(output).toContain('@test2');
            expect(output[2]).toBe(undefined);
        }));
    });
});
