var tagsService = angular.module('tagsService', []);

tagsService.
    factory('tagsPresent', ['$rootScope',
    function($rootScope){
        return function(test) {
            var tags = [];
            var output = test;
            if(output) {
                var output_array = output.split("\n");
                angular.forEach(output_array, function(v,i){
                    if (v.indexOf('@') !== -1) {
                        var check_for_space = v.split(" ");
                        angular.forEach(check_for_space, function(v2, i2){
                            if(v2.indexOf('@') !== -1 && tags.indexOf(v2.trim()) === -1) {
                                tags.push(v2.trim());
                            }
                        })
                    }
                });
            }
            return tags;
        }
    }]);