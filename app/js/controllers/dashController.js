var dash = angular.module('dashController', []);

dash.controller('DashController', ['$scope', '$http', '$location', '$route', '$routeParams', 'SitesServices', 'ReportsDashboard', 'TableMaker',
    function($scope, $http, $location, $route, $routeParams, SitesServices, ReportsDashboard, TableMaker){
        $scope.sites = SitesServices.getSites(function(data){
            $scope.sites = data;
            $scope.tableParams = TableMaker(data)
        });
        $scope.nav              = { name: 'nav',        url: 'templates/nav.html'};
        $scope.report_numbers   = { name: 'numbers',    url: 'templates/report_numbers.html'};
        $scope.report_chart     = { name: 'chart',      url: 'templates/report_chart.html'};
        $scope.nav_message = "Mocked data. You can click on <b>Site 2 [working mock].</b> and <b><i class='glyphicon glyphicon-record'></i> Reporting</b> has lots to offer";
        $scope.reports_all = ReportsDashboard.query();
        $scope.predicate = '-title';

    }]);