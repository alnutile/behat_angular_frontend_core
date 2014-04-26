var sitesController = angular.module('sitesController', []);

sitesController.controller('SitesController', ['$scope', '$http', '$location', '$route', '$routeParams', 'SitesServices', 'ReportsDashboard',
    function($scope, $http, $location, $route, $routeParams, SitesServices, ReportsDashboard){
        $scope.sites = SitesServices.query();
    }]);

sitesController.controller('SiteController', ['$scope', '$http', '$location', '$route', '$routeParams', 'SitesServices', 'TestsServices', 'ReportSiteNumbers', 'SiteHelpers', 'ChartsPassFail', 'AppHelpers',
    function($scope, $http, $location, $route, $routeParams, SitesServices, TestsServices, ReportSiteNumbers, SiteHelpers, ChartsPassFail, AppHelpers){
        $scope.selectedCls = AppHelpers.selectedCls;
        $scope.sortOrder = AppHelpers.sortOrder;

        $scope.nav                  = { name: 'nav', url: 'templates/shared/nav.html'}
        $scope.bc                   = { name: 'bc', url: 'templates/shared/bc.html'}
        $scope.report_filter        = { name: 'report_filter', url: 'templates/report_filter.html'}
        $scope.reports_template     = { name: 'reports', url: 'templates/reports/reports.html'}
        $scope.report_numbers_site  = { name: 'numbers',    url: 'templates/reports/report_numbers_site.html'};
        $scope.report_chart         = { name: 'chart',      url: 'templates/reports/report_chart.html'};
        $scope.reports_all = ReportSiteNumbers.get({sid: $routeParams.sid});

        $scope.sort = {};
        $scope.sort = '-name';

        $scope.nav_message = "Mocked data. You can click on <b>test2.feature view</b> or <b>edit</b> and <b>Create New Test</b></b>"
        $scope.sites = SitesServices.get({sid: $routeParams.sid}, function(data) {
            $scope.site = data;
            $scope.tags_filter = [];

            $scope.charts = {};
            $scope.charts.passing = 0;
            $scope.charts.failing = 0;
            $scope.charts.not_running = 0;
            $scope.charts.total = 0;
            $scope.charts.coverage = $scope.charts.total - $scope.charts.not_running;
            $scope.charts.usd_save = $scope.charts.coverage * 10 * 125;

            //@TODO this is being used by reportsController too so centralize it into a service
            angular.forEach(data.testFiles, function(v,i){
                angular.forEach(v.tags, function(value, index){
                    //set tags
                    if($scope.tags_filter.indexOf(value) == -1) {
                        $scope.tags_filter.push(value);
                    };
                });
                //Setup Reports
                //@TODO move this out into a shared Service
                $scope.charts.total = $scope.charts.total + 1;
                if(v.status == 1) {
                    $scope.charts.passing = $scope.charts.passing + 1;
                } else if (v.status == 0) {
                    $scope.charts.failing = $scope.charts.failing + 1;
                } else {
                    $scope.charts.not_running = $scope.charts.not_running + 1;
                }
            });
            $scope.chartsPassingFailing = {}
            $scope.chartsPassingFailing =
            {'chart':
                [
                    {
                        value: $scope.charts.passing,
                        color:"#F38630"
                    },
                    {
                        value: $scope.charts.failing,
                        color:"#E0E4CC"
                    }
                ],
                'passing': $scope.charts.passing,
                'failing': $scope.charts.failing
            };

            $scope.breadcrumbs = [
                {
                title: data.title,
                path:  "#"
            }]


        });

        $scope.setTag = function(tag) {
            $scope.tagged = tag;
        }

        $scope.clearTag = function(){
            $scope.tagged = '';
        }

        $scope.tagOptions = '';

        $scope.chartObject = {}
        $scope.chartObject.data = {
            "cols" : [
                {id: "t", label: "Topping", type: "string"},
                {id: "s", label: "Slices", type: "number"},
            ], "rows": [
                {c: [
                    {v: "Mushrooms"},
                    {v: 3}
                ]},
                {c: [
                    {v: "Onions"},
                    {v: 31}
                ]},
                {c: [
                    {v: "Garlic"},
                    {v: 3}
                ]},
            ]};
        // $routeParams.chartType == BarChart or PieChart or ColumnChart...

        $scope.chartObject.type = 'ColumnChart';
        $scope.chartObject.options = {
            'title': "Report"
        }
    }]);
