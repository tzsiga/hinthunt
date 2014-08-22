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
  action: null,
  game: null
};

var login = require('./routes/login')(io, AppState);
app.use('/login', login);

app.all('/control/*', function (req, res, next) {
  login.filterRequest(req, res, next);
});

app.post('/control/startSession', function (req, res, next) {
  console.log(req.body);

  AppState.action = req.body.action;
  AppState.language = req.body.language;

  res.send(AppState);
});

var hint = require('./routes/hint')(io, AppState);
app.use('/hint', hint);

var dashboard = require('./routes/dashboard')(io);
app.use('/dashboard', dashboard);

app.use(express.static(path.join(__dirname, './public')));