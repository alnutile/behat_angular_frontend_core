var runServices = angular.module('runServices', []);

runServices.factory('runTest', ['$routeParams', '$rootScope', 'addAlert', 'BehatServices', 'Noty', 'TestHelpers',
    function($routeParams, $rootScope, addAlert, BehatServices, Noty, TestHelpers){
        return function(type, message, $scope) {
            $scope.test_results = 'Running test...';
            Noty('Running Test', 'information');
            BehatServices.get({sid: $routeParams.sid, tname: $routeParams.tname}, function(data){
                if(data.errors == 0) {
                    $scope.test_results = TestHelpers.pluckResults(data.data)
                    Noty('Test Completed', 'success');
                } else {
                    Noty('Problem Running Test', 'error');
                }
            });
        }
    }]);