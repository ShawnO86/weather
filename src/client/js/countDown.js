//returns days and hours until entered date
function countDown(date) {
    //get current time
    let now = new Date().getTime();
    //set trip date from functions argument
    let tripDate = new Date(date).getTime();
    //subtract current time from trip time and get amount of time (in milliseconds) till trip day
    let total = tripDate - now;
    //reduce milliseconds to hours 
    let hours = Math.floor((total % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    //reduce milliseconds to days
    let days = Math.floor(total/(1000*60*60*24));
    return days + ' day(s) and ' + hours + ' hour(s)';
}

export {countDown}