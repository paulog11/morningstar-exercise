const express = require('express');
const faker = require('faker');
const cors = require('cors');

const app = express();
const port = 3000; // changing this value and restarting the server will change the port on which the app listens
const maxNumberOfFunds = 10000; // changing this value will change the number of funds that are returned. The server will break at more than 456976 funds, and will become significantly slower the close to that number you get. 10000 is a reasonable number of funds, and you can lower it if you want.

if (maxNumberOfFunds > 10000) {
  throw new Error('Do not exceed 200,000 funds to be generated') // safety to avoid app crashing and going into infinite loop
}

const getRandomIndexValue = (list) => {
  return list[Math.floor(Math.random() * list.length)];
};

const fundDescriptors = ['Growth', 'Blend', 'American', 'International', 'Target Date'];
const createFundDescriptor = () => getRandomIndexValue(fundDescriptors);

const exchanges = ['NYSE', 'NASDAQ', 'OTC Markets', 'CBOE', 'CME'];
const createExchange = () => getRandomIndexValue(exchanges);

const usedTickers = {};

const createTicker = () => {
  let ticker = '';
  do {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let i = 0;
    for (i; i < 4; i++) {
      ticker += getRandomIndexValue(alphabet);
    }
  } while (usedTickers[ticker]);
  usedTickers[ticker] = true;
  return ticker;
};

const createFund = () => ({
  name: faker.fake(`{{company.companyName}} ${createFundDescriptor()} Fund`),
  ticker: createTicker(),
  exchange: createExchange(),
  id: faker.fake('{{datatype.uuid}}')
});

const createFunds = (num = maxNumberOfFunds) => {
  const funds = [];
  let i = 0;
  for (i; i < num; i++) {
    funds.push(createFund());
    if (funds.length > 200000) { break; } // another safety to avoid too many funds
  }
  return funds;
};

const data = createFunds();

app.get('/api/v1/funds', cors(), (req, res, next) => {
  let { term = null } = req.query
  if (!term) {
    res.json(data);
  } else {
    term = term.toLocaleLowerCase();
    const filteredData = data.filter(fund => (fund.name.toLowerCase().includes(term) || fund.ticker.toLowerCase().includes(term)));
    res.json(filteredData);
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
