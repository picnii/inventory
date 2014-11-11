describe('Group Bill Directive', function() {
	beforeEach(module("component"));
	beforeEach(module('templates'));
	var $compile, $scope;
	beforeEach(inject(function($injector) {
    // Create a new scope that's a child of the $rootScope
	    var $rootScope = $injector.get('$rootScope');
	   	$compile = $injector.get('$compile');
	    $scope = $rootScope.$new();
	    // Create the controller
	   	$scope.bills = [ 
				{name:"bill01"},
				{name:"bill02"},
				{name:"bill03"}
			];
	  }));
	/*
	<groupbill ng-repeat="item in bills" class="bill"  text="{{item.name}}" selected="item.isSelected" on-selected="doSelect(item)"></groupbill>*/
	it('should render text in span > div for each groupbill ', function(){
		
		inject(function(){
			var hello_string = "Hello"
			var template = $compile("<groupbill text=\""+ hello_string + "\"></groupbill>")($scope);
			$scope.$digest();
			var templateAsHtml = template.html();
			expect(templateAsHtml).toContain(hello_string)

			$scope.test = "Test Scope var";
			template = $compile("<groupbill text={{test}}></groupbill>")($scope);
			$scope.$digest();
			templateAsHtml = template.html();
			expect(templateAsHtml).toContain($scope.test)
		})

	})

	it('should be able to get click for 1 element', function(){
		inject(function(){
			
			var elm = angular.element("<div><groupbill selected=\"bills[0].isSelected\" text=\"{{bills[0].name}}\"></groupbill></div>")
			var template = $compile(elm)($scope);
			$scope.$digest();
			var templateAsHtml = template.html();
			var clickable_divs = elm.find('div.clickable');
		//	console.log(clickable_divs)
			expect(elm.find('div.active').length).toBe(0);
			expect($scope.bills[0].isSelected).not.toBe(true)
			clickable_divs.click();
			expect(elm.find('div.active').length).toBe(1);
			//console.log(elm.find('div.active'))
			expect(templateAsHtml).toContain($scope.bills[0].name);
			expect($scope.bills[0].isSelected).toBe(true)
		});

	})


})