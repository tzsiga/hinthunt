var express = require('express');
var path = require('path');
var http = require('http');
var url = require('url');

var app = express();
app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, 'public')));

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

var server = http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + server.address().port);
});

var io = require('socket.io')(server);
var clients = require('./app/clients')(io);

var login = require('./routes/login')(io);
app.use('/control', login);

var hint = require('./routes/hint')(io);
app.use('/hint', hint);

var dashboard = require('./routes/dashboard')(io);
app.use('/dashboard', dashboard);