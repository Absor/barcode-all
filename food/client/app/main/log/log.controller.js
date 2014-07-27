'use strict';

angular.module('foodApp')
  .controller('LogCtrl', function ($scope, $http, socket) {

        $scope.getProduct = function(productId) {
            return _.find($scope.products, function(product) {
                return product._id == productId;
            });
        }

        $http.get('/api/entries').success(function(entries) {
            $scope.entries = entries;
            socket.syncUpdates('entry', $scope.entries);
        });

        $scope.$on('$destroy', function () {
            socket.unsyncUpdates('entry');
        });
  });
