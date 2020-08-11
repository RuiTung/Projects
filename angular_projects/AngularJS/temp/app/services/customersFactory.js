(function() {
    var customersFactory = function() {
        var customers = [
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
                        id: 4,
                        product: 'water bottle',
                        total: 101
                    }
                ]
            }, 
            {
                id: 4,
                joined: '1944-01-01',
                name: 'Tu',
                city: 'Cal',
                orderTotal: 888231.21,
                orders: [
                    {
                        id: 5,
                        product: 'bag',
                        total: 888231.21
                    }
                ]
            }
        ];

        var factory = {};
        factory.getCustomers = function() {
            return customers;
        };

        factory.getCustomer = function(customerId) {
            for(var i = 0, len = customers.length; i < len; i++) {
                if(customers[i].id === parseInt(customerId)) {
                    return customers[i];
                }
            }
            return {};
        }

        factory.getOrders = function() {
            var orders = [];
            for(var i = 0; i < customers.length; i++) {
                for(var j = 0; j < customers[i].orders.length; j++) {
                    orders.push(customers[i].orders[j]);
                }
            }
            return orders;
        }

        return factory;
    };

    angular.module('customersApp').factory('customersFactory', customersFactory);
}());

// (function() {
//     var customersFactory = function($http) {
//         var factory = {};
//         factory.getCustomers = function() {
//             return $http.get('/customers');
//         };

//         factory.getCustomer = function(customerId) {
//             return $http.get('/customers/' + customerId);
//         }

//         return factory;
//     };

//     customersFactory.$inject = ['$http'];

//     angular.module('customersApp').factory('customersFactory', customersFactory);
// }());