const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');

const app = express();
const port = process.env.PORT || 3000;

const publicDirectory = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
app.set('view engine', 'hbs');

app.use(express.static(publicDirectory));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Naval Bihani',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me: ',
    name: 'Naval Bihani',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Do you need any Help:  ',
    name: 'Naval Bihani',
    contact: 'You can contact me on: naval@gmail.com',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must have to Provide Address!!!!',
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({
          error,
        });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({
            error,
          });
        }
        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get('/help/*', (req, res) => {
  res.render('error', {
    title: 'Something Went Wrong!!!',
    message: 'Help Article Not Found!!!',
    name: 'Naval Bihani',
  });
});

app.get('*', (req, res) => {
  res.render('error', {
    title: 'Something Went Wrong!!!',
    message: 'Page Not Found!!!',
    name: 'Naval Bihani',
  });
});

app.listen(port, () => {
  console.log(`Server is starting up at port ${port}`);
});
