'use strict';

angular.module('foodApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main.log', {
        url: '^/log',
        templateUrl: 'app/main/log/log.html',
        controller: 'LogCtrl'
      });
  });