describe('List Order Directive', function() {
	beforeEach(module("component"));
	beforeEach(module('templates'));
	beforeEach(module('pos'));
  	var Product;
	var $compile, $scope, html, elm, template, templateAsHtml;
	beforeEach(inject(function($injector) {
    // Create a new scope that's a child of the $rootScope
	    var $rootScope = $injector.get('$rootScope');
	   	$compile = $injector.get('$compile');
	   	Product = $injector.get('Product');
	    $scope = $rootScope.$new();
	    // Create the controller
	    $scope.orders = Product.query();
	    for(var i =0; i < $scope.orders.length ; i++)
	    	$scope.orders[i].number = i + 1;
	   	html = "<listorder orders=\"orders\"></listorder>";
		elm = angular.element(html);
		template = $compile(elm)($scope);
		$scope.$digest();
		templateAsHtml = template.html();
	}));

	it('should have item like product with number attribute for each content', function(){
		inject(function(){
			
			//console.log('-----Test List Order---')
			//console.log(elm.find("tr").eq(1).html());
			for(var i = 0; i < $scope.orders.length ; i++)
			{
				//exclude column
				var html = elm.find("tr").eq(i + 1).html();
				expect(html).toContain($scope.orders[i].number);
				expect(html).toContain($scope.orders[i].name);
				expect(html).toContain($scope.orders[i].count);
				expect(html).toContain($scope.orders[i].price);

			}
		});
	});

	it('should be able to remove order and rearrange it', function(){
		var old_orders = _.cloneDeep($scope.orders);
		inject(function(){
			var old_orders = _.cloneDeep($scope.orders);
			elm.find("tr").eq(1).find('button').click();
			expect($scope.orders.length).toBe(old_orders.length - 1);
			expect($scope.orders).not.toContain(old_orders[0]);
			for(var i = 0; i < $scope.orders.length ; i++)
			{
				//exclude column
				var html = elm.find("tr").eq(i + 1).html();
				expect($scope.orders[i].number).toBe(i + 1);
				expect(html).toContain($scope.orders[i].number);
				expect(html).toContain($scope.orders[i].name);
				expect(html).toContain($scope.orders[i].count);
				expect(html).toContain($scope.orders[i].price);

			}
		})
	})

});