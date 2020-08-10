(function() {
    var OrdersController = function ($scope, $routeParams, customersFactory) {
        var customerId = $routeParams.customerId;
        $scope.customer = null;

        function init() {
            $scope.customer = customersFactory.getCustomer(customerId);
        }

        init();
        $scope.doSort = function(propName) {
            $scope.sortBy = propName;
            $scope.reverse = !$scope.reverse;
        };
    };
    OrdersController.$inject = ['$scope', '$routeParams', 'customersFactory'];
    angular.module('customersApp')
        .controller('OrdersController', OrdersController);

}());