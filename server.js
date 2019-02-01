const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var apt = express();

hbs.registerPartials(__dirname + '/views/partials')

apt.set('view engine', 'hbs');

apt.use((req, res, next) => {
  var now = new Date().toString();
  var log = now + ' :' + req.method + req.url
  console.log(log);

  fs.appendFile('server.log', log + '\n', (err) => {
    if(err){
      console.log("Unable to append on the file");
    }
  });

  next();
});

apt.use((req, res, next) => {
  res.render('maintenance.hbs', {
    pageTitle : 'Maintenance Page'
  })
});

apt.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

apt.get('/', (req, res) => {

  res.render('home.hbs', {
    welcomeMessage : 'Welcome to the home page',
    pageTitle : 'Home Page',
  });

});

apt.get('/about', (req, res) =>{

  res.render('about.hbs', {
    pageTitle : 'About Page',
  });

});

apt.get('/bad', (req, res) => {

  res.send({
    errorMessage : 'bad request'
  });

});

apt.listen(3000, () => {
  console.log('Server is up on port 3000');
});
