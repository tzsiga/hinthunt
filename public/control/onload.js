$(document).ready(function() {
  var gameTime = (12 * 60 + 34) * 1000;

  $('.game-time').countdown({
    until: gameTime / 1000,
    format: 'MS',
    compact: true
    //onExpiry: function () {}
  });

  console.log('Game timer started: ' + gameTime);

  // listening to node
  var socket = io();
  var hintCardCreator = new HintCardCreator();

  socket.on('hint', function (hint) {
    console.log('Hint message received');
    hintCardCreator.addCard(hint);
  });

  // popup links
  $(".fancy-html").fancybox({
    fitToView: true,
    //autoSize: true,
    //height: '320px',
    //width: '500px',
    closeClick: false,
    openEffect: 'none',
    closeEffect: 'none',
    type: 'iframe'
  });

  // new hint link
  $('.hint').click(function() {
    console.log('New hint button pressed');
  });
});