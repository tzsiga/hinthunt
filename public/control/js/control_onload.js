$(document).ready(function () {
  var socket = io();
  var hintCardFactory = new HintCardFactory();

  socket.on('connect', function () {
    socket.emit('CustomId', 'control');
  });

  socket.on('SetupGame', function (AppState) {
    $('#game-name').text(AppState.action);
  });

  socket.on('StartGame', function () {
    var gameTime = (60 * 60) * 1000;

    $('#game-time').countdown({
      until: gameTime / 1000,
      format: 'MS',
      compact: true
      //onExpiry: function () {}
    });

    console.log('Game timer started: ' + gameTime);
  });

  socket.on('StopGame', function () {
    $('.game-time').countdown('destroy');
  });

  socket.on('HintEmit', function (hint) {
    console.log('Hint message received');
    hintCardFactory.addCard(hint);
  });

  socket.on('HintStop', function (hint) {
    console.log('Hint timer deleted');
    hintCardFactory.removeCard(hint);
  });

  $('.fancy-hint-popup').fancybox({
    fitToView: true,
    autoSize: true
  });

  $('#hint').fancybox({
    fitToView: true,
    autoSize: true
  });

  $('button#send-custom-hint').on('click', function () {
    var customHint = $('#custom-hint');

    if (customHint.val().length > 0) {
      socket.emit('HintShow', {
        title: customHint.val(),
        type: 'custom'
      });

      customHint.val('');
      jQuery.fancybox.close();
    }
  });
});