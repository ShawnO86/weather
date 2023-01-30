import { main } from './js/app'
import './styles/main.scss'
import './styles/form.scss'
import './styles/output.scss'

document.getElementById('sub').addEventListener("click", (e) => {
    e.preventDefault();
    main();
});