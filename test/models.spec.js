const expect = require('chai').expect;
const db = require('../db');
const { Product } = db.models;

describe('models', ()=> {
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

});
