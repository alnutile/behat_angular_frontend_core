var sitesController = angular.module('sitesController', []);

sitesController.controller('SitesController', ['$scope', '$http', '$location', '$route', '$routeParams', 'SitesServices', 'ReportsDashboard',
    function($scope, $http, $location, $route, $routeParams, SitesServices, ReportsDashboard){
        $scope.sites = SitesServices.query();
    }]);

sitesController.controller('SiteController', ['$scope', '$http', '$location', '$route', '$routeParams', 'SitesServices', 'TestsServices', 'TableMaker', 'ReportSiteNumbers',
    function($scope, $http, $location, $route, $routeParams, SitesServices, TestsServices, TableMaker, ReportSiteNumbers){
        $scope.nav      = { name: 'nav', url: 'templates/nav.html'}
        $scope.bc       = { name: 'bc', url: 'templates/bc.html'}
        $scope.reports_template  = { name: 'reports', url: 'templates/reports.html'}
        $scope.report_numbers   = { name: 'numbers',    url: 'templates/report_numbers.html'};
        $scope.report_chart      = { name: 'chart',      url: 'templates/report_chart.html'};
        $scope.reports_all = ReportSiteNumbers.get({sid: $routeParams.sid}, function(data){
            console.log(data);
        });
        $scope.nav_message = "Mocked data. You can click on <b>test2.feature view</b> or <b>edit</b> and <b>Create New Test</b></b>"
        $scope.sites = SitesServices.get({sid: $routeParams.sid}, function(data) {
            $scope.site = data;
            $scope.tags_filter = [];
            angular.forEach(data.testFiles, function(v,i){
                angular.forEach(v.tags, function(value, index){
                    if($scope.tags_filter.indexOf(value) == -1) {
                        $scope.tags_filter.push(value);
                    }
                });
            })
            $scope.breadcrumbs = [
                {
                title: data.title,
                path:  "#"
            }]
        });


        $scope.tagOptions = '';

    }]);
