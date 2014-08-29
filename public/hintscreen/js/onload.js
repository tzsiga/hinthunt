$(document).ready(function () {
  var socket = io();

  socket.on('connect', function () {
    socket.emit('CustomId', 'hintscreen');
  });

  socket.on('StartGame', function () {
    console.log('Game Start message received');
    $('#actual-hint').html('');
    //TODO: start big timer
  });

  socket.on('StopGame', function () {
    console.log('Game Stop message received');
    $('#actual-hint').html('');
    //TODO: stop big timer
  });

  socket.on('HintShow', function (hint) {
    console.log('Hint message received ' + hint.title);
    $('#actual-hint').html(
      '<h1>' + hint.title + '</h1>'
    );
  });
});