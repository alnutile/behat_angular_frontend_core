var testsController = angular.module('testsController', ['ngSanitize']);

testsController.controller('TestController', ['$scope', '$http', '$location', '$route', '$routeParams', 'SitesServices', 'TestsServices', 'BehatServices', 'addAlert', 'runTest', 'closeAlert', 'Noty',
    function($scope, $http, $location, $route, $routeParams, SitesServices, TestsServices, BehatServices, addAlert, runTest, closeAlert, Noty){
        $scope.nav = { name: 'nav', url: 'templates/nav.html'}
        $scope.nav_message = "Mocked data. You can click on <b>run</b> or <b>edit</b>"
        $scope.test_results = '<strong>Click run to see results...</strong>';

        $scope.tests = TestsServices.get({sid: $routeParams.sid, tname: $routeParams.tname}, function(data) {
            $scope.test = data;
            $scope.test_html = data.content_html;
        });
        $scope.sites = SitesServices.get({sid: $routeParams.sid}, function(data) {
            $scope.site = data;
        });

        $scope.runTest = function() {
              runTest('success', 'Running test...', $scope);
        }
    }]);

testsController.controller('TestEditController', ['$scope', '$http', '$location', '$route', '$routeParams', 'SitesServices', 'TestsServices', 'BehatServices', 'addAlert', 'runTest', 'closeAlert', 'ReportsTestsService', '$modal', 'Noty', '$sanitize', 'sanitizerFilter', 'SitesSettings',
    function($scope, $http, $location, $route, $routeParams, SitesServices, TestsServices, BehatServices, addAlert, runTest, closeAlert, ReportsTestsService, $modal, Noty, $sanitize, sanitizerFilter, SitesSettings){

        $scope.blocks = {}
        $scope.blocks.testDetailsBlock = true;
        $scope.groups = {}
        $scope.reports_test_page  = { name: 'reports', url: 'templates/reports_test_page.html'}

        SitesSettings.query({sid: $routeParams.sid}, function(data){
            $scope.settings = data.data;
        });



        $scope.reports = ReportsTestsService.get({sid: $routeParams.sid, tname: $routeParams.tname});
        $scope.settings_browser = { name: 'settings_browser', url: 'templates/shared/settings_browser.html'}
        $scope.ace          = { name: 'ace', url: 'templates/ace.html'}
        $scope.form         = { name: 'form', url: 'templates/form.html'}
        $scope.nav          = { name: 'nav', url: 'templates/nav.html'}
        $scope.quick_test   = { name: 'quick_test', url: 'templates/run/quick_test.html'}
        $scope.bc = { name: 'bc', url: 'templates/bc.html'}

        $scope.nav_message = "Mocked data. You can click on <b>any form item</b> as well as <b>run</b> and <b>any left side nav</b> <b>save</b> as well as use <b>Ace Editor</b> you can <b>Clone</b> to site 3"
        $scope.steps = {}
        $scope.form_tags = {}
        $scope.steps.default = "Your Step Here..."

        $scope.test_results = '<strong>Click run to see results...</strong>';

        $scope.token = $http({method: 'GET', url:'/services/session/token'}).success(
            function(data, status, headers, config){
                $http.defaults.headers.post['X-CSRF-Token'] = data;
            }
        );
        $scope.tests = TestsServices.get({sid: $routeParams.sid, tname: $routeParams.tname}, function(data) {
            $scope.test = data;
            $scope.test_content = data.content;
            $scope.test_html = data.content_html;
        });

        $scope.editor = {};

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

        //Need more data to do the pull down list as well
        //@TODO maybe the server should offer this list
        $scope.sites = SitesServices.getSites(function(data){
            $scope.sites = data;
        });

        $scope.runTest = function() {
            runTest('success', 'Running test...', $scope);
        }

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
                output = sanitizerFilter(output);
                build.push(output);
                count++;
            });
            var new_step = build.join(' ');
            $scope.test_content = $scope.test_content + "\n" + new_step;
            $scope.editor.setValue($scope.test_content);
            Noty('Step Added ' + new_step + '...', 'success');
        };

        $scope.search = '';

        $scope.searchForms = function(search) {
            console.log(search);
            $scope.search = search;
        }

        $scope.showForm = function(form_tags_form) {
            if($scope.search !== '') {
                if(form_tags_form.indexOf($scope.search) !== -1) {
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
                templateUrl: 'templates/modal_clone.html',
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

        $scope.ace = { name: 'ace', url: 'templates/ace.html'}
        $scope.form = { name: 'form', url: 'templates/form.html'}
        $scope.nav = { name: 'nav', url: 'templates/nav.html'}
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