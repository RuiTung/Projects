function CustomersController() {
    this.sortBy = 'name';
    this.reverse = false;

    this.customers = [
        {joined: '2020-01-01', name: 'Abel', city: 'Van', orderTotal: 3.86}, 
        {joined: '2018-08-27', name: 'Billy', city: 'Van', orderTotal: 11.38}, 
        {joined: '2020-08-21', name: 'Zoe', city: 'Vic', orderTotal: 101}, 
        {joined: '1944-01-01', name: 'Tu', city: 'Ab', orderTotal: 88888231.21}
    ];

    this.doSort = function(propName) {
        this.sortBy = propName;
        this.reverse = !this.reverse;
    };
}