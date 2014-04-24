var testsController = angular.module('testsController', ['ngSanitize']);

testsController.controller('TestEditController', ['$scope', '$http', '$location', '$route', '$routeParams', 'SitesServices', 'TestsServices', 'BehatServices', 'addAlert', 'runTest', 'closeAlert', 'ReportsTestsService', '$modal', 'Noty', '$sanitize', 'sanitizerFilter', 'SitesSettings', 'SiteHelpers', 'tagsPresent', 'TokensHelpers', 'BatchServices', 'snapRemote', 'SitesRepo',
    function($scope, $http, $location, $route, $routeParams, SitesServices, TestsServices, BehatServices, addAlert, runTest, closeAlert, ReportsTestsService, $modal, Noty, $sanitize, sanitizerFilter, SitesSettings, SiteHelpers, tagsPresent, TokensHelpers, BatchServices, snapRemote, SitesRepo){
        $scope.action = $routeParams.action;
        $scope.settingsForm = {};
        $scope.settingsForm.browserChosenBatch = [];
        $scope.blocks = {}
        $scope.blocks.testDetailsBlock = true;
        $scope.groups = {}

        /** PULL IN GENERAL SETTINGS **/
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
        /** END PULL IN GENERAL SETTINGS **/

        /** SETUP PAGE **/

        $scope.snapOpts = {
            minPosition: '-400',
            touchToDrag: false
        };

        $scope.reports_test_page            = { name: 'reports', url: 'templates/reports/reports_test_page.html'}
        $scope.reports                      = ReportsTestsService.get({sid: $routeParams.sid, tname: $routeParams.tname});
        $scope.settings_browser             = { name: 'settings_browser', url: 'templates/shared/settings_browser.html'}
        $scope.tags_to_run                  = { name: 'tags_to_run', url: 'templates/shared/tags_to_run.html'}
        $scope.tokens_to_use                = { name: 'tokens_to_use', url: 'templates/tokens/tokens_select_list.html'}
        $scope.settings_browser_checkboxes  = { name: 'settings_browser_checkbox', url: 'templates/shared/settings_browser_checkboxes.html'}
        $scope.ace                          = { name: 'ace', url: 'templates/shared/ace.html'}
        $scope.form                         = { name: 'form', url: 'templates/tests/form.html'}
        $scope.test_view_file               = { name: 'test_view_file', url: 'templates/tests/test_view_file.html'}
        $scope.nav                          = { name: 'nav', url: 'templates/shared/nav.html'}
        $scope.quick_test                   = { name: 'quick_test', url: 'templates/run/quick_test.html'}
        $scope.clone_block                  = { name: 'clone_block', url: 'templates/shared/clone_block.html'}
        $scope.tokens_admin                 = { name: 'tokens_admin', url: 'templates/tokens/tokens_admin.html'}
        $scope.bc                           = { name: 'bc', url: 'templates/shared/bc.html'}
        $scope.snap                         = { name: 'snap', url: 'templates/shared/snap_test_output.html'}

        if($scope.action == 'edit') {
            $scope.nav_message = "Mocked data. You can click on <b>any form item</b> as well as <b>run</b> and <b>any left side nav</b> <b>save</b> as well as use <b>Ace Editor</b> you can <b>Clone</b> to site 3"
        } else {
            $scope.nav_message = "Mocked data. You can click on <b>any form item</b> as well as <b>run</b> and Clone"
        }
        $scope.steps = {}
        $scope.form_tags = {}
        $scope.steps.default = "Your Step Here..."

        $scope.test_results = '<strong>Click run to see results...</strong>';

        $scope.token = $http({method: 'GET', url:'/services/session/token'}).success(
            function(data, status, headers, config){
                $http.defaults.headers.post['X-CSRF-Token'] = data;
            }
        );

        /** END SETUP PAGE **/


        $scope.tagsPresentInTest = [];
        $scope.$watch('test_content', function(){
            $scope.tagsPresentInTest = tagsPresent($scope.test_content);
        });

        $scope.tests = TestsServices.get({sid: $routeParams.sid, tname: $routeParams.tname}, function(data) {
            $scope.test = data;
            $scope.tokens = data.tokens;
            $scope.test_content = data.content;
            $scope.test_html = data.content_html;
        });

        /**** TOKENS ***/
        $scope.tokensForm = {};

        $scope.updateTokens = function(tokensForm, token_name) {
            TokensHelpers.updateTokens($routeParams.sid, $routeParams.tname, token_name, tokensForm);
        };

        $scope.addTokenRow = function(tokensForm) {
            Noty("New row added", 'success');
            TokensHelpers.tokensAppendRow(tokensForm);
        };

        $scope.addTokenSet = function() {
            var newSet = TokensHelpers.newTokenSet($routeParams.tname);
            $scope.tokens[newSet.name] = newSet.set;
        };

        $scope.cloneTokens = function(parent_set) {
            var name                = TokensHelpers.makeName($scope.test.name);
            $scope.tokens[name]     = parent_set;
        };
        /**** END TOKENS ***/


        $scope.editor = {};

        /**** ACE EDITOR ****/

        $scope.aceLoaded = function(_editor) {
            var _session = _editor.getSession();
            var _renderer = _editor.renderer;
            $scope.editor = _editor;
            // Options
            _editor.setReadOnly(false);
            _editor.setShowInvisibles(true);
            _editor.setDisplayIndentGuides(true);
            _session.setUndoManager(new ace.UndoManager());
            _renderer.setShowGutter(true);

            _session.on("change", function(){
                var value = _editor.getValue();
                $scope.test_content = value;
            })
        }
        /*** END ACE ***/

        /*** PULL IN SITE INFO ***/
        SitesServices.get({sid: $routeParams.sid}, function(data) {
            $scope.site = data;
            $scope.breadcrumbs = [
                {
                    path: '#/site/' + $scope.site.nid,
                    title: $scope.site.title
                },
                {
                    path: '#/site' + $scope.site.nid + '/' + $scope.test.name_dashed,
                    title: $scope.test.name
                }
            ];
        });

        $scope.syncRepo = function() {
            SitesRepo.sync(
                {
                    sid: '111',
                    branch_name: 'master'
                }, function(data) {
                    Noty(data.message, 'success');
                }, function(err) {
                    Noty(err.message, 'error');
                });
        }
        /*** END PULL IN SITE INFO ***/

        /*** PULL IN SITES INFO ***/
        //Need more data to do the pull down list as well
        //@TODO maybe the server should offer this list
        $scope.sites = SitesServices.getSites(function(data){
            $scope.sites = data;
        });



        /*** END PULL IN SITES INFO ***/

        /** RUNNING A TEST **/
        $scope.runTest = function() {
            snapRemote.open('right');
            Noty("Running Test", 'success');
            runTest('success', 'Running test...', $scope);
        };
        /** END RUNNING A TEST **/

        /** BATCH AREA **/
        $scope.toggleBatchBrowser = function(browser) {
            var idx = $scope.settingsForm.browserChosenBatch.indexOf(browser);
            if (idx > -1) {
                $scope.settingsForm.browserChosenBatch.splice(idx, 1);
            }
            else {
                $scope.settingsForm.browserChosenBatch.push(browser);
            }
        };

        $scope.batchRunDisabled = function() {
            if($scope.settingsForm.browserChosenBatch.length == 0) {
                return true;
            }
            return false;
        }

        $scope.runBatch = function() {
            //@TODO send batch job to url
            var params = {
                'batch_settings': $scope.settingsForm,
                'testData': $scope.test
            };

            BatchServices.runOnce({sid: $routeParams.sid}, params, function(data){
                Noty(data.message, 'success');

            }, function(data){
                Noty(data.message, 'error');
            })
        }
        /** END BATCH AREA **/

        $scope.saveTest = function(model) {
            Noty('Saving test..', 'success');
            $scope.test.content = model;
            $scope.test.content_html = '';
            var params = {
                'test': $scope.test,
                'site': $scope.site
            }
            $results = TestsServices.update({sid: $routeParams.sid, tname: $routeParams.tname}, params);
            Noty('Test Saved...', 'success');
        }

        $scope.addTag = function(tags) {
            var text = $scope.test_content.split("\n");
            if(text[0].indexOf('@') != -1) {
                var tags = text[0] + " " + tags;
                tags = sanitizerFilter(tags);
                text[0] = tags;
                $scope.test_content = text.join("\n");
            } else {
                tags = sanitizerFilter(tags);
                $scope.test_content = tags + "\n" + $scope.test_content;
            }
            $scope.steps.testDetails.tag = '';
            $scope.editor.setValue($scope.test_content);
            Noty('Tag Added ' + tags + '...');
        }

        $scope.addFeature = function(feature) {
            var test_content = $scope.test_content.split("\n");
            var new_feature = feature.feature + ' "' + feature.arg_1 + '"';
            var found = false;
            angular.forEach(test_content, function(v, i){
                if(v.indexOf('Feature') != -1) {
                    found = true;
                    test_content[i] = new_feature;
                }
            });
            if(found == false) {
                if(test_content[0].indexOf('@') == -1) {
                    test_content[0] = new_feature;
                } else {
                    test_content[1] = new_feature;
                }
            }
            $scope.test_content = test_content.join("\n");
            $scope.editor.setValue($scope.test_content);
            Noty('Feature Added ' + new_feature + '...', 'success');
        }

        $scope.addStep = function(step) {
            var build = [];
            var count = 1;
            angular.forEach(step, function(v, k){
                var output = '';
                if(typeof(v) === 'string') {
                    if(k.indexOf('arg_') != -1) {
                        output = '"' + v + '"'
                    } else {
                        output = v;
                    }
                }

                if(count === 1) {
                    if(k !== 'feature') {
                        if(k === 'background' || k === 'scenario') {
                            output = '  ' + output;
                        } else {
                            output = '    ' + output;
                        }
                    }
                }
                if (output.length !== 0) {
                    output = sanitizerFilter(output);
                    build.push(output);
                }
                count++;
            });
            var new_step = build.join(' ');
            $scope.test_content = $scope.test_content + "\n" + new_step;
            $scope.editor.setValue($scope.test_content);
            Noty('Step Added ' + new_step + '...', 'success');
        };

        $scope.search = '';

        $scope.searchForms = function(search) {
            $scope.search = search;
        }

        $scope.showForm = function(form_tags_form) {
            //Because we are set to False at first this has to turn on all to begin with
            if($scope.search !== '') {
                $scope.showHideGroup('all');
                var tags    = angular.lowercase(form_tags_form);
                var search  = angular.lowercase($scope.search);
                if(tags.indexOf(search) !== -1) {
                   return true;
                } else {
                   return false;
                }

            } else {
                return true;
            }
        }

        $scope.showHideBlocks = function(block) {
            angular.forEach($scope.blocks, function(v, k){
                if ( k == block ) {
                    $scope.blocks[k] = true;
                } else {
                    $scope.blocks[k] = false;
                }
            });
        }

        $scope.showHideGroup = function(group) {

            angular.forEach($scope.groups, function(v, k){
                if ( k == group || group == 'all') {
                    $scope.groups[k] = false;
                } else {
                    $scope.groups[k] = true;
                }
            });
        };

        $scope.cloneTest = function (site) {
            $scope.site_to_clone_to = site;
            var cloneModalInstanceCtrl = $modal.open({
                templateUrl: 'templates/shared/modal_clone.html',
                controller: 'CloneTestCtrl',
                resolve: {
                    site_chosen: function () {
                        return $scope.site_to_clone_to;
                    }
                }
            });

            cloneModalInstanceCtrl.result.then(function (selectedItem) {
                //$scope.selected = selectedItem;
                console.log($scope.test_content)
                //1 get the latest content
                $scope.test.content = $scope.test_content;
                //1 get the content
                //2 get the site id to set the new path
                //3 pass the get as needed to the Service
                var params = {
                    'test': $scope.test,
                    'site': $scope.site_to_clone_to
                }

                TestsServices.create({sid: $scope.site_to_clone_to.nid}, params, function(data){
                    if(data.error === 0){
                        $location.path("/sites/" + $scope.site_to_clone_to.nid + "/tests/" + data.data.name_dashed + "/edit");
                    } else {
                        Noty('Could not save the test.', 'error');
                    }
                });

            }, function () {
                Noty('Clone was canceled no new file made', 'success');
            });
        };

    }]);

testsController.controller('TestNewController', ['$scope', '$http', '$location', '$route', '$routeParams', 'SitesServices', 'TestsServices',
    function($scope, $http, $location, $route, $routeParams, SitesServices, TestsServices){
        $scope.token = $http({method: 'GET', url:'/services/session/token'}).success(
            function(data, status, headers, config){
                $http.defaults.headers.post['X-CSRF-Token'] = data;
            }
        );

        $scope.ace = { name: 'ace', url: 'templates/shared/ace.html'}
        $scope.form = { name: 'form', url: 'templates/tests/form.html'}
        $scope.nav = { name: 'nav', url: 'templates/shared/nav.html'}
        $scope.nav_message = "Mocked data. <b>Not much here go and edit <a href='#/sites/2/tests/test2_feature/edit'>test2</a></b>"

        $scope.test = {};
        $scope.site = {};

        var name = new Date().getTime();
        name = name + '.feature';

        $scope.test.name = name;
        $scope.test_content = "Feature: Start Your Test..";
        SitesServices.get({sid: $routeParams.sid}, function(data) {
            $scope.site = data;
            $scope.test = {
                "name": $scope.test.name,
                "path": $scope.site.test_files_root_path + '/' + name,
                "content": ''
            };
        });

        $scope.saveTest = function(model) {
            //1. take the latest model and pass it to the endpoint
            $scope.test.content = model;
            var params = {
                'test': $scope.test,
                'site': $scope.site
            }

            TestsServices.create({sid: $routeParams.sid}, params, function(data){
                if(data.errors === 0){
                    console.log(data);
                    $location.path("/sites/" + $scope.site.nid + "/tests/" + data.data.name_dashed + "/edit");
                } else {
                    //output a message to the user
                }
            });
        }

        $scope.testLoaded = function(_editor) {
            var _session = _editor.getSession();
            var _renderer = _editor.renderer;

            // Options
            _editor.setReadOnly(true);
            _editor.setShowInvisibles(true);
            _editor.setDisplayIndentGuides(true);
            _session.setUndoManager(new ace.UndoManager());
            _renderer.setShowGutter(true);
        }
    }]);