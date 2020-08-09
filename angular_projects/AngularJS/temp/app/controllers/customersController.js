// option 1
// app.controller('CustomersController', function ($scope) {
//     $scope.sortBy = 'name';
//     $scope.reverse = false;

//     $scope.customers = [
//         {joined: '2020-01-01', name: 'Abel', city: 'Van', orderTotal: 3.86}, 
//         {joined: '2018-08-27', name: 'Billy', city: 'Van', orderTotal: 11.38}, 
//         {joined: '2020-08-21', name: 'Zoe', city: 'Vic', orderTotal: 101}, 
//         {joined: '1944-01-01', name: 'Tu', city: 'Ab', orderTotal: 88888231.21}
//     ];

//     $scope.doSort = function(propName) {
//         $scope.sortBy = propName;
//         $scope.reverse = !$scope.reverse;
//     };
// });

// option 2
// (function() {
//     angular.module('customersApp')
//     .controller('CustomersController', function ($scope) {

//         $scope.sortBy = 'name';
//         $scope.reverse = false;

//         $scope.customers = [
//             {joined: '2020-01-01', name: 'Abel', city: 'Van', orderTotal: 3.86}, 
//             {joined: '2018-08-27', name: 'Billy', city: 'Van', orderTotal: 11.38}, 
//             {joined: '2020-08-21', name: 'Zoe', city: 'Vic', orderTotal: 101}, 
//             {joined: '1944-01-01', name: 'Tu', city: 'Ab', orderTotal: 88888231.21}
//         ];

//         $scope.doSort = function(propName) {
//             $scope.sortBy = propName;
//             $scope.reverse = !$scope.reverse;
//         };
//     });
// }());

// option 3
(function() {
    var CustomersController = function ($scope) {
        $scope.sortBy = 'name';
        $scope.reverse = false;

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
                orderTotal: 88888231.21,
                orders: [
                    {
                        id: 1,
                        product: 'bag',
                        total: 88888231.21
                    }
                ]
            }
        ];

        $scope.doSort = function(propName) {
            $scope.sortBy = propName;
            $scope.reverse = !$scope.reverse;
        };
    };
    CustomersController.$inject = ['$scope'];
    angular.module('customersApp')
        .controller('CustomersController', CustomersController);

}());