function MainCtrl($scope)
{
	console.log('Hi');
}

function LoginCtrl($scope)
{
	console.log('test');
}

function OrderCtrl($scope)
{
	$scope.orders = [
		{number:1, name:"PomadeA", count:1, price:700},
		{number:2, name:"PomadeB", count:1, price:1400},
		{number:3, name:"PomadeC", count:1, price:750},
		{number:4, name:"PomadeD", count:1, price:200}
	];
}