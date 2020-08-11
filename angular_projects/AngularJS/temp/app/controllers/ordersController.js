(function() {
    var OrdersController = function ($scope, $routeParams, customersFactory) {
        var customerId = $routeParams.customerId;
        $scope.customer = null;

        function init() {
            // async call
            // customersFactory.getCustomer(customerId)
            // .success(function(customer) {
            //     $scope.customer = customer;
            // })
            // .error(function(data, status, headers, config) {
            //     $log.log(data.error + ' ' + status);
            // });
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