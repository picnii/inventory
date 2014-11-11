describe('Unit: Product Factory', function() {
  beforeEach(module('ngRoute'));
  beforeEach(module('pos'));
  var Product;

  beforeEach(inject(function($injector) {
    Product = $injector.get('Product');
  }));

  it('query() should Get all loaded product', function(){
    expect(_.isArray(Product.query())).toBe(true)
  })

  it('get() should be able get item by id', function(){
    var first_item = Product.query()[0];
    var get_item = Product.get({id:first_item.id});
    expect(get_item).toEqual(first_item);
  });

  it('sold(products) should be able to cut stock in products', function(){
    var first_item = Product.query()[0];
    var second_item = Product.query()[1];
    var first_item_count = first_item.count;
    var second_item_count = second_item.count;
    var first_item_used = 2, second_item_used = 3
    var sellAmount = Product.sold([{id:first_item.id, count:first_item_used}, {id:second_item.id, count:second_item_used}]);
    expect(sellAmount).toEqual((first_item_used * first_item.price) + (second_item_used * second_item.price));
    first_item = Product.get({id:first_item.id});
    second_item = Product.get({id:second_item.id});
    expect(first_item.count).toEqual(first_item_count - first_item_used);
    expect(second_item.count).toEqual(second_item_count - second_item_used);

  });
})