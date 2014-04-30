var batchesController = angular.module('batchesController', ['ngSanitize']);

batchesController.controller('BatchesController', ['$scope', '$http', '$location', '$route', '$routeParams', 'SitesServices', 'TestsServices', 'BehatServices', 'addAlert', 'runTest', 'closeAlert', '$modal', 'Noty', '$sanitize', 'sanitizerFilter', 'SitesSettings', 'SiteHelpers', 'tagsPresent', 'TokensHelpers', 'BatchServices', 'snapRemote', 'SitesRepo', 'ReportHelpers', 'ReportsServices', 'TestHelpers', 'AppHelpers',
    function($scope, $http, $location, $route, $routeParams, SitesServices, TestsServices, BehatServices, addAlert, runTest, closeAlert, $modal, Noty, $sanitize, sanitizerFilter, SitesSettings, SiteHelpers, tagsPresent, TokensHelpers, BatchServices, snapRemote, SitesRepo, ReportHelpers, ReportsServices, TestHelpers, AppHelpers){

        $scope.action = $routeParams.action || 'index';
        $scope.tagsChosen = [];
        $scope.batchTagsToRun = [];
        $scope.chosenEnvToRunData = [];
        $scope.starting_tests = [];
        $scope.starting_batch_tags_to_run = [];
        $scope.set_batch_run_days_data = [];
        $scope.starting_browsers_to_run = [];
        $scope.starting_env_to_run = [];

        $scope.chosen = [];

        /** HELPERS **/
        $scope.filtered = {};
        $scope.filtered.tagged = '';
        $scope.tagsFilter = AppHelpers.tagsFilter;
        $scope.setTag = AppHelpers.setTag;
        $scope.clearTag = AppHelpers.clearTag;
        $scope.showHideBlocks = AppHelpers.showHideBlocks;

        /** PARTIALS **/
        $scope.settings_browser             = { name: 'settings_browser', url: 'templates/shared/settings_browser.html'}
        $scope.nav                          = { name: 'nav', url: 'templates/shared/nav.html'}
        $scope.bc                           = { name: 'bc', url: 'templates/shared/bc.html'}
        $scope.snap                         = { name: 'snap', url: 'templates/shared/snap_test_output.html'}
        $scope.batch_run                    = { name: 'batch_run', url: 'templates/batches/run.html'}
        $scope.batch_index_partial          = { name: 'batch_index_partial', url: 'templates/batches/_index.html'}
        $scope.batch_create_edit_partial    = { name: 'batch_create_edit_partial', url: 'templates/batches/_create_edit_partial.html'}
        $scope.tests_table_partial          = { name: 'tests_table_partial', url: 'templates/batches/_test_table.html'}
        $scope.batch_settings_partial       = { name: 'batch_settings_partial', url: 'templates/batches/_batch_settings_partial.html'}
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
        } else if($scope.action == 'new') {
            $scope.nav_message = "Mocked data. You can filter, save and set as if really going to set."
        } else {
            $scope.nav_message = "Mocked data. You can click Create or View/Edit on Batch 102 as well as all the filters."
        }
        /** END PAGE SETUP **/

        /** Actions **/

        //TODO could this be just a subset of data at the site level
        // yes it could :(
        SitesSettings.query({sid: $routeParams.sid}, function(data){
            $scope.settings = data.data;
            $scope.browser_options = [];
            $scope.browsers = SiteHelpers.browsers();
            //@TODO DRY this up it is here and in siteSettingsCtrl
            angular.forEach($scope.browsers, function(v, i){
                if($scope.settings.saucelabs.browser.browser == v.browser && $scope.settings.saucelabs.browser.version == v.version) {
                    $scope.settingsForm.browserChosen = i;
                }
                $scope.browser_options.push(i);
            });
            //Set default URL to use
            angular.forEach($scope.settings.urls, function(v,i){
                if(v.default == 1) {
                    $scope.settingsForm.url_to_run = v;
                }
            });
        });


        //1. Get the Site data and settings
        //2. Action related setup
        $scope.batch_tags_to_run = ['@batch', '@smoke', '@regression', '@scheduled', '@monitoring'];
        $scope.batch_run_range = [{"name": 'Weekly'}, {"name": 'Daily'}, {"name":'Hourly'}, {"name":'15 Minutes'}];
        $scope.batchRunRangeSelected = $scope.batch_run_range[0];
        $scope.batch_run_days = ['M', 'T', 'W', 'Th', 'F', 'S', 'Su'];
        $scope.batch_start_time = new Date();
        $scope.batch_end_occurrence = {type: "occurrence", value: 1};
        $scope.batch_end_never = {type: "never", value: 0};
        $scope.batch_end_on_setting = {type: "on", value: new Date()};


        if($scope.action == 'new') {
            $scope.batch_end = {};
            $scope.tagsChosen  = [];
            $scope.sourceTags = [];
            $scope.foo = [];
            $scope.batch = {};
            $scope.batch.tags = [];
            $scope.page_title = "Create new batch test";
            BatchServices.get({sid: $routeParams.sid, bid: $routeParams.bid}, function(data) {
                $scope.site = data.data.site;

                $scope.sourceTags  = $scope.tagsFilter($scope.site.testFiles);
                $scope.breadcrumbs = [
                    {
                        title: $scope.site.title,
                        path:  "#/sites/" + $scope.site.nid
                    },

                    {
                        title: "Batches",
                        path: "#/sites/" + $scope.site.nid + '/batches'
                    },
                    {
                        title: "Batch New",
                        path: "#/sites/" + $scope.site.nid + '/batches/new'
                    }
                ]
            });
        } else if ($scope.action == 'view' || $scope.action == 'edit') {
            $scope.tagsChosen  = [];
            $scope.sourceTags = [];
            $scope.foo = [];
            $scope.batch = {};
            $scope.batch.tags = [];
            BatchServices.get({sid: $routeParams.sid, bid: $routeParams.bid}, function(data) {
                $scope.site = data.data.site;
                $scope.batch = data.data.batch;
                $scope.page_title = "Batch " + $scope.batch.name;


                $scope.sourceTags  = $scope.tagsFilter($scope.site.testFiles);
                $scope.breadcrumbs = [
                    {
                        title: $scope.site.title,
                        path:  "#/sites/" + $scope.site.nid
                    },

                    {
                        title: "Batches",
                        path: "#/sites/" + $scope.site.nid + '/batches'
                    },
                    {
                        title: $scope.batch.name,
                        path: "#/sites/" + $scope.site.nid + '/batches/' + $routeParams.bid
                    }
                ];
                $scope.setStartingTests($scope.batch);
                $scope.setStartingTags($scope.batch.batch_tags);
                $scope.setBatchRunDaysData($scope.batch.batch_run_days);
                $scope.setBatchEndOn($scope.batch.batch_end);
                $scope.setBrowsers($scope.batch.browsers);
                $scope.setEnv($scope.batch.environment);
            });
        } else {
            $scope.action = 'index';
            $scope.page_title = "Batch Tests"
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
            console.log($scope);
            Noty("Batch Created", 'success');
            $location.path("/sites/" + $routeParams.sid + "/batches");
        }

        $scope.setTagged = function() {
                console.log($scope.batch.tagInput);
                //$scope.tagged = $scope.batch.tagInput;
                if($scope.batch.tagInput.indexOf(" ") >= 0) {
                    console.log("We have a space");
                }
        }


        $scope.chosenTests = function(test_name) {
            console.log(test_name);
            if($scope.chosen.indexOf(test_name) == -1) {
                $scope.chosen.push(test_name);
            } else {
                $scope.chosen.splice(test_name, 1);
            }
        };


        /** Date picker **/
        $scope.cal = {};
        $scope.cal.opened = false;
        $scope.dateOptions = {
            'year-format': "'yy'",
            'starting-day': 1
        };

        $scope.openCal = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.cal.opened = true;

        };

        $scope.minDate = new Date();
        $scope.format = 'dd-MMMM-yyyy';
        $scope.showWeeks = true;
        /** End Date Picker **/

        /** Batch Settings **/

        $scope.chosenBatchTagsToRunData = [];
        $scope.chosenBatchTagsToRun = function(tag_name) {
            if($scope.chosenBatchTagsToRunData.indexOf(tag_name) == -1) {
                $scope.chosenBatchTagsToRunData.push(tag_name);
            } else {
                $scope.chosenBatchTagsToRunData.splice(tag_name, 1);
            }

            if($scope.chosenBatchTagsToRunData.length >= 1 || $scope.starting_batch_tags_to_run >= 1) {
                $scope.automate = true;
            } else {
                $scope.automate = false;
            }
        };

        $scope.chosenBrowsersToRunData = [];
        $scope.chosenBrowsersToRun = function(browser) {
            console.log(browser);
            if($scope.chosenBrowsersToRunData.indexOf(browser) == -1) {
                $scope.chosenBrowsersToRunData.push(browser);
            } else {
                $scope.chosenBrowsersToRunData.splice(browser, 1);
            }
        }

        $scope.chosenBatchRunDaysData = [];
        $scope.choseBatchRunDays = function(day) {
            if($scope.chosenBatchRunDaysData.indexOf(day) == -1) {
                $scope.chosenBatchRunDaysData.push(day);
            } else {
                $scope.chosenBatchRunDaysData.splice(day, 1);
            }
        };

        $scope.chosenEnvToRun = function(env) {
            if($scope.chosenEnvToRunData.indexOf(env) == -1) {
                $scope.chosenEnvToRunData.push(env);
            } else {
                $scope.chosenEnvToRunData.splice(env, 1);
            }
        };

        $scope.setStartingTests = function(tests) {
            angular.forEach(tests.tests, function(v, i){
                $scope.starting_tests[v.name_dashed] = 'true';
            });
        };

        $scope.setStartingTags = function(tags) {
            angular.forEach(tags, function(v, i){
                $scope.automate = true;
                $scope.starting_batch_tags_to_run[v] = 'true';
            });
        };

        $scope.setBrowsers = function(browsers) {
            angular.forEach(browsers, function(v, i){
                $scope.starting_browsers_to_run[v] = 'true';
            });
        };

        $scope.setEnv = function(environment) {
            angular.forEach(environment, function(v, i){
                $scope.starting_env_to_run[v.name] = 'true';
            });
        };

        $scope.setBatchRunDaysData = function(days) {
            angular.forEach(days, function(v, i){
                $scope.set_batch_run_days_data[v] = 'true';
            });
        };
        
        /** Batch End Settings **/
        $scope.setBatchEndOn = function(end_on) {
            if(end_on != undefined && end_on.type != undefined) {
                //Set the related value that 2 of the 3 have
                if(end_on.type == 'on') {
                    $scope.batch_end_on_setting.value = end_on.value
                } else if (end_on.type == 'occurrence') {
                    $scope.batch_end_occurrence.value = end_on.value;
                }
            }
        };

        $scope.updateEnd = function(type) {
            $scope.batch.batch_end.type = type;
            var value = false;
            if(type == 'never') {
                value = 0;
            } else if(type == 'occurrence') {
                value = $scope.batch_end_occurrence.value;
            } else {
                value = $scope.batch_end_on_setting.value;
            }
            $scope.batch.batch_end.value = value;
        };

        $scope.$watch('batch.batch_end.type', function(){
            if($scope.batch.batch_end != undefined) {
                if($scope.batch.batch_end.type == 'on') {
                    //set to today
                    $scope.batch.batch_end.value = new Date();
                    $scope.batch_end_on_setting.value = new Date();
                }
                if($scope.batch.batch_end.type == 'occurrence') {
                    //set better default
                    $scope.batch.batch_end.value = $scope.batch_end_occurrence.value;
                }
                if($scope.batch.batch_end.type == 'never') {
                    //set better default
                    $scope.batch.batch_end.value = 0;
                }
            }
        });
        /** END Batch End Settings here **/

        $scope.saveBatch = function(test_content, saveAndExit) {
            if (saveAndExit == true) {
                //redirect after save
            }
            //Parse the batch_end_on_setting_value data so that
            // I can put it back in the $scope.batch_end_on data
            // the form was a bit hard to mimic so this is the best
            // I could think of for now.
            // also $scope.chosenEnvToRunData might need some work to
            // fit back into the model

        }
    }]);