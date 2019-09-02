import request from 'request';

export const forecast = (
    lat: number,
    lon: number,
    callback: (error: any, data: any) => void,
): void => {
    const url = `https://api.darksky.net/forecast/d512b9fe6dec03b2be0d9f5b2f41c276/${lat},${lon}`;
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to find your provided location. Try again.', undefined);
        } else if (body.error) {
            callback('Unable to find a forecast for your provided location. Try again.', undefined);
        } else {
            const data = body.currently;
            const weather = `Today the temperature is ${
                data.temperature
            } degrees. The chance of precipitation is ${data.precipProbability * 100}%.`;
            callback(undefined, data);
        }
    });
};
