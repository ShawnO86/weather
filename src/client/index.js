import { getData } from './js/getData'
import './styles/main.scss'


const currentDate = new Date();
//const countDown = Math.floor(tripDate - currentDate) / 100000

function countDown(date) {
    let total = Date.parse(date) - Date.parse(new Date());
    let days = Math.floor(total/(1000*60*60*24) + 1);
    return days;
}

async function weatherData() {
    let city = document.getElementById('cityName').value;
    let output = document.getElementById('output');
    if (!city) {
        alert('Must enter a destination.')
    } else {
        try{
            const data = await getData(`http://localhost:3001/data/${city}`);
            data.forcast.forEach(element => {
                output.innerHTML += `
                <div class='weatherCard'> 
                <h3>7-day forcast:</h3>
                ${element.date} - ${element.iconDesc.description}
                <img src=${element.iconDesc.icon}>
                <p>High: ${element.high_temp}&#8457; -- Low: ${element.low_temp}&#8457;</p>
                <p>Humidity: ${element.humidity}</p>
                <p>Wind speed: ${element.wind_speed} -- Gusts up to: ${element.wind_gusts}</p>
                <p>Time till trip: ${tripDate - element.date}</p>
                </div>`
                console.log(element)
            });
        } catch(e){
            console.log("error", e);
        }
        }

}

document.getElementById('sub').addEventListener("click", (e) => {
    e.preventDefault()
    const tripDate = document.getElementById('destDate').value;
    const timeOutput = document.getElementById('countDown');
    timeOutput.innerHTML = `<strong>Days till trip: ${countDown(tripDate)}</strong>`;
    //weatherData()
})