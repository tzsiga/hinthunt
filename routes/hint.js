var express = require('express');
var path = require('path');
var router = express.Router();

var hintDB = require(path.join(__dirname, '../app/hint_db.js')).hintDB;

var clients = {};
var timeouts = {};

module.exports = function (io) {
  io.on('connect', function (socket) {
    socket.on('StoreClient', function (data) {
      storeClient(socket, data);
      if (data.customId == 'control') {
        sendCritical(io);
      }
    });
  });

  io.on('connection', function (socket) {
    socket.on('disconnect', function () {
      removeClient(socket);
    });

    socket.on('HintShow', function(item) {
      io.emit('HintShow', item);
      //clearHintTimeout(item);
    });

    socket.on('HintSkip', function(item) {
      clearHintTimeout(item);
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

function storeClient(socket, data) {
  clients[socket.id] = data.customId;
  console.log('Client connceted: ' + data.customId);
}

function removeClient(socket) {
  console.log('Client disconnected: ' + clients[socket.id]);
  delete clients[socket.id];
}

function sendCritical(io) {
  var critical = getCritical();

  for (var j in critical) {
    sendItem(critical[j], io, io);
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
    io.emit('HintEmit', item);
    res.send(item);

    setHintTimeout(item, io);
    console.log('Timer started: [' + item.title + ', ' + item.timeout + ']');
  }
}

function isTriggered(item) {
  for (var id in timeouts) {
    if (id == item.id)
      return true
  }

  return false;
}

function setHintTimeout(item, io) {
  timeouts[item.id] = setTimeout(function () {
    io.emit('HintShow', item);
    console.log('Timed out: [' + item.title + ', ' + item.timeout + ']');
  }, item.timeout);
}

function clearHintTimeout(item) {
  clearTimeout(timeouts[item.id]);
  delete timeouts[item.id];
  console.log('Timeout deleted: [' + item.title + ', ' + item.timeout + ']');
}