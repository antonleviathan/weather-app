const request = require('request');
const apiKey = process.env.GEOCODE_API_KEY

var geocodeAddress = (addr, callback) => {
  request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${addr}&key=${apiKey}&sensor=true`,
    json: true
  }, (err, res, body) => {
    if (err) {
      callback('Unable to complete API request');
    } else if (body.status === 'ZERO_RESULTS') {
      callback('Unable to find address');
    } else if (body.status === 'OK'){
      callback(undefined, {
        address: body.results[0].formatted_address,
        latitude: body.results[0].geometry.location.lat,
        longitude: body.results[0].geometry.location.lng
      })
    }
  })
}

module.exports = {
  geocodeAddress
}
