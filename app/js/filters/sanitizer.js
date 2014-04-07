var sanitizer = angular.module('sanitizer', []);
sanitizer.filter("sanitizer", function() {
    var escapeHtml = function(unsafe) {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    };

    return function(value) {
        value = escapeHtml(value);
        return value;
    };
});

