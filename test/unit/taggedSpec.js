'use strict';

/* jasmine specs for services go here */

describe('tags', function() {
    var scope;

    beforeEach(module('tags'));

    beforeEach(inject(function(){
        scope = {};
        scope.tagsChosen = [];
    }))

    describe('filter by tags', function() {
        it('should return original value if nothing is set for the filter', inject(function(taggedFilter) {
            var tests = [];
            var test = {
                "name": 'test1',
                "tags": ['@example','@foo']
            };
            tests.push(test);
            var test2 = {
                "name": 'test2',
                "tags": ['@example','@foo']
            };
            tests.push(test2);
            var output = taggedFilter(tests, scope);
            expect(output.length).toBe(2);
        }));
        it('should both tests since both have the tag', inject(function(taggedFilter) {
            var tests = [];
            scope.tagsChosen = ['@foo'];
            var test = {
                "name": 'test1',
                "tags": ['@example','@foo']
            };
            tests.push(test);
            var test2 = {
                "name": 'test2',
                "tags": ['@example','@foo']
            };
            tests.push(test2);
            var output = taggedFilter(tests, scope);
            expect(output.length).toBe(2);
        }));
        it('should return some of the array count 0 since none are tagged', inject(function(taggedFilter) {
            var tests = [];
            scope.tagsChosen = ['@bar'];
            var test = {
                "name": 'test1',
                "tags": ['@example','@foo']
            };
            tests.push(test);
            var test2 = {
                "name": 'test2',
                "tags": ['@example','@foo']
            };
            tests.push(test2);
            var output = taggedFilter(tests, scope);
            expect(output.length).toBe(0);
        }));
        it('should return some of the array count 1 since ONE are tagged', inject(function(taggedFilter) {
            var tests = [];
            scope.tagsChosen = ['@foo2'];
            var test = {
                "name": 'test1',
                "tags": ['@example1','@foo1']
            };
            tests.push(test);
            var test2 = {
                "name": 'test2',
                "tags": ['@example2','@foo2']
            };
            tests.push(test2);
            var output = taggedFilter(tests, scope);
            expect(output.length).toBe(1);
        }));
        it('if there are two chosen tags then the test must have both of them', inject(function(taggedFilter) {
            var tests = [];
            scope.tagsChosen = ['@foo2', '@bar2'];
            var test = {
                "name": 'test1',
                "tags": ['@example1','@foo1']
            };
            tests.push(test);
            var test2 = {
                "name": 'test2',
                "tags": ['@example2','@foo2']
            };
            tests.push(test2);
            var output = taggedFilter(tests, scope);
            expect(output.length).toBe(0);
        }));
    });
});
