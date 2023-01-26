import { getData } from './js/getData'
import './styles/main.scss'

let tripData = {};

async function geoData() {
    let city = document.getElementById('cityName').value;
    if (!city) {
        alert('Must enter a destination.')
    } else {
        const data = await getData(`http://localhost:3001/data/${city}`);
        console.log(`From express server -- Long: ${data.long}, Lat: ${data.lat}, Country: ${data.country}, Local Area: ${data.name}, ${data.local} High Temp: ${data.highTemp}`)

    }
}

let output = document.getElementById('output');

document.getElementById('sub').addEventListener("click", (e) => {
    e.preventDefault()
    geoData()
})