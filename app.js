var application_root = __dirname;
var express = require('express');
var vhost = require( 'vhost' );

var app = express();

var config = require('./config.json')[process.env.NODE_ENV || 'dev'];

function createVirtualHost(domainName, dirPath) {
    return vhost(domainName, express.static( dirPath ));
}

var stoopitHost = createVirtualHost("kaleidoscope.wtf", "kaleidoscope.wtf");
var alefbetHost = createVirtualHost("alefbetquiz.com", "alefbetquiz.com");

//Use the virtual hosts
app.use(stoopitHost);
app.use(alefbetHost,express.static(__dirname + '/alefbetquiz.com'));

app.get('/', function (req, res) {
  res.send('Hello ya jerk!')
})

app.listen(config.port, function () {
  console.log('Example app listening on port '+config.port+'!')
})