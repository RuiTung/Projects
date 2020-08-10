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
    var CustomersController = function ($scope, $log, customersFactory, appSettings) {
        $scope.sortBy = 'name';
        $scope.reverse = false;
        $scope.customers = [];
        $scope.appSettings = appSettings;

        // async call
        function init() {
            customersFactory.getCustomers()
            .success(function(customers) {
                $scope.customers = customers;
            })
            .error(function(data, status, headers, config) {
                $log.log(data.error + ' ' + status);
            });
        }
        init();

        $scope.doSort = function(propName) {
            $scope.sortBy = propName;
            $scope.reverse = !$scope.reverse;
        };
    };
    CustomersController.$inject = ['$scope', '$log', 'customersFactory', 'appSettings'];
    angular.module('customersApp')
        .controller('CustomersController', CustomersController);

}());