"use strict";
var tokensService = angular.module('tokensService', []);

tokensService.
    factory('tokensIterator', ['$rootScope',
    function($rootScope){
        return function(tokens) {
            var tokens_array = {};
            var token_group = [];
            angular.forEach(tokens, function(v,i){
                angular.forEach(v, function(v2,i2){
                })
            });
            return tokens_array;
        }
    }]).factory('TokensHelpers', ['$rootScope', 'TokensResource', 'Noty',
        function($rootScope, TokensResource, Noty){
                var helpers = {};
                helpers.tokensAppendRow = function(subSet) {
                    console.log(subSet);
                    if(subSet.length > 0) {
                        var tokensDefault = {'token': "Foo", 'value': "Bar" };
                    } else {
                        var tokensDefault = {'token': "Default URL", 'select': "--choose--" };
                    }
                    subSet.push(tokensDefault);
                    return subSet;
                };

                helpers.updateTokens = function(site, test, token_name, tokenSet) {
                    TokensResource.updateTokens({sid:site, tname: test, token_name: token_name}, tokenSet, function(data){
                        Noty("Tokens Updated", 'success');
                        return tokenSet;
                    }, function(message) {
                        var status = message.status;
                        Noty("Error submitting tokens for update Status: " + status, 'error')
                        return message;
                    });
                };

                helpers.cloneTokens = function(test_name, parent_set_name, parent_set, test_scope) {
                    var set_to_clone        = parent_set[parent_set_name];
                    var set_name            = helpers.makeName(test_name);
                    test_scope.tokens[set_name] = set_to_clone;
                    return test_scope.tokens;
                };

                helpers.newTokenSet = function(testname, subSet) {
                    var token_filename = helpers.makeName(testname);
                    var subSet = subSet || [];
                    var default_rows = helpers.tokensAppendRow(subSet);
                    Noty("New Set Added", 'success');
                    return {name: token_filename, set: default_rows };
                };

                helpers.makeName = function(parent) {
                    var timeStamp = new Date().getTime();
                    return  parent + '.' + timeStamp + '.token';
                };

                helpers.makeNameWithDashes = function(parent) {
                    var timeStamp = new Date().getTime();
                    return  parent + '_' + timeStamp + '_token';
                };


            return helpers;

    }]);