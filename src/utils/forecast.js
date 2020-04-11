const request = require("request")

const forecast = (latitude, logitude, callback) => {
    const url = 'https://api.darksky.net/forecast/3f18f065901d6b1764b9f5fdc506356c/'+latitude+','+logitude+'?unit=us'

    request({ url, json: true }, (error, resp) => {
        if(error) {
            callback('Unable to connect', undefined)
        } else if(resp.body.error) {
            callback('Unable to get location', undefined)
        } else {
            const data = resp.body.currently
            callback(undefined, "It is currently "+data.temperature+" degree with "+data.precipProbability+"% chance of rain")
        }
    })
}

module.exports = forecast

