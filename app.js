const request = require('request');
require('dotenv').load();

const apiKey = process.env.GEOCODE_API_KEY
console.log(apiKey);

request({
  url: `https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=${apiKey}&sensor=true`,
  json: true
}, (err, res, body) => {
  console.log(body);
})
