describe('Unit: MainCtrl', function() {
  // Load the module with MainController
  beforeEach(module('ngRoute'));
  beforeEach(module('pos'));
   var ctrl, scope, location;
   var $rootScope, $controller, $location, Bill;

  // inject the $controller and $rootScope services
  // in the beforeEach block
  beforeEach(inject(function($injector) {
    // Create a new scope that's a child of the $rootScope
    $rootScope = $injector.get('$rootScope');
    $controller = $injector.get('$controller');
    $location = $injector.get('$location');
    Bill = $injector.get('Bill');
    scope = $rootScope.$new();
    // Create the controller
    ctrl = $controller(MainCtrl, {
      $scope: scope,
      $location:location,
      Bill:Bill
    });
  }));

  it('should have bills variables', function(){
  	expect(_.isArray(scope.bills) ).toBe(true);		
  });

})