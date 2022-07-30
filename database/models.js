const db = require('./db.js');

module.exports = {
  // get related
  // query related for all related_id where product_id is req.params.product_id
  getRelated: function({ product_id }, callback) {
    db.query('SELECT related_product_id FROM "Related" WHERE current_product_id = $1', [ product_id ], (err, data) => {
      callback(err, data);
    });
  }

  // getProductPages: function({ count, page } , callback) {
  //   db.query('SELECT * FROM "Products" LIMIT')
  // }
}

// need to check my callback error handling
//