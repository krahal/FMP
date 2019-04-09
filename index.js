const express = require('express');
const realtor = require('realtorca');

const app = express();

const options = {
  LongitudeMin: -122.8713893,
  LongitudeMax: -122.8119087,
  LatitudeMin: 49.1278206,
  LatitudeMax: 49.1596561,
  PriceMin: 700000, // default = 0
  PriceMax: 1300000,
  SortBy: 1, // 1 = price, 6 = date posted
  SortOrder: 'D', // A = ascending, D = descending
  BedRange: '0-0', // 'min-max'
  BathRange: '0-0', // 'min-max'
};

console.log(realtor.buildUrl(options));


app.get('/', (req, res) => {
  realtor.post(options)
    .then((data) => {
      const prices = [];
      data.Results.forEach((property) => {
        prices.push(property.Property.Price);
      });
      console.log(prices);
      res.status(200).send(`Success from api call.\nThe prices are: ${prices}`);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Error from api call.');
    });
});

const port = 3000;
app.listen(port, () => console.log('Server started...'));
