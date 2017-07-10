const yargs = require('yargs');
const weather = require('./weather/weather');
const geocode = require('./geocode/geocode');

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

geocode.geocodeAddress(encodeURIComponent(argv.address), (geoError, geoResult) => {
  if (geoError) {
    console.log(geoError);
  } else {
    weather.getWeather(geoResult, (weatherError, weatherResult) => {
      if (weatherError) {
        console.log(weatherError);
      }else{
        console.log(JSON.stringify(weatherResult, undefined, 2));
      }
    });
  }
});
