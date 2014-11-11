describe('Scanner Directive', function() {
	beforeEach(module("component"));
	beforeEach(module('templates'));
	beforeEach(module('pos'));
  	var Product;
	var $compile, $scope, html, elm, template, templateAsHtml;
	var $httpBackend
	beforeEach(inject(function($injector) {
    // Create a new scope that's a child of the $rootScope
	    var $rootScope = $injector.get('$rootScope');
	   	$compile = $injector.get('$compile');

	   	Product = $injector.get('Product');

	    $scope = $rootScope.$new();
	    // Create the controller
	    $scope.products = Product.query();
	    $scope.addItem = function(item)
	    {
	    	expect($scope.products).toContain(item);
	    	//console.log("********************* Add Item******************")
	    	//expect(true).toBe(false)
	    }
	    
	   	html = "<scanner on-additem=\"addItem\" products=\"products\"></scanner>";
		elm = angular.element(html);
		template = $compile(elm)($scope);
		$scope.$digest();
		templateAsHtml = template.html();
	}));

	it('should start at barcode page', function(){
		expect(elm.find('div.barcode-input').hasClass('hide')).toBe(false);
		expect(elm.find('div.touch-input').hasClass('hide')).toBe(true);
	})

	/*it('should be able to addItem by barcode', function(){
		var code = $scope.products[0].code;
		elm.find('div.barcode-input').find('input:text').val(code);
		expect(elm.find('div.barcode-input').find('input:text').val()).toBe(code);
		//console.log('submit button')
		//console.log(elm.find('div.barcode-input').find('input:submit'))
		elm.find('div.barcode-input').find('input:submit').click();
		expect(elm.find('div.barcode-input').find('input:text').val()).toBe('');
	})*/

	describe('Touch Input Function', function(){
		beforeEach(function(){
			elm.find('div.scan-check.touch').click();
		})
		it('should be change mode to touch by click at the header', function(){
			expect(elm.find('div.barcode-input').hasClass('hide')).toBe(true);
			expect(elm.find('div.touch-input').hasClass('hide')).toBe(false);	
		})
		
		it('item group-item should not show at first', function(){
			//item group should be hide
			expect(elm.find('section.group-item').hasClass('hide')).toBe(true);
			expect(elm.find('section.group-category').hasClass('hide')).toBe(false);	
		});

		it('should change to group-item after click one of category group', function(){
			//click first group
			elm.find('section.group-category').find('div.item').eq(0).click();
			//change to item mode
			expect(elm.find('section.group-item').hasClass('hide')).toBe(false);
			expect(elm.find('section.group-category').hasClass('hide')).toBe(true);	
		})
		
		it('should change to category mode and call addItem after click an item', function(){
			//click first group
			elm.find('section.group-category').find('div.item').eq(0).click();
			//click first item
			elm.find('section.group-item').find('div.item').eq(0).click();
			//back mode to category
			expect(elm.find('section.group-item').hasClass('hide')).toBe(true);
			expect(elm.find('section.group-category').hasClass('hide')).toBe(false);		
		})
	
	})

});