var testsServices = angular.module('testsServices', ['ngResource']);

testsServices.factory('TestsServices', ['$resource',
    function($resource){
        return $resource('/behat_editor_services_v2/sites/:sid/tests/:tname', {}, {
            query: {method:'GET', params:{sid:'sid', tname:'tname'}, isArray:true},
            update: {method:'PUT', isArray:false},
            create: {method:'POST', isArray:false}
        });
    }]);