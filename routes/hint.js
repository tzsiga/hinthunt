var express = require('express');
var path = require('path');
var router = express.Router();

var hintDB = require(path.join(__dirname, '../app/hint_db.js')).hintDB;

var clients = [];
var triggeredHints = [];

module.exports = function (io) {
  io.on('connect', function (socket) {
    socket.on('StoreClient', function (data) {
      storeClient(data, socket);
      if (data.customId == 'control') {
        sendCritical(io);
      }
    });
  });

  io.on('connection', function (socket) {
    socket.on('disconnect', function () {
      removeClient(socket);
    });
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

  return router;
};

function storeClient(data, socket) {
  clients.push({
    customId: data.customId,
    clientId: socket.id
  });

  console.log('Client connceted: ' + data.customId);
}

function removeClient(socket) {
  for (var i in clients) {
    var actual = clients[i];
    if (actual.clientId == socket.id) {
      clients.splice(i, 1);
      console.log('Client disconnected: ' + actual.customId);
      break;
    }
  }
}

function sendCritical(io) {
  var critical = getCritical();

  for (var j in critical) {
    var item = critical[j];
    sendItem(item, io, io);
  }
}

function getCritical() {
  var critical = hintDB;

  return critical.filter(function (item) {
    return item.critical == true;
  });
}

function sendItem(item, io, res) {
  if (isTriggered(item)) {
    console.log('Already triggered: [' + item.title + '] - skipping!');
  } else {
    triggeredHints.push(item);

    io.emit('HintEmit', item);
    res.send(item);

    setHintTimeout(item, io);
    console.log('Timer started: [' + item.title + ', ' + item.timeout + ']');
  }
}

function isTriggered(hint) {
  for (var i in triggeredHints) {
    if (triggeredHints[i] == hint)
      return true;
  }

  return false;
}

function setHintTimeout(item, io) {
  setTimeout(function () {
    io.emit('HintShow', item);
    console.log('Timed out: [' + item.title + ', ' + item.timeout + ']');
  }, item.timeout);
}