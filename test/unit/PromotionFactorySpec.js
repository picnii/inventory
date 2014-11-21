describe('Unit: Promotion Factory', function() {
  beforeEach(module('ngRoute'));
  beforeEach(module('pos'));
  var Product, Promotion, Payment;

  beforeEach(inject(function($injector) {
    Product = $injector.get('Product');
    Promotion = $injector.get('Promotion');
    Payment = $injector.get('Payment');
    Promotion.data.reset();
  }));

  it('should be able to get all promotion by query()', function(){
  	expect(_.isArray(Promotion.query())).toBe(true);
  })

  it('should be able to create promotion with save()', function(){
    var promotion = {
      name:"Something",
      description:"Some How",
      start:"2014-11-12",
      end:"2015-12-13",
      conditions:[],
      reward:{}
    };
    //var conditions_types = Promotion.getConditionTypes();
    //var item_back_types =conditions_types[ Promotion.CON_TYPE_ITEM_SET ]
    var promotions = Promotion.query();
    var next_index = promotions.length;
    var next_id = Promotion.getItemID(promotions);
    var conditon_item_back = Promotion.addCondition(promotion.conditions, Promotion.CON_TYPE_ITEM_SET);
    //at start condition contain no item
    expect(conditon_item_back.items).toEqual([])


    var list_items = Product.getListItems();
    //create a blank item in conditon.items
    var expect_id = Promotion.getItemID(conditon_item_back.items)
    var blank_item_in_condition = conditon_item_back.addItem();
    //after add should create an id

    expect(blank_item_in_condition.id).toEqual(expect_id);
    //add item in items
    var random_item = list_items[_.random(1, list_items.length -1)];
    var result = blank_item_in_condition.update(random_item);
    expect(result).toBe(true)
    expect(blank_item_in_condition.item_id).toEqual(random_item.id);
    result = blank_item_in_condition.update(random_item);
    //cant be duplicate
    expect(result).toBe(false)

    //do remove case
    blank_item_in_condition = conditon_item_back.addItem();
    var random_item_for_remove = list_items[0];
    expect(blank_item_in_condition.update(random_item_for_remove)).toBe(true);
    expect(conditon_item_back.items.length).toBe(2);
    conditon_item_back.removeItem(blank_item_in_condition.id)
    //item should have been remove
    expect(conditon_item_back.items.length).toBe(1);
    promotion.conditions.push(conditon_item_back);


    //condition in amount of money

    //reward
    //reward in percent
    var reward = Promotion.createReward(Promotion.REWARD_TYPE_DISCOUNT_PERCENT);
    expect(reward.type).toBe(Promotion.REWARD_TYPE_DISCOUNT_PERCENT);
    var expect_discount = 200;
    reward.update({"discount":expect_discount});
    expect(reward.discount).toBe(expect_discount);

    //reward in amount
    reward = Promotion.createReward(Promotion.REWARD_TYPE_DISCOUNT_AMOUNT);
    expect(reward.type).toBe(Promotion.REWARD_TYPE_DISCOUNT_AMOUNT);
    reward.update({discount:expect_discount});
    expect(reward.discount).toBe(expect_discount);

    //reward in item_backs
    reward = Promotion.createReward(Promotion.REWARD_TYPE_ITEM_BACK);
    expect(reward.type).toBe(Promotion.REWARD_TYPE_ITEM_BACK);
    var expect_id = "1";
    var blank_item = reward.addItem();
    random_item = list_items[_.random(0, list_items.length - 1 )];
    expect(reward.items.length).toBe(1);
    blank_item.update(random_item);
    expect(blank_item.id).toEqual(expect_id);
    expect(blank_item.item_id).toEqual(random_item.id);

    //test remove item from reward



    Promotion.save(promotion);
    promotions = Promotion.query();
    var expect_promo = _.cloneDeep(promotion);
    expect_promo.id = next_id
    expect(promotions[next_index]).toEqual(expect_promo);

  	
  })

  it('should be able to update promotion with save()', function(){
    //data should be filter with blablabla



    //should be able to look in local storage
    
  })

  describe('should be able to getReward() from products ', function(){
    var products, buying_items, orders, payment_total, promotion;
    beforeEach(function(){
      products = Product.query();
      orders = [];
      for(var i = 0; i < products.length / 3; i++)
      {
        var item = _.cloneDeep(products[i]);
        item.number = i + 1;
        item.count = 2;
        orders.push(item);
      }
      payment_total = Payment.getTotal(orders, 0);
      promotion = {
        "name":"buy more than A get discount Bc",
        "detail":"asd",
        "start":"2014-12-11",
        "end":"2015-12-11",
        conditions:[],
        reward:{}
      };
      console.log("========COOL xBEANS==========")
      console.log(payment_total)
    })

    it('should be able to do discount_amount from buying amount ', function()
    {
      var expect_discount = 100; 
      var expect_buying_amount = payment_total.actual_subtotal;
      //create Promotion that contain this stuff
      var condition = Promotion.addCondition(promotion.conditions, Promotion.CON_TYPE_MONEY);
      condition.value = expect_buying_amount;
      promotion.conditions.push(condition);
      var reward = Promotion.createReward(Promotion.REWARD_TYPE_DISCOUNT_AMOUNT);
      reward.update({discount:expect_discount});
      promotion.reward =reward;
      promotion = Promotion.save(promotion);

      var reward_result = Promotion.getReward(orders)
      expect(reward_result).toEqual({
        status:true,
        items:[],
        discount:expect_discount,
        promotions:[promotion]
      })
    })

    it('should be able to do discount percent from buying amount ', function()
    {
      var expect_discount_percent = 10;
      var expect_buying_amount = payment_total.actual_subtotal;
      var expect_discount = expect_discount_percent * 0.01 * expect_buying_amount;

      //create Promotion that contain this stuff
      var condition = Promotion.addCondition(promotion.conditions, Promotion.CON_TYPE_MONEY);
      condition.value = expect_buying_amount;
      promotion.conditions.push(condition);
      var reward = Promotion.createReward(Promotion.REWARD_TYPE_DISCOUNT_PERCENT);
      reward.update({discount:expect_discount_percent});
      promotion.reward =reward;
      promotion = Promotion.save(promotion);

      var reward_result = Promotion.getReward(orders)
      expect(reward_result).toEqual({
        status:true,
        items:[],
        discount:expect_discount,
        promotions:[promotion]
      })

    });

    it('should be able to get items_back from buying amount ', function()
    {
      //
      var item_backs = [];
      var expect_buying_amount = payment_total.actual_subtotal;
      var condition = Promotion.addCondition(promotion.conditions, Promotion.CON_TYPE_MONEY);
      condition.value = expect_buying_amount;
      promotion.conditions.push(condition);

      var reward = Promotion.createReward(Promotion.REWARD_TYPE_ITEM_BACK);
      var target_indexs = [0,1,2,3,4];
      for(var i = 0; i < target_indexs.length;i++)
      {
        var item = reward.addItem();
        item.update({id:products[target_indexs[i] ].id, amount:2})  ;
      }
      expect(reward.items.length).toBe(target_indexs.length)
      item_backs = _.cloneDeep(reward.items);
      
      promotion.reward = reward;
      promotion = Promotion.save(promotion);
      var reward_result = Promotion.getReward(orders)
      expect(reward_result).toEqual({
        status:true,
        items:item_backs,
        discount:0,
        promotions:[promotion]
      })

      //when do payment get cut it in inventory
    });


    
    //Promotion.getReward(products)
    /*
      {status:true ,discount:amount, items:[]}
      {status:false, code:01, reason:"out of date"},
      {status:false, code:02, reason:"Not match with conditions"},
    [ 
    * {id:promo_id, type:reward_type, discount:{amount:20, type:percent_type} },
    * {id:promo_id, type:reward_type, discount:{amount:20, type:amount_type} }, 
    * {id:promo_id, type:item_back, items:[{item_id, amount}, {item_id, amount}] },
    *]
    */ 
  })



})