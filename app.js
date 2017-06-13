var application_root = __dirname;
var express = require('express');
var vhost = require( 'vhost' );
var https = require('https');
var http = require('http');
var fs = require('fs');
var forceSSL = require('express-force-ssl');
//do something
var app = express();
var credentials = {};

var config = require('./config.json')[process.env.NODE_ENV || 'dev'];

function ensureSecure(req, res, next){
  if(req.secure){
    // OK, continue
    return next();
  };
  // handle port numbers if you need non defaults
  // res.redirect('https://' + req.host + req.url); // express 3.x
  console.log('received',req.hostname,req.url);
  res.redirect('https://' + req.hostname + req.url); // express 4.x
};

app.all('*', ensureSecure); // at top of routing calls

//Use the virtual hosts
app.use(vhost('alefbetquiz.com',express.static(__dirname + '/alefbetquiz.com')));
app.use(vhost('kaleidoscope.wtf',express.static(__dirname + '/kaleidoscope.wtf')));
app.use(vhost('geoguide.me',express.static(__dirname + '/geoguide.me')));


app.get('/', function (req, res) {
  res.send('Hello ya jerk!')
});

var httpServer = http.createServer(app);
if(config.name == "prod"){
	/*var options = {
	     key: fs.readFileSync('/etc/letsencrypt/live/kaleidoscope.wtf/privkey.pem'),
	     cert: fs.readFileSync('/etc/letsencrypt/live/kaleidoscope.wtf/fullchain.pem'),
	     ca: fs.readFileSync('/etc/letsencrypt/live/kaleidoscope.wtf/chain.pem')
	}*/
	console.log('starting on 443');
	//var httpsServer = https.createServer(options, app);
	//httpsServer.listen(443);
	app.listen(80, function(){
		console.log('fucking');
	});
	//app.use(forceSSL);
}

console.log('['+config.name+'] starting on port',config.port);
httpServer.listen(config.port);
