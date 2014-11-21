var WIDGET_PATH = ""
var app = angular.module('pos', [
  "widget",
  "component",
  "ngRoute",
  "mobile-angular-ui",
  "localData"
]).config(function($routeProvider) {
      $routeProvider.when('/', {
        // ...
         templateUrl: 'pages/main.html',
         controller: 'MainCtrl'
      }).when('/product', {
        // ...
         templateUrl: 'pages/product.html',
         controller: 'ProductCtrl'
      }).when('/order/:id', {
        // ...
         templateUrl: 'pages/order.html',
         controller: 'OrderCtrl'
      }).when('/payment/:id', {
        // ...
         templateUrl: 'pages/payment.html',
         controller: 'PaymentCtrl'
      }).when('/report', {
        // ...
         templateUrl: 'pages/report.html',
         controller: 'ReportCtrl'
      }).when('/bill', {
        // ...
         templateUrl: 'pages/bill.html',
         controller: 'BillCtrl'
      }).when('/bill/wholesale', {
        // ...
         templateUrl: 'pages/bill/wholesale.html',
         controller: 'BillWholesaleCtrl'
      }).when('/bill/:id', {
        // ...
         templateUrl: 'pages/bill/item.html',
         controller: 'BillItemCtrl'
      }).when('/user', {
        // ...
         templateUrl: 'pages/user.html',
         controller: 'UserCtrl'
      }).when('/user/create', {
        // ...
         templateUrl: 'pages/user/item.html',
         controller: 'UserCreateCtrl'
      }).when('/user/:id', {
        // ...
         templateUrl: 'pages/user/item.html',
         controller: 'UserUpdateCtrl'
      }).when('/promotion', {
        // ...
         templateUrl: 'pages/promotion/index.html',
         controller: 'PromotionCtrl'
      }).when('/promotion/create', {
        // ...
         templateUrl: 'pages/promotion/item.html',
         controller: 'PromotionCreateCtrl'
      }).when('/promotion/:id', {
        // ...
         templateUrl: 'pages/promotion/item.html',
         controller: 'PromotionItemCtrl'
      }).when('/wholesale', {
        // ...
         templateUrl: 'pages/wholesale.html',
         controller: 'WholesaleCtrl'
      }).when('/wholesale/bill/:id', {
        // ...
         templateUrl: 'pages/wholesale/bill.html',
         controller: 'WholesaleBillCtrl'
      });
      // ...
  });

