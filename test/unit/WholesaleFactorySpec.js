describe('Unit: Wholesale Factory', function() {
  // Load the module with MainController
  beforeEach(module('ngRoute'));
  beforeEach(module('pos'));
   
   var Product, Payment, Wholesale;

  // inject the $controller and $rootScope services
  // in the beforeEach block
  beforeEach(inject(function($injector) {
    // Create a new scope that's a child of the $rootScope
    
    Bill = $injector.get('Bill');
    Product = $injector.get('Product');
    Payment = $injector.get('Payment');
    Wholesale = $injector.get('Wholesale')
    Wholesale.data.reset();
  }));

  it('query() should return all wholesales item in products ', function()
  {
    var result = Wholesale.query()
  	expect(_.isArray(result)).toEqual(true);
    var products = Product.query();
    expect_wholesale_items = _.filter(products, function(item){
      if(item.minumWholeSales >= 0)
          return true;
      return false;
    })
    expect(result).toEqual(expect_wholesale_items)
  });

  it('should be able to createBill(wholesale, info) to create a bill', function(){
    var wholesales_items = Wholesale.query();
    wholesales_selected_items = _.filter(wholesales_items, function(item){
      return !item.hasCondition;
    })
    var customer = {
      bill_to:"This is test",
      ship_to:"1010 blabalbla",
      fob:"1234",
      ship_date:"2014-12-12",
      tracking_no:"1234"
    }
    var now = new Date();
    var payment_total = Payment.getTotal(wholesales_selected_items, 0)
    var result = Wholesale.createBill(wholesales_selected_items, customer);
    expect(result).toEqual({
      id:result.id,
      customer:customer,
      products:wholesales_selected_items,
      create_time:now,
      amount:payment_total.actual_subtotal    
    })
  expect(result.id).toEqual(result.id);
  expect(result.customer).toEqual(customer);
  expect(result.products).toEqual(wholesales_selected_items);
  expect(result.create_time).toEqual(now);
  expect(result.amount).toEqual(payment_total.actual_subtotal);

  })

  it('should be able to findAllBill()', function(){
     var wholesales_items = Wholesale.query();
    wholesales_selected_items = _.filter(wholesales_items, function(item){
      return !item.hasCondition;
    })
    var customer = {
      bill_to:"This is test",
      ship_to:"1010 blabalbla",
      fob:"1234",
      ship_date:"2014-12-12",
      tracking_no:"1234"
    }
    var now = new Date();
    var result = Wholesale.createBill(wholesales_selected_items, customer);
    expect(Wholesale.findAllBill().length).toBe(1)
    expect(result.customer).toEqual(customer);
  })

  it('should be able to findBill({id:1})', function(){
    var wholesales_items = Wholesale.query();
    wholesales_selected_items = _.filter(wholesales_items, function(item){
      return !item.hasCondition;
    })
    var customer = {
      bill_to:"This is test",
      ship_to:"1010 blabalbla",
      fob:"1234",
      ship_date:"2014-12-12",
      tracking_no:"1234"
    }
    var now = new Date();
    var result = Wholesale.createBill(wholesales_selected_items, customer);
    var expect_find_item = Wholesale.findBill({id:result.id})
    expect(result).toEqual(expect_find_item);

  });

  it('should be able to deleteBill(id) to delete bill', function(){
    
  })

  it('always reset after end the test', function(){
    Wholesale.data.reset();
  })

});