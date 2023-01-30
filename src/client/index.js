import { main } from './js/app'
import './styles/main.scss'


document.getElementById('sub').addEventListener("click", (e) => {
    e.preventDefault();
    main();
});