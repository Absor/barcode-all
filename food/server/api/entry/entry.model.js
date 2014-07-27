'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var EntrySchema = new Schema({
    timestamp: {type: Date, required: true, default: Date.now},
    _productId: {type: Schema.Types.ObjectId, ref: 'Product', required: true},
    action: {type: String}
});

module.exports = mongoose.model('Entry', EntrySchema);