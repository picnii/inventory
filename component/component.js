angular.module("component", [])
.directive("groupbill", function () {
	return {
		restrict: "E",
		templateUrl: "component/home/groupbill.html",
		replace: true,
		scope: {
			text: "@",
			selected: "=",
			callback_select: "=onSelected",
			callback_un_select: "=onUnSelected"
		},
		link: function (scope, element, attrs)
		{
			console.log(attrs);
			console.log(scope)
			scope.updateSelected = function(){
				if(typeof(attrs.selected) == 'undefined' || attrs.selected == 'false' )
					scope.isSelected = false;
				else
				{
					scope.isSelected = true;
					element.toggleClass('active');
				}
			}	

			scope.do_callback_event = function()
			{
				console.log('callback');
				console.log(scope.isSelected)
				console.log(scope.callback_select)
				if(scope.isSelected && _.isFunction(scope.callback_select))
					scope.callback_select();
				if(!scope.isSelected && _.isFunction(scope.callback_un_select))
					scope.callback_un_select();
			}

			scope.doUpdate = function()
			{
				console.log('testupdate');
				var element_target = angular.element(document.querySelector('div.bill.selectdiv.clickable.selectdiv.clickable.active'));
				if(element_target.length > 0)
				{
					var target_scope = element_target.scope() ;
					target_scope.item.isSelected = false;
					//target_scope.doUpdate();
				}
			//	element.toggleClass('active');
				scope.isSelected = !scope.isSelected;
				scope.selected = scope.isSelected ;
				//console.log(scope.isSelected)
				scope.do_callback_event();
				
			}

			scope.updateSelected();
			scope.$watch('selected', function(newValue, oldValue){
				scope.isSelected = newValue;
				if(scope.isSelected)
					element.addClass('active')
				else
					element.removeClass('active');
				//scope.do_callback_event();
			})

		}
	}
}).directive("scanner", function () {
	return {
		restrict: "E",
		templateUrl: "component/order/scanner.html",
		replace: true,
		scope: {
			callback_add_item: "=onAdditem"
		},
		link: function (scope, element, attrs)
		{
			var MODE_BARCODE = 'barcode', MODE_TOUCH  = 'touch';
			var MODE_GROUP = 'group',  MODE_ITEM = 'item';
			scope.mode = MODE_BARCODE;
			scope.touch_mode = MODE_GROUP;
			scope.switchTo = function(mode)
			{
				scope.scanner_input = ""
				scope.mode = mode;
				if(scope.mode == 'barcode')
				{
					scope.cssBarcode = '';
					scope.cssTouch = "hide";
					setInterval(function(){

						document.getElementById('barcode-input').focus();
					}, 10)
					
				}else if(scope.mode == MODE_TOUCH)
				{
					scope.touch_mode = MODE_GROUP;
					scope.cssTouch = '';
					scope.cssBarcode = "hide";
					scope.cssGroup ='';
					scope.cssItem = 'hide';
				}else if(scope.mode == MODE_GROUP)
				{
					scope.cssGroup ='';
					scope.cssItem = 'hide';
				}else if(scope.mode == MODE_ITEM)
				{
					scope.cssGroup = 'hide';
					scope.cssItem = ';'
				}
			}
			scope.switchTo(scope.mode);
			scope.addItem = function()
			{
				if(scope.mode == MODE_ITEM)
					scope.switchTo(MODE_TOUCH)
				scope.callback_add_item();
				scope.scanner_input = "";
				console.log(scope.scanner_input)
			}
		}
	}


}).directive("amountbill", function () {
	return {
		restrict: "E",
		templateUrl: "component/order/amountbill.html",
		replace: true,
		scope: {
			amount:"="
		},
		link: function (scope, element, attrs)
		{
			scope.amount = 1;
			scope.amountMulti = "?";
			scope.cssMulti = 'inactive'
			scope.changeAmount =function()
			{
				var value =prompt("Amount?","2");
				while(isNaN(value) || Number(value) < 1 )
				{

					value =prompt("Wrong number Amount?","2");
				}
				scope.amount = Number(value);
				scope.amountMulti = scope.amount;
			}
		}

	}
}).directive("listorder", function () {
	return {
		restrict: "E",
		templateUrl: "component/order/listorder.html",
		replace: true,
		scope: {
			orders:"="
		},
		link: function (scope, element, attrs)
		{
			scope.removeItem = function(item)
			{
				_.remove(scope.orders, {number:item.number})
				//sort new order
				for(var i =0; i < scope.orders.length; i++){
					scope.orders[i].number = i + 1
				}
			}
		}

	}
}).directive("paymentnav", function () {
	return {
		restrict: "E",
		templateUrl: "component/payment/paymentnav.html",
		replace: true,
		scope: {
			
		},
		link: function (scope, element, attrs)
		{

			var MODE_BARCODE = 'barcode', MODE_TOUCH  = 'touch';
			var MODE_GROUP = 'group',  MODE_ITEM = 'item';
			scope.mode = MODE_BARCODE;
			scope.touch_mode = MODE_GROUP;
			scope.switchTo = function(mode)
			{
				scope.mode = mode;
				if(scope.mode == 'barcode')
				{
					scope.cssBarcode = '';
					scope.cssTouch = "hide";
					setInterval(function(){

						document.getElementById('barcode-input').focus();
					}, 10)
					
				}else if(scope.mode == MODE_TOUCH)
				{
					scope.touch_mode = MODE_GROUP;
					scope.cssTouch = '';
					scope.cssBarcode = "hide";
					scope.cssGroup ='';
					scope.cssItem = 'hide';
				}else if(scope.mode == MODE_GROUP)
				{
					scope.cssGroup ='';
					scope.cssItem = 'hide';
				}else if(scope.mode == MODE_ITEM)
				{
					scope.cssGroup = 'hide';
					scope.cssItem = ';'
				}
			}
			scope.switchTo(scope.mode);

		}
	}
});