var siteName = angular.module('siteName', []);

siteName.filter('siteName', [
    function(){
        return function(text, scope) {
            if(text !== undefined){
                angular.forEach(scope.sites, function(value, index){
                    if(value.nid == text) {
                        text = value.title;
                    }
                });
            }
            return text;
        }
    }]);