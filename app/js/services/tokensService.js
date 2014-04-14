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
                    var tokensDefault = {'token': "Foo1", 'value': "Bar1" };
                    subSet.push(tokensDefault);
                    return subSet;
                }

                helpers.updateTokens = function(site, test, token_name, tokenSet) {
                    TokensResource.updateTokens({sid:site, tname: test, token_name: token_name}, tokenSet, function(data){
                        Noty("Tokens Updated", 'success');
                        return data;
                    }, function(message) {
                        var status = message.status;
                        Noty("Error submitting tokens for update Status: " + status, 'error')
                        return message;
                    });
                }

                helpers.newTokenSet = function(testname) {
                    var timeStamp = new Date().getTime();
                    var token_filename = testname + '.' + timeStamp + '.token';
                    var token_filename_id = testname + '_' + timeStamp + '_token';
                    var subSet = [];
                    var default_rows = helpers.tokensAppendRow(subSet);
                    return {name: token_filename, set: default_rows };
                }

            return helpers;

    }]);