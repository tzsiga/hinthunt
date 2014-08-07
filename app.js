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

var client = require('./routes/clients')(io);

var hint = require('./routes/hint')(io);
app.use('/hint', hint);

var dash = require('./routes/dash')(io);
app.use('/dash', dash);


var bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10);

app.post('/control/login.html', function(req, res) {
  var hash = bcrypt.hashSync(req.body['given-password'], salt);

  res.json({
    given: req.body['given-password'],
    hashed: hash
  });
});
