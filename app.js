const yargs = require('yargs');
const axios = require('axios');
const weather = require('./weather/weather');
const geocode = require('./geocode/geocode');

const darksky_api = '362b7a89e4821b5024d893a596c17c1e';

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'address to fetch weather for',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

var encodedAddress = encodeURIComponent(argv.address);
var geoUrl = `http://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;
axios.get(geoUrl).then((response) => {
  if (response.data.status === 'ZERO_RESULTS') {
    throw new Error('Unable to find address');
  }
  var formatted_address =  response.data.results[0].formatted_address;
  var lat = response.data.results[0].geometry.location.lat;
  var lng = response.data.results[0].geometry.location.lng;
  var weatherUrl = `https://api.darksky.net/forecast/${darksky_api}/${lat},${lng}`;
  console.log(`Getting weather forecast for: ${formatted_address}`);
  return axios.get(weatherUrl);
}).then((response) => {
  var forecast = response.data
  var summary = forecast.hourly.summary;
  var current_temp = `${forecast.currently.temperature} Fahrenheit`;
  var apparent_temp = `${forecast.currently.apparentTemperature} Fahrenheit`;
  console.log(`Summary: ${summary}\nCurrent Temperature: ${current_temp}\nApparent Temperature: ${apparent_temp}`);
}).catch((e) => {
  if (e.code === 'ENOTFOUND') {
    console.log('Unable to connect to api servers');
  }else{
    console.log(e.message);
  }
});
