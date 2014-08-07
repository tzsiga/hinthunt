$(document).ready(function () {
  var gameTime = (12 * 60 + 34) * 1000;

  $('.game-time').countdown({
    until: gameTime / 1000,
    format: 'MS',
    compact: true
    //onExpiry: function () {}
  });

  console.log('Game timer started: ' + gameTime);

  var socket = io();
  var hintCardCreator = new HintCardCreator();

  socket.on('connect', function () {
    socket.emit('StoreClient', { customId: 'control' });
  });

  socket.on('HintEmit', function (hint) {
    console.log('Hint message received');
    hintCardCreator.addCard(hint);
  });

  $('.fancy-hint-popup').fancybox({
    fitToView: true,
    autoSize: true
  });

  $('.hint').on('click', function () {
    console.log('New hint button pressed');
  });
});