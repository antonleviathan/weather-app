const request = require('request');
const apiKey = process.env.GEOCODE_API_KEY

var geocodeAddress = (addr) => {
  request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${addr}&key=${apiKey}&sensor=true`,
    json: true
  }, (err, res, body) => {
    if (err) {
      console.log('Unable to complete API request')
    } else if (body.status === 'ZERO_RESULTS') {
      console.log('Unable to find address')
    } else if (body.status === 'OK'){
      console.log("Address:", JSON.stringify(body.results[0].formatted_address))
      console.log("Latitude:", JSON.stringify(body.results[0].geometry.location.lat));
      console.log("Longitude:", JSON.stringify(body.results[0].geometry.location.lng));
    }
  })
}

module.exports = {
  geocodeAddress
}
