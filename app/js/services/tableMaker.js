var tableMaker = angular.module('tableMaker', []);

tableMaker.factory('TableMaker', ['$rootScope', 'ngTableParams', '$filter',
        function($rootScope, ngTableParams, $filter){
            return function(data) {
                return new ngTableParams({
                    page: 1,
                    count: 10 ,
                    sorting: {
                        name: 'asc'
                    }
                }, {
                    total: data.length, // length of data
                    getData: function($defer, params) {
                        var orderedData = params.sorting() ?
                            $filter('orderBy')(data, params.orderBy()) :
                            data;

                        $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                    }
                });
            }
        }]);