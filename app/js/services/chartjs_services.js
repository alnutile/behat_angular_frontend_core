var chartjs_services = angular.module('chartjs_services', []);

chartjs_services.factory('ChartsPassFail', ['SiteHelpers', function(SiteHelpers){
            return function(reports){
                var site_reports = [];

                //@TODO move the method doing the reports
                //  work now into a service and remove the below
                //  build_sites_array
                //  or move it here
                var build_sites_array = function(reports) {
                angular.forEach(reports, function(v,i){
                        site_reports[v.site_id] = site_reports[v.site_id] || {};
                        site_reports[v.site_id] = site_reports[v.site_id] || {};
                        ( site_reports[v.site_id].passing == undefined ) ? site_reports[v.site_id].passing = 0 : null;
                        ( site_reports[v.site_id].failing == undefined ) ? site_reports[v.site_id].failing = 0 : null;
                        ( site_reports[v.site_id].site_id == undefined ) ? site_reports[v.site_id].site_id = v.site_id : null;

                        if(v.status == "1") {
                            if (isNaN(site_reports[v.site_id].passing)) {
                                site_reports[v.site_id].passing = 1;
                            } else {
                                site_reports[v.site_id].passing = site_reports[v.site_id].passing + parseInt(1);
                            }
                        } else {
                            if (isNaN(site_reports[v.site_id].failing)) {
                                site_reports[v.site_id].failing = 1;
                            } else {
                                site_reports[v.site_id].failing = site_reports[v.site_id].failing + parseInt(1);
                            }
                        }
                        site_reports[v.site_id].total = site_reports[v.site_id].failing + site_reports[v.site_id].passing;
                    });
                    return site_reports;
                };

                var charts_array        = [];
                var chart_labels_array  = [];
                var chart               = [];
                var chart_labels        = []

                angular.forEach(reports, function(v){


                    charts_array.push(
                        {'chart':
                            [{
                                value: v.passing,
                                color:"#F38630"
                            },
                            {
                                value: v.failing,
                                color: "#E0E4CC"
                            }],
                            'passing': v.passing,
                            'failing': v.failing,
                            'name': v.site_name
                        }
                    );
                });

                return {'charts': charts_array};
            }
        }]);