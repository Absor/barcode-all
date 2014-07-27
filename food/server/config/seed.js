/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/user/user.model');
var Group = require('../api/group/group.model');
var Product = require('../api/product/product.model');
var Entry = require('../api/entry/entry.model');


User.find({}).remove(function () {
    User.create({
            provider: 'local',
            name: 'Test User',
            email: 'test@test.com',
            password: 'test'
        }, {
            provider: 'local',
            role: 'admin',
            name: 'Admin',
            email: 'admin@admin.com',
            password: 'admin'
        }, function () {
            console.log('finished populating users');
        }
    );
});

Product.find({}).remove(function () {
    Product.create(
        {_id: "53d3c7e356c605946e28f631", code: "132132", name: "jee", addAmount: 1, removeAmount: 1, _groupId: "53d3c7e356c605946e28f661"},
        {_id: "53d3c7e356c605946e28f621", code: "12213", name: "juu", addAmount: 1, removeAmount: 1, _groupId: "53d3c7e356c605946e28f661"},
        {code: "1321322", name: "jaa", addAmount: 1, removeAmount: 1, _groupId: "53d3c7e356c605946e28f662"},
        {code: "13213332", name: "joo", addAmount: 1, removeAmount: 1, _groupId: "53d3c7e356c605946e28f662"},
        {code: "1321562132", name: "jöö", addAmount: 1, removeAmount: 1, _groupId: null},
        {code: "12551", name: "jää", addAmount: 1, removeAmount: 1, _groupId: null}
    );
});

Group.find({}).remove(function () {
    Group.create({
            _id: "53d3c7e356c605946e28f661",
            haveAmount: 0,
            needAmount: 1,
            name: "salad"
        }, {
            _id: "53d3c7e356c605946e28f662",
            haveAmount: 10,
            needAmount: 1,
            name: "badger"
        }
    );
});

Entry.find({}).remove(function () {
    Entry.create({
            _productId: "53d3c7e356c605946e28f631",
            action: "add"
        }, {
            _productId: "53d3c7e356c605946e28f631",
            action: "add"
        }
    );
});


