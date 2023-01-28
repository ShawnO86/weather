
function countDown(date) {
    let now = new Date().getTime();
    let tripDate = new Date(date).getTime();
    let total = tripDate - now;
    let hours = Math.floor((total % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let days = Math.floor(total/(1000*60*60*24));
    return days + ' day(s) and ' + hours + ' hour(s).';
}

export {countDown}