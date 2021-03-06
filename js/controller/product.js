function ProductCtrl($scope, Product)
{
	Product.data.load();
	$scope.fields = [
		{name:"ID", type:"number", slug:'id'},
		{name:"Name", type:"text", slug:'name'},
		{name:"Type", type:"text", slug:'type'},
		{name:"Sell Price", type:"number", slug:'price'},
		{name:"Stock", type:"number", slug:'count'}
	]

	$scope.products = Product.query();
	console.log("Product")
	console.log($scope.products)

}


function WholesaleCtrl($scope, Wholesale, Product, $filter, $location, Store)
{
	//$scope.products = Product.query();
	//$scope.selectedProducts = [];
	if(prompt("Manager Password") != Store.get().manager_password)
		$location.path('/');
	Product.data.load();
	$scope.items = Wholesale.query();
	//$scope.items = $filter('filter')($scope.items, {hasCondition:false})
	$scope.fields = [
		{name:"ID", type:"number", slug:'id'},
		{name:"Name", type:"text", slug:'name'},
		{name:"Type", type:"text", slug:'type'},
		{name:"Minimum", type:"number", slug:'minumWholeSales'},
		{name:"Stock", type:"number", slug:'count'}
	]
	$scope.bills = Wholesale.findAllBill();
	$scope.orders = [];
	$scope.isOrder = false;
	$scope.order = function(items)
	{
		$scope.orders = items;
		$scope.isOrder = true;
	}

	$scope.confirm = function()
	{
		var result = Wholesale.createBill($scope.orders, $scope.customer);
		$location.path('wholesale/bill/' + result.id);
	}
}

function WholesaleBillCtrl($scope, Wholesale, $routeParams, Payment, Store)
{
	Store.load();
	Wholesale.data.load();
	$scope.bill = Wholesale.findBill({id:$routeParams.id});
	$scope.payment_total = Payment.getTotal($scope.bill.products, 0);
	console.log($scope.bill)
}
