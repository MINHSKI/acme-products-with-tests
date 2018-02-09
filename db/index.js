const conn = require('./conn');

const Product = require('./Product');
const Category = require('./Category');

Product.belongsTo(Category, { as: 'cat' });

const sync = ()=> {
  return conn.sync({ force: true });
};

module.exports = {
  sync,
  models: {
    Product,
    Category
  }
};
