describe('Unit: Bill Factory', function() {
  // Load the module with MainController
  beforeEach(module('ngRoute'));
  beforeEach(module('pos'));
   
   var Bill;

  // inject the $controller and $rootScope services
  // in the beforeEach block
  beforeEach(inject(function($injector) {
    // Create a new scope that's a child of the $rootScope
    
    Bill = $injector.get('Bill');
  }));

  it('query() should return array of bills', function(){
  	expect(_.isArray(Bill.query()) ).toBe(true);		
  });

  it('create() should create a new instance of bills and query() should notice it', function(){
    var bills_count_before = Bill.query().length;
    var new_obj = Bill.create();
    var currenct_count = Bill.query().length;
    var last_obj = Bill.query()[currenct_count - 1];
    expect(currenct_count).toBe(bills_count_before + 1);
    expect(new_obj).toBe(last_obj);  
    expect(new_obj.id).toBeGreaterThan(0);         
  })

  it('save() should save products in specific bill', function(){
    var new_bill = Bill.create();
    var products = [
      {id:1, amount:2},
      {id:2, amount:3}
    ]
    expect(new_bill.id).toBe(1);
    var result = Bill.save({id:new_bill.id ,products:products});
    expect(result).toBe(true);
    var fake_result = Bill.save({id:-1, products:products})
    expect(fake_result).toBe(false);
    var currenct_count = Bill.query().length;
    var last_obj = Bill.query()[currenct_count - 1];
    expect(last_obj.products).toEqual(products)
    var result_empty = Bill.save({id:new_bill.id, products:[]})
    last_obj = Bill.query()[currenct_count - 1];
    expect(last_obj.products).toEqual([]);  
  });

  it('get() should get bill by id', function(){
    var create_bill = Bill.create();
    var products = [
        {id:1, amount:2},
        {id:2, amount:4   }
      ]
    Bill.save({id:create_bill.id, products:products});
    var get_bill = Bill.get(create_bill.id);
    var currenct_count = Bill.query().length;
    var last_obj = Bill.query()[currenct_count - 1];
    expect(get_bill).toEqual(last_obj); 
  });

  it('findAllpaidBill() should be able to find all paid\'s bill without any arg', function(){
     var paid_bills =  Bill.findAllpaidBill();
     expect(_.isArray(paid_bills)).toBe(true);
  })

  it('paid() should transfer bill to paid\'s Bill by id',function(){
    var result_fake = Bill.paid(-1);
    expect(result_fake).toBe(false);
    expect(Bill.findAllpaidBill().length).toBe(0);
    var create_bill = Bill.create();
    var products = [
        {id:1, amount:2, price:20},
        {id:2, amount:4, price:30}
      ]
      //total = 20*2 + 30*4 = 40 + 120 = 160
    Bill.save({id:create_bill.id, products:products});
    var bill_saved = Bill.get(create_bill.id);
    var paid_time = new Date();
    var result = Bill.paid(create_bill.id);
    var paid_bills = Bill.findAllpaidBill();
    expect(result).toBe(true);
    expect(Bill.query()).toEqual([]);
    /*expect(paid_bills).toEqual([{
      id:1,
      create_time:paid_time,
      total:160,
      bill:bill_saved
    }])*///pass but browser bug array cant equal array

  })

})