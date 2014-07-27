'use strict';

angular.module('foodApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main.shopping', {
        url: '^/shopping',
        templateUrl: 'app/main/shopping/shopping.html',
        controller: 'ShoppingCtrl'
      });
  });