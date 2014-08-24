var express = require('express');
var path = require('path');
var router = express.Router();

module.exports = function (io, AppState, hint) {

  router.post('/init', function (req, res) {
    console.log(req.body);

    AppState.action = req.body.action;
    AppState.language = req.body.language;

    res.send(AppState);
  });

  router.get('/start', function (req, res) {
    io.emit('StartGame');
    hint.armCritical(io);
    res.send('Game started!');
  });

  return router;
};