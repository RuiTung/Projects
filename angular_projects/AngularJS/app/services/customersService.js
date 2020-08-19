(function() {
    var customersService = function() {
        var customers = [
            {
                id: 1,
                joined: '2020-01-01',
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
                city: 'Cal',
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

        this.getCustomers = function() {
            return customers;
        };

        this.getCustomer = function(customerId) {
            for(var i = 0, len = customers.length; i < len; i++) {
                if(customers[i].id === parseInt(customerId)) {
                    return customers[i];
                }
            }
            return {};
        }
    };

    angular.module('customersApp').service('customersService', customersService);
}());