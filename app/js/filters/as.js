var asFilter = angular.module('asFilter', []);
asFilter.filter("as", function($parse) {
    return function(value, path) {
        return $parse(path).assign(this, value);
    };
});