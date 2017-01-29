var express = require('express');
var app = express();
var vhost = require( 'vhost' );

function createVirtualHost(domainName, dirPath) {
    return vhost(domainName, express.static( dirPath ));
}

var stoopitHost = createVirtualHost("kaleidoscope.wtf", "kaleidoscope.wtf");
var alefbetHost = createVirtualHost("alefbetquiz.com", "alefbetquiz.com");

//Use the virtual hosts
app.use(stoopitHost);
app.use(alefbetHost);

app.get('/', function (req, res) {
  res.send('Hello ya jerk!')
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})