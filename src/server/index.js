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

let projectData = {};

app.get('/', function (req, res) {
  res.sendFile('dist/index.html');
});

app.listen(3001, function () {
  console.log('App listening on port 3001!');
});

const geoKey = process.env.geonames_key;
const weatherBitKey = process.env.weatherbit_key;
const pixaBayKey = process.env.pixabay_key;
//API_KEYS must be defined in project root within .env file!

app.get('/data/:city', async (req, res) => {
  await getGeoData(req, res);
  try {
    //console.log(projectData);
    res.send(projectData);
  } catch (e) {
    console.log("error", e);
  }
});

const getGeoData = async (req, res) => {
  const city = req.params.city;
  let geoData = await fetch(`http://api.geonames.org/searchJSON?q=${city}&maxRows=1&fuzzy=0.8&username=${geoKey}`);
  try {
    const data = await geoData.json();
    projectData = {
      long: data.geonames[0].lng,
      lat: data.geonames[0].lat,
      country: data.geonames[0].countryName,
      local: data.geonames[0].adminName1,
      name: data.geonames[0].toponymName
    };
    //console.log("geo data:", data);
    await getForcastArr(projectData.lat, projectData.long);
    await getPic(projectData.local, projectData.country);
  } catch (e) {
    console.log(e);
  }
}

const getForcastArr = async (lat, long) => {
  //let weatherData = await fetch(`https://api.weatherbit.io/v2.0/forecast/daily?&lat=${lat}&lon=${long}&units=I&key=${weatherBitKey}`);
  try {
    //const wData = await weatherData.json();
    let forcast = [];
    //dummy data so I dont run out of api calls
    forcast = [{
      date: '2023 / 01 / 23',
      high_temp: 40,
      low_temp: 10,
      humidity: 80 + '%',
      wind_speed: 15 + 'MPH',
      wind_gusts: 35 + 'MPH',
      precipitation: 10,
      rainAmt: 22,
      snowAmt: 6,
      iconDesc: { icon: "https://www.weatherbit.io/static/img/icons/d01d.png", description: "light rain" }
    },
    {
      date: '2023 / 01 / 24',
      high_temp: 40,
      low_temp: 10,
      humidity: 80 + '%',
      wind_speed: 15 + 'MPH',
      wind_gusts: 35 + 'MPH',
      precipitation: 10,
      rainAmt: 22,
      snowAmt: 6,
      iconDesc: { icon: "https://www.weatherbit.io/static/img/icons/d01d.png", description: "light rain" }
    },
    {
      date: '2023 / 01 / 24',
      high_temp: 40,
      low_temp: 10,
      humidity: 80 + '%',
      wind_speed: 15 + 'MPH',
      wind_gusts: 35 + 'MPH',
      precipitation: 10,
      rainAmt: 22,
      snowAmt: 6,
      iconDesc: { icon: "https://www.weatherbit.io/static/img/icons/d01d.png", description: "light rain" }
    },
    {
      date: '2023 / 01 / 24',
      high_temp: 40,
      low_temp: 10,
      humidity: 80 + '%',
      wind_speed: 15 + 'MPH',
      wind_gusts: 35 + 'MPH',
      precipitation: 10,
      rainAmt: 22,
      snowAmt: 6,
      iconDesc: { icon: "https://www.weatherbit.io/static/img/icons/d01d.png", description: "light rain" }
    },
    {
      date: '2023 / 01 / 24',
      high_temp: 40,
      low_temp: 10,
      humidity: 80 + '%',
      wind_speed: 15 + 'MPH',
      wind_gusts: 35 + 'MPH',
      precipitation: 10,
      rainAmt: 22,
      snowAmt: 6,
      iconDesc: { icon: "https://www.weatherbit.io/static/img/icons/d01d.png", description: "light rain" }
    },
    {
      date: '2023 / 01 / 24',
      high_temp: 40,
      low_temp: 10,
      humidity: 80 + '%',
      wind_speed: 15 + 'MPH',
      wind_gusts: 35 + 'MPH',
      precipitation: 10,
      rainAmt: 22,
      snowAmt: 6,
      iconDesc: { icon: "https://www.weatherbit.io/static/img/icons/d01d.png", description: "light rain" }
    }, {
      date: '2023 / 01 / 24',
      high_temp: 40,
      low_temp: 10,
      humidity: 80 + '%',
      wind_speed: 15 + 'MPH',
      wind_gusts: 35 + 'MPH',
      precipitation: 10,
      rainAmt: 22,
      snowAmt: 6,
      iconDesc: { icon: "https://www.weatherbit.io/static/img/icons/d01d.png", description: "light rain" }
    }];
    /* wData.data.forEach(element => {
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
    });  */
    projectData.forcast = forcast;
  } catch (e) {
    console.log("error:", e);
  }
}

const getPic = async (local, country) => {
  let picData = await fetch(`https://pixabay.com/api/?key=${pixaBayKey}&image_type=photo&category=places&per_page=3&q=${local +"+"+ country}`);
  try {
    let data = await picData.json();
    console.log("picture data: ", data);
    //projectData.picture = 'https://pixabay.com/get/gfe94ebc07c35911f7b11a9a1a1560f04aec859a78162b4da407752ea0d2943e037574de269906faafa36e7ac7254c4f9_640.jpg';
    if(data.total == 0) {
      console.log("No image for local: using country instead");
      picData = await fetch(`https://pixabay.com/api/?key=${pixaBayKey}&image_type=photo&category=places&per_page=3&q=${local='' + country}`)
      try {
        data = await picData.json();
        projectData.picture = data.hits[0].webformatURL;
      } catch (e) {
        console.log("Nested pic fetch error", e);
      }
    } else {
      console.log("local image found");
      projectData.picture = data.hits[0].webformatURL;
    }

  } catch (e) {
    console.log("error", e);
  }
}