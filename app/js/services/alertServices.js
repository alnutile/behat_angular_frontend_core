var alertServices = angular.module('alertServices', []);

alertServices.
    factory('addAlert', ['$rootScope',
    function($rootScope){
        return function(type, message, $scope) {
            $scope.alerts.push({ type: type, msg: message});
        }
    }]).
    factory('closeAlert', ['$rootScope',
    function($rootScope){
        return function(index, $scope) {
            $scope.alerts.splice(index, 1);
        }
    }]).
    factory('Noty', ['$rootScope',
        function($rootScope){
            return function(text, type) {
                noty({text: text, type: type, dismissQueue: false, killer: true, timeout: false,
                    animation: {
                        open: {height: 'toggle'},
                        close: {height: 'toggle'},
                        easing: 'swing',
                        speed: 500
                    }
                });
            }
        }]);