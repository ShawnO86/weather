//switches styles based on local time of day.
function timeSwitch() {
    const formSection = document.getElementById('formSection');
    const outputSection = document.getElementById('outputSection')
    const timeGreeting = document.getElementById('time');
    //get current time
    const date = new Date();
    let now = date.getHours();
    if(now >= 5 && now <= 11) {
        formSection.classList.add('day')
        outputSection.classList.add('day')
        timeGreeting.innerText = "Good morning, ";
    } else if(now >= 12 && now <= 16) {
        formSection.classList.add('day')
        outputSection.classList.add('day')
        timeGreeting.innerText = "Good afternoon, ";
    } else {
        formSection.classList.add('night')
        outputSection.classList.add('night')
        timeGreeting.innerText = "Good evening, ";
    }
}

export {timeSwitch}