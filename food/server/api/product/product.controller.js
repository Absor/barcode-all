'use strict';

var _ = require('lodash');
var Product = require('./product.model');
var Entry = require('../entry/entry.model');

// Get list of products
exports.index = function(req, res) {
  Product.find(function (err, products) {
    if(err) { return handleError(res, err); }
    return res.json(200, products);
  });
};

// Get a single product
exports.show = function(req, res) {
  Product.findById(req.params.id, function (err, product) {
    if(err) { return handleError(res, err); }
    if(!product) { return res.send(404); }
    return res.json(product);
  });
};

// Creates a new product in the DB.
exports.create = function(req, res) {
  Product.create(req.body, function(err, product) {
    if(err) { return handleError(res, err); }
    return res.json(201, product);
  });
};

// Updates an existing product in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Product.findById(req.params.id, function (err, product) {
    if (err) { return handleError(res, err); }
    if(!product) { return res.send(404); }
    var updated = _.merge(product, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, product);
    });
  });
};

// Deletes a product from the DB.
exports.destroy = function(req, res) {
  Product.findById(req.params.id, function (err, product) {
    if(err) { return handleError(res, err); }
    if(!product) { return res.send(404); }
    product.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

// From the barcode reader
exports.add = function(req, res) {
    Product.findOne({code: req.body.code}).populate('_groupId').exec(function (err, product) {
        if (err) { return handleError(res, err); }
        if(!product) { return exports.create(req, res); } // just use create method
        if(!product._groupId) { return res.json(200, product); }

        var group = product._groupId;
        group.haveAmount += product.addAmount;

        group.save(function (err) {
            if (err) { return handleError(res, err); }
            Entry.create({_productId: product._id, action: "add"});
            return res.json(200, product);
        });
    });
};

exports.remove = function(req, res) {
    Product.findOne({code: req.params.code}).populate('_groupId').exec(function (err, product) {
        if (err) { return handleError(res, err); }
        if(!product) { return exports.create(req, res); } // just use create method
        if(!product._groupId) { return res.json(200, product); }

        var group = product._groupId;
        group.haveAmount -= product.removeAmount;
        if (group.haveAmount <= 0) {
            group.haveAmount = 0;
        }

        group.save(function (err) {
            if (err) { return handleError(res, err); }
            Entry.create({_productId: product._id, action: "remove"});
            return res.json(200, product);
        });
    });
};

function handleError(res, err) {
  return res.send(500, err);
}