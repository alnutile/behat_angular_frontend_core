var passFail = angular.module('passFail', []);

passFail.filter('passFail', [,
    function(){
        return function(text) {
            if(text == 1) {
                return '<i class="glyphicon glyphicon-thumbs-up"></i>';
            } else {
                return '<i class="glyphicon glyphicon-thumbs-down"></i>';
            }
        }
    }]);