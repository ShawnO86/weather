import { getData } from './getData'
import { countDown } from './countDown';

async function weatherData() {
    const city = document.getElementById('cityName').value;    
    const tripDate = document.getElementById('destDate').value;
    const output = document.getElementById('weatherOutput');
    const forcastHead = document.getElementById('outputHeader');
    const timeOutput = document.getElementById('countDown');
    const outputSection = document.getElementById('outputSection');
    outputSection.classList.remove('hideSection');

    if (!city || !tripDate) {
        alert('Incomplete form!');
    } else {
        try{     
            outputSection.classList.remove('hideSection');
            output.innerHTML = '';
            const data = await getData(`http://localhost:3001/data/${city}`);
            forcastHead.innerHTML = `Your 7-day Forcast for ${data.name}, ${data.local}:`;
            data.forcast.forEach(element => {
                output.innerHTML += `
                <div class='weatherCard'> 
                <header>${element.date} - ${element.iconDesc.description}</header>
                <img src=${element.iconDesc.icon}>
                <p>High: ${element.high_temp}&#8457; -- Low: ${element.low_temp}&#8457;</p>
                <p>Humidity: ${element.humidity}</p>
                <p>Wind speed: ${element.wind_speed} <br> Gusts up to: ${element.wind_gusts}</p>
                </div>`
            });
            timeOutput.innerHTML = `<strong>Days until trip: ${countDown(tripDate)}</strong>`;
            outputSection.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
        } catch(e){
            console.log("error", e);
        }
        }
}

export { weatherData }