var promotions = [];
var condition_groups = [];
var conditions = [];
var CON_TYPE_TIME = 1, CON_TYPE_ITEM_SET = 2, CON_TYPE_MONEY = 3;
var REWARD_TYPE_DISCOUNT_PERCENT = 1, REWARD_TYPE_DISCOUNT_AMOUNT = 2, REWARD_TYPE_ITEM_BACK = 3;

var promotion_a = 
{
	id:1,
	name:"Buy 2 get 1",
	conditions:[
		{id:1, type:CON_TYPE_TIME, start:"2014-10-19", end:"2099-10-19"},
		{id:2, type:CON_TYPE_ITEM_SET, set:[
			{item_id:"*", amount:2}
		]}
	],
	reward:{
		type:REWARD_TYPE_ITEM_BACK,
		set:[
			{item_id:"*", amount:1}
		]
	}

} 