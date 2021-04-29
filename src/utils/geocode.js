const request = require('postman-request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoia3JhdG9ic2siLCJhIjoiY2tuZzhodTlnMm4yejJydGFzcnJ6ZG1pOSJ9.DaR10XD0CPQDolYHeTQreA&limit=1'
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to location service', {})
        } else if(!response.body.features) {
            callback('Error found: ' + response.body.message, {})
        } else if(response.body.features.length < 1) {
            callback('Error found: Failed to get the geocode by specified location', {})
        } else {
            callback(undefined, { 
                lat: response.body.features[0]?.geometry.coordinates[1], 
                long: response.body.features[0]?.geometry.coordinates[0],
                location: response.body.features[0]?.place_name
            })
        }
    })
}

module.exports = geocode