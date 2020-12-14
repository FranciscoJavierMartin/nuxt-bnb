const bodyParser = require('body-parser');
const app = require('express')();
const fetch = require('node-fetch');

app.use(bodyParser.json());
app.get('/getJSON/:city', (req, res) => {
  const { city } = req.params;
  fetch(
    `http://geodb-free-service.wirefreethought.com/v1/geo/cities?namePrefix=${city}&limit=5&offset=0&hateoasMode=false`
  )
    .then((response) => response.json())
    .then((response) => {
      console.log('Then', response);

      const cities = response.data
        .filter((c) => c.type === 'CITY')
        .map((c) => ({
          id: c.id,
          name: c.name,
          country: c.country,
          region: c.region,
          latitude: c.latitude,
          longitude: c.longitude,
        }));

      return res.json({
        cities,
      });
    })
    .catch((err) => {
      console.log('Error', err);
      return res.json({
        data: err,
      });
    });
  // res.json({ data: 'data' });
});

module.exports = app;
