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
    return $(document.createElement('div'))
      .attr('class', 'card col-md-4 col-sm-6')
      .attr('id', 'h-' + hint.id)
      .append(
        $(document.createElement('div')).attr('class', 'panel ' + (hint.critical ? 'panel-danger' : 'panel-default'))
          .append(
            $(document.createElement('div')).attr('class', 'panel-heading')
              .append(
                $(document.createElement('h3')).attr('class', 'panel-title')
                  .append(
                    $(document.createElement('a'))
                      .attr({
                        'class': 'fancy-hint-popup',
                        'href': '#p-' + hint.id
                      })
                      .text(hint.title)
                  )
              )
          )
          .append(
            $(document.createElement('div')).attr('class', 'panel-body')
              .html(hint.desc)
              .append(
                $(document.createElement('div')).attr('class', 'actions')
                  .html('Time left: ')
                  .append(
                    $(document.createElement('span')).attr('id', 't-' + hint.id)
                  )
                  .append(
                    $(document.createElement('button')).attr('class', 'btn btn-default skip')
                      .text('Skip')
                      .click(function () {
                        removeCard(hint);
                      })
                  )
                  .append(
                    $(document.createElement('button')).attr('class', 'btn btn-success send')
                      .text('Send')
                      .click(function () {
                        socket.emit('HintShow', hint);
                        removeCard(hint);
                      })
                  )
              )
          )
          .append(
            $(document.createElement('div'))
              .attr({
                'id': 'p-' + hint.id,
                'style': 'display: none; width: 500px;'
              })
              .html(
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
//        socket.emit('hint-show', hint);
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