var WIDGET_PATH = ""
var app = angular.module('pos', [
  "widget",
  "component",
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
      });
      // ...
  });


app.factory('Product', function(){
  var products = [
        {id:"1",code:"12345679" , name:"เยลสุดสวย", type:"เยล", picture:"http://placehold.it/100x100", price:50, description:"nope", import_cost:20, count:20 },
        {id:"2",code:"23412455", name:"เยลลี่", type:"เยล", picture:"http://placehold.it/100x100", price:60, description:"nope", import_cost:15, count:10 },
        {id:"3",code:"12312398", name:"เยลโจ๊กคะนอ", type:"Hard Gel",    picture:"http://placehold.it/100x100", price:70, description:"nope", import_cost:34, count:30 },
        {id:"4",code:"21321384", name:"ยอโค๊กับเจล", type:"Hard Gel", picture:"http://placehold.it/100x100", price:80, description:"nope", import_cost:56, count:40 },
        {id:"5",code:"12321341", name:"เจลนี่แหละ", type:"เยล", picture:"http://placehold.it/100x100", price:90, description:"nope", import_cost:40, count:50 }
      ];
  return {
    query:function()
    {
      return products;
    },
    get:function(product)
    {
      return _.find(products, {id:product.id});
    },
    sold:function(items)
    {
      var amount = 0;
      _(items).forEach(function(item){
        console.log('each');
        console.log(item);
        var index = _.findIndex(products, {id:item.id});
        console.log(index)
        if(index >= 0)
        {
          amount += products[index].price * item.amount;
          products[index].count -= item.amount;
        }
      })
      return amount;
    },
    save:function(product)
    {

    },
    getAll:function(){
      return [
        {id:1, name:"เยลสุดสวย", type:"เยล", picture:"http://placehold.it/100x100", price:50, description:"nope", import_cost:20, count:20 },
        {id:2, name:"เยลลี่", type:"เยล", picture:"http://placehold.it/100x100", price:60, description:"nope", import_cost:15, count:10 },
        {id:3, name:"เยลโจ๊กคะนอ", type:"เยล", type:"เยล", picture:"http://placehold.it/100x100", price:70, description:"nope", import_cost:34, count:30 },
        {id:4, name:"ยอโค๊กับเจล", type:"เยล", picture:"http://placehold.it/100x100", price:80, description:"nope", import_cost:56, count:40 },
        {id:5, name:"เจลนี่แหละ", type:"เยล", picture:"http://placehold.it/100x100", price:90, description:"nope", import_cost:40, count:50 }
      ];
    },
    getListItems:function()
    {
      return [
        {id:"*", name:"ANY", type:"ANY"},
        {id:1, name:"เยลสุดสวย", type:"เยล"},
        {id:2, name:"เยลลี่", type:"เยล" },
        {id:3, name:"เยลโจ๊กคะนอ", type:"เยล" },
        {id:4, name:"ยอโค๊กับเจล", type:"เยล" },
        {id:5, name:"เจลนี่แหละ", type:"เยล" }
        ]
    }

  }

})

app.factory('Bill', function(Product){
  var bills = [];
  var paid_bills = [];

  function getItemsId(items)
  {
    if(items.length == 0)
      return "1";
    else
      return Number(bills[bills.length -1 ].id) + 1 + "";
  }

  return {
    query:function()
    {
      return bills;
    },
    create:function()
    {
      var id = getItemsId(bills);
      var create_time = new Date();
      var new_obj = {id:id, isSelected:false, name:"BILL " + id, create_time:create_time, products:[]};
      bills.push(new_obj);
      return new_obj;
    },
    save:function(bill)
    {
      var index = _.findIndex(bills, {id:bill.id});
      if(index == -1)
        return false;
      bills[index].products = _.cloneDeep(bill.products);
      return true;
    },
    get:function(id)
    {
     
      return _.find(bills, {id:id});  
    },
    findAllpaidBill:function(arg)
    {
      return paid_bills;
    },
    paid:function(id)
    {
      var bill = _.find(bills, {id:id});
      if(typeof(bill) == 'undefined')
        return false;
      bill = _.cloneDeep(bill);
      _.remove(bills, {id:id});   
      var paid_amount = Product.sold(bill.products);
      var create_time = new Date();
      paid_bills.push({
        id:getItemsId(paid_bills),
        create_time:create_time,
        total:paid_amount,
        bill:bill
      })
      return true;
    }
  }
});

app.factory('Payment', function()
{
  return {
    get:function()
    {
      return {tax:7, credits:[
          {id:1, name:"MASTER", chargePercent:0.7, chargeAmount:0.25},
          {id:2, name:"VISA", chargePercent:0.8, chargeAmount:0.1}
        ]};
    },
    load:function()
    {

    },
    save:function(payment)
    {

    }
  }

});
  

app.factory('User', function(){
  return {
    get:function()
    {
        return {id:1, username:"somchai", name:"somchai", lastname:"kulapalanont", phone:"082-452-3991", email:"somchai@kaipuk.com", password:"1234"};
    },
    query:function()
    {
      return [
        {id:1, username:"somchai", name:"somchai", lastname:"kulapalanont", phone:"082-452-3991", email:"somchai@kaipuk.com", password:"1234"},
        {id:2, username:"sommhai", name:"somchai", lastname:"kulapalanont", phone:"082-452-3991", email:"somchai@kaipuk.com", password:"1234"},
        {id:3, username:"somsak", name:"somchai", lastname:"kulapalanont", phone:"082-452-3991,", email:"somchai@kaipuk.com", password:"1234"},
        {id:4, username:"somsong", name:"somchai", lastname:"kulapalanont", phone:"082-452-3991", email:"somchai@kaipuk.com", password:"1234"}
    ];
    }
  }
})


app.factory('Promotion', function(){
  var  CON_TYPE_ITEM_SET = 2, CON_TYPE_MONEY = 3;
  var REWARD_TYPE_DISCOUNT_PERCENT = 1, REWARD_TYPE_DISCOUNT_AMOUNT = 2, REWARD_TYPE_ITEM_BACK = 3;

  return {
    CON_TYPE_ITEM_SET:CON_TYPE_ITEM_SET,
    CON_TYPE_MONEY:CON_TYPE_MONEY,
    REWARD_TYPE_DISCOUNT_PERCENT:REWARD_TYPE_DISCOUNT_PERCENT,
    REWARD_TYPE_DISCOUNT_AMOUNT:REWARD_TYPE_DISCOUNT_AMOUNT,
    REWARD_TYPE_ITEM_BACK:REWARD_TYPE_ITEM_BACK,
    getRewardTypes:function()
    {
      return [
        {name:"item_back", value:REWARD_TYPE_ITEM_BACK},
        {name:"discount_amount", value:REWARD_TYPE_DISCOUNT_AMOUNT},
        {name:"discount_percent", value:REWARD_TYPE_DISCOUNT_PERCENT}
      ];
    },
    getConditionTypes:function()
    {
      return [
        {name:"item_set_type", value:CON_TYPE_ITEM_SET},
        {name:"money_type", value:CON_TYPE_MONEY}
      ];
    },
    get:function(){
      return {id:1, 
        name:"buy1get1", 
        detail:"but 1 any product get 1 any", 
        name:"Buy 2 get 1",
        start:"2014-10-19",
        end:"2099-10-19",
        conditions:[  
          {id:2, type:CON_TYPE_ITEM_SET, items:[
            { amount:2, item_id:"*"}
          ]}
        ],
        reward:{
          type:REWARD_TYPE_ITEM_BACK,
          items:[
            {item_id:2, amount:1}
          ]
        }
      }
    },
    query:function()
    {
      return [{id:1, name:"buy1get1", detail:"but 1 any product get 1 any", time:"2013-2012"}];
    }
  }
})