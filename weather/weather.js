const request = require('request');
const darksky_api = '362b7a89e4821b5024d893a596c17c1e';

var getWeather = (geolocation, callback) => {
  request({
    url: `https://api.darksky.net/forecast/${darksky_api}/${geolocation.latitude},${geolocation.longhitude}`,
    json: true
  }, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      callback(undefined, {
        location: geolocation.address,
        latitude: geolocation.latitude,
        longhitude: geolocation.longhitude,
        weather: body.currently.summary,
        temperature: body.currently.temperature
      });
    }else {
      callback('Unable to connect to darksky api');
    }
  });
}

module.exports = {
  getWeather
};
