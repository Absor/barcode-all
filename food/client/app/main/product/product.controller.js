'use strict';

angular.module('foodApp')
  .controller('ProductCtrl', function ($scope, $http, $q) {
        $scope.saveProduct = function(data, product) {
            var deferred = $q.defer();
            $http.put('/api/products/'+product._id, data)
                .success(function(data) {
                    // TODO jokin indikaattori
                }).error(function(error) {
                    // TODO jokin indikaattori
                    deferred.reject("Code has to be unique.");
                });
            return deferred.promise;
        }

        $scope.addNewProduct = function() {
            $http.post('/api/products', {})
                .success(function(data) {
                    // TODO indikaattori
                }).error(function(error) {
                    // TODO indikaattori
                });
        }

        $scope.deleteProduct = function(product) {
            //_.remove($scope.products, {_id: product._id});
            $http.delete('/api/products/'+product._id)
                .success(function(data) {
                    // TODO indikaattori
                }).error(function(error) {
                    // TODO indikaattori
                });
        }
  });
