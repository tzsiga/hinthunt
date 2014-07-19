var triggered = [];

function HintCardCreator() {
  function addCard(hint) {
    if (_isTriggered(hint.id)) {
      console.log('Already triggered: [' + hint.title + '] - skipping!');
    } else {
      triggered.push(hint.id);

      $('.cards').append(
        _createCard(hint).fadeIn(200, function () {
          _startTimer(hint);
          console.log('Hint [' + hint.title + '] triggered');
        })
      );
    }
  }

  function _isTriggered(id) {
    for (var hintId in triggered) {
      if (triggered[hintId] == id)
        return true;
    }

    return false;
  }

  function _startTimer(hint) {
    $('#t-' + hint.id).countdown({
      until: hint.timeout / 1000,
      format: 'MS',
      compact: true,
      onExpiry: hint.command
    });
  }

  function _createCard(hint) {
    return $(document.createElement('div'))
      .attr('class', 'card col-md-4 col-sm-6')
      .attr('id', 'h-' + hint.id)
      .append(
        $(document.createElement('div')).attr('class', 'panel ' + (hint.critical ? 'panel-danger' : 'panel-default'))
          .append(
            $(document.createElement('div')).attr('class', 'panel-heading')
              .append(
                $(document.createElement('h3')).attr('class', 'panel-title')
                  .html('<a href="popup.html" class="fancy-html">' + hint.title + '</a>')
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
                        $('.cards #h-' + hint.id).fadeOut(200, function () {
                          $('#t-' + hint.id).countdown('destroy');
                          $(this).remove();
                        })
                      })
                  )
                  .append(
                    $(document.createElement('button')).attr('class', 'btn btn-success send')
                      .text('Send')
                      .click(hint.command)
                  )
              )
          )
      );
  }

  return {
    addCard: addCard
  };
}