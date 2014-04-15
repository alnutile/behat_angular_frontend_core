var batchServices = angular.module('batchServices', ['ngResource']);

batchServices.factory('BatchServices', ['$resource',
    function($resource){
        return $resource('/behat_editor_services_v2/sites/:sid/batches/:bid/:action', {
            testData: "@test",
            batch_settings: "@settingsForm",
            action: ':action'
        }, {
            query: {method:'GET', params:{sid:'sid'}, isArray:true},
            update: {method:'PUT', isArray:false},
            create: {method:'POST', isArray:false},
            run: {method:'GET', isArray:false},
            runOnce: {method:'POST', params: { batch_settings: '@settingsForm', testData:'@test', action:'runOnce'}, isArray:false}
        });
    }]);