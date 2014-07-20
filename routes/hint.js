var express = require('express');
var path = require('path');
var router = express.Router();

var hintDB = require(path.join(__dirname, '../app/hint_db.js')).hintDB;

module.exports = function(io) {
  io.on('connect', function(data, from) {
    console.log('Loading mission critical hints');
    var critical = hintDB;

    critical = critical.filter(function (item) {
      return item.critical == true;
    });

    for (var i in critical) {
      io.emit('hint-emit', critical[i]);
      io.send(critical[i]);
    }
  });

  io.on('connection', function (socket) {
    socket.on('hint-show', function (hint) {
      io.emit('hint-show', hint);
    });
  });

  router.get('/:id?', function(req, res) {
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

  router.get('/emit/:id?', function(req, res) {
    if (req.params.id) {
      var result = hintDB;

      result = result.filter(function (item) {
        if (item.id == req.params.id) {
          io.emit('hint-emit', item);
          res.send(item);
        }
      });
    }
  });

  router.get('/show/:id?', function(req, res) {
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