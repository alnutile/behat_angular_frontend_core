var batchesController = angular.module('batchesController', ['ngSanitize']);

batchesController.controller('BatchesController', ['$scope', '$http', '$location', '$route', '$routeParams', 'SitesServices', 'TestsServices', 'BehatServices', 'addAlert', 'runTest', 'closeAlert', '$modal', 'Noty', '$sanitize', 'sanitizerFilter', 'SitesSettings', 'SiteHelpers', 'tagsPresent', 'TokensHelpers', 'BatchServices', 'snapRemote', 'SitesRepo', 'ReportHelpers', 'ReportsServices', 'TestHelpers', 'AppHelpers',
    function($scope, $http, $location, $route, $routeParams, SitesServices, TestsServices, BehatServices, addAlert, runTest, closeAlert, $modal, Noty, $sanitize, sanitizerFilter, SitesSettings, SiteHelpers, tagsPresent, TokensHelpers, BatchServices, snapRemote, SitesRepo, ReportHelpers, ReportsServices, TestHelpers, AppHelpers){

        /** HELPERS **/
        $scope.filtered = {};
        $scope.filtered.tagged = '';
        $scope.tagsFilter = AppHelpers.tagsFilter;
        $scope.setTag = AppHelpers.setTag;
        $scope.clearTag = AppHelpers.clearTag;

        /** PARTIALS **/
        $scope.settings_browser             = { name: 'settings_browser', url: 'templates/shared/settings_browser.html'}
        $scope.nav                          = { name: 'nav', url: 'templates/shared/nav.html'}
        $scope.bc                           = { name: 'bc', url: 'templates/shared/bc.html'}
        $scope.snap                         = { name: 'snap', url: 'templates/shared/snap_test_output.html'}
        $scope.batch_run                    = { name: 'batch_run', url: 'templates/batches/run.html'}
        /** END PARTIALS **/

        /** PAGE SETUP **/
        $scope.sort = {};
        $scope.sort = '-name';
        $scope.selectedCls = AppHelpers.selectedCls;
        $scope.sortOrder = AppHelpers.sortOrder;
        $scope.action = $routeParams.action;
        $scope.settingsForm = {};
        $scope.settingsForm.browserChosenBatch = [];
        $scope.blocks = {}
        $scope.blocks.testDetailsBlock = true;
        $scope.groups = {};
        $scope.tags_filter = [];

        $scope.snapOpts = {
            minPosition: '-400',
            touchToDrag: false
        };

        if($scope.action == 'edit') {
            $scope.nav_message = "Mocked data. You can click on <b>any form item</b> as well as <b>run</b> and <b>any left side nav</b> <b>save</b> as well as use <b>Ace Editor</b> you can <b>Clone</b> to site 3"
        } else if($scope.action == 'create') {
            $scope.nav_message = "Mocked data. You can do the normal create stuff and Save as well which will redirect you to edit."
        } else {
            $scope.nav_message = "Mocked data. You can click on <b>any form item</b> as well as <b>run</b> and Clone"
        }
        /** END PAGE SETUP **/

        /** Actions **/
        //1. Get the Site data and settings

        //2. Action related setup
        if($scope.action == 'new') {
            BatchServices.get({sid: $routeParams.sid, bid: $routeParams.bid}, function(data) {
                $scope.batches = data;
            });
        } else {
            $scope.action = 'index';
            BatchServices.query({sid: $routeParams.sid}, function(data) {
                $scope.batches      = data.data.batches;
                $scope.site         = data.data.site;
                $scope.settings     = data.data.settings;
                $scope.tags_filter  = $scope.tagsFilter($scope.batches);

                $scope.breadcrumbs = [
                {
                    title: $scope.site.title,
                    path:  "#/sites/" + $scope.site.nid
                },
                {
                    title: "Batches",
                    path: "#/sites/" + $scope.site.nid
                }
                ]
            });
        };


        $scope.createBatch = function() {
            Noty("Make batch", 'success');
        }


    }]);