var express = require('express');
var path = require('path');
var router = express.Router();

var hintDB = require(path.join(__dirname, '../app/hint_db.js')).hintDB;

var clients = [];
var triggeredHints = [];

function isTriggered(hint) {
  for (var i in triggeredHints) {
    if (triggeredHints[i] == hint)
      return true;
  }

  return false;
}

function setHintTimeout(io, item) {
  setTimeout(function () {
    io.emit('HintShow', item);
    console.log('Timed out: [' + item.title + ', ' + item.timeout + ']');
  }, item.timeout);
}

function sendItem(item, io, res) {
  if (isTriggered(item)) {
    console.log('Already triggered: [' + item.title + '] - skipping!');
  } else {
    triggeredHints.push(item);

    io.emit('HintEmit', item);
    res.send(item);

    setHintTimeout(io, item);
    console.log('Timer started: [' + item.title + ', ' + item.timeout + ']');
  }
}

module.exports = function (io) {
  io.on('connect', function (socket) {

    socket.on('StoreClientInfo', function (data) {
      clients.push({
        customId: data.customId,
        clientId: socket.id
      });
    });

    var critical = hintDB;

    critical = critical.filter(function (item) {
      return item.critical == true;
    });

    for (var i in critical) {
      var item = critical[i];
      sendItem(item, io, io);
    }
  });

  io.on('connection', function (socket) {
    socket.on('HintShow', function (hint) {
      io.emit('HintShow', hint);
    });

    socket.on('disconnect', function () {
      for (var i = 0, len = clients.length; i < len; ++i) {
        var actual = clients[i];

        if (actual.clientId == socket.id) {
          console.log('Client disconnected: ' + actual.customId);
          clients.splice(i, 1);
          break;
        }
      }
    });
  });

  router.get('/:id?', function (req, res) {
    if (req.params.id) {
      var result = hintDB;

      result.filter(function (item) {
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

      result.filter(function (item) {
        if (item.id == req.params.id) {
          sendItem(item, io, res);
        }
      });
    }
  });

  router.get('/show/:id?', function (req, res) {
    if (req.params.id) {
      var result = hintDB;

      result.filter(function (item) {
        if (item.id == req.params.id) {
          io.emit('HintShow', item);
          res.send(item);
        }
      });
    }
  });

  return router;
};