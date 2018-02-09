const conn = require('./conn');
const Sequelize = conn.Sequelize;

const Product = conn.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  price: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    set: function(val){
      this.setDataValue('price', val < 0 ? 0 : val);
    }
  }
}, {
  getterMethods: {
    description: function(){
      return `Hello my name is ${this.name} and my price is ${this.price}`;
    }
  },
  hooks: {
    beforeUpdate: function(product){
      if(product.price === 0){
        product.name = product.name.toUpperCase();
      }
    }
  }
});

Product.findByName = function(name){
  return this.findOne({ where: {
    name
  }});
}

Product.prototype.makeLoud = function(){
  this.name = this.name.toUpperCase();
}

module.exports = Product;


