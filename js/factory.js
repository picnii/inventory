var SERVER_PATH = "http://localhost/npop.in.th/zenpos/web/";



angular.module('testData', ['ngResource']).
factory('Test', function ($resource) {
  return $resource(SERVER_PATH + 'api/branches/:id/:action/:subaction', {}, {
      getSale: {method:'GET', params:{'action':'sale'},  isArray:false},
      updateSale: {method:'POST', params:{'id':'@id',  'action':'sale', 'subaction':'update'},  isArray:false},
      
    });
}).
factory('TestLogin', function ($resource) {
  return $resource(SERVER_PATH + 'branch/info', {}, {
      login: {method:'GET',  isArray:false}
    });

})

angular.module('storeService', ['ngResource']).
factory('Branch', function ($resource) {
  return $resource(SERVER_PATH + 'api/branches/:id/:action/:subaction', {}, {
      login: {method:'GET',params:{'id':"info"},   isArray:false},
      getSale: {method:'GET', params:{'action':'sale'},  isArray:false},
      updateSale: {method:'POST', params:{'id':'@id',  'action':'sale', 'subaction':'update'},  isArray:false},
      updateProduct: {method:'POST', params:{'id':'@id',  'action':'product', 'subaction':'update'},  isArray:false}
    });
})

angular.module('localData', [])
.factory('LocalMemory', function(){

    return {
      save: function(STORAGE_NAME, list)
      {
        if(localStorage[STORAGE_NAME] = JSON.stringify(list))
          return true;
        return false;
      },
      load: function(STORAGE_NAME)
      {
        if(!_.isString(localStorage[STORAGE_NAME]))
          return false;
        var load_result = JSON.parse(localStorage[STORAGE_NAME])
        return load_result;
      },
      reset: function(STORAGE_NAME, option)
      {
        console.log('reset:' + STORAGE_NAME)
        if(typeof(option) == "undefined")
          option = [];
        localStorage[STORAGE_NAME] = JSON.stringify(option);
        console.log(localStorage[STORAGE_NAME])
      }
    }
})
.factory('Store', function(LocalMemory){
  STORAGE_NAME = "STORE_INFO";
  var store = {
    currency:'฿',
    name:'The Pommade Shop',
    address:
    {
      name:'สำนักงานใหญ่',
      lines: [
        '17/99 ม.4 ถ.ประชาชาชื่น',
        'แขวงทุ่งสองห้อง เขตหลักสี่',
        'กรุงเทพฯ 10210'
      ]
    },
    phones:[
      {name:'mobile1', no:'0956165994'},
      {name:'mobile2', no:'0955499265'},
      {name:'landline', no:'029828489'}
    ],
    email:'thaipomadeshop@gmail.com',
    website:'www.thaipomadeshop.com',
    logo:'http://placehold.it/200x200',
  }



  return  {
    load:function()
    {
      store = LocalMemory.load(STORAGE_NAME);
    },
    get:function()
    {
      return store;
    },
    init:function(new_store, callback)
    {
      console.log(new_store)
      for(var key in new_store)
      {
        console.log(key)
        store[key]  = new_store[key];
      }
      console.log(store);
      LocalMemory.save(STORAGE_NAME, store)
      if(typeof(callback) == 'function')
        callback();
    }
  };
})
.factory('Product', function(Promotion, LocalMemory){
  var products = [{"id":"1","name":"Js Sloane Heavywight 4oz.","type":"Pomade","price":690,"hasCondition":false,"minumWholeSales":12,"item_ranges":[{"from":12,"to":24,"price":520},{"from":36,"to":48,"price":500},{"from":60,"price":480}],"count":100,"code":"123456789","condition":null},{"id":"2","name":"Js Sloane mediumwight 4oz.","type":"Pomade","price":690,"hasCondition":false,"minumWholeSales":12,"item_ranges":[{"from":12,"to":24,"price":520},{"from":36,"to":48,"price":500},{"from":60,"price":480}],"count":100,"code":"","condition":null},{"id":"3","name":"Js Sloane Heavywight 16oz.","type":"Pomade","price":2200,"hasCondition":true,"minumWholeSales":1,"item_ranges":[{"from":12,"to":24,"price":1950},{"from":36,"to":48,"price":1950},{"from":60,"price":1950}],"count":100,"code":"","condition":{"item_id":"1","count":12}},{"id":"4","name":"Js Sloane mediumwight 16oz.","type":"Pomade","price":2200,"hasCondition":true,"minumWholeSales":1,"item_ranges":[{"from":12,"to":24,"price":1950},{"from":36,"to":48,"price":1950},{"from":60,"price":1950}],"count":100,"code":"","condition":{"item_id":"2","count":12}},{"id":"5","name":"Layrite Super Hold 4oz.","type":"Pomade","price":680,"hasCondition":false,"minumWholeSales":12,"item_ranges":[{"from":12,"to":24,"price":520},{"from":36,"to":48,"price":500},{"from":60,"price":480}],"count":100,"code":"","condition":null},{"id":"6","name":"Layrite Original 4oz.","type":"Pomade","price":680,"hasCondition":false,"minumWholeSales":12,"item_ranges":[{"from":12,"to":24,"price":520},{"from":36,"to":48,"price":500},{"from":60,"price":480}],"count":100,"code":"","condition":null},{"id":"7","name":"Layrite Super Hold 32oz.","type":"Pomade","price":4250,"hasCondition":true,"minumWholeSales":1,"item_ranges":[{"from":12,"to":24,"price":3850},{"from":36,"to":48,"price":1950},{"from":60,"price":1950}],"count":100,"code":"","condition":{"item_id":"5","count":12}},{"id":"8","name":"Layrite Original 32oz.","type":"Pomade","price":4250,"hasCondition":true,"minumWholeSales":1,"item_ranges":[{"from":12,"to":24,"price":3850},{"from":36,"to":48,"price":1950},{"from":60,"price":1950}],"count":100,"code":"","condition":{"item_id":"6","count":12}},{"id":"9","name":"Bona Fide Superior Hold 4oz.","type":"Pomade","price":650,"hasCondition":false,"minumWholeSales":12,"item_ranges":[{"from":12,"to":24,"price":480},{"from":36,"to":48,"price":450},{"from":60,"price":420}],"count":100,"code":"","condition":null},{"id":"10","name":"Bona Fide Fiber Hold 4oz.","type":"Pomade","price":680,"hasCondition":false,"minumWholeSales":12,"item_ranges":[{"from":12,"to":24,"price":500},{"from":36,"to":48,"price":480},{"from":60,"price":450}],"count":100,"code":"","condition":null},{"id":"11","name":"Bona Fide Superior Hold 32oz.","type":"Pomade","price":3950,"hasCondition":true,"minumWholeSales":1,"item_ranges":[{"from":12,"to":24,"price":3250},{"from":36,"to":48,"price":3250},{"from":60,"price":3250}],"count":100,"code":"","condition":{"item_id":"9","count":12}},{"id":"12","name":"Bona Fide Fiber Hold 32oz.","type":"Pomade","price":4250,"hasCondition":true,"minumWholeSales":1,"item_ranges":[{"from":12,"to":24,"price":3850},{"from":36,"to":48,"price":3850},{"from":60,"price":3850}],"count":100,"code":"","condition":{"item_id":"10","count":12}},{"id":"13","name":"Shiner Gold Heavy Hold 4oz.","type":"Pomade","price":590,"hasCondition":false,"minumWholeSales":12,"item_ranges":[{"from":12,"to":24,"price":480},{"from":36,"to":48,"price":450},{"from":60,"price":420}],"count":100,"code":"","condition":null},{"id":"14","name":"Shiner Gold Psycho Hold 4oz.","type":"Pomade","price":680,"hasCondition":false,"minumWholeSales":12,"item_ranges":[{"from":12,"to":24,"price":500},{"from":36,"to":48,"price":480},{"from":60,"price":450}],"count":100,"code":"","condition":null},{"id":"15","name":"Shiner Gold Matte 4oz.","type":"Pomade","price":680,"hasCondition":false,"minumWholeSales":12,"item_ranges":[{"from":12,"to":24,"price":500},{"from":36,"to":48,"price":480},{"from":60,"price":450}],"count":100,"code":"","condition":null},{"id":"16","name":"Shiner Gold Heavy Hold 32oz.","type":"Pomade","price":3950,"hasCondition":true,"minumWholeSales":1,"item_ranges":[{"from":12,"to":24,"price":3250},{"from":36,"to":48,"price":3250},{"from":60,"price":3250}],"count":100,"code":"","condition":{"item_id":"13","count":12}},{"id":"17","name":"Shiner Gold Psycho Hold 32oz.","type":"Pomade","price":4250,"hasCondition":true,"minumWholeSales":1,"item_ranges":[{"from":12,"to":24,"price":3850},{"from":36,"to":48,"price":3850},{"from":60,"price":3850}],"count":100,"code":"","condition":{"item_id":"14","count":12}},{"id":"18","name":"Shiner Gold Matte 32oz.","type":"Pomade","price":4250,"hasCondition":true,"minumWholeSales":1,"item_ranges":[{"from":12,"to":24,"price":3580},{"from":36,"to":48,"price":3580},{"from":60,"price":3580}],"count":100,"code":"","condition":{"item_id":"15","count":12}},{"id":"19","name":"Reuzel Red 4oz.","type":"Pomade","price":690,"hasCondition":false,"minumWholeSales":12,"item_ranges":[{"from":12,"to":24,"price":520},{"from":36,"to":48,"price":500},{"from":60,"price":480}],"count":100,"code":"","condition":null},{"id":"20","name":"Reuzel Green 4oz.","type":"Pomade","price":690,"hasCondition":false,"minumWholeSales":12,"item_ranges":[{"from":12,"to":24,"price":520},{"from":36,"to":48,"price":500},{"from":60,"price":480}],"count":100,"code":"","condition":null},{"id":"21","name":"Reuzel Red 12oz.","type":"Pomade","price":1950,"hasCondition":true,"minumWholeSales":1,"item_ranges":[{"from":12,"to":24,"price":1650},{"from":36,"to":48,"price":1650},{"from":60,"price":1650}],"count":100,"code":"","condition":{"item_id":"19","count":12}},{"id":"22","name":"Reuzel Green 12oz.","type":"Pomade","price":1950,"hasCondition":true,"minumWholeSales":1,"item_ranges":[{"from":12,"to":24,"price":1650},{"from":36,"to":48,"price":1650},{"from":60,"price":1650}],"count":100,"code":"","condition":{"item_id":"20","count":12}},{"id":"23","name":"Dax Wave & Groom 3.5oz.","type":"Pomade","price":480,"hasCondition":false,"minumWholeSales":12,"item_ranges":[{"from":12,"to":24,"price":300},{"from":36,"to":48,"price":280},{"from":60,"price":250}],"count":100,"code":"","condition":null},{"id":"24","name":"Dax Wave & Groom 1.25oz.","type":"Pomade","price":229,"hasCondition":false,"minumWholeSales":12,"item_ranges":[{"from":12,"to":24,"price":170},{"from":36,"to":48,"price":160},{"from":60,"price":150}],"count":100,"code":"","condition":null},{"id":"25","name":"Dax Hair wax (washable)","type":"Pomade","price":480,"hasCondition":false,"minumWholeSales":12,"item_ranges":[{"from":12,"to":24,"price":300},{"from":36,"to":48,"price":280},{"from":60,"price":250}],"count":100,"code":"","condition":null},{"id":"26","name":"Dax Awesome Hold","type":"Pomade","price":480,"hasCondition":false,"minumWholeSales":"-","item_ranges":[],"count":100,"code":"","condition":null},{"id":"27","name":"Layrite Trucker Hat","type":"Merchandise","price":500,"hasCondition":false,"minumWholeSales":"-","item_ranges":[],"count":100,"code":"","condition":null},{"id":"28","name":"Layrite T-Shirt","type":"Merchandise","price":890,"hasCondition":false,"minumWholeSales":"-","item_ranges":[],"count":100,"code":"","condition":null},{"id":"29","name":"Layrite Comb","type":"Merchandise","price":350,"hasCondition":false,"minumWholeSales":12,"item_ranges":[{"from":12,"to":24,"price":250},{"from":36,"to":48,"price":250},{"from":60,"price":250}],"count":100,"code":"","condition":null},{"id":"30","name":"Layrite Barber Cap","type":"Merchandise","price":890,"hasCondition":false,"minumWholeSales":"-","item_ranges":[],"count":100,"code":"","condition":null},{"id":"31","name":"Shiner Gold T-Shirt","type":"Merchandise","price":650,"hasCondition":false,"minumWholeSales":"-","item_ranges":[],"count":100,"code":"","condition":null},{"id":"32","name":"Schorem T-Shirt","type":"Merchandise","price":890,"hasCondition":false,"minumWholeSales":"-","item_ranges":[],"count":100,"code":"","condition":null},{"id":"33","name":"Schorem Poster","type":"Merchandise","price":999,"hasCondition":false,"minumWholeSales":"-","item_ranges":[],"count":100,"code":"","condition":null},{"id":"34","name":"Bonafide T-Shirt","type":"Merchandise","price":650,"hasCondition":false,"minumWholeSales":"-","item_ranges":[],"count":100,"code":"","condition":null},{"id":"35","name":"Switch Comb","type":"Merchandise","price":350,"hasCondition":false,"minumWholeSales":12,"item_ranges":[{"from":12,"to":24,"price":250},{"from":36,"to":48,"price":250},{"from":60,"price":250}],"count":100,"code":"","condition":null}];
  var STORAGE_NAME = "PRODUCT_STORAGE"
  return {
    data:{
      STORAGE_NAME:STORAGE_NAME,
      save:function(){
        return LocalMemory.save(STORAGE_NAME, products);
      },
      load:function()
      {
        var load_result = LocalMemory.load(STORAGE_NAME);
        if(_.isArray(load_result))
        {
          products = load_result
          return true;
        }
        return false;
      },
      reset:function()
      {
        LocalMemory.reset(STORAGE_NAME);
        return true;
      }
    },    
    init:function(new_products)
    {
      console.log('add new')
      console.log(new_products)
      products = new_products;
      LocalMemory.save(STORAGE_NAME, products);
    },
    query:function()
    {
      return products;
    },
    find:function(product)
    {
      return _.find(products, product);
    },
    get:function(product)
    {
      return this.find(product);
    },
    giveReward:function(reward)
    {
      if(_.isObject(reward) && reward.status)
        _(reward.items).forEach(function(item){
          var product = this.find({id:item.item_id});
          product.count -= item.amount;
        })
    }, 
    returnProduct:function(items)
    {
       var amount = 0;
       _(items).forEach(function(item){
        //console.log('each');

        var index = _.findIndex(products, {id:item.id});
        //console.log(index)
        if(index >= 0)
        {
          amount += products[index].price * item.count;
          products[index].count += item.count;
        }
      })
       LocalMemory.save(STORAGE_NAME, products);
      return amount;
    },
    sold:function(items)
    {
      var amount = 0;
      _(items).forEach(function(item){
        //console.log('each');

        var index = _.findIndex(products, {id:item.id});
        //console.log(index)
        if(index >= 0)
        {
          amount += products[index].price * item.count;
          products[index].count -= item.count;
        }
      })
      return amount;
    },
    save:function(product)
    {

    },
    getListItems:function()
    {
      return _.union([{id:"*", name:"ANY", type:"ANY"}],products);
    }

  }

})
.factory('Bill', function(Product, Payment, LocalMemory){
  var bills = [];
  var paid_bills = [];
  var STORAGE_NAME = "BILL_INVENTORY";
  function getItemsId(items)
  {
    if(items.length == 0)
      return "1";
    else
      return Number(items[items.length -1 ].id) + 1 + "";
  }

  return {
    data:{
      STORAGE_NAME:STORAGE_NAME,
      save:function(){
        return LocalMemory.save(STORAGE_NAME, paid_bills);
      },
      load:function()
      {
        var load_result = LocalMemory.load(STORAGE_NAME);
        if(_.isArray(load_result))
        {
          paid_bills = load_result
          return true;
        }
        return false;
      },
      reset:function()
      {
        LocalMemory.reset(STORAGE_NAME);
        return true;
      }
    },
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
    find:function(object)
    {
      return _.find(bills, object);
    },
    get:function(id)
    {
      var result = _.find(bills, {id:id});
      if(_.isUndefined(result))
        return null;
      return result;  
    },
    cancle:function(id)
    {
      return _.remove(bills, {id:id});
    },
    findPaidBill:function(object)
    {
      return _.find(paid_bills, object)
    },
    findAllPaidBill:function(arg)
    {
      return paid_bills;
    },
    sumAllPaidBill:function(arg)
    {
      var sum = 0;
      for(var i =0; i < paid_bills.length; i++)
      {
        sum += paid_bills[i].amount;
      }
      return sum;
    },
    refund:function(id)
    {
      console.log('cool')
      var paid_bill = _.find(paid_bills, {id:id});
      var item = _.cloneDeep(paid_bill);
      Product.returnProduct(paid_bill.bill.products);
      _.remove(paid_bills, {id:id});
      this.data.save();
      return item;

      
    },
    paid:function( id, amount, _credit, _discount, _reward)
    {
      
      var credit, reward = null, discount = 0;
      if(_.isNumber(_credit))
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
      }

      var bill = _.find(bills, {id:id});
      if(typeof(bill) == 'undefined')
        return -1;

      bill = _.cloneDeep(bill);
      _.remove(bills, {id:id});   
      var sold_amount = Product.sold(bill.products)
      var new_id = getItemsId(paid_bills);
      var create_time = new Date();
      var paid_credit = null
      var payment_total = Payment.getTotal(bill.products, discount);

      console.log("Before na")
      if(amount < payment_total.total)
      {
        //refund cause money
        console.log("Amount : " + amount);
        console.log("Total :" + payment_total.total)
        Product.returnProduct(bill.products);
        return -1;
      }
      Product.giveReward(reward)
      console.log("After na")
      var payment_credit = null;
      if(_.isObject(credit))
      {
        credit_total = Payment.getCreditTotal(payment_total.total, credit);
        paid_bills.push({
          id:new_id,
          create_time:create_time,
          total:credit_total.actual_total,
          amount:amount,
          bill:bill,
          credit:credit,
          tax_amount:payment_total.actual_tax_amount,
          discount:discount,
          payment_total:payment_total,
          credit_total:credit_total,
          promotion_reward:reward
        })
        
      }else
        paid_bills.push({
          id:new_id,
          create_time:create_time,
          total:payment_total.actual_total,
          amount:amount,
          bill:bill,
          credit:null,
          tax_amount:payment_total.actual_tax_amount,
          discount:discount,
          payment_total:payment_total,
          credit_total:null,
          promotion_reward:reward
        })
      console.log(paid_bills)
      this.data.save();
      Product.data.save();
      return new_id;
    }
  }
})
.factory('Payment', function()
{
  var payment = {tax:7, credits:[
    {id:"1", name:"MASTER", chargePercent:0.7, chargeAmount:0.25},
    {id:"2", name:"VISA", chargePercent:0.8, chargeAmount:0.1}
  ]}
  return {
    init:function(_payment)
    {
      console.log('sync stuff')
      console.log(_payment)


      payment = _payment;
      for(var i =0;i < payment.credits.length;i++)
      {
        payment.credits[i].chargePercent = payment.credits[i].charge_percent;
      payment.credits[i].chargeAmount = payment.credits[i].charge_amount;
      }
      
    },
    get:function()
    {
      return payment;
    },
    getTotal:function(orders, discount)
    {
      var subtotal = 0;
      var taxAmount = 0;
      for(var i =0; i < orders.length ; i++)
        subtotal += orders[i].price * orders[i].count;
      var taxAmount =  subtotal * payment.tax * 0.01;
      var total = subtotal + taxAmount - discount;

      var return_obj = {subtotal:Math.ceil(subtotal), actual_subtotal:subtotal, total:Math.ceil(total), actual_total:total, actual_tax_amount:taxAmount};
      console.log("return obj")
      console.log("discount:" + discount)
      console.log(return_obj)
      return return_obj
    },
    getCreditTotal:function(total, credit)
    {
      var credit_amount = total * credit.chargePercent * 0.01 + credit.chargeAmount;
      var credit_total = total + credit_amount
      return {credit:credit, actual_total:credit_total, total:Math.ceil(credit_total), credit_amount:credit_amount};
    },
    load:function()
    {

    },
    save:function(payment)
    {

    }
  }

}).factory('User', function(){
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
.factory('Promotion', function(Store, LocalMemory, Payment){
  var  CON_TYPE_ITEM_SET = 2, CON_TYPE_MONEY = 3;
  var REWARD_TYPE_DISCOUNT_PERCENT = 1, REWARD_TYPE_DISCOUNT_AMOUNT = 2, REWARD_TYPE_ITEM_BACK = 3;
  var promotions = [];
  var STORAGE_NAME = "POS_PROMOTION"
  return {

    CON_TYPE_ITEM_SET:CON_TYPE_ITEM_SET,
    CON_TYPE_MONEY:CON_TYPE_MONEY,
    REWARD_TYPE_DISCOUNT_PERCENT:REWARD_TYPE_DISCOUNT_PERCENT,
    REWARD_TYPE_DISCOUNT_AMOUNT:REWARD_TYPE_DISCOUNT_AMOUNT,
    REWARD_TYPE_ITEM_BACK:REWARD_TYPE_ITEM_BACK,
    data:{
      STORAGE_NAME:STORAGE_NAME,
      save:function(){
        return LocalMemory.save(STORAGE_NAME, promotions);
      },
      load:function()
      {
        var load_result = LocalMemory.load(STORAGE_NAME);
        if(_.isArray(load_result))
        {
          promotions = load_result
          return true;
        }
        return false;
      },
      reset:function()
      {
        LocalMemory.reset(STORAGE_NAME);
        return true;
      }
    },
    getItemID:function(items)
    {
      if(items.length == 0)
        return "1"
      else
        return Number(items[items.length - 1].id) + 1 + "";
    },
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
    initItem:function(item_in_list, list_items)
    {
      item_in_list.update = function(item)
      {
        if(_.findIndex(list_items, {item_id:item.id}) == -1)
        {
          //new item
          this.item_id = item.id;
          return true;
        }
        //return false cause duplicate other item
        return false;
      }
      return item_in_list;
    },
    addCondition:function(conditions, type)
    {
      var id = this.getItemID(conditions);
      var self = this;
      conditions.push({id:id, type:type, items:[], addItem:function(){
          var list_items = this.items;
          var blank_item = {id:self.getItemID(this.items) }
          blank_item = self.initItem(blank_item, list_items);
          list_items.push(blank_item)
          return blank_item;
        },removeItem:function(id)
        {
          return _.remove(this.items, {id:id});
        }
      });
      return conditions[conditions.length -1]
    },
    save:function(promotion)
    {
      var condition_field = ['id', 'type', 'items', 'value'];
      if(_.isString(promotion.id))
      {
        //update case
        var target_promotion = _.find(promotions, {id:promotion.id});
        for(var key in promotion)
        {
          target_promotion[key] = promotion[key];
        }
      }else
      {
        //create case
        promotion.id = this.getItemID(promotions)
       
        promotions.push(promotion)
      }
      //filter only data that we need then save to localStorage
      this.data.save();

      return promotion
    },
    createReward:function(type)
    {
      var self = this;
      return {
        type:type,
        items:[],
        update:function(obj)
        {
          for(var key in obj)
          {
            this[key] = obj[key]
          } 
        },
        addItem:function()
        {
          var list_items = this.items;
          if(this.type != self.REWARD_TYPE_ITEM_BACK)
            return - 1;
          var id = self.getItemID(this.items);
          var obj = {
            id:id
          }//return object
          obj = self.initItem(obj, list_items);
          this.items.push(obj)
          return obj;
        },//addItem
        removeItem:function(id)
        {
          return _.remove(this.items, {id:id});
        }
      }
    },
    getReward:function(orders){
      
      //imitiate sold 
      var payment_total = Payment.getTotal(orders, 0)
      var paying_amount = payment_total.actual_subtotal
      //find promotion that got  exceed 
      var discount_amount = 0;
      var items_back = [];
      var promotion_list = [];
      var status = false;
      var reason = "Not found"
      var code = 1;
      var self= this;
      _.forEach(promotions, function(promotion){
        //
        var condition_count = 0;
        var candidate_discount = 0;

        //isValid check about time frame
        _.forEach(promotion.conditions, function(condition){

            if(condition.type == self.CON_TYPE_MONEY && paying_amount >= condition.value )
            {
              condition_count++;
            }  
        })

        if(condition_count == promotion.conditions.length && condition_count > 0)
        {
          status = true;
          if(promotion.reward.type == self.REWARD_TYPE_DISCOUNT_AMOUNT)

            candidate_discount = promotion.reward.discount;
          else if(promotion.reward.type == self.REWARD_TYPE_DISCOUNT_PERCENT)
          {
            
            candidate_discount = promotion.reward.discount * 0.01 * paying_amount
          }else if(promotion.reward.type == self.REWARD_TYPE_ITEM_BACK)
          {
            items_back = _.union(items_back, promotion.reward.items)
          }else
            status = false

          if(status)
            promotion_list.push(promotion)
        }

        if(candidate_discount > discount_amount)
          discount_amount = candidate_discount;
      })
      if(status)
        return {status:status, discount:discount_amount, items:items_back, promotions:promotion_list} 
      else
        return {status:status, reason:reason, code:code}

    },
    find:function(q){
      return _.find(promotions, q);
    },
    query:function()
    {
      return promotions;
    }
  }
}).factory('Wholesale', function(Product, $filter, LocalMemory){
  var paid_bills = [];
  var STORAGE_NAME = "BILL_WHOLESALE";
  return {
    data:{
      STORAGE_NAME:STORAGE_NAME,
      save:function(){
        return LocalMemory.save(STORAGE_NAME, paid_bills);
      },
      load:function()
      {
        var load_result = LocalMemory.load(STORAGE_NAME);
        if(_.isArray(load_result))
        {
          paid_bills = load_result
          return true;
        }
        return false;
      },
      reset:function()
      {
        paid_bills = [];
        LocalMemory.reset(STORAGE_NAME);
        return true;
      }
    },
    getPaidID:function()
    {
      if(paid_bills.length == 0)
        return "1";
      else
      {
        var last_id = paid_bills[paid_bills.length -1 ].id
        return Number(last_id) + 1 +"";
      }
    },
    query:function(){
      return $filter('filter')(Product.query(), function(item){
        if(item.minumWholeSales >= 0)
          return true;
        return false;
      });
    },
    createBill:function(items, customer){
      var total = Product.sold(items);
      var bill = {
        id:this.getPaidID(),
        customer:customer,
        products:items,
        create_time:new Date(),
        amount:total
      }
      
      paid_bills.push(bill)
      Product.data.save();
      this.data.save();
      return bill;
    },
    findAllBill:function()
    {
      return paid_bills;
    },
    sumAllPaidBill:function()
    {
      var sum = 0;
      for(var i =0; i < paid_bills.length ;i++)
        sum += paid_bills[i].amount;
      return sum;
    },
    findBill:function(object)
    {
      return _.find(paid_bills, object);
    },
    deleteBill:function(id){
      var bill = _.find(paid_bills, {id:id});
      Product.returnProduct(bill.products);
    }

  }
})