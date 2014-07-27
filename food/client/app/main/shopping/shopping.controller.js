'use strict';

angular.module('foodApp')
  .controller('ShoppingCtrl', function ($scope, $http) {
        $scope.saveGroup = function(data, group) {
            $http.put('/api/groups/'+group._id, data)
                .success(function(data) {
                    // TODO jokin indikaattori
                }).error(function(error) {
                    // TODO jokin indikaattori
                });
        }
  });
