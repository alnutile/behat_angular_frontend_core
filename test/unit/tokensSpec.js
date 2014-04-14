'use strict';

/* jasmine specs for services go here */

describe('tokensService', function() {

    beforeEach(module('tokensResource'));
    beforeEach(module('tokensService'));
    beforeEach(module('ngResource'));
    beforeEach(module('alertServices'));

    describe("Token helpers Append Rows", function(){
       it("It should add a new row to the tokens",
       inject(function(TokensHelpers, $resource){
           var test2_feature = {"tokens":{'12345.tokens':[{ 'token': 'foo', 'value': 'bar' },{ 'token': 'foo2', 'value': 'bar2'}],'67890.tokens':[{ 'token': 'foo33', 'value': 'bar33' }, { 'token': 'foo44', 'value': 'bar44' }]}};
           var subSet = test2_feature.tokens['12345.tokens'];
           var output = TokensHelpers.tokensAppendRow(subSet);
           expect(output.length).toEqual(3);
       }))
    });

    describe("Token helpers New Set", function(){
        it("It should add a set tokens",
            inject(function(TokensHelpers, TokensResource, Noty, $resource){
                var test2_feature = {"tokens":{'12345.tokens':[{ 'token': 'foo', 'value': 'bar' },{ 'token': 'foo2', 'value': 'bar2'}],'67890.tokens':[{ 'token': 'foo33', 'value': 'bar33' }, { 'token': 'foo44', 'value': 'bar44' }]}};
                var test_name = 'test2.feature';
                var output = TokensHelpers.newTokenSet(test_name);
                test2_feature.tokens[output.name] = output.set;
                expect(test2_feature.tokens[output.name].length).toEqual(1);
            }))
    });

    //@TODO comeback to this to get proper output right now behat covers this test
    describe("Token helper for Updating", function(){
        it("It should add a new row to the tokens",
            inject(function(TokensHelpers, TokensResource, Noty, $resource){
                var test2_feature = {"tokens":{'12345.tokens':[{ 'token': 'foo', 'value': 'bar' },{ 'token': 'foo2', 'value': 'bar2'}],'67890.tokens':[{ 'token': 'foo33', 'value': 'bar33' }, { 'token': 'foo44', 'value': 'bar44' }]}};
                var output = TokensHelpers.updateTokens(2, 'test2_feature', '12345.tokens', test2_feature.tokens);
                //window.dump(output)
                //expect(output.length).toEqual(3);
            }))
    });
});
