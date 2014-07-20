$(document).ready(function() {
  // listening to node
  var socket = io();

  socket.on('hint-show', function (hint) {
    console.log('Hint message received ' + hint.title);
    $('#actual-hint').html(
      '<h1>' + hint.title + '</h1>'
    );
  });
});