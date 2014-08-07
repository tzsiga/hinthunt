var express = require('express');
var path = require('path');
var router = express.Router();

var clients = {};

module.exports = function (io) {
  io.on('connect', function (socket) {
    socket.on('StoreClient', function (data) {
      storeClient(socket, data);
    });
  });

  io.on('connection', function (socket) {
    socket.on('disconnect', function () {
      removeClient(socket);
    });
  });

  return router;
};

function storeClient(socket, data) {
  clients[socket.id] = data.customId;
  console.log('Client connceted: ' + data.customId);
}

function removeClient(socket) {
  console.log('Client disconnected: ' + clients[socket.id]);
  delete clients[socket.id];
}