function MainCtrl($scope)
{
	console.log('Hi');
}

function LoginCtrl($scope)
{
	console.log('test');
}

function OrderCtrl($scope, $location)
{
	$scope.amount = 1;
	$scope.amountMulti = "?";
	$scope.cssMulti = 'inactive';
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

	$scope.changeAmount =function()
	{
		var value =prompt("Amount?","2");
		while(isNaN(value) || Number(value) < 1 )
		{

			value =prompt("Wrong number Amount?","2");
		}
		$scope.amount = Number(value);
		$scope.amountMulti = $scope.amount;
	}

	$scope.addItem = function()
	{
		$scope.orders.push({
			number:9,
			name:"TEST",
			count:$scope.amount,
			price:400
		})
	}

	//will move to directive later
	var MODE_BARCODE = 'barcode', MODE_TOUCH  = 'touch';
	var MODE_GROUP = 'group',  MODE_ITEM = 'item';
	$scope.mode = MODE_BARCODE;
	$scope.touch_mode = MODE_GROUP;
	$scope.switchTo = function(mode)
	{
		$scope.mode = mode;
		if($scope.mode == 'barcode')
		{
			$scope.cssBarcode = '';
			$scope.cssTouch = "hide";
			setInterval(function(){

				document.getElementById('barcode-input').focus();
			}, 10)
			
		}else if($scope.mode == MODE_TOUCH)
		{
			$scope.touch_mode = MODE_GROUP;
			$scope.cssTouch = '';
			$scope.cssBarcode = "hide";
			$scope.cssGroup ='';
			$scope.cssItem = 'hide';
		}else if($scope.mode == MODE_GROUP)
		{
			$scope.cssGroup ='';
			$scope.cssItem = 'hide';
		}else if($scope.mode == MODE_ITEM)
		{
			$scope.cssGroup = 'hide';
			$scope.cssItem = ';'
		}
	}


	$scope.switchTo($scope.mode);
}

function PaymentCtrl($scope, $location)
{
	$scope.orders = [
		{number:1, name:"PomadeA", count:1, price:700},
		{number:2, name:"PomadeB", count:1, price:1400},
		{number:3, name:"PomadeC", count:1, price:750},
		{number:4, name:"PomadeD", count:1, price:200}
	];
}

