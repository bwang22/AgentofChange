'use strict';

const express = require('express'),
http = require('http'),
path = require('path'),
fs = require('fs'),
RateLimit = require('express-rate-limit'),
compression = require('compression'),
requireHTTPS = require('./modules/https'),
callbackModule = require('./modules/callback'),
app = express(),
Promise = require('bluebird'),
server = http.createServer(app),
mongoCrud = require('./modules/mongooseCrud'),
io = require('socket.io')(server);

let config = fs.readFileSync('./app_config.json', 'utf8');
config = JSON.parse(config);
require('dotenv').config();
let host = process.env.HOST;

mongoCrud.createProfile();
mongoCrud.findProfile("String").then(function(profile1){
  console.log(profile1);
  if(profile1 !== undefined){
    profile1.name = "1234";
    mongoCrud.updateProfile(profile1.id, profile1)
    .then(x => mongoCrud.deleteProfile(x.id));  
  }
});

if(process.env.NODE_ENV === "development")
  host = config.LOCALHOST;
//app.use(requireHTTPS.requireHTTPS);

let limiter = new RateLimit({
  windowMs: 5*60*1000, // 5 minutes
  max: 200, // limit each IP to 100 requests per windowMs
  delayMs: 0 // disable delaying - full speed until the max limit is reached
});

//  apply to all requests
app.use(limiter);
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.set('json spaces', 2);
app.use(express.favicon(path.join(__dirname,'public','ico','logo_dvO_icon.ico')));
app.use(express.logger('dev'));
app.use(express.methodOverride());
app.use(compression());
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));
app.use(app.router);
app.locals.theme = process.env.THEME; //Make the THEME environment variable available to the app.

////////////////////Routes//////////////////////
app.get('/', (req, res) => res.render('index', { appTitle: 'A New Startup: Sign Up Today!'}));
app.get('/landing', (req, res) => res.render('landing', { appTitle: 'A New Startup: Sign Up Today!'}));
app.get('/galacticmass', (req, res) => res.render('galacticmass', { appTitle: 'A New Startup: Sign Up Today!'}));
app.get('/referral', (req, res) => res.render('referral', { appTitle: 'A New Startup: Sign Up Today!'}));
app.get('/callback', (req, res) => res.render('callback', { callback: req.body}));
app.get('/socket', function(req, res,next) {
    res.sendfile(__dirname + '/public/html/socketExample.html');
});
////////////////////Routes//////////////////////

// Send current time to all connected clients
function sendTime() {
    io.emit('time', { time: new Date().toJSON() });
}

// Send current time every 10 secs
setInterval(sendTime, 10000);

// Emit welcome message on connection
io.on('connection', function(socket) {
    // Use socket to communicate with this particular client only, sending it it's own id
    socket.emit('welcome', { message: 'Welcome!', id: socket.id });

    socket.on('i am client', console.log);
});
server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
