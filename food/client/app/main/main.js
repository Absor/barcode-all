'use strict';

angular.module('foodApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
            abstract: true,
            url: '/',
            templateUrl: 'app/main/main.html',
            controller: 'MainCtrl'
      });
  });