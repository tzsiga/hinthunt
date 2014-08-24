var express = require('express');
var path = require('path');
var router = express.Router();

module.exports = function (io) {

  router.get('/setPressure/:value?', function (req, res) {
    if (req.params.value) {
      io.emit('setPressure', req.params.value);
      res.send(req.params.value);
    }
  });

  router.get('/setCrossIcon/:value?', function (req, res) {
    if (req.params.value) {
      io.emit('setCrossIcon', req.params.value);
      res.send(req.params.value);
    }
  });

  router.get('/setGaugeIcon/:value?', function (req, res) {
    if (req.params.value) {
      io.emit('setGaugeIcon', req.params.value);
      res.send(req.params.value);
    }
  });

  router.get('/setKeyIcon/:value?', function (req, res) {
    if (req.params.value) {
      io.emit('setKeyIcon', req.params.value);
      res.send(req.params.value);
    }
  });

  router.get('/setTorpedoIcon/:value?', function (req, res) {
    if (req.params.value) {
      io.emit('setTorpedoIcon', req.params.value);
      res.send(req.params.value);
    }
  });

  router.get('/setDeg/:value?', function (req, res) {
    if (req.params.value) {
      io.emit('setDeg', req.params.value);
      res.send(req.params.value);
    }
  });

  router.get('/setLong/:value?', function (req, res) {
    if (req.params.value) {
      io.emit('setLong', req.params.value);
      res.send(req.params.value);
    }
  });

  return router;
};