import { getData } from './js/getData'



const geoData = async () => {
const data = await getData('http://localhost:3001/geoData');
console.log(`From express server -- Long: ${data.long}, Lat: ${data.long}, Country: ${data.country}`)
} 

geoData()