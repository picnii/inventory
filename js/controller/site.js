function MainCtrl($scope, $location, Bill, $filter)
{

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
		$location.path('/payment')
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
			console.log('moveee')
			$location.path("/");
		}
	}

	$scope.addItem = function(item)
	{
		/*console.log("add Item ");
		console.log(Product.query());
		console.log($scope.orders)
		console.log(item.number)*/
		var index = _.findIndex($scope.orders, {number:item.number})
		var _item = _.cloneDeep(item);
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
			$location.path('/')
		}, 10)
		
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

function BillItemCtrl($scope, $routeParams, $location)
{
	$scope.id = $routeParams.id
	$scope.fields = [
		{name:"Number", type:"number", slug:'number'},
		{name:"Name", type:"text", slug:'name'},
		{name:"Count", type:"number", slug:'count'},
		{name:"Price", type:"number", slug:'price'}
	];

	$scope.orders = [
		{number:1, name:"PomadeA", count:1, price:700},
		{number:2, name:"PomadeB", count:1, price:1400},
		{number:3, name:"PomadeC", count:1, price:750},
		{number:4, name:"PomadeD", count:1, price:200}
	];

	$scope.deleteBill = function()
	{
		var password = prompt('To cancle please retype a password');
		if(password == "1234")
			$location.path('/bill');

	}
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
	$scope.promotions = Promotion.query();
}

function PromotionItemCtrl($scope, $location, Promotion, Product)
{
	$scope.promotion = Promotion.get();
	$scope.condition_types = Promotion.getConditionTypes();
	$scope.reward_types = Promotion.getRewardTypes();
	$scope.submitText = "Update";
	$scope.item_alls = Product.getListItems();
	$scope.update = function()
	{
		$location.path('/promotion');
	}
}

function PromotionCreateCtrl($scope, $location, Promotion, Product)
{
	$scope.promotion = {};
	$scope.condition_types = Promotion.getConditionTypes();
	$scope.reward_types = Promotion.getRewardTypes();
	$scope.submitText = "Update";
	$scope.item_alls = Product.getListItems();
	$scope.update = function()
	{
		$location.path('/promotion');
	}
}

function WholesaleCtrl($scope, Product)
{
	$scope.products = Product.getAll();
	$scope.selectedProducts = [];
}