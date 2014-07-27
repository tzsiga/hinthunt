var express = require('express');
var path = require('path');
var router = express.Router();

var hintDB = require(path.join(__dirname, '../app/hint_db.js')).hintDB;

var triggered = [];

function isTriggered(hint) {
  for (var i in triggered) {
    if (triggered[i] == hint)
      return true;
  }

  return false;
}

function setHintTimeout(io, item) {
  setTimeout(function () {
    io.emit('hint-show', item);
    console.log('Timed out [' + item.title + ', ' + item.timeout + ']');
  }, item.timeout);
}

module.exports = function (io) {
  io.on('connect', function (socket) {
    var critical = hintDB;

    critical = critical.filter(function (item) {
      return item.critical == true;
    });

    for (var i in critical) {
      var item = critical[i];

      if (isTriggered(item)) {
        console.log('Already triggered: [' + item.title + '] - skipping!');
      } else {
        triggered.push(item);

        io.emit('hint-emit', item);
        io.send(item);

        setHintTimeout(io, item);
        console.log('Mission critical timer started [' + item.title + ', ' + item.timeout + ']');
      }
    }
  });

  io.on('connection', function (socket) {
    socket.on('hint-show', function (hint) {
      io.emit('hint-show', hint);
    });
  });

  router.get('/:id?', function (req, res) {
    if (req.params.id) {
      var result = hintDB;

      result = result.filter(function (item) {
        if (item.id == req.params.id) {
          //res.setHeader('Content-Type', 'text/html');
          res.send(item);
        }
      });
    }
  });

  router.get('/emit/:id?', function (req, res) {
    if (req.params.id) {
      var result = hintDB;

      result = result.filter(function (item) {
        if (item.id == req.params.id) {
          if (isTriggered(item)) {
            console.log('Already triggered: [' + item.title + '] - skipping!');
            res.send(200);
          } else {
            triggered.push(item);

            io.emit('hint-emit', item);
            res.send(item);

            setHintTimeout(io, item);
            console.log('Timer started [' + item.title + ', ' + item.timeout + ']');
          }
        }
      });
    }
  });

  router.get('/show/:id?', function (req, res) {
    if (req.params.id) {
      var result = hintDB;

      result = result.filter(function (item) {
        if (item.id == req.params.id) {
          io.emit('hint-show', item);
          res.send(item);
        }
      });
    }
  });

  return router;
};