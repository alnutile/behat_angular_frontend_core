var reportsController = angular.module('reportsController', []);

reportsController.controller('ReportsController', ['$scope', '$http', '$location', '$route', '$routeParams', 'ReportsDash', 'SitesServices', 'dateFilter', 'passFail',
    function($scope, $http, $location, $route, $routeParams, ReportsDash, SitesServices, dateFilter, passFail){
        $scope.tags_filter = [];

        ReportsDash.query(function(data){
            $scope.reports = data.reports_all;
            passFail(data.reports_all, $scope);

            angular.forEach(data.reports_all, function(v,i){


                angular.forEach(v.tags, function(value, index){
                    if($scope.tags_filter.indexOf(value) == -1) {
                        $scope.tags_filter.push(value);
                    };
                });


            });
        });


        //$scope.reportsFiltered = [];
        var count = 0;

        $scope.$watch('reportsFiltered', function(){

            passFail($scope.reportsFiltered, $scope);

        }, true);
        //@TODO move this out into a shared Service


        //Filters
        $scope.startDate = '';
        $scope.endDate = '';

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

        SitesServices.query({meta: false}, function(data){
            $scope.sites = data;
            //console.log(data);
        });
        $scope.formats = 'yyyy-mm-dd';
        $scope.nav      = { name: 'nav', url: 'templates/nav.html'}
        $scope.bc       = { name: 'bc', url: 'templates/bc.html'}
        $scope.nav_message = "Mocked data. You can click on <b>test2.feature view</b> or <b>edit</b> and <b>Create New Test</b></b>"

    }]);