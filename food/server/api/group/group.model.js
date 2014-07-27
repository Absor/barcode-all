'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var Product = require('../product/product.model');

var GroupSchema = new Schema({
    name: {type: String, required: true, default: 'New group'},
    haveAmount: {type: Number, required: true, default: 0},
    needAmount: {type: Number, required: true, default: 0, min: 0}
});

GroupSchema
    .path('name')
    .validate(function(name) {
        return name.length > 1;
    }, 'Name has to be at least 2 characters long.');

GroupSchema
    .pre('remove', function(next) {
        Product.update({_groupId: this._id}, {_groupId: null}, { multi: true }, function(err, numberAffected, raw) {
            if (err) {
                next(new Error('Database error.'));
            } else {
                console.info(numberAffected + " updated.")
                next();
            }
        });
    });

module.exports = mongoose.model('Group', GroupSchema);