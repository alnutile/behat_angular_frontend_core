var dash = angular.module('dashController', []);

dash.controller('DashController', ['$scope', '$http', '$location', '$route', '$routeParams', 'SitesServices',
    function($scope, $http, $location, $route, $routeParams, SitesServices){
        $scope.sites = SitesServices.query();
    }]);