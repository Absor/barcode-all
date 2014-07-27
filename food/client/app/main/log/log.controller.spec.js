'use strict';

describe('Controller: LogCtrl', function () {

  // load the controller's module
  beforeEach(module('foodApp'));

  var LogCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LogCtrl = $controller('LogCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
