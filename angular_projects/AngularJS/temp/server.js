var express = require('express');
var app = express();
app.use(express.static(__dirname + '/'));

app.get('/customers/:id', function(req, res) {
    var customerId = parseInt(req.params.id);
    var data = {};
    for(var i = 0, len = customers.length; i < len; i++) {
        if(customers[i].id === customerId) {
            data = customers[i];
            break;
        }
    }
    res.json(data);
});

app.get('/customers', function(req, res) {
    res.json(customers);
    // res.json(500, {error: 'An err has occurred.'});
});

app.get('/customers', function(req, res) {
    var customerId = parseInt(req.params.id);
    var data = {status: true};
    for(var i = 0; i < customers.length; i++) {
        if(customers[i].id === customerId) {
            customers.splice(i, 1);
                data = {status: true};
                break;
        }
    }
    res.json(data);
});

app.delete('/customers', function(req, res) {
    var customerId = parseInt(req.params.id);
    var data = {stats: true};
    for(var i = 0; i < customers.length; i++) {
        if(customers[i].id === customerId) {
            customers.splice(i, 1);
            data = {status:true};
            break;
        }
    }
    res.json(data);
});

app.listen(8080);

console.log('Express listening on port 8080');

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