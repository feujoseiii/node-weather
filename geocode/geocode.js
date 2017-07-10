const request = require('request');

var geocodeAddress = (address, callback) => {
  request({
    url: `http://maps.googleapis.com/maps/api/geocode/json?address=${address}`,
    json: true
  }, (error, response, body) => {
    if (error) {
      callback('unable to connect to google servers');
    } else if (body.status === 'INVALID_REQUEST') {
      callback('Invalid request');
    } else if (body.status === 'ZERO_RESULTS') {
      callback('Address specified could not be found');
    } else if (body.status === 'OK') {
      callback(undefined, {
        address: body.results[0].formatted_address,
        latitude: body.results[0].geometry.location.lat,
        longhitude: body.results[0].geometry.location.lng
      });
    }
  });
};

module.exports = {
  geocodeAddress
};
