const request = require('request');
const darkSkyKey = process.env.DARK_SKY_API_KEY;

var getWeather = (addr, callback) => {
  request({
    url: `https://api.darksky.net/forecast/${darkSkyKey}/${addr.latitude},${addr.longitude}`,
    json: true
  }, (err, res, body) => {
    if (!err && res.statusCode === 200) {
      callback(undefined, {
        temperature: body.currently.temperature,
        apparentTemperature: body.currently.apparentTemperature
      });
    } else {
      callback('Unable to fetch weather');
    };
  })
};

module.exports = {
  getWeather
}
