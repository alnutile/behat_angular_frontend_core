'use strict';

var app = angular.module('behatEditor', [
    'ngRoute',
    'ui.ace',
    'ngSanitize',
    'ngAnimate',
    'ui.bootstrap',
    'sitesServices',
    'testsServices',
    'alertServices',
    'reportsServices',
    'runServices',
    'reportsController',
    'sitesController',
    'dashController',
    'testsController',
    'cloneTestCtrl',
    'tagsService',
    'tableMaker',
    'behatServices',
    'passFail',
    'googlechart'
]);

app.config(['$routeProvider',
    function ($routeProvider) {
        //var path = Drupal.settings.behatEditor.full_path;
        var path = '';
        $routeProvider.
            when('/', {
                templateUrl:  path + 'templates/dash/dash.html',
                controller:  'DashController'
            }).
            when('/sites', {
                templateUrl:  path + 'templates/sites/sites.html',
                controller:  'SitesController'
            }).
            when('/sites/:sid', {
                templateUrl:  path + 'templates/sites/site-show.html',
                controller:  'SiteController'
            }).
            when('/sites/:sid/tests/new', {
                templateUrl:  path + 'templates/tests/test-edit.html',
                controller:  'TestNewController'
            }).
            when('/sites/:sid/tests/:tname', {
                templateUrl:  path + 'templates/tests/test-show.html',
                controller:  'TestController'
            }).
            when('/sites/:sid/tests/:tname/edit', {
                templateUrl:  path + 'templates/tests/test-edit.html',
                controller:  'TestEditController'
            }).
            otherwise({
                redirectTo: '/'
            });
    }]);
