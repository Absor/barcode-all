'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var Group = require('../group/group.model');

var ProductSchema = new Schema({
    code: {type: String, required: true, unique: true, default: 715517},
    _groupId: {type: Schema.Types.ObjectId, default: null},
    name: {type: String, required: true, default: 'New product'},
    addAmount: {type: Number, required: true, default: 0, min: 0},
    removeAmount: {type: Number, required: true, default: 0, min: 0}
});

ProductSchema
    .path('name')
    .validate(function(name) {
        return name.length > 1;
    }, 'Name has to be at least 2 characters long.');

module.exports = mongoose.model('Product', ProductSchema);