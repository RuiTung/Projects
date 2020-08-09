(function() {
    var OrdersController = function ($scope, $routeParams) {
        var customerId = $routeParams.customerId;
        $scope.orders = null;

        function init() {
            for(var i = 0, len = $scope.customers.length; i < len; i++) {
                if($scope.customers[i].id === parseInt(customerId)) {
                    $scope.orders = $scope.customers[i].orders;
                    break;
                }
            }
        }

        $scope.customers = [
            {
                id: 1,
                joined: '2020,-01-01',
                name: 'Abel',
                city: 'Van',
                orderTotal: 3.86,
                orders: [
                    {
                        id: 1,
                        product: 'shoes',
                        total: 3.86
                    }
                ]
            },
            {
                id: 2,
                joined: '2018-08-27',
                name: 'Billy',
                city: 'Van',
                orderTotal: 11.38,
                orders: [
                    {
                        id: 2,
                        product: 'candy',
                        total: 3.38
                    },
                    {
                        id: 3,
                        product: 'bat',
                        total: 8
                    }
                ]
            },
            {
                id: 3,
                joined: '2020-08-21',
                name: 'Zoe',
                city: 'Vic',
                orderTotal: 101,
                orders: [
                    {
                        id: 1,
                        product: 'bottle',
                        total: 101
                    }
                ]
            }, 
            {
                id: 4,
                joined: '1944-01-01',
                name: 'Tu',
                city: 'Ab',
                orderTotal: 888231.21,
                orders: [
                    {
                        id: 1,
                        product: 'bag',
                        total: 888231.21
                    }
                ]
            }
        ];
        init();
        $scope.doSort = function(propName) {
            $scope.sortBy = propName;
            $scope.reverse = !$scope.reverse;
        };
    };
    OrdersController.$inject = ['$scope', '$routeParams'];
    angular.module('customersApp')
        .controller('OrdersController', OrdersController);

}());