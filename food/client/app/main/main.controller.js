'use strict';

angular.module('foodApp')
  .controller('MainCtrl', function ($scope, $http, socket) {
        $scope.groups = [];
        $scope.products = [];

        $scope.productsOfAGroup = function(groupId) {
            return _.filter($scope.products, function(product) {
                return product._groupId === groupId;
            });
        }

        $scope.grouplessProducts = function() {
            return _.filter($scope.products, function(product) {
                return product._groupId === null;
            });
        }

        $scope.groupedProducts = function() {
            return _.filter($scope.products, function(product) {
                return product._groupId !== null;
            });
        }

        $scope.haveAmount = function(group) {
            return _.reduce($scope.products, function(sum, product) {
                if (product._groupId === group._id) {
                    return sum + product.haveAmount;
                }
                return sum;
            }, 0);
        }

        $http.get('/api/groups').success(function(groups) {
            $scope.groups = groups;
            socket.syncUpdates('group', $scope.groups);
        });

        $http.get('/api/products').success(function(products) {
            $scope.products = products;
            socket.syncUpdates('product', $scope.products);
        });

        $scope.$on('$destroy', function () {
            socket.unsyncUpdates('group');
            socket.unsyncUpdates('product');
        });
  });
