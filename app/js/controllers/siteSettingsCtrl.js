var settings = angular.module('siteSettingsCtrl', []);

settings.controller('SiteSettingsCtrl', ['$scope', '$http', '$location', '$route', '$routeParams', 'SitesSettings', 'addAlert',
    function($scope, $http, $location, $route, $routeParams, SitesSettings, addAlert){
        $scope.nav              = { name: 'nav',        url: 'templates/nav.html'};
        $scope.nav_message = "Mocked data. You can see what the Settings page will look like, click update though your settings are not save to this fake rest api";
        $scope.bc                   = { name: 'bc', url: 'templates/bc.html'}
        $scope.breadcrumbs = [{ title: "Settings", path:  "#"}];
        SitesSettings.query({sid: $routeParams.sid}, function(data){
            $scope.settings = data.data;
            console.log(data);
        });
        $scope.alerts = [];
        $scope.putSettings = function() {
            var settings = angular.copy($scope.settings);
            SitesSettings.updateSettings({sid: $routeParams.sid}, settings, function(data){
                console.log(data.message);
                addAlert(data.status, data.message, $scope);
            });
            addAlert('success', 'Settings Updated', $scope);
        };

        $scope.alerts_partial = { name: 'alerts', url: 'templates/alerts.html'}
        $scope.os_options =
        [
                        { 'nicename': 'Windows 8.2', 'saucename': 'win12r2' },
                        { 'nicename':'Windows 8.1', 'saucename': 'win12' },
                        { 'nicename':'Windows 7', 'saucename': 'win2008' },
                        { 'nicename': 'Mac OS/Mobile', 'saucename': 'mac10' },
                        { 'nicename': 'Linux/Android/Chrome', 'saucename': 'linux' }
        ];

        $scope.browser_options = {};

        $scope.getBrowser = function() {
          var os = $scope.settings.saucelabs.browser.os;
          $scope.browser_options = $scope.browser_types[os];
        };

        $scope.browser_types = {
            'win12r2': [{
                    'nicename': 'IE 11',
                    'saucename': 'internet explorer|11'
                },
                {
                    'nicename': 'Firefox 26',
                    'saucename': 'firefox|26'
                },
                {
                    'nicename': 'Firefox 25',
                    'saucename': 'firefox|25'
                }
            ],
            'win12': [
                {
                    'nicename': 'IE 10',
                    'saucename': 'internet explorer|10'
                }
            ],
            'win2008': [
                {
                    'nicename': 'IE 9',
                    'saucename': 'internet explorer|9'
                }
            ],
            'mac10': [
                {
                    'nicename': 'iPad - 6.1',
                    'saucename': 'ipad|6.1'
                },
                {
                    'nicename': 'iPhone - 6.1',
                    'saucename': 'iphone|6.1'
                },
                {
                    'nicename': 'Safari 6',
                    'saucename': 'safari|6'
                }
            ],
            'linux': [
                {
                    'nicename': 'Google Chrome - 30',
                    'saucename': 'chrome|30'
                },
                {
                    'nicename': 'Android 4.3',
                    'saucename': 'android|4.3'
                },
                {
                    'nicename': 'Firefox 26',
                    'saucename': 'firefox|26'
                },
                {
                    'nicename': 'Firefox 25',
                    'saucename': 'firefox|25'
                }
           ]
        };

    }]);