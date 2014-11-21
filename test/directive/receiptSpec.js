describe('Receipt Directive', function() {
	beforeEach(module("component"));
	beforeEach(module('templates'));
	beforeEach(module('pos'));
	

  	var Product, Payment, Bill, Store;
	var $compile, $scope, html, elm, template, templateAsHtml, $filter;
	var dicount, payment_total, orders;
	beforeEach(inject(function($injector) {
    // Create a new scope that's a child of the $rootScope
	    var $rootScope = $injector.get('$rootScope');
	   	$compile = $injector.get('$compile');
	   	Product = $injector.get('Product');
	   	Payment = $injector.get('Payment');
	   	Bill = $injector.get('Bill');
	   	Store = $injector.get('Store');
	   	$filter = $injector.get('$filter');
	    $scope = $rootScope.$new();
	    // Create the controller
	    var bill = Bill.create();
	    var products = Product.query();
	    discount = 10;
	    orders = [];
	    for(var i =0; i < products.length/2 ;i++)
	    {
	    	var item = _.cloneDeep(products[i]);
	    	item.number = i + 1;
	    	item.count = 2;
	     	orders.push(item);
	    }
	    Bill.save({id:bill.id, products:orders});
	   
	    payment_total = Payment.getTotal(orders, discount);
	    //Bill.paid({id:bill.id, amount:payment_total.total});
	    Bill.paid(bill.id, payment_total.total, discount);
	    var paid_bills = Bill.findAllPaidBill();

	    $scope.paid_bill = paid_bills[0];
	   
	   	html = "<receipt paid-bill=\"paid_bill\"></receipt>";
		elm = angular.element(html);
		template = $compile(elm)($scope);
		$scope.$digest();
		templateAsHtml = template.html();
	}));

	it('should display each order item in tr.order-item', function(){
		var trs = elm.find('tr.order-item');
		//console.log(trs);
		for(var i =0; i < orders.length ; i++)
		{
			expect(trs.eq(i).text()).toContain(orders[i].number);
			expect(trs.eq(i).text()).toContain(orders[i].name);

			var expect_price = $filter('currency')(orders[i].price, Store.currency);
			expect(trs.eq(i).text()).toContain(expect_price);
			expect(trs.eq(i).text()).toContain(orders[i].count);
		}
	});

	it('should display subtotal tr.subtotal', function(){
		var expect_subtotal = $filter('currency')(payment_total.actual_subtotal, Store.currency);
		expect(elm.find('tr.subtotal').text()).toContain(expect_subtotal)
	})

	it('should display discount tr.discount', function(){
		expect(elm.find('tr.discount').text()).toContain($filter('currency')(discount, Store.currency));
	})

	it('should display tax tr.tax', function(){
		expect(elm.find('tr.tax').text()).toContain($filter('currency')($scope.paid_bill.tax_amount, Store.currency))
	})

	it('should display total tr.total', function()	{
		expect(elm.find('tr.total').text()).toContain($filter('currency')(payment_total.total, Store.currency))
	})

	describe('credit case', function(){
		var credit_total;
		beforeEach(function(){
			var bill = Bill.create();
		    Bill.save({id:bill.id, products:orders});
		   	var credit = Payment.get().credits[0]
		    payment_total = Payment.getTotal(orders, discount);
		    credit_total = Payment.getCreditTotal(payment_total.total, credit);
		    //Bill.paid({id:bill.id, amount:credit_total.total, credit:credit});
		    Bill.paid(bill.id, credit_total.total, credit, discount);
		    var paid_bills = Bill.findAllPaidBill();

		    $scope.paid_bill = paid_bills[1];
		   
		   	html = "<receipt paid-bill=\"paid_bill\"></receipt>";
			elm = angular.element(html);
			template = $compile(elm)($scope);
			$scope.$digest();
			templateAsHtml = template.html();
		})

		it('should display each order item in tr.order-item', function(){
			var trs = elm.find('tr.order-item');
			//console.log(trs);
			for(var i =0; i < orders.length ; i++)
			{
				expect(trs.eq(i).text()).toContain(orders[i].number);
				expect(trs.eq(i).text()).toContain(orders[i].name);
				var expect_price = $filter('currency')(orders[i].price, Store.currency);
				expect(trs.eq(i).text()).toContain(expect_price);
				expect(trs.eq(i).text()).toContain(orders[i].count);
			}
		});

		it('should display subtotal tr.subtotal', function(){
			expect(elm.find('tr.subtotal').text()).toContain($filter('currency')(payment_total.actual_subtotal, Store.currency))
		})

		it('should display discount tr.discount', function(){
			expect(elm.find('tr.discount').text()).toContain($filter('currency')(discount, Store.currency));
		})

		it('should display tax tr.tax', function(){
			expect(elm.find('tr.tax').text()).toContain($filter('currency')($scope.paid_bill.tax_amount, Store.currency))
		})

		it('should display credit charge tr.credit', function(){
			expect(elm.find('tr.credit').hasClass('hide')).toBe(false);
			expect(elm.find('tr.credit').text()).toContain($filter('currency')(credit_total.credit_amount, Store.currency))
		})

		it('should display total tr.total', function(){
			expect(elm.find('tr.total').text()).toContain($filter('currency')(credit_total.total, Store.currency))
		})
	})

});