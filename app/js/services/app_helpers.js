var app_helpers = angular.module('app_helpers', []);

app_helpers.factory('AppHelpers', ['$rootScope',
    function($rootScope){
        return {
            sortOrder: function(column) {
                if ($rootScope.reverse == true) {
                    $rootScope.reverse = false;
                    $rootScope.sort = column;
                } else {
                    $rootScope.reverse = true;
                    $rootScope.sort = column;
                }
            },
            selectedCls: function(column) {
                if (column == $rootScope.sort || column == '-' + $rootScope.sort ) {
                    if($rootScope.reverse == true) {
                        return "glyphicon-sort-by-attributes-alt";
                    } else {
                        return 'glyphicon-sort-by-attributes';
                    }
                }
            }
        }
    }]);