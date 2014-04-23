var sitesService = angular.module('sitesServices', ['ngResource']);

sitesService.
    factory('SitesServices', ['$resource',
        function($resource){
            return $resource('/behat_editor_services_v2/sites/:sid', {}, {
                query: {method:'GET', params:{sid:''}, isArray:true},
                get: {method:'GET', params:{sid:''}, isArray:false},
                getSites: {method:'GET', params:{sid:''}, isArray:true}
            });
    }]).
    factory('SitesSettings', ['$resource', function($resource){
        return $resource('/behat_editor_services_v2/sites/:sid/settings', {}, {
            query: { method:'GET', params:{sid:''}, isArray:false },
            updateSettings: { method:'PUT', params:{sid:''} }
        });
    }]).
    factory('SitesRepo', ['$resource', function($resource){
        return $resource('/behat_editor_services_v2/sites/:sid/repo/:branch/:branch_name',
            {
                sid: "",
                branch: '@branch'
            },
            {
                query: { method:'GET', params:{sid:''}, isArray:false},
                sync: {
                    method: 'GET',
                    params: {
                        sid: ':sid',
                        branch: 'branch',
                        branch_name: ':branch_name'
                    }
            }
        });
    }]);