$(document).ready(function () {
  var socket = io();

  socket.on('connect', function () {
    socket.emit('CustomId', 'hintscreen');
  });

  socket.on('StartGame', function () {
    $('#actual-hint').html('');

    var gameTime = (60 * 60) * 1000;

    $('#game-clock').countdown({
      until: gameTime / 1000,
      format: 'MS',
      compact: true
      //onExpiry: function () {}
    });
  });

  socket.on('StopGame', function () {
    $('#actual-hint').html('');
    $('#game-clock').countdown('destroy');
  });

  socket.on('HintShow', function (hint) {
    $('#actual-hint')
      .html('<h1>' + hint.title + '</h1>')
      .css('background-color','#222222');
    
    setTimeout(function () {
      $('#actual-hint')
        .html('')
        .css('background-color','auto');
    }, 5000);
  });
});