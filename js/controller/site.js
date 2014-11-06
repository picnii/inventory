function MainCtrl($scope, $location, Bill)
{

	$scope.bills = Bill.query();/*[
		{name:"BILL1", isSelected:false},
		{name:"BILL2", isSelected:false},
		{name:"BILL3", isSelected:false},
		{name:"BILL3", isSelected:false}
	]*/
	
	$scope.deSelectAll = function()
	{
		for(var i = 0; i <= $scope.bills.length; i++)
			$scope.bills[i].isSelected = false;
	}

	$scope.doSelect = function(item)
	{
		console.log('test')
		//$scope.deSelectAll();
		//item.isSelected = true;
		//console.log($scope.bills)
	}

	$scope.goBill = function()
	{
		$location.path('/order');
	}

	$scope.goPayment = function()
	{
		$location.path('/payment')
	}

}

function LoginCtrl($scope)
{
	console.log('test');
}

function OrderCtrl($scope, $location)
{
	$scope.orders = [
		{number:1, name:"PomadeA", count:1, price:700},
		{number:2, name:"PomadeB", count:1, price:1400},
		{number:3, name:"PomadeC", count:1, price:750},
		{number:4, name:"PomadeD", count:1, price:200}
	];

	$scope.cancleBill = function()
	{
		if(confirm("Do you want to cancle this bill?"))
		{
			console.log('moveee')
			$location.path("/");
		}
	}

	$scope.addItem = function()
	{
		$scope.orders.push({
			number:($scope.orders[$scope.orders.length-1].number + 1),
			name:"TEST",
			count:$scope.amount,
			price:($scope.amount * 400)
		})
	}

}

function PaymentCtrl($scope, $location)
{
	$scope.orders = [
		{number:1, name:"PomadeA", count:1, price:700},
		{number:2, name:"PomadeB", count:1, price:1400},
		{number:3, name:"PomadeC", count:1, price:750},
		{number:4, name:"PomadeD", count:1, price:200}
	];

	$scope.print =function(){
		alert("จำลองว่า print")
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



function BillCtrl($scope)
{
	$scope.fields = [
		{name:"Id", type:"text", slug:'id'},
		{name:"Time", type:"text", slug:'time'},
		{name:"Amount", type:"number", slug:'amount'}
	];

	$scope.bills = [
		{id:"1", time:"2014-12-20 12:12:12", amount:4000},
		{id:"2", time:"2014-12-20 12:12:12", amount:4500},
		{id:"3", time:"2014-12-20 12:12:12", amount:6000},
		{id:"4", time:"2014-12-20 12:12:12", amount:7000}
	]


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