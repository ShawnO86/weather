import { getData } from './js/getData'

async function geoData() {
const data = await getData('http://localhost:3001/geoData/rockford');
console.log(`From express server -- Long: ${data.long}, Lat: ${data.lat}, Country: ${data.country}, Local Area: ${data.name}, ${data.local}`)
} 

document.getElementById('sub').addEventListener("click", (e) => {
e.preventDefault()
geoData()
})