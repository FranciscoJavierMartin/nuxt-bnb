const bodyParser = require('body-parser');
const app = require('express')();
const fetch = require('node-fetch');

const myKey = process.env.API_KEY;

app.use(bodyParser.json());
app.get('/search-city/:city', (req, res) => {
  const { city } = req.params;
  console.log(myKey);

  fetch(
    `http://geodb-free-service.wirefreethought.com/v1/geo/cities?namePrefix=${city}&limit=5&offset=0&hateoasMode=false`
  )
    .then((response) => response.json())
    .then((response) => {

      const cities = response.data
        .filter((c) => c.type === 'CITY')
        .map((c) => ({
          id: c.id,
          name: c.name,
          region: c.region,
          country: c.country,
          latitude: c.latitude,
          longitude: c.longitude,
        }));

      return res.json({
        cities,
      });
    })
    .catch((err) => {
      return res.json({
        data: err,
      });
    });
});

module.exports = app;
