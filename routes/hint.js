var express = require('express');
var path = require('path');
var router = express.Router();

var hintDB = require(path.join(__dirname, '../app/hint_db.js')).hintDB;

module.exports = function(socket) {
  socket.on('connect', function(data, from) {
    sendCritical(socket);
  });

  router.get('/:id?', function(req, res) {
    if (req.params.id) {
      console.log('Loading hint ' + req.params.id);
      var result = hintDB;

      result = result.filter(function (item) {
        if (item.id == req.params.id) {
          socket.emit('hint', item);
          res.send(item);
        }
      });
    }
  });

  return router;
};

function sendCritical(socket) {
  console.log('Loading mission critical hints');
  var critical = getCritical();

  for (var i in critical) {
    socket.emit('hint', critical[i]);
    socket.send(critical[i]);
  }
}

function getCritical() {
  var result = hintDB;

  result = result.filter(function (item) {
    return item.critical == true;
  });

  return result;
}