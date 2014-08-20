$(document).ready(function () {

  var sessionParams = {};

  $('#select-action').on('change', function () {
    sessionParams['action'] = $('#select-action').val();

    if (sessionParams['action'] === 'Game') {
      $('#select-game')
        .fadeIn()
        .on('change', function () {
          sessionParams['game'] = $('#select-game').val();
        });
    } else {
      $('#select-game').fadeOut();
      delete sessionParams['game'];
    }
  });

  $('#start').on('click', function (e) {
    e.preventDefault();

    if (sessionParams.game !== undefined) {
      console.log(sessionParams);
      // start game signal -> param: sessionParams.game
    }
  });
});