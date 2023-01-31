import '../index.js';

describe('API Keys', () => {
    test('Is defined', () => {
        const geoKey = process.env.geonames_key;
        const weatherBitKey = process.env.weatherbit_key;
        const pixaBayKey = process.env.pixabay_key;

        expect(geoKey).toBe('shawnby222');
        expect(weatherBitKey).toBe('1b51ffeb27f54fc19416a57d3956964e');
        expect(pixaBayKey).toBe('33194170-525cfb83223931b233bdc9fea');
    })        
})