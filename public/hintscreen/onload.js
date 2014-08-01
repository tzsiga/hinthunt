$(document).ready(function () {
  // listening to node
  var socket = io();

  socket.on('connect', function () {
    socket.emit('StoreClient', {customId: 'hintscreen'});
  });

  socket.on('HintShow', function (hint) {
    console.log('Hint message received ' + hint.title);
    $('#actual-hint').html(
      '<h1>' + hint.title + '</h1>'
    );
  });
});