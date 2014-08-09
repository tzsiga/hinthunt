var express = require('express');
var path = require('path');
var router = express.Router();

var configDB = require(path.join(__dirname, '../app/config.js')).config;
var bcrypt = require('bcrypt');

module.exports = function (io, AppState) {

  router.post('/login', function (req, res) {
    bcrypt.compare(encodeURI(req.body['given-password']), configDB['admin-password'], function(error, result) {
      console.log('Access: ' + (result ? 'GRANTED' : 'DENIED'));
      res.send(result);
      AppState.isAuthenticated = true;
    });
  });

  return router;
};