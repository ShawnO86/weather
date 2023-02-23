//import function for GET 
import { getData } from './getData'

//main application - gets data and updates ui with it
async function main() {
    //input fields
    const city = document.getElementById('cityName').value;
    //output fields
    const output = document.getElementById('weatherOutput');
    const outputSection = document.getElementById('outputSection');
    const sourceAtt = document.getElementById('ref');

    //check if inputs are filled in
    if (!city) {
        //if not send alert
        alert('Incomplete form!');
    } else {
        //if so get api data and update output section
        try {
            //remove class that hides output area
            outputSection.classList.remove('hideSection');
            sourceAtt.classList.remove('hideSection');
            //reset output html to blank
            output.innerHTML = '';
            //use getData function to GET projectData from express server based on city input 
            const data = await getData(`http://localhost:3001/data/${city}`);
            //output the city or country image found on pixabay as background
            destInfo.style.backgroundImage = `url(${data.picture})`;
            output.innerHTML = `<h3 class='forcastHead'>Your 7-day forcast for ${data.name}, ${data.local} - ${data.country}</h3>`
            //loop through forcast from express server's projectData object          
            data.forcast.forEach(element => {
                //output weather - each weatherCard div is a different day in 7-day forcast
                output.innerHTML += `
                <div class='weatherCard'> 
                <header>${element.date} - ${element.iconDesc.description}</header>
                <img src=${element.iconDesc.icon} class='icon'>
                <p>High: ${element.high_temp}&#8457; -- Low: ${element.low_temp}&#8457;</p>
                <p>Humidity: ${element.humidity}</p>
                <p>Wind speed: ${element.wind_speed}</p>
                <p>With gusts up to: ${element.wind_gusts}</p>
                </div>`;
            });
            //automatically scroll to the output info after its updated
            outputSection.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
        } catch (e) {
            console.log("error", e);
        }
    }
}

export { main }