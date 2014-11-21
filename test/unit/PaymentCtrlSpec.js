describe('Unit: PaymentCtrl', function() {
  // Load the module with MainController
  beforeEach(module('ngRoute'));
  beforeEach(module('pos'));
   var ctrl, scope, location, routeParams, timeout ;
   var _lastRoute;
   var $rootScope, $controller, $location, $timeout, Bill, Product, Payment;
   var bill, orders;
  // inject the $controller and $rootScope services
  // in the beforeEach block
  beforeEach(inject(function($injector) {
    // Create a new scope that's a child of the $rootScope
    $rootScope = $injector.get('$rootScope');
    $controller = $injector.get('$controller');
    $location = $injector.get('$location');
    $timeout = $injector.get('$timeout')
    Bill = $injector.get('Bill');
    Product = $injector.get('Product');
    Payment = $injector.get('Payment');
    scope = $rootScope.$new();
    var products = Product.query();
    bill = Bill.create();
    orders = [];
    for(var i = 0; i < products.length / 2; i++)
    {
      var item = _.cloneDeep(products[i]);
      item.number = i + 1;
      item.count = Math.floor(products[i].count / 2 );
      orders.push(item);
    }
    Bill.save({id:bill.id, products:orders});
    //($scope, $location, $routeParams, Bill, Payment, $timeout, Product)
    ctrl = $controller(PaymentCtrl, {
      $scope: scope,
      $location:{path:function(route){
        _lastRoute = route;
      }},
      $routeParams:{id : bill.id},
      Bill:Bill,
      Payment:Payment,
      $timeout:$timeout,
      Product:Product
    });
  }));

  it('should load bill, payment at start', function(){
    expect(_.isObject(scope.bill)).toBe(true);
    expect(_.isObject(scope.Payment)).toBe(true);
    expect(_.isFunction(scope.print)).toBe(true);
  })

  it('should do print() and cash', function(){
    var assume_payment_cash = Payment.getTotal(scope.bill.products, 0).total;
    scope.print(assume_payment_cash);
    var bill_id = scope.bill.id;
    var paid_bills = Bill.findAllPaidBill();
    var paid_bill = paid_bills[paid_bills.length - 1];
    var bill = Bill.get(bill_id);
    expect(bill).toEqual(null)
    expect(paid_bill.bill.products).toEqual(orders);
    expect(paid_bill.amount).toEqual(assume_payment_cash)
  })

  it('should do print() and credit', function(){
    var assume_payment_cash = Payment.getTotal(scope.bill.products, 0).total;
    var credit = Payment.get().credits[0]
    var credit_total = Payment.getCreditTotal(assume_payment_cash, credit)
    scope.print(credit_total.total, credit);
    var bill_id = scope.bill.id;
    var paid_bills = Bill.findAllPaidBill();
    var paid_bill = paid_bills[paid_bills.length - 1];
    var bill = Bill.get(bill_id);
    expect(bill).toEqual(null)
    expect(paid_bill.bill.products).toEqual(orders);
    expect(paid_bill.amount).toEqual(credit_total.total)
  })


});