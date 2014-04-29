var tags = angular.module('tags', []);
tags.filter("tagged", function($parse) {
    return function(tests_all, scope) {
        var tests_filtered = tests_all;
        if(scope.tagsChosen.length > 0) {
            tests_filtered = [];
            angular.forEach(tests_all, function(test, i){
                var tagged = 0;
                angular.forEach(test.tags, function(v,i){
                    if (scope.tagsChosen.indexOf(v) != -1) {
                        tagged = tagged + 1;
                    }
                });
                if (tagged == scope.tagsChosen.length) {
                    tests_filtered.push(test);
                }
            });
            return tests_filtered;
        } else {
            return tests_filtered;
        }
    };
});