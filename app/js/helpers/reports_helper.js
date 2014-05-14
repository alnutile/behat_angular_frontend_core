var reports_helper = angular.module('reports_helper', []);

reports_helper.factory('ReportHelpers', ['ReportsTestsService', 'ReportsBatchServices', function(ReportsTestsService, ReportsBatchServices){
    var report,
        self;

    return {
        getReports: function(site_id, test_name) {
            return ReportsTestsService.get({sid: site_id, tname: test_name});
        },
        getBatchReports: function(site_id, bid, rid) {
            return ReportsBatchServices.query({sid: site_id, bid: bid, rid: rid});
        },
        getBatchReport: function(site_id, bid, rid) {
            return ReportsBatchServices.get({sid: site_id, bid: bid, rid: rid});
        }
    }
}]);