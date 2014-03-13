var dash = angular.module('dashController', []);

dash.controller('DashController', ['$scope', '$http', '$location', '$route', '$routeParams', 'SitesServices',
    function($scope, $http, $location, $route, $routeParams, SitesServices){
        $scope.sites = SitesServices.query();
        $scope.nav = { name: 'nav', url: 'templates/nav.html'}
        $scope.nav_message = "Mocked data. You can click on <b>Test 2 working mock.</b>"
    }]);