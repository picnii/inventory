describe('Payment Nav Directive', function() {
	beforeEach(module("component"));
	beforeEach(module('templates'));
	beforeEach(module('pos'));
  	var Product, Payment;
	var $compile, $scope, html, elm, template, templateAsHtml, credit_total;
	beforeEach(inject(function($injector) {
    // Create a new scope that's a child of the $rootScope
	    var $rootScope = $injector.get('$rootScope');
	   	$compile = $injector.get('$compile');
	   	Product = $injector.get('Product');
	   	Payment = $injector.get('Payment');
	    $scope = $rootScope.$new();
	    // Create the controller
	    $scope.Payment = Payment.get();
	    $scope.total = 5000;

	    

	    $scope.print = function(item, type)
	    {

	    }

	   	html = "<paymentnav credits=\"Payment.credits\" total=\"total\" on-paid=\"print\"></paymentnav>";
		elm = angular.element(html);
		template = $compile(elm)($scope);
		$scope.$digest();
		templateAsHtml = template.html();
	  }));

	it('should start with cash Page', function(){
		expect(elm.find('div.cash-input').hasClass('hide')).toBe(false);
		expect(elm.find('div.credit-input').hasClass('hide')).toBe(true);
	})

/*
	it('should be able to calculat cash correctly', function(){

	})
*/

	describe('Credit', function(){
		beforeEach(function(){
			elm.find('div.credit.scan-check').click();

		})

		it('should change to credit page after click', function(){
			expect(elm.find('div.cash-input').hasClass('hide')).toBe(true);
			expect(elm.find('div.credit-input').hasClass('hide')).toBe(false);
		});

		it('should show all credit card in div.item', function(){
			var items = elm.find('div.item');
			for(var i =0; i < $scope.Payment.credits.length ; i++)
			{
				expect(items.eq(i).text()).toContain($scope.Payment.credits[i].name)
			}

		});

		describe("Payment", function(){
			var items ;
			var credit_index = 0;
			beforeEach(function(){
				items = elm.find('div.item');
				items.eq(credit_index).find('span').click();
			})

			it('should be to show credit card info for each card', function(){
				
				expect(elm.find('div.credit-input').find('div.detail').text()).toContain($scope.Payment.credits[credit_index].chargePercent );
				expect(elm.find('div.credit-input').find('div.detail').text()).toContain($scope.Payment.credits[credit_index].chargeAmount );
			});

			it('should show credit-total Amount in span.credit-total', function(){
				var credit = $scope.Payment.credits[credit_index];
				//calculation here
			    var credit_charge = ( $scope.total * credit.chargePercent * 0.01) + credit.chargeAmount;
			    credit_total = $scope.total + credit_charge
			    credit_total = Math.ceil(credit_total)

				expect(elm.find('span.credit-total').text()).toContain(credit_total)
			})

		})

	})

});