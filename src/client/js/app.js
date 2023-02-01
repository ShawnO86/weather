//import function for GET 
import { getData } from './getData'
//import function to countdown from date entered
import { countDown } from './countDown';


//main application - gets data and updates ui with it
async function main() {
    //input fields
    const city = document.getElementById('cityName').value;    
    const tripDate = document.getElementById('destDate').value;
    //output fields
    const output = document.getElementById('weatherOutput');
    const outputHead = document.getElementById('destTxt');
    const forcastHead = document.getElementById('forcastHead');
    const outputSection = document.getElementById('outputSection');
    const picSection = document.getElementById('destPic');
    const destInfo = document.createElement('div');

    //check if inputs are filled in
    if (!city || !tripDate) {
        //if not send alert
        alert('Incomplete form!');
    } else {
        //if so get api data and update output section
        try{     
            //remove class that hides output area
            outputSection.classList.remove('hideSection');
            //reset output html to blank
            output.innerHTML = '';
            //use getData function to GET projectData from express server based on city input 
            const data = await getData(`http://localhost:3001/data/${city}`);
            //wait for projectData for country of entered city and call restcountries.com api 
            const countryData = await getData(`https://restcountries.com/v3.1/name/${data.country}`);
            //getting currency and language objects
            let currency = countryData[0].currencies;
            let language = countryData[0].languages;
            //find the currency and language keys for referencing - because they are unique
            let currencyKey = Object.keys(currency);
            let languageKey = Object.keys(language);
            //output the city and local area or region name
            outputHead.innerHTML = `<strong>Destination info for: <br>${data.name}, ${data.local}.</strong>`;
            //output the city or country image found on pixabay
            picSection.innerHTML = `<img src=${data.picture}>`;
            forcastHead.innerHTML = `<strong>Your 7-day forcast: </strong>`;
            //loop through forcast data from express server projectData object          
            data.forcast.forEach(element => {
                //output weather - each weatherCard div is a different day in 7-day forcast
                output.innerHTML += `
                <div class='weatherCard'> 
                <header>${element.date} - ${element.iconDesc.description}</header>
                <img src=${element.iconDesc.icon}>
                <p>High: ${element.high_temp}&#8457; -- Low: ${element.low_temp}&#8457;</p>
                <p>Humidity: ${element.humidity}</p>
                <p>Wind speed: ${element.wind_speed} <br> Gusts up to: ${element.wind_gusts}</p>
                </div>`;
            });            
            //create and populate destination information card
            outputHead.appendChild(destInfo)
            destInfo.setAttribute('id', 'countDown')
            destInfo.innerHTML = `<ul>
            <li><strong>Days until trip: </strong>${countDown(tripDate)}</li>
            <li><strong>Latitude: </strong>${data.lat} || Longitude: ${data.long}</li>
            <li><strong>Population: </strong>${data.pop.toLocaleString()}</li>
            <li><strong>Country: </strong>${data.country}</li>            
            <li><strong>Capital: </strong>${countryData[0].capital[0]}
            <li><strong>Main language: </strong>${language[languageKey]}     
            <li><strong>Currency: </strong>(${currency[currencyKey].symbol + ') ' + currency[currencyKey].name}
            <li><strong>Flag:</strong></li>
            <li><img src=${countryData[0].flags.png} id="flag">
            </ul>`;
            //automatically scroll to the output info after its updated
            outputHead.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
        } catch(e){
            console.log("error", e);
        }
        }
}

export { main }