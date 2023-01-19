var path = require('path');
const express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
const dotenv = require('dotenv');
//to use fetch
const fetch = (...args) =>
	import('node-fetch').then(({default: fetch}) => fetch(...args));

const app = express();

app.use(cors());
// to use json
app.use(bodyParser.json());
// to use url encoded values
app.use(bodyParser.urlencoded({
  extended: true
}));

dotenv.config();
const apiKey = process.env.API_KEY;
//API_KEY must be defined in project root within .env file!

app.use(express.static('dist'));

let projectData = {};

app.get('/', function (req, res) {
    res.sendFile('dist/index.html');
});

app.listen(3000, function () {
    console.log('App listening on port 3000!');
});