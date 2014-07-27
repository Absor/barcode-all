'use strict';

angular.module('foodApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main.group', {
        url: '^/groups',
        templateUrl: 'app/main/group/group.html',
        controller: 'GroupCtrl'
      });
  });