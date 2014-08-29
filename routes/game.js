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
    hint.armCritical(io);
    res.send('Game started!');
  });

  router.get('/stop', function (req, res) {
    io.emit('StopGame');
    res.send('Game stopped!');
  });

  return router;
};