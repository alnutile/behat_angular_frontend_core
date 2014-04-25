var reports_helper = angular.module('reports_helper', []);

reports_helper.factory('ReportHelpers', ['ReportsTestsService', function(ReportsTestsService){
    var report,
        self;

    return {
        getReports: function(site_id, test_name) {
            return ReportsTestsService.get({sid: site_id, tname: test_name});
        }
    }
}]);