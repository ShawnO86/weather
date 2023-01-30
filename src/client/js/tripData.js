import { getData } from './getData'
import { countDown } from './countDown';

async function tripData() {
    const city = document.getElementById('cityName').value;    
    const tripDate = document.getElementById('destDate').value;
    const output = document.getElementById('weatherOutput');
    const outputHead = document.getElementById('destTxt');
    const forcastHead = document.getElementById('forcastHead');
    const outputSection = document.getElementById('outputSection');
    const picSection = document.getElementById('destPic');
    const destInfo = document.createElement('div');
    outputSection.classList.remove('hideSection');

    if (!city || !tripDate) {
        alert('Incomplete form!');
    } else {
        try{     
            outputSection.classList.remove('hideSection');
            output.innerHTML = '';
            const data = await getData(`http://localhost:3001/data/${city}`);
            const countryData = await getData(`https://restcountries.com/v3.1/name/${data.country}`)
            let currency = countryData[0].currencies;
            let currencyKey = Object.keys(currency);

            console.log(currency[currencyKey].name)
            outputHead.innerHTML = `<strong>Destination info for: <br>${data.name}, ${data.local}.</strong>`;
            picSection.innerHTML = `<img src=${data.picture}>`;
            data.forcast.forEach(element => {
                output.innerHTML += `
                <div class='weatherCard'> 
                <header>${element.date} - ${element.iconDesc.description}</header>
                <img src=${element.iconDesc.icon}>
                <p>High: ${element.high_temp}&#8457; -- Low: ${element.low_temp}&#8457;</p>
                <p>Humidity: ${element.humidity}</p>
                <p>Wind speed: ${element.wind_speed} <br> Gusts up to: ${element.wind_gusts}</p>
                </div>`;
            });            
            forcastHead.innerHTML = `<strong>Your 7-day forcast: </strong>`;
            outputHead.appendChild(destInfo)
            destInfo.setAttribute('id', 'countDown')
            destInfo.innerHTML = `<ul>
            <li><strong>Days until trip: </strong>${countDown(tripDate)}</li>
            <li><strong>Latitude: </strong>${data.lat} || Longitude: ${data.long}</li>
            <li><strong>Population: </strong>${data.pop.toLocaleString()}</li>
            <li><strong>Country: </strong>${data.country}</li>            
            <li><strong>Capital: </strong>${countryData[0].capital[0]}            
            <li><strong>Currency: </strong>(${currency[currencyKey].symbol + ') ' + currency[currencyKey].name}
            <li><strong>Flag:</strong></li>
            <li><img src=${countryData[0].flags.png} id="flag">
            </ul>`;
            outputHead.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
        } catch(e){
            console.log("error", e);
        }
        }
}

export { tripData }