(function() {
    var customizeApp = angular.module('directivesModule', []);
    customizeApp.directive('helloWorld', function() {
        return {
            template: 'Hello World'
        };
    });
}());