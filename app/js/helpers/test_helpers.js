var test_helpers = angular.module('test_helpers', []);

test_helpers.factory('TestHelpers', function(){
    return {
        pluckResults: function(data) {
            var snag_behat_div = jQuery(data).get(9);
            return jQuery(snag_behat_div).html();
        }
    }
});