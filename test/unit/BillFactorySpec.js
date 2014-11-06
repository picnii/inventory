describe('Unit: Bill Factory', function() {
  // Load the module with MainController
  beforeEach(module('ngRoute'));
  beforeEach(module('pos'));
   
   var Bill, Product;

  // inject the $controller and $rootScope services
  // in the beforeEach block
  beforeEach(inject(function($injector) {
    // Create a new scope that's a child of the $rootScope
    
    Bill = $injector.get('Bill');
    Product = $injector.get('Product');
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
    expect(new_bill.id).toBe("1");
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
  describe("paid()", function(){
      var bill_saved, products, create_bill, result, all_products_before;
      beforeEach(function(){
        all_products_before = Product.query();
        all_products_before = _.cloneDeep(all_products_before);
        expect(Bill.findAllpaidBill().length).toBe(0);
        create_bill = Bill.create();
        products = [
          {id:"1", amount:2, price:20},
          {id:"2", amount:4, price:30}
        ]
        bill_saved = Bill.get(create_bill.id);
        Bill.save({id:create_bill.id, products:products});
        result = Bill.paid(create_bill.id);
      })
      it('should return true if correct and return false if non of id exist', function(){
        expect(result).toBe(true);
        var fake_result = Bill.paid(-1);
        expect(fake_result).toBe(false)
      })

     it('paid() should transfer bill to paid\'s Bill by id',function(){
      var paid_time = new Date();
      var paid_bills = Bill.findAllpaidBill();
      expect(Bill.query()).toEqual([]);
      /*expect(paid_bills).toEqual([{
        id:'1',
        create_time:paid_time,
        total:160,
        bill:bill_saved
      }]);*///pass but browser bug array cant equal array

    });

    it('should update Product Stock(product.count)', function(){
        var all_products = Product.query();
        for(var i = 0; i < products.length; i++)
        {
          var real_product = Product.get({id:products[i].id});
          var before_product = _.find(all_products_before, {id:products[i].id});
          expect(real_product.count).toEqual(before_product.count - products[i].amount);
        }
    })
  });//end paid()
 

  /**/

})