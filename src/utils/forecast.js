const request = require('postman-request')

// For Weatherstack
const forecast = (geocode, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=ee73c6202c858238c74d55d84a4abf0f&query=' + geocode.lat + ',' +geocode.long
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather api')
        } else if (response.body.error) {
            callback('Error: ' + response.body.error.code + ', ' + response.body.error.info)
        } else {
            callback(undefined, {
                temperature: response.body.current.temperature,
                feelslike: response.body.current.feelslike
            })
        }
    })
}

module.exports = forecast 