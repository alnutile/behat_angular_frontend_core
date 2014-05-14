var resultsFilter = angular.module('resultsFilter', []);

resultsFilter.filter('resultsFilter', [
        function(){
            return function(data) {
                var snag_behat_div = jQuery(data).get(9);
                return jQuery(snag_behat_div).html();
            }
        }]);