const request = require("postman-request");

const forecast = (lat, long, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=c367e2c136052a54fa7b03666337d666&query=${lat},${long}`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to Weather Service!!!", undefined);
    } else if (body.error) {
      callback("Unable to find Location!!!", undefined);
    } else {
      callback(
        undefined,
        `It is ${body.current.weather_descriptions[0]} today .It is ${body.current.temperature} degress today. It feels like ${body.current.feelslike} degress out!!!`
      );
    }
  });
};

module.exports = forecast;
