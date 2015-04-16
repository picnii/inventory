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

function PaymentCtrl($scope, $location, $routeParams, Bill, Payment, $timeout, Product, Promotion)
{
	Promotion.data.load();
	$scope.bill = Bill.get($routeParams.id);
	$scope.orders = $scope.bill.products;
	$scope.Payment = Payment.get();
	
	$scope.paid_bill = {bill:{products:[]}};
	$scope.reward = Promotion.getReward($scope.orders)
	console.log($scope.reward)
	if($scope.reward.status)
		$scope.discount = $scope.reward.discount;
	else
		$scope.discount = 0;
	/*console.log('Start Payment')
	console.log(Product.query())
	console.log($scope.bill)*/
	/*if(_.isNumber(_credit))
      {
        discount = _credit;
        if(_.isObject(_discount))
          reward = _discount
      }else if(_.isObject(_credit))
      {
        credit = _credit;
        if(_.isNumber(_discount))
          discount = _discount;
        if(_.isObject(reward))
          reward = _reward
      }*/
	
	$scope.print =function(amount, credit){
		
		if(_.isObject(credit) && credit!= null)
		{
			//console.log('with credit')
			Bill.paid($scope.bill.id, amount, credit, $scope.discount)
		}else
		{
			//console.log('without credit')
			Bill.paid($scope.bill.id, amount, $scope.discount)
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




function BillCtrl($scope, Bill, Payment)
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

function BillItemCtrl($scope, Bill, $routeParams, $location, Store)
{
	$scope.id = $routeParams.id
	Bill.data.load();
	$scope.paid_bill = Bill.findPaidBill({id:$scope.id});
	$scope.discount = $scope.paid_bill.discount;
	$scope.total = $scope.paid_bill.total;
	
	$scope.orders = $scope.paid_bill.bill.products;

	$scope.deleteBill = function()
	{
		var password = prompt('Manager Password');
		if(password == Store.get().manager_password)
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

function LoadCtrl($scope, Branch, Bill, Store, Product, Promotion)
{
	$scope.branch_id = ''
	$scope.fields = [
		
		{name:"Name", type:"text", slug:'name'},
		{name:"Type", type:"text", slug:'type'},
		
		{name:"Stock", type:"number", slug:'count'}
	]
	
	$scope.init = function(branch_id)
	{
		$scope.branch_id = branch_id
		Branch.get({id:$scope.branch_id}, function(branch){
			//load Store
			$scope.branch = branch
			Store.init({name:branch.name, branch_id:branch_id, logo:branch.logo, manager_password:branch.manager_password, tax_percent:branch.tax_percent});
			Product.init(branch.inventories)
			Promotion.data.reset();
			$scope.sale = Branch.getSale({id:$scope.branch_id}, function(){
				//load old Bill?
				$scope.Store = Store.get();
			})

		});	
		
		
		
	}
	Branch.login(function(data){
		if(data.status == "complete")
		{
			$scope.init(data.branch_id);
		}
	})
}


function ReportCtrl($scope,  Branch, Bill, Store, Product, Wholesale)
{
	Bill.data.load();
	$scope.sales = Bill.findAllPaidBill();
	$scope.wholesale_sales= Wholesale.findAllBill();

	$scope.combine_sales = $scope.sales;
	$scope.Store = Store.get();;
	$scope.fields = [
		{name:"Name", type:"text", slug:'id'},
		{name:"Amount", type:"number", slug:'amount'}
	]

	$scope.closeShop =function(){

		var log = {};
		log.retail_bills = $scope.sales;
		log.wholesale_bills = $scope.wholesale_sales;

		var mylog = JSON.stringify(log);
		var products = Product.query();
		//alert("จำลอง ส่งข้อมูลไปสาขาแม่")
		console.log('sending');
		var sum = Bill.sumAllPaidBill();
		sum += Wholesale.sumAllPaidBill();
		console.log(products)
		console.log({id:Store.get().branch_id, log:mylog});
		Branch.updateSale({"id":Store.get().branch_id, amount:sum, log:mylog}, function(data){
			console.log('data sale');
			console.log(data)
			if(data.result)
				Branch.updateProduct({"id":Store.get().branch_id, products:products}, function(data){
					
					Bill.data.reset();
				})
				
		});
	}
}

function TestCtrl($scope, Branch, Bill, Store, Product)
{
	$scope.branch_id = ''
	$scope.init = function(branch_id)
	{
		$scope.branch_id = branch_id
		Branch.get({id:$scope.branch_id}, function(branch){
			//load Store
			$scope.test = branch
			Store.init({name:branch.name});
			Product.init(branch.inventories)
			$scope.sale = Branch.getSale({id:$scope.branch_id}, function(){
				//load old Bill?


			})

		});	
		
		
		
	}
	Branch.login(function(data){
		if(data.status == "complete")
		{
			$scope.init(data.branch_id);
		}
	})

	$scope.updateSale = function()
	{
		Bill.data.load();
		var real_data = Bill.findAllPaidBill();
		var mylog = JSON.stringify(real_data);
		var products = Product.query();
		console.log('sending');
		var sum = Bill.sumAllPaidBill();
		console.log(products)
		console.log({id:$scope.branch_id+"", log:mylog});
		Branch.updateSale({"id":$scope.branch_id, amount:sum, log:mylog}, function(data){
			console.log('data sale');
			console.log(data)
			if(data.result)
				Branch.updateProduct({id:$scope.branch_id, products:products}, function(data){
					console.log('data products');
					console.log(data)
					$scope.init($scope.branch_id);		
				})
				
		});
	}
	/*$scope.branch_id = ''
	$scope.init = function(branch_id)
	{
		$scope.branch_id = branch_id
		$scope.test = Test.get({id:$scope.branch_id});	
		$scope.sale = Test.getSale({id:$scope.branch_id})
	}

	//
	TestLogin.login(function(data){
		if(data.status == "complete")
		{
			$scope.init(data.branch_id);
		}
	})

	$scope.updateSale = function()
	{
		Bill.data.load();
		var real_data = Bill.findAllPaidBill();
		var mylog = JSON.stringify(real_data);
		console.log('sending')
		console.log({id:$scope.branch_id+"", log:mylog})
		Test.updateSale({"id":$scope.branch_id +"", log:mylog}, function(data){
			console.log('data');
			console.log(data);
			$scope.init($scope.branch_id);	
		})

		
	}*/
	
}