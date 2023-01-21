var path = require('path');
const express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
const dotenv = require('dotenv');
//to use fetch in node
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

const app = express();

app.use(cors());
// to use json
app.use(bodyParser.json());
// to use url encoded values
app.use(bodyParser.urlencoded({
  extended: true
}));

dotenv.config();
const geoKey = process.env.geonames_key;
//API_KEY must be defined in project root within .env file!

app.use(express.static('dist'));

let projectData = {};

app.get('/', function (req, res) {
  res.sendFile('dist/index.html');
});

app.listen(3001, function () {
  console.log('App listening on port 3001!');
});

app.get('/geoData/:city', async (req, res) => {
  const city = req.params.city;
  let geoData = await fetch(`http://api.geonames.org/searchJSON?q=${city}&maxRows=1&fuzzy=0.8&username=${geoKey}`);
  try {
    const data = await geoData.json();
    const usefulData = {
      long: data.geonames[0].lng,
      lat: data.geonames[0].lat,
      country: data.geonames[0].countryName,
      local: data.geonames[0].adminName1,
      name: data.geonames[0].toponymName
    }
    console.log(data)
    res.send(usefulData)
  } catch (e) {
    console.log(e);
    res.send("error", e);
  }
})