import http from 'k6/http';
import { check, sleep } from 'k6';

// demo test from the docs
// export default function () {
//   http.get('https://test.k6.io');
//   sleep(1);
// }

// this will let you configure the stress test options without calling them in the command line
// 10 virtual users
// 30 second test duration
export const options = {
  vus:100,
  duration: '30s',
};

// export default function () {
//   http.get('https://test.k6.io');
//   sleep(1);
// }

// ramping VUs up and down during the test
// use the options.stages property
// export const options = {
//   stages: [
//     { duration: '5s', target: 10 },
//     { duration: '10s', target: 20 },
//     // { duration: '15s', target: 30 },
//     // { duration: '20s', target: 40 },
//     // { duration: '25s', target: 50},
//   ],
// };

// products route
// const url = `http://localhost:3000/products/${Math.floor(Math.random() * (1000000 - 900000)) + 900000}`;

// related route
// const url = `http://localhost:3000/products/${Math.floor(Math.random() * (1000000 - 900000)) + 900000}/related`;

// styles route
// const url = `http://localhost:3000/products/${Math.floor(Math.random() * (1000000 - 900000)) + 900000}/styles`;

// products pagination route
const url = `http://localhost:3000/products/?page=${100000}&count=${Math.floor(Math.random() * (10 - 5)) + 5}`;

// this will call my locally running API with a random product ID between 900k and 999,999 (the last 10% of database entries)
// then test the response of the http request to make sure it is 200 (indicating that the http req and query were both good to go)
export default function () {
  const res = http.get(url);
  check(res, { 'status was 200': (r) => r.status == 200 });
}