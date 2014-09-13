$(document).ready(function () {
  var socket = io();

  $('#login-button').click(function (event) {
    event.preventDefault();
    var form = $('#login-form');
    var given = $('#given-password');

    if (given.val() === '') {
      $('#flash-msg')
        .text('No password given!')
        .removeClass('alert-warning')
        .addClass('alert-danger');
    } else {
      socket.emit('CheckPassword', given.val());
      socket.on('isAuthenticated', function (access) {
        if (access) {
          window.location.replace('/control/menu.html');
        } else {
          $('#flash-msg')
            .text('Invalid password!')
            .removeClass('alert-warning')
            .addClass('alert-danger');
          given.val('');
        }
      });
    }
  });
});