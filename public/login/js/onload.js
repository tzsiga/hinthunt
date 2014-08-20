$(document).ready(function () {

  $('#login-button').click(function (event) {
    event.preventDefault();
    var form = $('#login-form');

    $.post(form.attr('action'), form.serialize(), function (access) {
      if (access) {
        window.location.replace('/control/menu.html');
      } else {
        $('#flash-msg')
          .text('Invalid password!')
          .removeClass('alert-warning')
          .addClass('alert-danger');
        $('#given-password').val('');
      }
    }, 'json');
  });
});