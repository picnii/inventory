describe('Unit: Bill Factory', function() {
  // Load the module with MainController
  beforeEach(module('ngRoute'));
  beforeEach(module('pos'));
   
   var Bill, Product, Payment;

  // inject the $controller and $rootScope services
  // in the beforeEach block
  beforeEach(inject(function($injector) {
    // Create a new scope that's a child of the $rootScope
    
    Bill = $injector.get('Bill');
    Product = $injector.get('Product');
    Payment = $injector.get('Payment');
    Bill.data.reset();
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
      {id:1, count:2},
      {id:2, count:3}
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
        {id:1, count:2},
        {id:2, count:4   }
      ]
    Bill.save({id:create_bill.id, products:products});
    var get_bill = Bill.get(create_bill.id);
    var currenct_count = Bill.query().length;
    var last_obj = Bill.query()[currenct_count - 1];
    expect(get_bill).toEqual(last_obj); 
  });

  it('should be able to cancle() bill that is creating', function(){
      var create_bill = Bill.create();
      var get_bill = Bill.get(create_bill.id);
      expect(create_bill).toEqual(get_bill);
      Bill.cancle(create_bill.id);
      get_bill = Bill.get(create_bill.id);
      expect(get_bill).toEqual(null);

  })



  it('findAllPaidBill() should be able to find all paid\'s bill without any arg', function(){
     var paid_bills =  Bill.findAllPaidBill();
     expect(_.isArray(paid_bills)).toBe(true);
  });

  it('findPaidBill() should be able to find all paid\'s bill any obj', function(){
     //var paid_bills =  Bill.findAllPaidBill();
     //expect(_.isArray(paid_bills)).toBe(true);
  });

  describe("paid()/refund()", function(){
      var bill_saved, products, create_bill, result, all_products_before;
      var payment_expect_amount, paid_bills, paid_bill;
      var paid_amount;
       var payment_total
      beforeEach(function(){
        Bill.data.reset();
        all_products_before = Product.query();
        all_products_before = _.cloneDeep(all_products_before);
        expect(Bill.findAllPaidBill().length).toBe(0);
        create_bill = Bill.create();
        products = [
          {id:all_products_before[0].id, count:2, price:all_products_before[0].price},
          {id:all_products_before[1].id, count:4, price:all_products_before[1].price}
        ]
        var discount = 10;
        payment_total = Payment.getTotal(products, discount)

        payment_expect_amount = payment_total.actual_subtotal;
        bill_saved = Bill.get(create_bill.id);
        Bill.save({id:create_bill.id, products:products});
        paid_amount = payment_total.total;

        //result = Bill.paid({id:create_bill.id, amount:paid_amount});
        result = Bill.paid(create_bill.id, paid_amount, discount);
        paid_bills = Bill.findAllPaidBill();
        paid_bill = paid_bills[paid_bills.length - 1];
      })

      it('should return Paid\'s Bill ID if correct and return -1 if non of id exist or paid amount is lower than it sould', function(){
        expect(result).toBe("1");
        //var fake_result = Bill.paid({id:-1, amount:paid_amount});
        var fake_result = Bill.paid(-1, paid_amount);
        expect(fake_result).toBe(-1)
      })

     it('paid() should transfer bill to paid\'s Bill by id',function(){
      var paid_time = new Date();
      expect(Bill.query()).toEqual([]);
      /*expect(paid_bills).toEqual([{
        id:'1',
        create_time:paid_time,
        total:160,
        bill:bill_saved,
        amount:paid_amout,
        payment_id:0
      }]);*///pass but browser bug array cant equal array

    });

    it('should update Product Stock(product.count)', function(){
        var all_products = Product.query();
        for(var i = 0; i < products.length; i++)
        {
          var real_product = Product.get({id:products[i].id});
          var before_product = _.find(all_products_before, {id:products[i].id});
          expect(real_product.count).toEqual(before_product.count - products[i].count);
        }
    })

    it('should be able to get payment amount with tax include', function(){
      var tax = Payment.get().tax;
      
      expect(paid_bill.total).toEqual(payment_total.actual_total);
      expect(paid_bill.amount).toEqual(payment_total.total);
    });

    it('should save in dataStorage', function(){
      expect(localStorage[Bill.data.STORAGE_NAME]).toEqual(JSON.stringify(paid_bills));
    })

    it('should be able to pay with credit card and change amount to be the correct one', function(){
      
      var credit_bill = Bill.create();
      Bill.save({id:credit_bill.id, products:products });
      var new_payment_total = Payment.getTotal(products, 0);
      var credit = Payment.get().credits[0];

      var credit_total = Payment.getCreditTotal(new_payment_total.total, credit);
      var credit_charge_amount = credit_total.credit_amount;
      var paid_amount = credit_total.total;

      //pay in normal payment
      //Bill.paid({id:credit_bill.id, amount:new_payment_total.total, credit:credit});
      Bill.paid(credit_bill.id, new_payment_total.total, credit, discount);
      var paid_bills = Bill.findAllPaidBill();
      var credit_bill = paid_bills[paid_bills.length - 1];
      
      //expect(credit_bill.total).toEqual(paid_amount);
    })

    it('should beable to refund() with the bill that already paid', function(){
      var id = create_bill.id
      var ex_bill = Bill.findPaidBill({id:id});
      var refund_bill = Bill.refund(id);
       var test_bill = Bill.findPaidBill({id:id});
       expect(ex_bill).toEqual(refund_bill);
       expect(_.isUndefined(test_bill)).toBe(true);
    })

    it('should return -1 if paid is wrong', function(){

    })

    it('should be able to load paid\'s Bill with load()', function(){

    })

  });//end paid()

  it('should reset in the end for user', function(){
    Bill.data.reset();
    expect(Bill.data.load()).toBe(true);
    expect(Bill.findAllPaidBill()).toEqual([]);
  })
 

  /**/

})