require('dotenv').load();
const yargs = require('yargs');
const geocode = require('./geocode/geocode')

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

const encodedAddr = encodeURIComponent(argv.address);

geocode.geocodeAddress(encodedAddr, (err, res) => {
  if (err) {
    console.log(err);
  } else {
    console.log(JSON.stringify(res, undefined, 2));
  }
});
