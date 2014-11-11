describe('Unit: Payment Factory', function() {
  beforeEach(module('ngRoute'));
  beforeEach(module('pos'));
  var Payment;
  var Products;
  var orders;
  var expect_subtotal;

  beforeEach(inject(function($injector) {
    Payment = $injector.get('Payment');
    Products = $injector.get('Product');
    var all_items = Products.query();
    orders = [];
    expect_subtotal = 0;
    for(var i = 0; i < all_items.length / 2; i++)
    {
    	var item = _.cloneDeep(all_items[i]);
    	item.number = i + 1;
    	item.count = 2;
    	expect_subtotal += item.count * item.price;
    	orders.push(item);
    }
  }));

  it('should be able to get() tax, credit info',function(){
  	var payment = Payment.get();
  	expect(_.isNumber(payment.tax)).toBe(true)
  	expect(_.isArray(payment.credits)).toBe(true);
  	for(var i =0; i < payment.credits.length; i++)
  	{
  		expect( _.isString(payment.credits[i].id ) ).toBe(true)
  		expect( _.isNumber(payment.credits[i].chargePercent ) ).toBe(true)
  		expect( _.isNumber(payment.credits[i].chargeAmount ) ).toBe(true)
  		expect( _.isString(payment.credits[i].name ) ).toBe(true)
  	}
  })

  it('should be able to calculate subtotal, total from getTotal(orders, discount)', function(){
  	var discount = 500;
  	var total_object = Payment.getTotal(orders, discount);
  	expect( total_object.actual_subtotal ).toBe(expect_subtotal);
  	expect( total_object.subtotal ).toBe( Math.ceil(expect_subtotal));

  	var expect_tax_amount = expect_subtotal * Payment.get().tax * 0.01 ;
  	var expect_total = expect_subtotal * (1 + Payment.get().tax * 0.01 ) - discount;

  	expect( total_object.actual_total).toBe(expect_total);
  	expect( total_object.total ).toBe( Math.ceil(expect_total));

  	expect( total_object.actual_tax_amount).toBe( expect_tax_amount);
  });

  //need to check which one is right
  /*it('should be able to calculate credit_amount from getCreditTotal(total, credit)', function(){
    var total = 5000;
    var credit = Payment.get().credits[0];
    var credit_total = Payment.getCreditTotal(total, credit)
    var credit_amount = total * credit.chargePercent + credit.chargeAmount;

    expect(credit_total.credit).toEqual(credit);
    expect(credit_total.creditAmount).toBe(credit_amount);


  })*/

});