var express = require('express');
var path = require('path');
var router = express.Router();

var configDB = require(path.join(__dirname, '../app/config.js')).config;
var bcrypt = require('bcrypt-nodejs');
var validator = require('validator');

module.exports = function (io, AppState) {

  io.on('connection', function (socket) {
    socket.on('CheckPassword', function(given) {
      if (validator.matches(given, '^[^;.!?<>*\'\"]{4,20}$')) {
        bcrypt.compare(encodeURI(given), configDB['admin-password'], function(error, result) {
          if (result)
            AppState.isAuthenticated = true;

          console.log('Access: ' + (result ? 'GRANTED' : 'DENIED'));
          io.emit('isAuthenticated', result);
        });
      } else {
        console.log('Invalid password!');
        io.emit('isAuthenticated', false);
      }
    });
  });

  router.filterRequest = function (req, res, next) {
    if (!AppState.isAuthenticated) {
      res.redirect('/login');
    } else {
      next();
    }
  };

  return router;
};