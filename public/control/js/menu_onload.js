$(document).ready(function () {

  var sessionParams = {};

  $('#select-action').on('change', function () {
    sessionParams.action = $('#select-action').val();

    if (sessionParams.action !== 'System test') {
      $('#select-language')
        .fadeIn()
        .on('change', function () {
          sessionParams.language = $('#select-language').val();
        });
    } else {
      $('#select-language').fadeOut();
      delete sessionParams.language;
    }
  });

  var socket = io();

  socket.on('connect', function () {
    socket.emit('StoreClient', { customId: 'menu' });
  });

  $('#start').on('click', function (event) {
    event.preventDefault();

    if (sessionParams.language !== undefined) {
      console.log(sessionParams);
      socket.emit('InitGame', sessionParams);
      window.location.replace('/control/control.html');
    }
  });
});