var alertServices = angular.module('alertServices', []);

alertServices.factory('addAlert', ['$rootScope',
    function($rootScope){
        return function(type, message, $scope) {
            $scope.alerts.push({ type: type, msg: message});
        }
    }])
    .factory('closeAlert', ['$rootScope',
    function($rootScope){
        return function(index, $scope) {
            $scope.alerts.splice(index, 1);
        }
    }]);