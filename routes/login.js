var express = require('express');
var path = require('path');
var router = express.Router();

var configDB = require(path.join(__dirname, '../app/config.js')).config;
var bcrypt = require('bcrypt-nodejs');

module.exports = function (io, AppState) {

  router.post('/checkPassword', function (req, res) {
    bcrypt.compare(encodeURI(req.body['given-password']), configDB['admin-password'], function(error, result) {
      if (result)
        AppState.isAuthenticated = true;

      console.log('Access: ' + (result ? 'GRANTED' : 'DENIED'));
      res.send(result);
    });
  });

  router.filterRequest = function (req, res, next) {
    if (!AppState.isAuthenticated) {
      res.writeHead(302, {
        'Location': '/login'
      });
      res.end();
    } else {
      next();
    }
  };

  return router;
};