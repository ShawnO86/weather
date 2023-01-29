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
    const timeOutput = document.createElement('div');
    outputSection.classList.remove('hideSection');

    if (!city || !tripDate) {
        alert('Incomplete form!');
    } else {
        try{     
            outputSection.classList.remove('hideSection');
            output.innerHTML = '';
            const data = await getData(`http://localhost:3001/data/${city}`);
            outputHead.innerHTML = `<strong>Destination: ${data.name}, ${data.country}:</strong>`;
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
            outputHead.appendChild(timeOutput)
            timeOutput.setAttribute('id', 'countDown')
            timeOutput.innerHTML = `Days until trip: ${countDown(tripDate)}`;
            outputHead.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
        } catch(e){
            console.log("error", e);
        }
        }
}

export { tripData }