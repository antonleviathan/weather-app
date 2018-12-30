const request = require('request');
require('dotenv').load();

const apiKey = process.env.GEOCODE_API_KEY
const addr = "1600+Amphitheatre+Parkway,+Mountain+View,+CA"

request({
  url: `https://maps.googleapis.com/maps/api/geocode/json?address=${addr}&key=${apiKey}&sensor=true`,
  json: true
}, (err, res, body) => {
  console.log(body);
})
