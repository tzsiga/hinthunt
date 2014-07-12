var express = require('express');
var path = require('path');
var http = require('http');
var url = require('url');

var app = express();
app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, 'public')));

var server = http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});

var io = require('socket.io')(server);

var hint = require('./routes/hint')(io);
app.use('/hint', hint);

var chat = require('./routes/chat')(io);