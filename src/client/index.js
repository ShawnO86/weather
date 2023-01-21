import { getData } from './js/getData'



const geoData = async () => {
const data = await getData('http://localhost:3001/geoData/myrtlebeach');
console.log(`From express server -- Long: ${data.long}, Lat: ${data.long}, Country: ${data.country}, Local Area: ${data.name}, ${data.local}`)
} 

geoData()