var express = require('express');
var path = require('path');
var router = express.Router();

var hintDB = require(path.join(__dirname, '../app/hint_db.js')).hintDB;

var timeouts = {};

module.exports = function (io, AppState) {
  io.on('connect', function (socket) {
    socket.on('StoreClient', function (data) {
      if (data.customId == 'control') {
        io.emit('SetupGame', AppState);
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

  router.get('/start/:id?', function (req, res) {
    if (req.params.id) {
      hintDB.filter(function (item) {
        if (item.id == req.params.id) {
          sendItem(item, io, res);
        }
      });
    }
  });

  router.get('/stop/:id?', function (req, res) {
    if (req.params.id) {
      hintDB.filter(function (item) {
        if (item.id == req.params.id) {
          stopItem(item, io, res);
        }
      });
    }
  });

  router.armCritical = function (io) {
    var critical = getCritical(AppState.action);

    for (var j in critical) {
      sendItem(critical[j], io, io);
    }
  };

  return router;
};

function getCritical(game) {
  return hintDB.filter(function (item) {
    return item.critical == true && item.game == game;
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

function stopItem(item, io, res) {
  clearHintTimeout(item);
  io.emit('HintStop', item);
  res.send('hint stopped: ' + item);
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