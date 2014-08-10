$(document).ready(function () {

  $.fn.preload = function () {
    this.each(function () {
      $('<img/>')[0].src = this;
    });
  };

  $([
    '../assets/image/icons/icon-cross-green.png',
    '../assets/image/icons/icon-gauge-green.png',
    '../assets/image/icons/icon-key-green.png',
    '../assets/image/icons/icon-torpedo-green.png'
  ]).preload();

  var socket = io();

  socket.on('connect', function () {
    socket.emit('StoreClient', { customId: 'dashboard' });
  });

  socket.on('SetPressure', function (value) {
    setGaugeValue(value);
  });

  socket.on('SetCrossIcon', function (value) {
    $('#icon-cross').html(
      $('<img>', {
        src: (value == 'red') ?
          '../assets/image/icons/icon-cross-red.png' :
          '../assets/image/icons/icon-cross-green.png',
        style: 'width: 200px',
        alt: ''
      })
    );
  });

  socket.on('SetGaugeIcon', function (value) {
    $('#icon-gauge').html(
      $('<img>', {
        src: (value == 'red') ?
          '../assets/image/icons/icon-gauge-red.png' :
          '../assets/image/icons/icon-gauge-green.png',
        style: 'width: 180px; margin-left: 30px',
        alt: ''
      })
    );
  });

  socket.on('SetKeyIcon', function (value) {
    $('#icon-key').html(
      $('<img>', {
        src: (value == 'red') ?
          '../assets/image/icons/icon-key-red.png' :
          '../assets/image/icons/icon-key-green.png',
        style: 'width: 200px',
        alt: ''
      })
    );
  });

  socket.on('SetTorpedoIcon', function (value) {
    $('#icon-torpedo').html(
      $('<img>', {
        src: (value == 'red') ?
          '../assets/image/icons/icon-torpedo-red.png' :
          '../assets/image/icons/icon-torpedo-green.png',
        style: 'width: 240px',
        alt: ''
      })
    );
  });

  socket.on('SetDeg', function (value) {
    $('#deg').html(value + '&deg;');
  });

  socket.on('SetLong', function (value) {
    $('#long').html(value + '<span class="digital-panel-unit"> m</span>');
  });

  function setGaugeValue(value) {
    $('#gauge-value').text(value);
    //$('#gauge').jqxGauge('value', value);
  }

  /*
  $('#gauge-value').bind("DOMSubtreeModified", function () {
    setTimeout(function () {
      var pressure = $('#gauge-value').text();
      $('#gauge').jqxGauge('value', pressure);
    }, 500);
  });
  //*/

  ///*
  setInterval(function () {
    var pressure = $('#gauge-value').text();

    if ($('#gauge').jqxGauge('value') != pressure) {
      $('#gauge').jqxGauge('value', pressure);
    }
  }, 500);
  //*/

  var valves = {
    I: 2,
    II: 7,
    III: 13,
    IV: 17,
    V: 23,
    VI: 27,
    VII: 33,
    VIII: 39,
    IX: 42,
    X: 44
  };

  setGaugeValue(
    valves.I +
    valves.II +
    valves.IV +
    valves.VI +
    valves.VIII +
    valves.IX +
    valves.X
  );
});