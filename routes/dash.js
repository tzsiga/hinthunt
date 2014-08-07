var express = require('express');
var path = require('path');
var router = express.Router();

module.exports = function (io) {

  router.get('/SetPressure/:value?', function (req, res) {
    if (req.params.value) {
      io.emit('SetPressure', req.params.value);
      res.send(req.params.value);
    }
  });

  router.get('/SetCrossIcon/:value?', function (req, res) {
    if (req.params.value) {
      io.emit('SetCrossIcon', req.params.value);
      res.send(req.params.value);
    }
  });

  router.get('/SetGaugeIcon/:value?', function (req, res) {
    if (req.params.value) {
      io.emit('SetGaugeIcon', req.params.value);
      res.send(req.params.value);
    }
  });

  router.get('/SetKeyIcon/:value?', function (req, res) {
    if (req.params.value) {
      io.emit('SetKeyIcon', req.params.value);
      res.send(req.params.value);
    }
  });

  router.get('/SetTorpedoIcon/:value?', function (req, res) {
    if (req.params.value) {
      io.emit('SetTorpedoIcon', req.params.value);
      res.send(req.params.value);
    }
  });

  router.get('/SetDeg/:value?', function (req, res) {
    if (req.params.value) {
      io.emit('SetDeg', req.params.value);
      res.send(req.params.value);
    }
  });

  router.get('/SetLong/:value?', function (req, res) {
    if (req.params.value) {
      io.emit('SetLong', req.params.value);
      res.send(req.params.value);
    }
  });

  return router;
};