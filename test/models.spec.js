const expect = require('chai').expect;
const db = require('../db');
const { Product, Category } = db.models;

describe('models', ()=> {
  beforeEach(()=> {
    return new Promise((res)=> {
      res();
    });
  });
  beforeEach(()=> {
    return db.sync();
  });

  it('Product model exists', ()=> {
    expect(Product).to.be.ok;
  });
  
  it('a product can be created', ()=> {
    return Product.create({name: 'foo'})
      .then( p=> {
        expect(p).to.be.ok;
      });
  });

  it('a product needs a name', ()=> {
    return Product.create({})
      .then( p=> {
        throw 'i should not hit this';
      })
      .catch(er => {
        expect(er.errors[0].path).to.equal('name');
      });
  });

  it('a product name can not be empty', ()=> {
    return Product.create({name: ''})
      .then( p=> {
        throw 'i should not hit this';
      })
      .catch(er => {
        expect(er.errors[0].path).to.equal('name');
      });
  });

  it('a product has a price with a defaultValue of 0', ()=> {
    return Product.create({name: 'foo'})
      .then( product => {
        expect(product.price).to.equal(0);
      });
  });

  it('a negative price will get saved as 0', ()=> {
    return Product.create({name: 'foo', price: -10})
      .then( product => {
        expect(product.price).to.equal(0);
        product.price = -100;
        expect(product.price).to.equal(0);
      });
  });

  it('has a description property', ()=> {
    return Product.create({name: 'foo', price: 10})
      .then( product => {
        expect(product.description).to.equal('Hello my name is foo and my price is 10');
      });
  });

  it('has a class method getProductByName', ()=> {
    return Product.create({name: 'foo', price: 10})
      .then( product => {
        return Product.findByName('foo');
      })
      .then( product=> {
        expect(product.name).to.equal('foo');
      });

  });
  it('has a instance method called makeLoud', ()=> {
    return Product.create({name: 'foo', price: 10})
      .then( product => {
        product.makeLoud();
        expect(product.name).to.equal('FOO');
      })

  });

  it('if I update with a zero price then capitalize name', ()=> {
    return Product.create({name: 'foo', price: 10})
      .then( product => {
        product.price = 0;
        return product.save();
      })
      .then( product => {
        expect(product.name).to.equal('FOO');
      });

  });

  it('Has a category', ()=> {
    return Promise.all([
      Product.create({name: 'foo', price: 10}),
      Category.create({})
    ])
    .then(([product, category]) => {
      return product.setCat(category);
      /*
      return Product.findAll({
        include: [ {
          model: Category,
          as: 'cat'
        } ]
      })
      */
    })
    .then( product => {
      expect(product.catId).to.be.ok;
    });
  });

});
