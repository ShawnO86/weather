const getData = async (url = '') => {
    const req = await fetch(url);
    try {
        const data = await req.json()
        console.log("GET data:", data)
        return data
    } catch (e) {
        console.log("error", e)
    }
};

export { getData }