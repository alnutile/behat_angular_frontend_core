var dash = angular.module('dashController', []);

dash.controller('DashController', ['$scope', '$http', '$location', '$route', '$routeParams', 'SitesServices', 'ReportsDashboard', 'TableMaker', 'SiteHelpers', 'ChartsPassFail',
    function($scope, $http, $location, $route, $routeParams, SitesServices, ReportsDashboard, TableMaker, SiteHelpers, ChartsPassFail){
        $scope.sites = SitesServices.getSites(function(data){
            $scope.sites = data;
            $scope.tableParams = TableMaker(data)
        });
        $scope.nav              = { name: 'nav',        url: 'templates/nav.html'};
        $scope.report_numbers   = { name: 'numbers',    url: 'templates/report_numbers.html'};
        $scope.report_chart     = { name: 'chart',      url: 'templates/report_chart.html'};
        $scope.nav_message = "Mocked data. You can click on <b>Site 2 [working mock].</b> and <b><i class='glyphicon glyphicon-record'></i> Reporting</b> has lots to offer";
        ReportsDashboard.query({}, function(data){
            console.log(data);
            $scope.reports_all = data;

        });
        $scope.predicate = '-title';


        $scope.siteName = function(site_id) {
            return SiteHelpers.getSiteName(site_id, $scope.sites);
        }
    }]);