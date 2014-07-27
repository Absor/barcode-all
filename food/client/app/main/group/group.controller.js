'use strict';

angular.module('foodApp')
  .controller('GroupCtrl', function ($scope, $http, $q) {
        $scope.onDropToGroup = function(container, newGroupId) {
            var key = Object.keys(container)[0];
            var data = container[key];
            var productId = data.productId;
            var product = _.find($scope.products, function(product) {
                return product._id === productId;
            });

            var oldGroupId = product._groupId;
            product._groupId = newGroupId;

            $http.put('/api/products/'+productId, {_groupId: newGroupId}).success(function(data) {
                    // TODO jokin indikaattori
                }).error(function(error) {
                    // TODO jokin indikaattori
                    product._groupId = oldGroupId;
                });
        }

        $scope.acceptChecker = function(group) {
            return function(targetGroup) {
                return group !== targetGroup[0];
            }
        }

        $scope.saveGroup = function(data, group) {
            var deferred = $q.defer();
            var oldName = group.name;
            $http.put('/api/groups/'+group._id, {name: data})
                .success(function(data) {
                    deferred.resolve();
                }).error(function(error) {
                    deferred.reject(error.errors.name.message);
                });
            return deferred.promise;
        }

        $scope.addNewGroup = function() {
            $http.post('/api/groups', {})
                .success(function(data) {
                    // TODO indikaattori
                }).error(function(error) {
                    // TODO indikaattori
                });
        }

        $scope.deleteGroup = function(group) {
            var products = [];
            angular.forEach($scope.products, function(product, index) {
                if (product._groupId === group._id) {
                    products.push(product);
                    product._groupId = null;
                }
            });
            $http.delete('/api/groups/'+group._id)
                .success(function(data) {
                    // TODO indikaattori
                }).error(function(error) {
                    // TODO indikaattori
                    angular.forEach(products, function(product, index) {
                        product._groupId = group._id;
                    });
                });
        }
  });
