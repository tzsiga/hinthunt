var express = require('express');
var path = require('path');
var router = express.Router();

module.exports = function (io, AppState, hint) {

  io.on('connection', function (socket) {
    socket.on('InitGame', function(sessionParams) {
      AppState.action = sessionParams.action;
      AppState.language = sessionParams.language;
    });
  });

  router.get('/start', function (req, res) {
    io.emit('StartGame');
    hint.armCritical();
    res.send('Game started!');
  });

  router.get('/stop', function (req, res) {
    io.emit('StopGame');
    hint.stopAllItem();
    res.send('Game stopped!');
  });

  return router;
};