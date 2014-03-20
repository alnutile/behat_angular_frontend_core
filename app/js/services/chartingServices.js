var chartingServices = angular.module('chartingServices', []);

chartingServices.factory('passFail', ['$rootScope',
        function($rootScope){
            return function(data, $scope) {
                //Charts
                $scope.charts = {};
                $scope.charts.passing = 0;
                $scope.charts.failing = 0;
                $scope.charts.not_running = 0;
                $scope.charts.total = 0;
                $scope.charts.coverage = 0;
                $scope.charts.usd_save = 0;

                angular.forEach(data, function(v,i){
                    $scope.charts.total = $scope.charts.total + 1;
                    if(v.status == 1) {
                        $scope.charts.passing = $scope.charts.passing + 1;
                    } else if (v.status == 0) {
                        $scope.charts.failing = $scope.charts.failing + 1;
                    } else {
                        $scope.charts.not_running = $scope.charts.not_running + 1;
                    }
                    $scope.charts.coverage = $scope.charts.total - $scope.charts.not_running;
                    $scope.charts.usd_save = $scope.charts.coverage * 10 * 125;
                });
            }
        }]);