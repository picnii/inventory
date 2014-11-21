angular.module("component", ['localData'])
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
			//console.log(attrs);
			//console.log(scope)
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
			//	console.log('callback');
			//	console.log(scope.isSelected)
			//	console.log(scope.callback_select)
				if(scope.isSelected && _.isFunction(scope.callback_select))
					scope.callback_select();
				if(!scope.isSelected && _.isFunction(scope.callback_un_select))
					scope.callback_un_select();
			}

			scope.doUpdate = function()
			{
				//console.log('testupdate');
				var element_target = angular.element(document.querySelector('div.bill.selectdiv.clickable.selectdiv.clickable.active'));
				if(element_target.length > 0)
				{
				//	console.log('unselect em------')
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
			callback_add_item: "=onAdditem",
			products: "="
		},
		link: function (scope, element, attrs)
		{
			var MODE_BARCODE = 'barcode', MODE_TOUCH  = 'touch';
			var MODE_GROUP = 'group',  MODE_ITEM = 'item';
			scope.mode = MODE_BARCODE;
			scope.touch_mode = MODE_GROUP;

			scope.shortName = function(name)
			{
				var _name = "";
				var isFoundNumber = false;
				for(var i =0; i < name.length && !isFoundNumber; i++)
				{
					if(name[i] ==  name[i].toUpperCase())
						_name += name[i];
				}

				return _name;
			}

			scope.switchTo = function(mode)
			{
				scope.scanner_input = ""
				scope.mode = mode;
				if(scope.mode == 'barcode')
				{
					scope.cssBarcode = '';
					scope.cssTouch = "hide";
					var inputElement = element.find('input')
					inputElement[0].focus()
					
					
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

			scope.initTouch = function()
			{
				var group_obj  = _.groupBy(scope.products, 'type');
				scope.groups = [];
				for(var key in group_obj)
				{
					var obj = {name:key, items:group_obj[key]};
					scope.groups.push(obj);
				}
				scope.selectedGroup = {};
				//scope.products
			}
			scope.initTouch();

			scope.addBarcodeItem = function()
			{
				var item = _.find(scope.products, {code:scope.scanner_input});
				if(_.isObject(item))
					scope.callback_add_item(item);
				scope.scanner_input = "";
			}

			scope.selectGroup = function(group)
			{
				scope.selectedGroup = group;
				scope.switchTo(MODE_ITEM);
			}

			scope.addItem = function(item)
			{
				scope.callback_add_item(item);
				scope.switchTo(MODE_TOUCH);
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
}).directive("listorder", function (Store) {
	return {
		restrict: "E",
		templateUrl: "component/order/listorder.html",
		replace: true,
		scope: {
			orders:"="
		},
		link: function (scope, element, attrs)
		{
			scope.Store = Store;
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
}).directive("paymentnav", function (Product, Store) {
	return {
		restrict: "E",
		templateUrl: "component/payment/paymentnav.html",
		replace: true,
		scope: {
			total:"=",
			payment_callback:"=onPaid",
			credits:"="
		},
		link: function (scope, element, attrs)
		{
			scope.Store = Store;
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
					var inputElement = element.find('input')
					inputElement[0].focus()
					
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
				
				scope.payment_callback(scope.total, null);
			}
			scope.isCreditSelected = false;

			scope.selectCredit = function(credit)
			{
				
				scope.isCreditSelected = true;
				scope.creditExplanation = "Charge " + credit.chargePercent + " % + " + credit.chargeAmount;
				scope.total_credit_payment = Math.ceil(scope.total + (scope.total * credit.chargePercent / 100) + credit.chargeAmount);

			}

			scope.payWithCredit = function(credit)
			{
				scope.payment_callback(scope.total_credit_payment, credit);
			}

			scope.switchTo(scope.mode);

		}
	}
}).directive("paymentsum", function (Payment, Store) {
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
			scope.Store = Store;
			if(typeof(scope.tax) == "undefined")
				scope.tax = 0;
			if(typeof(scope.discount) == "undefined")
				scope.discount = 0;

			scope.subTotalAmount = 0;
			scope.taxAmount = 0;
			scope.calSubtotal = function()
			{
				/*for(var i =0; i < scope.orders.length; i++)
				{
					scope.subTotalAmount += scope.orders[i].count * scope.orders[i].price;
				}
				scope.taxAmount = Math.ceil((scope.subTotalAmount ) / 100 * scope.tax);
				scope.total = Math.ceil(scope.subTotalAmount - scope.discount + scope.taxAmount)*/
				var total_object = Payment.getTotal(scope.orders, scope.discount);
				scope.subTotalAmount = total_object.actual_subtotal;
				scope.taxAmount = total_object.actual_tax_amount;
				scope.total = total_object.total;
			}

			scope.calSubtotal();
		}
	}
}).directive("listbill", function (Store) {
	return {
		restrict: "E",
		templateUrl: "component/bill/listbill.html",
		replace: true,
		scope: {
			bills:"="	
		},
		link: function (scope, element, attrs)
		{
			scope.Store = Store;
			scope.target = 'bill';
			if(_.isString(attrs.target))
			{
				scope.target = attrs.target;
			}
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
				//if(scope.conditions.length < scope.conditionTypes.length)
				//	scope.conditions.push({id:scope.getLastConditionId() + 1})
				if(scope.conditions.length < scope.conditionTypes.length)
				{
					var type;
					if(scope.conditions.length == 0)
						type = scope.CON_TYPE_ITEM_SET;
					else
						type = scope.CON_TYPE_MONEY;
					var condition = Promotion.addCondition(scope.conditions, type);
					var index = _.findIndex(scope.conditionTypes, {value:type})
					condition.selectedType = scope.conditionTypes[index];	
				}
				if(scope.conditions.length >= scope.conditionTypes.length)
					scope.conditionCss = "";
			}

			scope.removeCondition = function(condition)
			{
				_.remove(scope.conditions, {id:condition.id});
				if(scope.conditions.length < scope.conditionTypes.length)
					scope.conditionCss = "btn-primary";
			}


			scope.updateItem = function(item)
			{
				if(!item.update(item.product))
				{
					//duplicate item
					item.product = {};
				}
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
							scope.conditions[i].items[j] = Promotion.initItem(scope.conditions[i].items[j], scope.conditions[i].items);
							var itemIndex = _.findIndex(scope.itemAlls, {id:scope.conditions[i].items[j].item_id});				
							scope.conditions[i].items[j].product = scope.itemAlls[itemIndex];
						}
					}
				}
			}

			scope.initForm();
		}
	}
}]).directive("promoReward",['Promotion', 'Store', function (Promotion, Store) {
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
			console.log()
			scope.currency = Store.currency;
			scope.percentTxt = ""
			scope.REWARD_TYPE_ITEM_BACK = Promotion.REWARD_TYPE_ITEM_BACK;
			scope.REWARD_TYPE_DISCOUNT_AMOUNT = Promotion.REWARD_TYPE_DISCOUNT_AMOUNT;
			scope.REWARD_TYPE_DISCOUNT_PERCENT = Promotion.REWARD_TYPE_DISCOUNT_PERCENT;

			

			scope.updateType = function()
			{
				scope.reward = Promotion.createReward(scope.reward.selectedType.value)
				var index = _.findIndex(scope.rewardTypes, {value: scope.reward.type});
				scope.reward.selectedType = scope.rewardTypes[index];
				//scope.reward.type = scope.reward.selectedType.value
				//scope.reward.update({type:scope.reward.selectedType.value})
				if(scope.reward.type == Promotion.REWARD_TYPE_DISCOUNT_PERCENT)
					scope.percentTxt = "%";
				else
					scope.percentTxt = "";
			}

			scope.updateItem = function(item)
			{
				if(!item.update(item.product))
					item.product = {}
			}

			scope.removeItem = function(item, items)
			{
				_.remove(items, {item_id:item.id})
			}

			scope.initForm = function()
			{
				if(typeof(scope.reward) != "undefined")
				{
					//scope.reward = Promotion.createReward(scope.reward.type);
					var index = _.findIndex(scope.rewardTypes, {value: scope.reward.type});
					scope.reward.selectedType = scope.rewardTypes[index];
					if(scope.reward.type == scope.REWARD_TYPE_ITEM_BACK)
					{
						for(var i = 0; i < scope.reward.items.length;i++)
						{
							scope.reward.items[i] = Promotion.initItem(scope.reward.items[i], scope.reward.items);
							var itemIndex = _.findIndex(scope.itemAlls, {id:scope.reward.items[i].item_id});
							scope.reward.items[i].product = scope.itemAlls[itemIndex];
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
				_.remove(scope.selectedProducts, {id:product.item_id})
			}

			scope.addProduct = function()
			{
				scope.selectedProducts.push({});
			}
		}
	}
}).directive("receipt", function (Payment, Store) {
	return {
		restrict: "E",
		templateUrl: "component/bill/receipt.html",
		replace: true,
		scope: {
			paidBill:"="
		},
		link: function (scope, element, attrs)
		{
			scope.Store = Store;
			scope.calculate = function()
			{
				scope.cssCredit = "hide";
				scope.creditAmount = 0;
				var payment_total = scope.paidBill.payment_total
				if(_.isUndefined(payment_total))
					return -1;
				scope.subTotalAmount = payment_total.actual_subtotal;
				if(_.isNull(scope.paidBill.credit))
				{
					scope.total = payment_total.total;
				}else
				{
					scope.cssCredit = ""
					var credit_total = scope.paidBill.credit_total;
					
					scope.creditAmount = credit_total.credit_amount;
					scope.total = credit_total.total;
				}
			}
			scope.calculate();
			scope.$watch('paidBill', function(newValue){
				scope.calculate();
			})
		}

	}
}).directive("wholesaleList", function ($filter, $timeout, Store) {
	return {
		restrict: "E",
		templateUrl: "component/wholesale/list.html",
		replace: true,
		scope: {
			items:"=",
			callback:"=onOrder"
		},
		link: function (scope, element, attrs)
		{
			scope.Store = Store;
			scope.isSearchName = false;
			scope.isSearchType = false;
			scope.clickSearchName = function()
			{
				scope.isSearchName = !scope.isSearchName
				if(scope.isSearchName)
				{
					$timeout(function(){
						var elm = element.find('input')
						console.log(elm[0])
						elm[0].focus();
					}, 10)
					
				}
			}
			scope.clickSearchType = function()
			{
				scope.isSearchType = !scope.isSearchType;
				if(scope.isSearchType)
				{
					$timeout(function(){
						var elm = element.find('input')
						elm[1].focus();
					}, 10)
				}
			}

			scope.products = _.cloneDeep(scope.items);
			scope.doClickRow = function(item)
			{
				//if item has condition
				if(item.condition != null)
				{
					
					var target = _.find(scope.products, {id:item.condition.item_id});
					if(_.isUndefined(target.amount) || target.amount < item.condition.count)
					{
						alert("Must do like in condition")
						item.isSelected = false;
						return false;
					}
				}

				//
				if(item.isSelected == false)
					item.isSelected = true;
				else if(item.isSelected == true)
					item.isSelected = false;
				else
					item.isSelected = true;

				item.showSelected = item.isSelected
			}

			scope.getConditionText = function(item)
			{
				if(item.condition == null)
					return ""
				var product_target = _.find(scope.products, {id:item.condition.item_id});
				return  product_target.name + " x " + item.condition.count
			}

			scope.order = function()
			{
				var sendItems = $filter('filter')(scope.products, {isSelected:true});
				sendItems = _.cloneDeep(sendItems)
				var i =0;
				var isZeroCount = false;
				_.forEach(sendItems, function(item){
					item.number = i + 1;
					item.count = item.amount
					
					if(_.isUndefined(item.count) || item.count == 0)
					{
						isZeroCount = true;
						
					}
					for(var j = item.item_ranges.length -1; j>= 0; j--)
					{
						if(item.count >= item.item_ranges[j].from)
						{
							item.price = item.item_ranges[j].price;
							break;
						}
					}
					i++;
				})
				if(!isZeroCount)
					scope.callback(sendItems)
				else
					alert("Please Fill all amount of the order")
			}
		}
	}
}).directive("wholesaleBill", function (Payment, Store) {
	return {
		restrict: "E",
		templateUrl: "component/wholesale/bill.html",
		replace: true,
		scope: {
			bill:"=",
			callback:"=onOrder"
		},
		link: function (scope, element, attrs)
		{
			scope.Store = Store;
			if(_.isUndefined(scope.bill.discount))
				scope.bill.discount = 0;
			scope.payment_total = Payment.getTotal(scope.bill.products, scope.bill.discount)

		}

	}
});