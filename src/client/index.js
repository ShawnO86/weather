import { weatherData } from './js/weather'
import './styles/main.scss'

document.getElementById('sub').addEventListener("click", (e) => {
    e.preventDefault()
    weatherData()
})