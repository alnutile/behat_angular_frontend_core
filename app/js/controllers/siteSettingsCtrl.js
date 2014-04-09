var settings = angular.module('siteSettingsCtrl', []);

settings.controller('SiteSettingsCtrl', ['$scope', '$http', '$location', '$route', '$routeParams', 'SitesSettings', 'addAlert', 'SiteHelpers', 'Noty',
    function($scope, $http, $location, $route, $routeParams, SitesSettings, addAlert, SiteHelpers, Noty){
        $scope.nav_message      = "Mocked data. You can see what the Settings page will look like, click update though your settings are not save to this fake rest api";
        $scope.nav              = { name: 'nav',        url: 'templates/nav.html'};
        $scope.bc               = { name: 'bc', url: 'templates/bc.html'}
        $scope.settings_browser = { name: 'settings_browser', url: 'templates/shared/settings_browser.html'}
        $scope.breadcrumbs = [
            {title: "Site " + $routeParams.sid, path: "#/sites/" + $routeParams.sid },
            { title: "Settings", path:  "#"}
        ];
        SitesSettings.query({sid: $routeParams.sid}, function(data){
            $scope.settings = data.data;
            $scope.settingsForm = $scope.settings;

            $scope.browsers = SiteHelpers.browsers();
            $scope.browser_options = [];
            $scope.settingsForm.browserChosen = false;

            angular.forEach($scope.browsers, function(v, i){
                if($scope.settings.saucelabs.browser.browser == v.browser && $scope.settings.saucelabs.browser.version == v.version) {
                    $scope.settingsForm.browserChosen = i;
                }
                $scope.browser_options.push(i);
            });
        });

        $scope.alerts = [];
        $scope.putSettings = function() {
            var browser = $scope.settingsForm.browserChosen;
            var browserObject = SiteHelpers.getBrowserObejectFromBrowser(browser);
            for (var attrname in browserObject) { $scope.settingsForm.saucelabs.browser[attrname] = browserObject[attrname]; }
            $scope.settings = $scope.settingsForm;
            SitesSettings.updateSettings({sid: $routeParams.sid}, $scope.settings, function(data){
                addAlert(data.status, data.message, $scope);
            });
            Noty('<i class="glyphicon glyphicon-cog"></i>&nbsp;Settings updated', 'success');
            addAlert('success', 'Settings Updated', $scope);
        };

    }]);