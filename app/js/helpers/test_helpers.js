var test_helpers = angular.module('test_helpers', []);

test_helpers.factory('TestHelpers', function(){
    return {
        //@TODO use the filter I made instead
        pluckResults: function(data) {
            var snag_behat_div = jQuery(data).get(9);
            return jQuery(snag_behat_div).html();
        },
        featureName: function(test_content, scope) {
            if(test_content != undefined) {
                var test_array = test_content.split("\n");
                angular.forEach(test_array, function(v,i){
                    if(v.indexOf('Feature') != -1) {
                        var get_name_array = v.split(":");
                        scope.feature_name = get_name_array[1];
                    }
                });
            }
        }
    }
});