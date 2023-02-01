//main app
import { main } from './js/app'
//main stylesheet
import './styles/main.scss'

//form submit button
document.getElementById('sub').addEventListener("click", (e) => {
    //prevent refresh of page
    e.preventDefault();
    //call main app
    main();
});