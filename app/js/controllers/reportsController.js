var reportsController = angular.module('reportsController', []);

reportsController.controller('ReportsController', ['$scope', '$http', '$location', '$route', '$routeParams', 'ReportsDash',
    function($scope, $http, $location, $route, $routeParams, ReportsDash){
        ReportsDash.query(function(data){
            $scope.reports = data.reports_all;
            console.log($scope.reports)
        });
        $scope.nav      = { name: 'nav', url: 'templates/nav.html'}
        $scope.bc       = { name: 'bc', url: 'templates/bc.html'}
        $scope.nav_message = "Mocked data. You can click on <b>test2.feature view</b> or <b>edit</b> and <b>Create New Test</b></b>"

    }]);