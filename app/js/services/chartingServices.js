var chartingServices = angular.module('chartingServices', []);

chartingServices.factory('passFail', ['$rootScope',
        function($rootScope){
            return function(data, $scope) {
                //Charts
                $scope.charts = {};
                $scope.charts.passing = 0;
                $scope.charts.failing = 0;
                $scope.charts.not_running = 0;
                $scope.charts.total = 0;
                $scope.charts.coverage = 0;
                $scope.charts.usd_save = 0;
                $scope.sites_results = {};

                var setSiteName = function(site_id) {
                    var title;
                    angular.forEach($scope.sites, function(v,i){
                        if(v.nid == site_id) {
                            title = v.title;
                        }
                    });
                    return title;
                };

                var siteAdd = function(v, state) {
                    $scope.sites_results[v.site_id] =  $scope.sites_results[v.site_id] || {};
                    $scope.sites_results[v.site_id].passing     = ($scope.sites_results[v.site_id].passing == undefined) ? 0 : $scope.sites_results[v.site_id].passing;
                    $scope.sites_results[v.site_id].failing     = ($scope.sites_results[v.site_id].failing == undefined) ? 0 : $scope.sites_results[v.site_id].failing;
                    $scope.sites_results[v.site_id].not_running = ($scope.sites_results[v.site_id].not_running == undefined) ? 0 : $scope.sites_results[v.site_id].not_running;

                    if(state == 'passing') {
                        $scope.sites_results[v.site_id].passing     =  $scope.sites_results[v.site_id].passing + 1;
                    } else if(state == 'failing') {
                        $scope.sites_results[v.site_id].failing     =  $scope.sites_results[v.site_id].failing + 1;
                    } else {
                        $scope.sites_results[v.site_id].not_running =  $scope.sites_results[v.site_id].not_running + 1;
                    }
                    $scope.sites_results[v.site_id].site_name = setSiteName(v.site_id);
                    //@TODO just for example data
                    $scope.sites_results[v.site_id].goal = Math.floor((Math.random()*20)+10);

                };

                angular.forEach(data, function(v,i){
                    $scope.charts.total = $scope.charts.total + 1;
                    if(v.status == 1) {
                        $scope.charts.passing = $scope.charts.passing + 1;
                        siteAdd(v, 'passing');
                    } else if (v.status == 0) {
                        $scope.charts.failing = $scope.charts.failing + 1;
                        siteAdd(v, 'failing');
                    } else {
                        $scope.charts.not_running = $scope.charts.not_running + 1;
                        siteAdd(v, 'not_running');
                    }
                    $scope.charts.coverage = $scope.charts.total - $scope.charts.not_running;
                    $scope.charts.usd_save = $scope.charts.coverage * 10 * 125;
                });

                $scope.chartsPassingFailing = {};
                $scope.chartsPassingFailing.data =  {
                    "cols" : [
                        {id: "states", label: "Test States", type: "string", "p": {}},
                        {id: "t", label: "State", type: "number", "p": {}},
                    ], "rows": [
                        {c: [
                            {
                                v: "Passing"
                            },
                            {
                                v: $scope.charts.passing
                            }
                        ]},
                        {c: [
                            {
                                v: "Failing"
                            },
                            {
                                v: $scope.charts.failing
                            }
                        ]
                        },
                        {c:
                            [
                                {
                                    v: "Not Run"
                                },
                                {
                                    v: $scope.charts.not_running
                                }
                            ]
                        },
                    ]};

                $scope.chartsPassingFailing.type = 'PieChart';
                $scope.chartsPassingFailing.options = {
                    'title': "All Sites Passing Failing",
                    'isStacked': "false"
                }
            }
        }]);