function MainCtrl($scope, $location, Bill, $filter)
{
	//tmp
	Bill.data.load();
	$scope.bills = Bill.query();
	$scope.createBill = function()
	{
		var bill = Bill.create();
		$location.path('/order/' + bill.id);
	}

	$scope.editBill = function()
	{
		var selectedBills = $filter("filter")($scope.bills, {isSelected:true});
		var selectedBill = selectedBills[0];
		$location.path('/order/' + selectedBill.id)
	}

	$scope.goPayment = function()
	{
		var selectedBills = $filter("filter")($scope.bills, {isSelected:true});
		var selectedBill = selectedBills[0];
		$location.path('/payment/' + selectedBill.id)
	}

}

function OrderCtrl($scope, $location, $routeParams, Bill, Product)
{
	$scope.bill = Bill.get($routeParams.id);
	$scope.orders = $scope.bill.products;
	$scope.products = Product.query();

	$scope.cancleBill = function()
	{
		if(confirm("Do you want to cancle this bill?"))
		{
			Bill.cancle($scope.bill.id)
			$location.path("/");
		}
	}

	$scope.addItem = function(item)
	{
		
		var index = _.findIndex($scope.orders, {number:item.number})
		var _item = _.cloneDeep(item);
		//check if exceed amount
		var isExceedAmount = false
		if(index == -1 && $scope.amount > item.count)
			isExceedAmount = true;
		else if(index != -1 && $scope.orders[index].count + $scope.amount > item.count)
			isExceedAmount = true;

		if(isExceedAmount)
		{
			alert("จำนวน Order เกินกว่าที่มีในระบบ");
			return false;
		}

		if(index == -1 )
		{
			item.number = $scope.orders.length + 1;
			_item.number = item.number;
			_item.count = $scope.amount;
			$scope.orders.push(_item);
		}else
			$scope.orders[index].count += $scope.amount;
		$scope.bill.products = $scope.orders;
		if(Bill.save($scope.bill))
		{
			/*console.log('saved')
			console.log($scope.bill)
			console.log($scope.products)
			console.log( Bill.get($routeParams.id));
			console.log(Product.query());*/
		}
	}

}

function PaymentCtrl($scope, $location, $routeParams, Bill, Payment, $timeout, Product)
{
	$scope.bill = Bill.get($routeParams.id);
	$scope.orders = $scope.bill.products;
	$scope.Payment = Payment.get();
	$scope.discount = 0;
	$scope.paid_bill = {bill:{products:[]}};
	/*console.log('Start Payment')
	console.log(Product.query())
	console.log($scope.bill)*/
	
	$scope.print =function(amount, credit){
		
		if(_.isObject(credit) && credit!= null)
		{
			//console.log('with credit')
			Bill.paid($scope.bill.id, amount, credit)
		}else
		{
			//console.log('without credit')
			Bill.paid($scope.bill.id, amount)
		}
		
		var paid_bills = Bill.findAllPaidBill();
		//console.log(paid_bills)
		$scope.paid_bill = paid_bills[paid_bills.length - 1];
		$timeout(function(){
			window.print();
			//$location.path('/')
		}, 1000)
		
		//alert("จำลองว่า print")
	}
}

function ReportCtrl($scope)
{
	$scope.sales = [
		{name:'Pomade1', amount:20},
		{name:'Pomade2', amount:24},
		{name:'Pomade3', amount:45},
		{name:'Pomade4', amount:60},
		{name:'Pomade5', amount:80}
	]

	$scope.fields = [
		{name:"Name", type:"text", slug:'name'},
		{name:"Amount", type:"number", slug:'amount'}
	]

	$scope.closeShop =function(){
		alert("จำลอง ส่งข้อมูลไปสาขาแม่")
	}
}



function BillCtrl($scope, Bill)
{
	$scope.fields = [
		{name:"Id", type:"text", slug:'id'},
		{name:"Time", type:"text", slug:'create_time'},
		{name:"Amount", type:"number", slug:'amount'}
	];
Bill.data.load();
	$scope.bills = Bill.findAllPaidBill();


}


function UserCtrl($scope, User)
{
	$scope.fields = [
		{name:"Username", type:"text", slug:'username'},
		{name:"Name", type:"text", slug:'name'},
		{name:"Lastname", type:"text", slug:'lastname'},
		{name:"Telphone", type:"text", slug:'phone'},
		{name:"Email", type:"email", slug:'email'}
	];
	$scope.users = User.query();
}

function BillItemCtrl($scope, Bill, $routeParams, $location)
{
	$scope.id = $routeParams.id
	Bill.data.load();
	$scope.paid_bill = Bill.findPaidBill({id:$scope.id});
	$scope.discount = $scope.paid_bill.discount;
	$scope.total = $scope.paid_bill.total;
	
	$scope.orders = $scope.paid_bill.bill.products;

	$scope.deleteBill = function()
	{
		var password = prompt('To cancle please retype a password');
		if(password == "1234")
		{
			Bill.refund($scope.id)
			console.log(Bill.findAllPaidBill({id:$scope.id}))
			$location.path('/bill');
		}

	}

	$scope.print = function()
	{
		window.print();
	}
}

function BillWholesaleCtrl($scope, Wholesale)
{
	Wholesale.data.load();
	$scope.bills = Wholesale.findAllBill();
}

function UserCreateCtrl($scope, $location)
{
	$scope.submitText = "Create";
	$scope.update = function()
	{
		$location.path("/user")
	}
}

function UserUpdateCtrl($scope, $location, $routeParams, User)
{
	$scope.submitText = "Update";
	$scope.user = User.get();
	$scope.user.password = "";
	$scope.update = function()
	{
		$location.path("/user")
	}
}

function PromotionCtrl($scope, Promotion)
{
	Promotion.data.load();
	$scope.promotions = Promotion.query();
}

function PromotionItemCtrl($scope, $routeParams, $location, Promotion, Product)
{
	$scope.promotion = Promotion.find({id:$routeParams.id});
	$scope.condition_types = Promotion.getConditionTypes();
	$scope.reward_types = Promotion.getRewardTypes();
	$scope.submitText = "Update";
	$scope.item_alls = Product.getListItems();
	$scope.show_delete = true;
	$scope.update = function()
	{
		Promotion.save($scope.promotion)
		$location.path('/promotion');
	}
}

function PromotionCreateCtrl($scope, $location, Promotion, Product)
{
	$scope.promotion = {};
	$scope.promotion.reward = Promotion.createReward(Promotion.REWARD_TYPE_DISCOUNT_PERCENT);
	$scope.condition_types = Promotion.getConditionTypes();
	$scope.reward_types = Promotion.getRewardTypes();
	$scope.submitText = "Update";
	$scope.item_alls = Product.getListItems();
	$scope.update = function()
	{
		Promotion.save($scope.promotion)

		$location.path('/promotion');
	}
}
