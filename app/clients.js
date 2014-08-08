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

  return clients;
};

function storeClient(socket, data) {
  clients[socket.id] = data.customId;
  console.log('Client connceted: ' + data.customId);
}

function removeClient(socket) {
  if (clients[socket.id] !== undefined) {
    console.log('Client disconnected: ' + clients[socket.id]);
    delete clients[socket.id];
  }
}