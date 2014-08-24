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

  $('#start').on('click', function (event) {
    event.preventDefault();

    if (sessionParams.language !== undefined) {
      console.log(sessionParams);

      var form = $('#session-form');

      $.post(form.attr('action'), sessionParams, function (access) {
        if (access) {
          window.location.replace('/control/control.html');
        } else {
          // error
        }
      }, 'json');
    }
  });
});