//import function for GET 
import { getData } from './getData'

//main application - gets data and updates ui with it
async function main() {
    //input fields
    const city = document.getElementById('cityName').value;
    //output fields
    const output = document.getElementById('weatherOutput');
    const outputSection = document.getElementById('outputSection');
    const outputHead = document.getElementById('weatherHead');
    const sourceAtt = document.getElementById('ref');
    const destInfo = document.getElementById('destInfo');


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
            //for development
            const data = await getData(`http://localhost:3001/data/${city}`);
            //for production
            //const data = await getData(`https://weather-app-l8kk.onrender.com/data/${city}`);
            let background = data.picture;
            //output the city or country image found on pixabay as background
            if (outputSection.classList.contains('day')) {
                destInfo.style.backgroundImage = `linear-gradient(rgba(255, 255, 255, 0.75), rgba(255, 255, 255, 0.65)),url(${background})`;
            } else {
                destInfo.style.backgroundImage = `linear-gradient(rgba(51, 51, 51, 0.95), rgba(51, 51, 51, 0.75)),url(${background})`;
            }
            outputHead.innerText = `Your 7-day forcast for ${data.name}, ${data.local} - ${data.country}`
            if (data.forcast.length = 1) {
                output.innerText = "Status message: " + data.forcast[0];
            } else {
                //loop through forcast from express server's projectData object          
                data.forcast.forEach(element => {
                    //output weather - each weatherCard div is a different day in 7-day forcast
                    output.innerHTML += `
                        <div class='weatherCard'> 
                        <h4><strong>${element.date}</strong></h4>
                        <img src=${element.iconDesc.icon} class='icon'>
                        <p><strong>${element.iconDesc.description}</strong></p>
                        <p>High: ${element.high_temp}&#8457; -- Low: ${element.low_temp}&#8457;</p>
                        <p>Humidity: ${element.humidity}</p>
                        <p>Wind speed: ${element.wind_speed}</p>
                        <p>Up to: ${element.wind_gusts}</p>
                        </div>`;
                });
            }

            //automatically scroll to the output info after its updated
            outputSection.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
        } catch (e) {
            console.log("error", e);
        }
    }
}

export { main }