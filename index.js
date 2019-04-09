const express = require('express');
const bodyParser = require('body-parser');
const realtor = require('realtorca');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// const options = {
//   LongitudeMin: -122.8713893,
//   LongitudeMax: -122.8119087,
//   LatitudeMin: 49.1278206,
//   LatitudeMax: 49.1596561,
//   PriceMin: 700000, // default = 0
//   PriceMax: 1300000,
//   SortBy: 1, // 1 = price, 6 = date posted
//   SortOrder: 'D', // A = ascending, D = descending
//   BedRange: '0-0', // 'min-max'
//   BathRange: '0-0', // 'min-max'
// };


app.post('/', (req, res) => {
  // Get form input
  const options = {
    LongitudeMin: parseFloat(req.body.LongitudeMin),
    LongitudeMax: parseFloat(req.body.LongitudeMax),
    LatitudeMin: parseFloat(req.body.LatitudeMin),
    LatitudeMax: parseFloat(req.body.LatitudeMax),
    PriceMin: parseInt(req.body.PriceMin, 10), // default = 0
    PriceMax: parseInt(req.body.PriceMax, 10),
    // SortBy: req.body.SortBy, // 1 = price, 6 = date posted
    // SortOrder: req.body.SortOrder, // A = ascending, D = descending
    // BedRange: req.body.BedRange, // 'min-max'
    // BathRange: req.body.BathRange, // 'min-max'
  };

  console.log(`Realtor.ca URL is: ${realtor.buildUrl(options)}\n`);

  // Make API call to get house data
  realtor.post(options)
    .then((data) => {
      const prices = [];
      data.Results.forEach((property) => {
        const priceStr = property.Property.Price.substring(1);
        const price = parseInt(priceStr.replace(/,/g, ''), 10);
        prices.push(price);
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
