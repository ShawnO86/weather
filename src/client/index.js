import { tripData } from './js/tripData'
import './styles/main.scss'

document.getElementById('sub').addEventListener("click", (e) => {
    e.preventDefault()
    tripData()
})