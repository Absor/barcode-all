'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var Entry = require('../entry/entry.model');

var ProductSchema = new Schema({
    code: {type: String, required: true, unique: true, default: 715517},
    _groupId: {type: Schema.Types.ObjectId, default: null, ref: 'Group'},
    name: {type: String, required: true, default: 'New product'},
    addAmount: {type: Number, required: true, default: 1, min: 0},
    removeAmount: {type: Number, required: true, default: 1, min: 0},
    haveAmount: {type: Number, required: true, default: 1, min: 0}
});

ProductSchema
    .path('name')
    .validate(function(name) {
        return name.length > 1;
    }, 'Name has to be at least 2 characters long.');

ProductSchema
    .pre('remove', function(next) {
        Entry.remove({_productId: this._id}, function(err) {
            if (err) {
                next(new Error('Database error.'));
            } else {
                next();
            }
        });
    });

module.exports = mongoose.model('Product', ProductSchema);