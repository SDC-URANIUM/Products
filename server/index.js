const express = require('express');
const app = express();
const db = require('../database/db.js');
const models = require('../database/models.js');
const xPort = 3000;

app.use(express.json());

// return a 'page' of individual product info objects
// tables: products
app.get('/products', (req, res) => {
  const count = req.query.count;
  const page = req.query.page;
  res.send(200, `${req.query.page} ${req.query.count} was sent to the API route products`)
});

// return an individual product info object with 1 more property 'features': an array of individual feature objects
// tables: products, features
app.get('/products/:product_id', (req, res) => {
  res.send(200, `${req.params.product_id} was sent to the API route products info`)
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
    console.log(err);
  }
});

app.listen(xPort, (err) => {
  if (err) {
    console.log('🟥There was an error on your Express server!', err);
  }
  console.log('Server listening on Port', xPort);
});
