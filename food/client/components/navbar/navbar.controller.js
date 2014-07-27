'use strict';

angular.module('foodApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth, $state) {
    $scope.menu = [{
        title: 'Home',
        state: 'main.list'
    },{
        title: 'Logs',
        state: 'main.log'
    }];

    $scope.editMenu = [{
        title: 'Product groups',
        state: 'main.group'
    },{
        title: 'Products',
        state: 'main.product'
    },{
        title: 'Shopping list',
        state: 'main.shopping'
    }];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(state) {
        return state === $state.current.name;
    };
  });