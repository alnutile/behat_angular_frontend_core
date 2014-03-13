var sitesController = angular.module('sitesController', []);

sitesController.controller('SitesController', ['$scope', '$http', '$location', '$route', '$routeParams', 'SitesServices',
    function($scope, $http, $location, $route, $routeParams, SitesServices){
        $scope.sites = SitesServices.query();
    }]);

sitesController.controller('SiteController', ['$scope', '$http', '$location', '$route', '$routeParams', 'SitesServices', 'TestsServices',
    function($scope, $http, $location, $route, $routeParams, SitesServices, TestsServices){
        $scope.sites = SitesServices.get({sid: $routeParams.sid}, function(data) {
            console.log(data)
            $scope.site = data;
        });
    }]);
