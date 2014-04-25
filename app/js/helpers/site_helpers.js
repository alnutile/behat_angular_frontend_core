var sites_helpers = angular.module('sites_helpers', []);

sites_helpers.factory('SiteHelpers', [ function(){
        var browsers = {
            'IE 11': { browser: 'internet explorer', version: '11', platform: 'Windows 8.1' },
            'IE 10': { browser: 'internet explorer', version: '10', platform: 'Windows 8' },
            'IE 9': { browser: 'internet explorer', version: '9', platform: 'Windows 7' },
            'Firefox 26': { browser: 'firefox', version: '25', platform: 'Linux' },
            'Firefox 25': { browser: 'firefox', version: '26', platform: 'Linux' },
            'iPad - 6.1': { browser: 'ipad', version: '6.1', platform: 'Mac 10.8' },
            'iPhone - 6.1': { browser: 'iphone', version: '6.1', platform: 'Mac 10.8' },
            'Safari 6': { browser: 'safari', version: '6', platform: 'Mac 10.8' },
            'Google Chrome - 30': { browser: 'chrome', version: '30', platform: 'Linux' },
            'Android 4.3': { browser: 'android', version: '4.3', platform: 'Linux' }
        };

        return {
            getSiteName: function(site_id, sites) {
                var name = "Site Name";
                angular.forEach(sites, function(v){
                    if(v.id == site_id) {
                        name = v.name;
                    }
                });
                return name;
            },

            getBrowserObejectFromBrowser: function(browser) {
                var browserObject = {};
                angular.forEach(browsers, function(v,i){
                    if(i === browser) {
                        browserObject = v;
                    }
                });
                return browserObject;
            },

            browsers: function() {
                var b = browsers;

                return b;
            }
        }
    }]);