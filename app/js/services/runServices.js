var runServices = angular.module('runServices', []);

runServices.factory('runTest', ['$routeParams', '$rootScope', 'addAlert', 'BehatServices', 'Noty',
    function($routeParams, $rootScope, addAlert, BehatServices, Noty){
        return function(type, message, $scope) {
            $scope.test_results = 'Running test...';
            Noty('Running Test', 'information');
            BehatServices.get({sid: $routeParams.sid, tname: $routeParams.tname}, function(data){
                if(data.errors == 0) {
                    var snag_behat_div = jQuery(data.data).get(9);
                    $scope.test_results = jQuery(snag_behat_div).html();
                    Noty('Test Completed', 'success');
                } else {
                    Noty('Problem Running Test', 'error');
                }
            });
        }
    }]);