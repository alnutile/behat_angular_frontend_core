var reportsController = angular.module('reportsController', []);

reportsController.controller('ReportsController', ['$scope', '$http', '$location', '$route', '$routeParams', 'ReportsDash', 'SitesServices', 'dateFilter', 'passFailChart', 'SiteHelpers', 'ChartsPassFail',
    function($scope, $http, $location, $route, $routeParams, ReportsDash, SitesServices, dateFilter, passFailChart, SiteHelpers, ChartsPassFail){


        ($routeParams.siteid != undefined) ? $scope.siteFilter = $routeParams.siteid : null;


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
            passFailChart(data.reports_all, $scope);
            $scope.chartsPassFail = ChartsPassFail($scope.sites_results);
            $scope.chartsPassFailOptions = [];

            angular.forEach(data.reports_all, function(v,i){
                angular.forEach(v.tags, function(value, index){
                    if($scope.tags_filter.indexOf(value) == -1) {
                        $scope.tags_filter.push(value);
                    };
                });
            });


        });

        $scope.getSiteName = function(site_id){
            return $scope.setSiteName(site_id);
        };


        $scope.siteFilterChange = function(report) {

            $location.search('siteid', $scope.siteFilter);

            if($scope.siteFilter != undefined) {
                if($scope.siteFilter == report.site_id) {
                    return true;
                }
            } else {
                return true;
            }
        };

        $scope.$watch('reportsFiltered', function(){
            passFailChart($scope.reportsFiltered, $scope);
        }, true);

        $scope.sitesCoverageData = [];

        //@TODO move this out into a shared ChartJSService

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
        $scope.nav_message = "Mocked data. You can click on Site 2 has decent reports to show."

    }]);