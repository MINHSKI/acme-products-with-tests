const expect = require('chai').expect;

describe('models', ()=> {
  it('Product model exists', ()=> {
    expect(Product).to.be.ok;
  });
});
