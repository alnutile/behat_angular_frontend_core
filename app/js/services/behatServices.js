var behatServices = angular.module('behatServices', ['ngResource']);

behatServices.factory('BehatServices', ['$resource',
    function($resource){
        return $resource('/behat_editor_services_v2/sites/:sid/tests/:tname/run', {}, {
            query: {method:'GET', params:{sid:'sid', tname:'tname'}, isArray:true}
        });
    }]);