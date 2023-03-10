const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
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

let port = process.env.PORT || 3001;

//api data that is used in app will populate this object
let projectData = {};

//main route for index.html
app.get('/check', function (req, res) {
  res.send('200 OK');
});

//start server
app.listen(port,  () => console.log('App listening on port: ' + port));

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
    //console.log("geo data:", data)
    //populate projectData object with api data
    projectData = {
      long: data.geonames[0].lng,
      lat: data.geonames[0].lat,
      country: data.geonames[0].countryName,
      local: data.geonames[0].adminName1,
      name: data.geonames[0].name
    };
    //call other APIs that require geonames data
    await getForcastArr(projectData.lat, projectData.long);
    await getPic(projectData.name, projectData.local, projectData.country);
  } catch (e) {
    console.log(e);
  }
}

//uses geonames data for lat and long to call weatherbit api
const getForcastArr = async (lat, long) => {
  let weatherData = await fetch(`https://api.weatherbit.io/v2.0/forecast/daily?&lat=${lat}&lon=${long}&units=I&key=${weatherBitKey}`);
  try {
    const wData = await weatherData.json();
    //console.log("forcast data: ", wData) //"Weather el 1: ", wData.data[0].weather)
    //declare forcast array
    let forcast = [];
    if(wData.status_code == 429) {
      forcast[0] = wData.status_message;
    } else {
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
    }
    //add forcast array to projectData
    projectData.forcast = forcast;
  } catch (e) {
    console.log("error:", e);
  }
}

//uses geonames data to get the city and country name
const getPic = async (name, local, country) => {
  //call pixabay with city
  let picData = await fetch(`https://pixabay.com/api/?key=${pixaBayKey}&image_type=photo&category=places&per_page=3&q=${name}`);
  try {
    let data = await picData.json();
    //if nothing found on city call pixabay with locality
    //console.log("1st pic call: ", data)
    if(data.total == 0) {
      picData = await fetch(`https://pixabay.com/api/?key=${pixaBayKey}&image_type=photo&category=places&per_page=3&q=${local}`)
      try {
        data = await picData.json();
        //console.log("2nd pic call: ", data)
            //if nothing found on locality call pixabay with country
        if(data.total == 0) {
          picData = await fetch(`https://pixabay.com/api/?key=${pixaBayKey}&image_type=photo&category=places&per_page=3&q=${country}`)
          try {
            data = await picData.json()
            //console.log("3rd pic call: ", data)
          } catch(e) {
            console.log("Nested pic fetch error", e);
          }
        } else {
       // console.log("2nd pic call: ", data)
        //add country picture URL to projectData object
        projectData.picture = data.hits[0].largeImageURL;
        }
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