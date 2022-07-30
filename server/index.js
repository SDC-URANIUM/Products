const express = require('express');
const app = express();
const db = require('../database/db.js');
const models = require('../database/models.js');
const xPort = 3000;

app.use(express.json());

// return a 'page' of individual product info objects
// tables: products
app.get('/products', async (req, res) => {
  let { count, page } = req.query;
  (!count) ? count = 5 : count = count;
  (!page) ? page = 0 : page = (page - 1) * count;
  try {
    const results = await db.query('SELECT * FROM "Products" LIMIT $1 OFFSET $2', [count, page]);
    res.send(results.rows)
  } catch (err) {
    console.log('🟥There was an error querying for products', err);
  }
  // res.send(200, `${req.query.page} ${req.query.count} was sent to the API route products`)
});

// return an individual product info object with 1 more property 'features': an array of individual feature objects
// tables: products, features
app.get('/products/:product_id', async (req, res) => {
  try {
    const { product_id } = req.params;
    // const results = await db.query('SELECT * FROM "Products" JOIN "Features" ON "Products".product_id = "Features".product_id WHERE "Products".product_id = $1', [product_id]);
    const results = await db.query('SELECT *, (SELECT json_agg("feature1") FROM (SELECT "feature", "value" FROM "Features" WHERE product_id = $1) AS "feature1") AS "Features" FROM "Products" WHERE product_id = $1 ', [product_id]);
    res.send(results.rows[0]);
  } catch (err) {
    console.log('🟥There was an error querying for a product\'s info:', err);
  }
  // res.send(200, `${req.params.product_id} was sent to the API route products info`)
});

// return an object that is kind of complex, check API docs for structure
// tables: styles, photos, skus
app.get('/products/:product_id/styles', (req, res) => {
  res.send(200, `${req.params.product_id} was sent to the API route styles`)
});

// return an array of products related to queried product_id
// tables: related
app.get('/products/:product_id/related', async (req, res) => {
  // models.getRelated(req.params.product_id, (err, data) => {
  //   if (err) {
  //     console.log('🟥There was an error with querying related products\n', err);
  //   } else {
  //     res.send(200, data);
  //   }
  // });
  // res.send(200, `${req.params.product_id} was sent to the API route related`)

  try {
    const { product_id } = req.params;
    // const results = await db.query('SELECT related_product_id FROM "Related" WHERE current_product_id = $1', [ product_id ]);
    const results = await db.query('SELECT ARRAY(SELECT related_product_id::text FROM "Related" WHERE current_product_id = $1)', [ product_id ]);
    res.send(results.rows[0].array);
  } catch (err) {
    console.log('🟥There was an error querying for related products:', err);
  }
});

app.listen(xPort, (err) => {
  if (err) {
    console.log('🟥There was an error on your Express server!', err);
  }
  console.log('Server listening on Port', xPort);
});
