'use strict';

angular.module('foodApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main.list', {
        url: '^/list',
        templateUrl: 'app/main/list/list.html',
        controller: 'ListCtrl'
      });
  });