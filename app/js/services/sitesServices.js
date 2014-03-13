var sitesService = angular.module('sitesServices', ['ngResource']);

sitesService.factory('SitesServices', ['$resource',
    function($resource){
        return $resource('/behat_editor_services_v2/sites/:sid', {}, {
            query: {method:'GET', params:{sid:''}, isArray:false}
        });
    }]);