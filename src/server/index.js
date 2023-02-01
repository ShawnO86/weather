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

app.use(express.static('dist'));

//api data that is used in app will populate this object
let projectData = {};

//main route for index.html
app.get('/', function (req, res) {
  res.sendFile('dist/index.html');
});

//start server
app.listen(3001, function () {
  //console.log('App listening on port 3001!');
});

//retrieve hidden api keys from .env
const geoKey = process.env.geonames_key;
const weatherBitKey = process.env.weatherbit_key;
const pixaBayKey = process.env.pixabay_key;
//API_KEYS must be defined in project root within .env file!

//main GET endpoint to retrieve all used API data and set the city entered
app.get('/data/:city', async (req, res) => {
  await getGeoData(req, res);
  try {
    res.send(projectData);
  } catch (e) {
    console.log("error", e);
  }
});

//uses city GET param to call geonames api
const getGeoData = async (req, res) => {
  const city = req.params.city;
  let geoData = await fetch(`http://api.geonames.org/searchJSON?q=${city}&maxRows=1&fuzzy=0.8&username=${geoKey}`);
  try {
    const data = await geoData.json();
    //populate projectData object with api data
    projectData = {
      long: data.geonames[0].lng,
      lat: data.geonames[0].lat,
      country: data.geonames[0].countryName,
      local: data.geonames[0].adminName1,
      name: data.geonames[0].toponymName,
      pop: data.geonames[0].population
    };
    //call other APIs that require geonames data
    await getForcastArr(projectData.lat, projectData.long);
    await getPic(projectData.local, projectData.country);
  } catch (e) {
    console.log(e);
  }
}

//uses geonames data for lat and long to call weatherbit api
const getForcastArr = async (lat, long) => {
  let weatherData = await fetch(`https://api.weatherbit.io/v2.0/forecast/daily?&lat=${lat}&lon=${long}&units=I&key=${weatherBitKey}`);
  try {
    const wData = await weatherData.json();
    console.log(wData)
    //declare forcast array
    let forcast = [];
    //Loop over weatherbit api data - to extract data app uses
   wData.data.forEach(element => {
      //push the 7 days of forcast to the forcast array 
      forcast.push({
        date: element.datetime,
        high_temp: element.high_temp,
        low_temp: element.low_temp,
        humidity: element.rh + "%",
        wind_speed: element.wind_spd + "MPH",
        wind_gusts: element.wind_gust_spd + "MPH",
        precipitation: element.pop,
        rainAmt: element.precip,
        snowAmt: element.snow,
        iconDesc: {icon: "https://www.weatherbit.io/static/img/icons/" + element.weather.icon + ".png", description: element.weather.description}
      })
    }); 
    //add forcast array to projectData
    projectData.forcast = forcast;
  } catch (e) {
    console.log("error:", e);
  }
}

//uses geonames data to get the city and country name
const getPic = async (local, country) => {
  //call pixabay with city + country 
  let picData = await fetch(`https://pixabay.com/api/?key=${pixaBayKey}&image_type=photo&category=places&per_page=3&q=${local +"+"+ country}`);
  try {
    let data = await picData.json();
    //if nothing found on city call pixabay with just country
    if(data.total == 0) {
      picData = await fetch(`https://pixabay.com/api/?key=${pixaBayKey}&image_type=photo&category=places&per_page=3&q=${local='' + country}`)
      try {
        data = await picData.json();
        //add country picture URL to projectData object
        projectData.picture = data.hits[0].webformatURL;
      } catch (e) {
        console.log("Nested pic fetch error", e);
      }
    } else {
      //add city picture URL to projectData object
      projectData.picture = data.hits[0].webformatURL;
    }

  } catch (e) {
    console.log("error", e);
  }
}