var cloneTestCtrl = angular.module('cloneTestCtrl', []);

cloneTestCtrl.controller('CloneTestCtrl', ['$scope', '$modalInstance', 'site_chosen',
    function($scope, $modalInstance, site_chosen){
        $scope.site_chosen = site_chosen;

        $scope.site_Name = site_chosen.title;

        $scope.ok = function () {
            //@TODO post to new site url and redirect there
            $modalInstance.close();
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

    }]);