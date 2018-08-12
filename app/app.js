var express = require('express');
var config = require('../config_vars.json');
var mongoose = require('mongoose');
var http = require('http');
var WebSocket = require('ws');
var locationUpdater = require("./sockets/locationUpdater.js");

// Connect to MongoDB
mongoose.connect(config.mongodb_url, { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('MongoDB connected');
});

var app = express();
app.use(require('./routes/create-profile-route.js'));
app.use(require('./routes/get-profile-route.js'));
app.use(require('./routes/find-route.js'));
app.use(require('./routes/delete-profile-route.js'));
app.use(require('./routes/update-profile-route.js'));
app.set('port', process.env.PORT || config.port);
app.set('appConfig', config);

// initialize a simple http server
const httpServer = http.createServer(app);
const ws = new WebSocket.Server({ server: httpServer });

locationUpdater.setup(ws);

httpServer.listen(app.get('port'), function() {
    console.log("listening on port " + app.get('port'));
});

