var runServices = angular.module('runServices', []);

runServices.factory('runTest', ['$routeParams', '$rootScope', 'addAlert', 'BehatServices',
    function($routeParams, $rootScope, addAlert, BehatServices){
        return function(type, message, $scope) {
            $scope.test_results = 'Running test...';
            addAlert('success', 'Running test...', $scope);
            BehatServices.get({sid: $routeParams.sid, tname: $routeParams.tname}, function(data){
                if(data.errors == 0) {
                    var snag_behat_div = jQuery(data.data).get(9);
                    $scope.test_results = jQuery(snag_behat_div).html();
                    addAlert('info', 'Test Completed...', $scope);
                } else {
                    addAlert('danger', 'Problem Running Test', $scope);
                    //output error message
                }
            });
        }
    }]);