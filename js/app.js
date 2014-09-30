var WIDGET_PATH = "../"
var app = angular.module('pos', [
  "widget",
  "ngRoute",
  "mobile-angular-ui",
]).config(function($routeProvider) {
      $routeProvider.when('/', {
        // ...
      	 templateUrl: 'pages/main.html',
         controller: 'MainCtrl'
      }).when('/product', {
        // ...
      	 templateUrl: 'pages/product.html',
         controller: 'ProductCtrl'
      });
      // ...
  });

app.factory('Product', function(){
	return {
		getAll:function(){
			return [
				{id:1, name:"เยลสุดสวย", picture:"http://placehold.it/100x100", price:50, description:"nope", import_cost:20, count:20 },
				{id:2, name:"เยลลี่", picture:"http://placehold.it/100x100", price:60, description:"nope", import_cost:15, count:10 },
				{id:3, name:"เยลโจ๊กคะนอ", picture:"http://placehold.it/100x100", price:70, description:"nope", import_cost:34, count:30 },
				{id:4, name:"ยอโค๊กับเจล", picture:"http://placehold.it/100x100", price:80, description:"nope", import_cost:56, count:40 },
				{id:5, name:"เจลนี่แหละ", picture:"http://placehold.it/100x100", price:90, description:"nope", import_cost:40, count:50 }
			];
		}

	}

})