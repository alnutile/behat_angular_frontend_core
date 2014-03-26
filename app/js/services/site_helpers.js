var sites_helpers = angular.module('sites_helpers', []);

sites_helpers.factory('SiteHelpers', [ function(){
        return {
            getSiteName: function(site_id, sites) {
                var name = "Site Name";
                angular.forEach(sites, function(v){
                    if(v.id == site_id) {
                        name = v.name;
                    }
                });
                return name;
            }
        }
    }]);