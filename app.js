var express = require('express');
var path = require('path');
var http = require('http');
var url = require('url');

var app = express();
app.set('port', process.env.PORT || 3000);

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

var server = http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + server.address().port);
});

var io = require('socket.io')(server);
require('./app/clients')(io);

var AppState = {
  isAuthenticated: false,
  action: null
};

var login = require('./routes/login')(io, AppState);
app.use('/login', login);

var hint = require('./routes/hint')(io, AppState);
app.use('/hint', hint);

var game = require('./routes/game')(io, AppState, hint);
app.use('/game', game);

var dashboard = require('./routes/dashboard')(io);
app.use('/dashboard', dashboard);

app.all('/control/*', function (req, res, next) {
  login.filterRequest(req, res, next);
});

app.use(express.static(path.join(__dirname, './public')));