require('dotenv').load();
const apiKey = process.env.GEOCODE_API_KEY
const darkSkyKey = process.env.DARK_SKY_API_KEY;
const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: 'true'
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

var encodedAddr = encodeURIComponent(argv.address);
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddr}&key=${apiKey}&sensor=true`

axios.get(geocodeUrl).then((res) => {
  if (res.data.status === 'ZERO_RESULTS') {
    throw new Error('Unable to find that address.')
  }
  var lat = res.data.results[0].geometry.location.lat;
  var lng = res.data.results[0].geometry.location.lng;

  var weatherUrl = `https://api.darksky.net/forecast/${darkSkyKey}/${lat},${lng}`
  console.log(res.data.results[0].formatted_address);
  return axios.get(weatherUrl);
}).then((res) => {
  var temp = res.data.currently.temperature;
  var appTemp = res.data.currently.apparentTemperature;
  console.log(`It's ${temp} and feels like ${appTemp}`);
}).catch((e) => {
  if (e.code === 'ENOTFOUND') {
    console.log('Could not connect to API server.');
  } else {
    console.log(e.message);
  }
})
