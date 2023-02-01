//call this function with the GET url as an argument
const getData = async (url = '') => {
    //calls argument url and waits for data/status
    const req = await fetch(url);
    try {
        //return api data in JSON
        const data = await req.json()
        return data
    } catch (e) {
        console.log("error", e)
    }
};

export { getData }