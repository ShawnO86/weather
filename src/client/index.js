import { getData } from './js/getData'
import './styles/main.scss'

async function geoData() {
let city = document.getElementById('cityName').value;
if(!city) {
    alert('Must enter a destination.')
} else {
    const data = await getData(`http://localhost:3001/geoData/${city}`);
    console.log(`From express server -- Long: ${data.long}, Lat: ${data.lat}, Country: ${data.country}, Local Area: ${data.name}, ${data.local}`)
}
} 

document.getElementById('sub').addEventListener("click", (e) => {
e.preventDefault()
geoData()
})