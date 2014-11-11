function ProductCtrl($scope, Product)
{
	$scope.fields = [
		{name:"ID", type:"number", slug:'id'},
		{name:"Name", type:"text", slug:'name'},
		{name:"Type", type:"text", slug:'type'},
		{name:"Sell Price", type:"number", slug:'price'},
		{name:"Stock", type:"number", slug:'count'}
	]

	$scope.products = Product.query();
	

}