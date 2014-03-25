var reportsController = angular.module('reportsController', []);

reportsController.controller('ReportsController', ['$scope', '$http', '$location', '$route', '$routeParams', 'ReportsDash', 'SitesServices', 'dateFilter', 'passFail',
    function($scope, $http, $location, $route, $routeParams, ReportsDash, SitesServices, dateFilter, passFail){
        $scope.tags_filter = [];
        $scope.groupTests = false;
        $scope.breadcrumbs = [
            {
                title: "Reports",
                path:  "#"
            }];
        $scope.isopen = true;

        SitesServices.query({meta: false}, function(data){
            $scope.sites = data;
        });

        ReportsDash.query(function(data){
            $scope.reports = data.reports_all;
            passFail(data.reports_all, $scope);
            sitePieChart();

            angular.forEach(data.reports_all, function(v,i){
                angular.forEach(v.tags, function(value, index){
                    if($scope.tags_filter.indexOf(value) == -1) {
                        $scope.tags_filter.push(value);
                    };
                });

            });
        });

        var count = 0;

        $scope.$watch('reportsFiltered', function(){
            passFail($scope.reportsFiltered, $scope);
        }, true);

        $scope.sitesCoverageData = [];

        //@TODO move this out into a shared Service
        var sitePieChart = function() {
            $scope.chartSitesProgressArray = [];

            angular.forEach($scope.sites_results, function(v){
                var data = {
                    "cols": [
                        {id: "sites", label: "Sites", type: "string", "p":{}},
                        {id: "p", label: "State", type: "number", "p": {}},
                    ], "rows": [
                        {
                            c: [
                                {
                                    v: "Passing"
                                },
                                {
                                    v: v.passing
                                }
                            ]},
                        {
                            c: [
                                {
                                    v: "Failing"
                                },
                                {
                                    v: v.failing
                                }
                            ]},
                        {
                            c: [
                                {
                                    v: "Not Run"
                                },
                                {
                                    v: v.not_running
                                }
                            ]}
                    ]
                };

                var options = {
                    "title": v.site_name,
                    "isStacked": "true",
                    "is3D": true,
                    "displayExactValues": true
                };

                $scope.chartSitesProgressArray.push(
                    {
                        "site_name": v.site_name,
                        "data": data,
                        "type": "PieChart",
                        "displayed": true,
                        "options": options,
                        "formatters": {}

                    }
                );
            });

        };

        //Filters
        $scope.startDate = '';
        $scope.endDate = '';

        $scope.groupedByTests = function(index) {
//            if( $scope.groupTests == true ) {
//                if ( $scope.testsGroupedArray.indexOf(report.test_name) == -1) {
//                    $scope.testsGroupedArray.push(report.test_name);
//                    return true;
//                }
//            } else {
//                $scope.testsGroupedArray = [];
//                return true;
//            }
            return true;
        }

        $scope.dateRangeCheck = function(report) {
            var startDateFormatted = dateFilter($scope.startDate,'yyyy-MM-dd');
            if($scope.startDate != '') {
                if(report.created != undefined && report.created >= startDateFormatted) {
                    if($scope.endDate != '') {
                        var endDateFormatted = dateFilter($scope.endDate,'yyyy-MM-dd');
                        if(report.created <= endDateFormatted) {
                            return true;
                        }
                    } else {
                        return true;
                    }
                }
            } else {
                return true;
            }
        };

        $scope.formats = 'yyyy-mm-dd';
        $scope.nav      = { name: 'nav', url: 'templates/nav.html'}
        $scope.bc       = { name: 'bc', url: 'templates/bc.html'}
        $scope.nav_message = "Mocked data. You can click on <b>test2.feature view</b> or <b>edit</b> and <b>Create New Test</b></b>"

    }]);