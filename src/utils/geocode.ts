import request from 'request';

export const geocode = (address: string, callback: (error: any, data: any) => void): void => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoibmFub21vZmZldCIsImEiOiJjazAxbjRvankwbDd1M21scWxwdHc2NjRkIn0.i58E2sm2JvBxxX0-b6u3iQ&limit=1`;

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to geo services', undefined);
        } else if (body.message || body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined);
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name,
            });
        }
    });
};
