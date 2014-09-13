var express = require('express');
var path = require('path');
var router = express.Router();

var hintDB = require(path.join(__dirname, '../app/hint_db.js')).hintDB;

var timeouts = {};

module.exports = function (io, AppState) {
  io.on('connect', function (socket) {
    socket.on('CustomId', function (client) {
      if (client == 'control') {
        io.emit('SetupGame', AppState);
      }
    });
  });

  io.on('connection', function (socket) {
    socket.on('HintShow', function(item) {
      io.emit('HintShow', item);

      if (item.type !== 'custom')
        clearHintTimeout(item);
    });

    socket.on('HintSkip', function(item) {
      clearHintTimeout(item);
    });

    socket.on('StopGame', function() {
      router.stopAllItem();
    });
  });

  router.get('/start/:id?', function (req, res) {
    if (req.params.id) {
      hintDB.filter(function (item) {
        if (item.id == req.params.id) {
          sendItem(item, res);
        }
      });
    }
  });

  router.get('/stopAll', function (req, res) {
    router.stopAllItem();
    res.send('All timers stopped!');
  });

  router.get('/stop/:id?', function (req, res) {
    if (req.params.id) {
      hintDB.filter(function (item) {
        if (item.id == req.params.id) {
          stopItem(item);
          res.send('Timer stopped: ' + item);
        }
      });
    }
  });

  router.stopAllItem = function () {
    for (var tId in timeouts) {
      if (timeouts.hasOwnProperty(tId)) {
        for (var hId in hintDB) {
          if (hintDB.hasOwnProperty(hId) && hintDB[hId].id === tId) {
            io.emit('HintStop', hintDB[hId]);
          }
        }
        clearTimeout(timeouts[tId]);
        delete timeouts[tId];
      }
    }
    console.log('All timeouts deleted');
  };

  router.armCritical = function () {
    var critical = getCritical(AppState.action);

    for (var hint in critical) {
      if (critical.hasOwnProperty(hint))
        sendItem(critical[hint], io);
    }
  };

  function getCritical(game) {
    return hintDB.filter(function (item) {
      return item.critical == true && item.game == game;
    });
  }

  function sendItem(item, res) {
    if (isTriggered(item)) {
      console.log('Already triggered: [' + item.title + '] - skipping!');
    } else {
      io.emit('HintEmit', item);
      res.send(item);

      setHintTimeout(item);
      console.log('Timer started: [' + item.title + ', ' + item.timeout + ']');
    }
  }

  function stopItem(item) {
    clearHintTimeout(item);
    io.emit('HintStop', item);
  }

  function isTriggered(item) {
    for (var id in timeouts) {
      if (id == item.id)
        return true
    }

    return false;
  }

  function setHintTimeout(item) {
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

  return router;
};