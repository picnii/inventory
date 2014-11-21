describe('Unit: OrderCtrl', function() {
  // Load the module with MainController
  beforeEach(module('ngRoute'));
  beforeEach(module('pos'));
   var ctrl, scope, location, routeParams;
   var _lastRoute;
   var $rootScope, $controller, $location, Bill, Product;
   var bill, orders;
  // inject the $controller and $rootScope services
  // in the beforeEach block
  beforeEach(inject(function($injector) {
    // Create a new scope that's a child of the $rootScope
    $rootScope = $injector.get('$rootScope');
    $controller = $injector.get('$controller');
    $location = $injector.get('$location');
    Bill = $injector.get('Bill');
    Product = $injector.get('Product');
    scope = $rootScope.$new();
    bill = Bill.create();
    orders = [];
    ctrl = $controller(OrderCtrl, {
      $scope: scope,
      $location:{path:function(route){
        _lastRoute = route;
      }},
      $routeParams:{id : bill.id},
      Bill:Bill,
      Product:Product
    });
  }));

  it('should have scope.products / scope.orders / scope.bill', function(){
    expect(_.isArray(scope.products)).toBe(true);
    expect(_.isArray(scope.orders));
    expect(_.isObject(scope.bill));
  })

  describe("AddItem()", function(){
    var products, index, item
    var _isCallAlert, _alertMessage;
    beforeEach(function(){
      expect(scope.orders).toEqual([]);
      products = Product.query();
      index = _.random(0, products.length - 1);
      item = products[index];
      scope.amount = 2;
      scope.addItem(item);
      _isCallAlert = false;
      window.confirm = function(question)
      {
        return true;
      }
      window.alert = function(msg)
      {
        _isCallAlert = true;
        _alertMessage = msg;
      }

    })
    it('should be able to addItem(item) with amount', function(){
      
      var expect_item = _.cloneDeep(item)
      expect_item.number = 1;
      expect_item.count = scope.amount;
      expect(scope.orders).toContain(expect_item);
      expect(scope.orders[expect_item.number  - 1 ]).toEqual(expect_item);
      expect(scope.bill.products).toContain(expect_item)
    });

    it('should be able to addItem(item) same item and add more amount', function(){
      var ex_amount = scope.amount;
      scope.amount = 1;
      scope.addItem(item);
      var expect_item = _.cloneDeep(item);
      expect_item.number = 1;
      expect_item.count = ex_amount + scope.amount;
      expect(scope.orders[expect_item.number  - 1]).toEqual(expect_item)
    })

    it('addItem should not be able to addItem should not be able to addItem more than it had', function(){
      expect(_isCallAlert).toBe(false);
      //make more than it should scenario
      var ex_amount = scope.amount
      expect(scope.orders[item.number  - 1 ].count).toBe(ex_amount);
      scope.amount = products[index].count;
      scope.addItem(item);
      //cancle and alert that it's more than it should
      expect(_isCallAlert).toBe(true);
      expect(scope.orders[item.number  - 1 ].count).toBe(ex_amount);

    })

    it('should be able to cancleBill(item)', function(){
      scope.cancleBill(item);
      var expect_bill = Bill.get(bill.id);
      expect(expect_bill).toEqual(null);
    })

  })

});