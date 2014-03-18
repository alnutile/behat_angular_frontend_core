var reportsController = angular.module('reportsController', []);

reportsController.controller('ReportsController', ['$scope', '$http', '$location', '$route', '$routeParams', 'ReportsServices',
    function($scope, $http, $location, $route, $routeParams, ReportsServices){
        $scope.sites = ReportsServices.query();
    }]);