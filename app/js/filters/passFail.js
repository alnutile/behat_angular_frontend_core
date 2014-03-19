var passFail = angular.module('passFailFilter', []);

passFail.filter('passFailFilter', [
    function(){
        return function(text) {
            if(text == 1) {
                return '<i class="glyphicon glyphicon-exclamation-sign"></i>';
            } else if (text == 3) {
                return '<i class="glyphicon glyphicon-exclamation-sign"></i>';
            } else {
                return '<i class="glyphicon glyphicon-thumbs-down"></i>';
            }
        }
    }]);