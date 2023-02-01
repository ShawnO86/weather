import '../index.js';

describe('API Keys', () => {
    test('Is defined', () => {
        const geoKey = process.env.geonames_key;
        const weatherBitKey = process.env.weatherbit_key;
        const pixaBayKey = process.env.pixabay_key;

        expect(geoKey).toBeDefined();
        expect(weatherBitKey).toBeDefined();
        expect(pixaBayKey).toBeDefined();
    })        
})