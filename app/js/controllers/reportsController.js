var sitesController = angular.module('sitesController', []);

sitesController.controller('SitesController', ['$scope', '$http', '$location', '$route', '$routeParams', 'SitesServices',
    function($scope, $http, $location, $route, $routeParams, SitesServices){
        $scope.sites = SitesServices.query();
    }]);

sitesController.controller('SiteController', ['$scope', '$http', '$location', '$route', '$routeParams', 'SitesServices', 'TestsServices',
    function($scope, $http, $location, $route, $routeParams, SitesServices, TestsServices){
        $scope.nav = { name: 'nav', url: 'templates/nav.html'}
        $scope.nav_message = "Mocked data. You can click on <b>test2.feature view</b> or <b>edit</b> and <b>Create New Test</b></b>"
        $scope.sites = SitesServices.get({sid: $routeParams.sid}, function(data) {
            $scope.site = data;
        });
    }]);
