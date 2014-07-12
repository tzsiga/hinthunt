var express = require('express');
var path = require('path');
var router = express.Router();

var hintDB = require(path.join(__dirname, '../app/hint_db.js')).hintDB;

module.exports = function(io) {
  router.get('/:id?', function(req, res) {
    var result = hintDB;

    if (req.params.id) {
      result = result.filter(function (item) {
        return item.id == req.params.id;
      });

      io.emit('hint-message', result[0]);
      res.send(result[0]);
    }
  });

  return router;
};