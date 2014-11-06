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
			total:"=",
			payment_callback:"=onPaid"
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


			scope.doPayCash = function()
			{
				scope.isPaid = true;
				scope.payAmount = scope.input;
				scope.input = "";
				scope.doPayment();
			}

			scope.doPayment = function()
			{
				scope.payment_callback();
			}

			scope.switchTo(scope.mode);

		}
	}
}).directive("paymentsum", function () {
	return {
		restrict: "E",
		templateUrl: "component/payment/paymentsum.html",
		replace: true,
		scope: {
			orders:"=",
			tax:"=",
			total:"=",
			discount:"="	
		},
		link: function (scope, element, attrs)
		{
			if(typeof(scope.tax) == "undefined")
				scope.tax = 0;
			if(typeof(scope.discount) == "undefined")
				scope.discount = 0;

			scope.subTotalAmount = 0;
			scope.taxAmount = 0;
			scope.calSubtotal = function()
			{
				for(var i =0; i < scope.orders.length; i++)
				{
					scope.subTotalAmount += scope.orders[i].count * scope.orders[i].price;
				}
				scope.taxAmount = scope.subTotalAmount / 100 * scope.tax;
				scope.total = scope.subTotalAmount - scope.discount + scope.taxAmount
			}

			scope.calSubtotal();
		}
	}
}).directive("listbill", function () {
	return {
		restrict: "E",
		templateUrl: "component/bill/listbill.html",
		replace: true,
		scope: {
			bills:"="	
		},
		link: function (scope, element, attrs)
		{
		}
	}
}).directive("listuser", function () {
	return {
		restrict: "E",
		templateUrl: "component/user/listuser.html",
		replace: true,
		scope: {
			users:"="	
		},
		link: function (scope, element, attrs)
		{
		}
	}
}).directive("listpromotion", function () {
	return {
		restrict: "E",
		templateUrl: "component/promotion/listpromotion.html",
		replace: true,
		scope: {
			promotions:"="	
		},
		link: function (scope, element, attrs)
		{
		}
	}
}).directive("promoCondition",['Promotion', function (Promotion) {
	return {
		restrict: "E",
		templateUrl: "component/promotion/condition.html",
		replace: true,
		scope: {
			conditions:"=",
			conditionTypes:"=",
			itemAlls:"="
		},
		link: function (scope, element, attrs)
		{
			scope.conditionCss = "btn-primary";
			scope.CON_TYPE_ITEM_SET = Promotion.CON_TYPE_ITEM_SET;
			scope.CON_TYPE_MONEY = Promotion.CON_TYPE_MONEY;
			scope.updateType = function(condition)
			{
				condition.type = condition.selectedType.value;
				if(condition.type == scope.CON_TYPE_ITEM_SET && typeof(condition.items) == 'undefined')
					condition.items = []
			}

			scope.getLastConditionId = function()
			{
				if(scope.conditions.length > 0)
					return scope.conditions[scope.conditions.length - 1].id
				return 0;
			}

			scope.addCondition = function()
			{
				if(scope.conditions.length < scope.conditionTypes.length)
					scope.conditions.push({id:scope.getLastConditionId() + 1})
				if(scope.conditions.length >= scope.conditionTypes.length)
					scope.conditionCss = "";
			}

			scope.removeCondition = function(condition)
			{
				_.remove(scope.conditions, {id:condition.id});
				if(scope.conditions.length < scope.conditionTypes.length)
					scope.conditionCss = "btn-primary";
			}

			scope.addItem = function(items)
			{
				items.push({})
			}

			scope.updateItem = function(item)
			{
				item.item_id = item.item.id;
			}

			scope.initForm = function()
			{
				if(typeof(scope.conditions) == "undefined")
					scope.conditions = []
				for(var i =0; i < scope.conditions.length; i++)
				{
					//set type in each form
					var index = _.findIndex(scope.conditionTypes, {value:scope.conditions[i].type})
					scope.conditions[i].selectedType = scope.conditionTypes[index];	
					//if type is item
					if(scope.conditions[i].type == scope.CON_TYPE_ITEM_SET)
					{
						for(var j = 0;j < scope.conditions[i].items.length;j++)
						{
							//set item in each items
							var itemIndex = _.findIndex(scope.itemAlls, {id:scope.conditions[i].items[j].item_id});
							
							scope.conditions[i].items[j].item = scope.itemAlls[itemIndex];
						}
					}
				}
			}

			scope.initForm();
		}
	}
}]).directive("promoReward",['Promotion', function (Promotion) {
	return {
		restrict: "E",
		templateUrl: "component/promotion/reward.html",
		replace: true,
		scope: {
			reward:"=",
			rewardTypes:"=",
			itemAlls:"="
		},
		link: function (scope, element, attrs)
		{
			scope.percentTxt = ""
			scope.REWARD_TYPE_ITEM_BACK = Promotion.REWARD_TYPE_ITEM_BACK;
			scope.REWARD_TYPE_DISCOUNT_AMOUNT = Promotion.REWARD_TYPE_DISCOUNT_AMOUNT;
			scope.REWARD_TYPE_DISCOUNT_PERCENT = Promotion.REWARD_TYPE_DISCOUNT_PERCENT;

			scope.updateType = function()
			{
				scope.reward.type = scope.reward.selectedType.value
				if(scope.reward.type == Promotion.REWARD_TYPE_DISCOUNT_PERCENT)
					scope.percentTxt = "%";
				else
					scope.percentTxt = "";
			}

			scope.initForm = function()
			{
				if(typeof(scope.reward) != "undefined")
				{
					var index = _.findIndex(scope.rewardTypes, {value: scope.reward.type});
					scope.reward.selectedType = scope.rewardTypes[index];
					if(scope.reward.type == scope.REWARD_TYPE_ITEM_BACK)
					{
							for(var i = 0; i < scope.reward.items.length;i++)
						{
							var itemIndex = _.findIndex(scope.itemAlls, {id:scope.reward.items[i].item_id});
							scope.reward.items[i].item = scope.itemAlls[itemIndex];
						}
						
					}
				}
				
			}

			scope.initForm();
		}
	}
}]).directive("listproduct", function () {
	return {
		restrict: "E",
		templateUrl: "component/listproduct.html",
		replace: true,
		scope: {
			products:"=",
			selectedProducts:"="	
		},
		link: function (scope, element, attrs)
		{
			if(typeof(scope.selectedProducts) == 'undefined')
				scope.selectedProducts = [];
			scope.updateProduct = function(product)
			{
				product.id = product.item.id;
			}

			scope.removeProduct = function(product)
			{
				console.log('attempt to remove')
				console.log(scope.selectedProducts)
				_.remove(scope.selectedProducts, {id:product.id})
			}

			scope.addProduct = function()
			{
				scope.selectedProducts.push({});
			}
		}
	}
});