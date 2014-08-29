module.exports = function (io) {
  io.on('connect', function (socket) {
    socket.on('CustomId', function (client) {
      socket.join(client);
      console.log('Client connceted: ' + client);
    });
  });

  io.on('connection', function (socket) {
    socket.on('disconnect', function () {
      var id = socket.rooms.length > 2 ? socket.rooms : socket.rooms[1];
      console.log('Client disconnected: ' + id);
    });
  });
};