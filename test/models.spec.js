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
    return Product.create({})
      .then( p=> {
        expect(p).to.be.ok;
      });
  });
});
