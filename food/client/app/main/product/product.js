'use strict';

angular.module('foodApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main.product', {
        url: '^/products',
        templateUrl: 'app/main/product/product.html',
        controller: 'ProductCtrl'
      });
  });