var help_ui = angular.module('help_ui', []);

/**
 * Ideally this the whole snap integration would be more generic right now this shares the testing snap
 * content area
 */
help_ui.factory('HelpUi', ['$http', '$rootScope', 'snapRemote', 'Noty', '$sce',
    function($http, $rootScope, snapRemote, Noty, $sce){
    return {
        helpOpen: function(page, title) {
            $rootScope.snapOpts = {
                minPosition: '-400',
                touchToDrag: false
            };
            Noty('Loading help', 'success');
            $rootScope.snap_content = {
                title: '',
                body: ''
            };
            $rootScope.snap_content.title = (title) ? title : '';
            page         = (page && page.length > 0) ? '/' + page : '';
            //Since it is a cross domain I let the server get it
            $http.get('/behat_editor_services_v2/help' + page).success(function(results){
                $rootScope.snap_content.body = $sce.trustAsHtml(results.data.data);
                snapRemote.open('right');
                return results;
            });
        }
    }
}]);