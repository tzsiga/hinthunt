$(document).ready(function () {

  var socket = io();

  $('#login-button').click(function (event) {
    event.preventDefault();
    var form = $('#login-form');

    if ($('#given-password').val() === '') {
      $('#flash-msg')
        .text('No password given!')
        .removeClass('alert-warning')
        .addClass('alert-danger');
    } else {
      socket.emit('CheckPassword', $('#given-password').val());
      socket.on('isAuthenticated', function (access) {
        if (access) {
          window.location.replace('/control/menu.html');
        } else {
          $('#flash-msg')
            .text('Invalid password!')
            .removeClass('alert-warning')
            .addClass('alert-danger');
          $('#given-password').val('');
        }
      });
    }
  });
});