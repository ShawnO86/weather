//main app
import { main } from './js/app'
//function to switch styles (light/dark) based on time of day
import { timeSwitch } from './js/timeSwitch';
//main stylesheet
import './styles/main.scss'

//check time of day and switch style 
timeSwitch();
//form submit button
document.getElementById('sub').addEventListener("click", (e) => {
    //prevent refresh of page
    e.preventDefault();
    //call main app
    main();
});