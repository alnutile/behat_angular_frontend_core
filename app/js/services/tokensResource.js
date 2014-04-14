var tokensResource = angular.module('tokensResource', []);

tokensResource.
    factory('TokensResource', ['$resource',
        function($resource){
            return $resource('/behat_editor_services_v2/sites/:sid/tests/:tname/tokens/:token_name', {}, {
                query:{ method:'GET', params:{sid: '', tname: '', token_name: ''}, isArray:true },
                updateTokens: {method: 'PUT', params:{sid: '', tname: '', token_name: ''}, isArray:false}
            })
        }]);