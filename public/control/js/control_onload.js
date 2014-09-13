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
    });

    console.log('Game timer started: ' + gameTime);
  });

  socket.on('StopGame', function () {
    $('#game-time').countdown('destroy');
    $('.hint-timer').countdown('destroy');
    $('#cards').fadeOut().html('');
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

  $('html').keypress(function(event) {
    if (event.keyCode == 13) {  // enter
      handleInput();
    }
  });

  $('button#send-custom-hint').on('click', function () {
    handleInput();
  });

  function handleInput() {
    var hint = $('#custom-hint');

    if (validator.matches(hint.val(), '^[^;.!?<>*\'\"]{1,16}$')) {
      socket.emit('HintShow', {
        title: hint.val(),
        type: 'custom'
      });

      hint.val('');
      jQuery.fancybox.close();
    } else {
      alert('Invalid message!');
    }
  }
});