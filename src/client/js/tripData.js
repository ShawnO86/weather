import { getData } from './getData'
import { countDown } from './countDown';

async function tripData() {
    const city = document.getElementById('cityName').value;    
    const tripDate = document.getElementById('destDate').value;
    const output = document.getElementById('weatherOutput');
    const outputHead = document.getElementById('outputHeader');
    const forcastHead = document.getElementById('forcastHead');
    const timeOutput = document.getElementById('countDown');
    const outputSection = document.getElementById('outputSection');
    const picSection = document.getElementById('picInfo');
    outputSection.classList.remove('hideSection');

    if (!city || !tripDate) {
        alert('Incomplete form!');
    } else {
        try{     
            outputSection.classList.remove('hideSection');
            output.innerHTML = '';
            const data = await getData(`http://localhost:3001/data/${city}`);
            outputHead.innerHTML = `Destination: ${data.name}, ${data.local}:`;
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
            timeOutput.innerHTML = `<strong>Days until trip: ${countDown(tripDate)}</strong>`;
            outputHead.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
        } catch(e){
            console.log("error", e);
        }
        }
}

export { tripData }