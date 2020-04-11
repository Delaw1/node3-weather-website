const request = require("request")

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiZmxvbTk2IiwiYSI6ImNrM3hrajlnczByNWYzanA3ODgxOWhwb2MifQ.jSq1FS7pxDaoJs4FSyZmbw'
    request({ url, json: true}, (error, resp) => {
        if(error) {
            callback('Unable to connect', undefined)
            return
        } else if(resp.message) {
            callback("Unable to get latitude", undefined)
            return
        } 
        const latitude = resp.body.features[0].center[1]
        const longitude = resp.body.features[0].center[0]
        callback(undefined, {
            latitude,
            longitude,
            location: resp.body.features[0].place_name
        })
        
    })
}

module.exports = geocode