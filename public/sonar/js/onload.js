$(document).ready(function () {
  var socket = io();

  socket.on('connect', function () {
    socket.emit('CustomId', 'sonar');
  });

  socket.on('StartGame', function () {
    $('body#sonar').html(
      $('<video>', {
        id: 'sonar-video',
        src: '../assets/video/sonar.mp4',
        autoplay: true,
        loop: true
      })
    );
  });

});