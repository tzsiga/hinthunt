var socket = io();

function HintCardCreator() {
  function addCard(hint) {
    $('.cards').append(
      createCard(hint).fadeIn(200, function () {
        startTimer(hint);
      })
    );
  }

  function createCard(hint) {
    return $('<div>', { 'class': 'card col-md-4 col-sm-6', 'id': 'h-' + hint.id }).append(
      $('<div>', { 'class': 'panel ' + (hint.critical ? 'panel-warning' : 'panel-default') }).append(
        $('<div>', { 'class': 'panel-heading' }).append(
          $('<h3>', { 'class': 'panel-title' }).append(
            $('<a>', { 'class': 'fancy-hint-popup', 'href': '#p-' + hint.id }).text(hint.title)
          )
        )
      ).append(
        $('<div>', { 'class': 'panel-body' }).html(hint.desc).append(
          $('<div>', {'class': 'actions' }).html('Time left: ').append(
            $('<span>', { 'id': 't-' + hint.id })
          ).append(
            $('<button>', { 'class': 'btn btn-default skip' })
              .text('Skip')
              .on('click', function () {
                socket.emit('HintSkip', hint);
                removeCard(hint);
              })
          ).append(
            $('<button>', { 'class': 'btn btn-success send' })
              .text('Send')
              .on('click', function () {
                socket.emit('HintShow', hint);
                removeCard(hint);
              })
          )
        )
      ).append(
        $('<div>', { 'id': 'p-' + hint.id, 'style': 'display: none; width: 500px;' }).html(
          '<h2>' + hint.title + '</h2>' +
          '<p>' + hint.desc + '</p>'
        )
      )
    );
  }

  function startTimer(hint) {
    $('#t-' + hint.id).countdown({
      until: hint.timeout / 1000,
      format: 'MS',
      compact: true,
      onExpiry: function () {
        removeCard(hint);
      }
    });
  }

  function removeCard(hint) {
    $('.cards #h-' + hint.id).fadeOut(200, function () {
      $('#t-' + hint.id).countdown('destroy');
      $(this).remove();
    });
  }

  return {
    addCard: addCard
  };
}