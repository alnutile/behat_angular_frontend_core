var dateRange = angular.module('dateRange', []);

dateRange.filter('dateRange', ['dateFilter',
    function(dateFilter){
        return function(text, scope) {
            console.log(text);
//            if(scope.startDate != '') {
//                var startDateFormatted = dateFilter(scope.startDate,'yyyy-MM-dd');
//                if(text >= startDateFormatted) {
//                    return text
//                }
//            } else {
//                return text;
//            }
            return text;
        }
    }]);