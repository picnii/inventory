describe('Payment Sum Directive', function() {
	beforeEach(module("component"));
	beforeEach(module('templates'));
	beforeEach(module('pos'));
  	var Product, Payment;
	var $compile, $scope, html, elm, template, templateAsHtml, subtotal, taxAmount, total;
	beforeEach(inject(function($injector) {
    // Create a new scope that's a child of the $rootScope
	    var $rootScope = $injector.get('$rootScope');
	   	$compile = $injector.get('$compile');
	   	Product = $injector.get('Product');
	   	Payment = $injector.get('Payment')
	    $scope = $rootScope.$new();
	    $scope.Payment = Payment.get();
	    $scope.discount = 250;
	    // Create the controller
	    $scope.orders = Product.query();
	    subtotal = 0, total = 0;
	    taxAmount = 0;
	    for(var i =0; i < $scope.orders.length ; i++)
	    {
	    	$scope.orders[i].number = i + 1;
	    	subtotal += $scope.orders[i].price * $scope.orders[i].count;
	    }

	    //tax calculation
	    taxAmount = subtotal * $scope.Payment.tax * 0.01;
	    taxAmount = Math.ceil(taxAmount)
	    total = subtotal - $scope.discount + taxAmount;


	   	html = "<paymentsum tax=\"Payment.tax\" discount=\"discount\" orders=\"orders\" total=\"total\"></paymentsum>";
		elm = angular.element(html);
		template = $compile(elm)($scope);
		$scope.$digest();
		templateAsHtml = template.html();
	}));

	it('should contain all orders in table tr.order-item', function(){
		var list_all_tr = elm.find('tr.order-item');
		
		for(var i = 0; i < $scope.orders.length; i++)
		{
			expect(list_all_tr.eq(i).text() ).toContain($scope.orders[i].number);
			expect(list_all_tr.eq(i).text() ).toContain($scope.orders[i].count);
			expect(list_all_tr.eq(i).text() ).toContain($scope.orders[i].price);
			expect(list_all_tr.eq(i).text() ).toContain($scope.orders[i].number);
		}
	});

	it('should display discount as scope.discount at tr.discount', function(){
		expect(elm.find("tr.discount").text() ).toContain($scope.discount + "")
	})

	it('should display subtotal due that is sum from order at tr.subtotal', function(){
		expect(elm.find("tr.subtotal").text()).toContain(subtotal);
	})

	it('should display tax that is % at td.percent and amount at td.amount', function(){
		expect(elm.find('tr.tax').find("td.percent").text()).toContain($scope.Payment.tax);
		expect(elm.find('tr.tax').find("td.amount").text()).toContain(taxAmount)

	})

});