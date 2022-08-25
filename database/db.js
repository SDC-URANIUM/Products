require('dotenv').config();
// const pgp = require('pg-promise');
// const db = pgp(`postgres://jordan:${process.env.PW}@${process.env.HOST}:${process.env.PORT}/${process.env.DB}`);

// export default db;

const { Client } = require('pg');
// const parse = require('pg-connection-string').parse;
// var config = parse()

const client = new Client({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DB,
  password: process.env.PW,
  port: process.env.PORT,
})
client.connect();

module.exports = client;