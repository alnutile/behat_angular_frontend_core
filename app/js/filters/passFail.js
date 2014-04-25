var passFail = angular.module('passFailFilter', []);

passFail.filter('passFailFilter', [
    function(){
        return function(text) {
            if(text == 1 || text == "1") {
                return '<i class="glyphicon glyphicon-thumbs-up"></i>';
            } else if (text == 3 || text == "3") {
                return '<i class="glyphicon glyphicon-exclamation-sign"></i>';
            } else if (text == 0 || text == "0") {
                return '<i class="glyphicon glyphicon-thumbs-down"></i>';
            } else {
                return '<i class="glyphicon glyphicon-minus"></i>';
            }
        }
    }]).filter('passFailText', [
        function() {
            return function(text) {
                if(text == 1 || text == "1") {
                    return 'Pass'
                } else {
                    return 'Fail';
                }
            }
        }
    ]);