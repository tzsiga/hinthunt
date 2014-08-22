var express = require('express');
var path = require('path');
var router = express.Router();

var hintDB = require(path.join(__dirname, '../app/hint_db.js')).hintDB;

var timeouts = {};

module.exports = function (io, AppState) {
  io.on('connect', function (socket) {
    socket.on('StoreClient', function (data) {
      if (data.customId == 'control' && AppState.action == 'game') {
        armCritical(io);
      }
    });
  });

  io.on('connection', function (socket) {
    socket.on('HintShow', function(item) {
      io.emit('HintShow', item);
      clearHintTimeout(item);
    });

    socket.on('HintSkip', function(item) {
      clearHintTimeout(item);
    });
  });

  router.get('/emit/:id?', function (req, res) {
    if (req.params.id) {
      hintDB.filter(function (item) {
        if (item.id == req.params.id) {
          sendItem(item, io, res);
        }
      });
    }
  });

  return router;
};

function armCritical(io) {
  var critical = getCritical();

  for (var j in critical) {
    sendItem(critical[j], io, io);
  }
}

function getCritical() {
  return hintDB.filter(function (item) {
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

function getTimeLeft(timeout) {
  return Math.ceil((timeout._idleStart + timeout._idleTimeout - Date.now()));
}