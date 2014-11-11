describe('List Order Directive', function() {
	beforeEach(module("component"));
	beforeEach(module('templates'));
	var $compile, $scope, html, elm, template, templateAsHtml;
	var promptValue = "4";
	beforeEach(inject(function($injector) {
    // Create a new scope that's a child of the $rootScope
	    var $rootScope = $injector.get('$rootScope');
	   	$compile = $injector.get('$compile');
	   
	    $scope = $rootScope.$new();
	    // Create the controller
	    $scope.amount; 
	   	html = "<amountbill amount=\"amount\"></amountbill>";
		elm = angular.element(html);
		template = $compile(elm)($scope);
		$scope.$digest();
		templateAsHtml = template.html();
		window.prompt = function(question,input){
			return promptValue;
		}
	}));

	it('should start with amount = 1', function(){
		expect($scope.amount).toBe(1);
	});

	it('should start with css of inactive ', function(){
		var btns = elm.find('div.s-btn');
		
		expect(btns.eq(0).hasClass('inactive')).toBe(false);
		expect(btns.eq(1).hasClass('inactive')).toBe(true);
		
	});

	it('should be about to change amount when click multi amount', function(){
		var btns = elm.find('div.s-btn');
		btns.eq(1).click();
		expect($scope.amount).toBe(Number(promptValue));
		//swap inactive
		btns = elm.find('div.s-btn');
		expect(btns.eq(0).hasClass('inactive')).toBe(true);
		expect(btns.eq(1).hasClass('inactive')).toBe(false);
		//click back
		btns.eq(0).click();
		btns = elm.find('div.s-btn');
		expect(btns.eq(0).hasClass('inactive')).toBe(false);
		expect(btns.eq(1).hasClass('inactive')).toBe(true);
	});
});
