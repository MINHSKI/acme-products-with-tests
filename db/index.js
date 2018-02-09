const conn = require('./conn');

const Product = require('./Product');

const sync = ()=> {
  return conn.sync({ force: true });
};

module.exports = {
  sync,
  models: {
    Product
  }
};
