$(document).ready(function () {
  preloadImages();
  initialize();

  var socket = io();

  socket.on('connect', function () {
    socket.emit('CustomId', 'dashboard');
  });

  socket.on('setCrossIcon', function (value) {
    localStorage.crossIcon = value;
    setCrossIcon(value);
  });

  socket.on('setGaugeIcon', function (value) {
    localStorage.gaugeIcon = value;
    setGaugeIcon(value);
  });

  socket.on('setKeyIcon', function (value) {
    localStorage.keyIcon = value;
    setKeyIcon(value);
  });

  socket.on('setTorpedoIcon', function (value) {
    localStorage.torpedoIcon = value;
    setTorpedoIcon(value);
  });

  socket.on('setDeg', function (value) {
    localStorage.deg = value;
    setDeg(value);
  });

  socket.on('setLong', function (value) {
    localStorage.long = value;
    setLong(value);
  });
});

function initialize() {
  localStorage.crossIcon !== undefined ? setCrossIcon(localStorage.crossIcon) : setCrossIcon('red');
  localStorage.gaugeIcon !== undefined ? setGaugeIcon(localStorage.gaugeIcon) : setGaugeIcon('red');
  localStorage.keyIcon !== undefined ? setKeyIcon(localStorage.keyIcon) : setKeyIcon('red');
  localStorage.torpedoIcon !== undefined ? setTorpedoIcon(localStorage.torpedoIcon) : setTorpedoIcon('red');
  localStorage.deg !== undefined ? setDeg(localStorage.deg) : setDeg(0);
  localStorage.long !== undefined ? setLong(localStorage.long) : setLong(0);
}

function preloadImages() {
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
}

function resetLocalStorage() {
  for (var key in localStorage) {
    if (localStorage.hasOwnProperty(key))
      delete localStorage[key];
  }
}

function setCrossIcon(value) {
  $('#icon-cross').html(
    $('<img>', {
      src: (value == 'red') ?
        '../assets/image/icons/icon-cross-red.png' :
        '../assets/image/icons/icon-cross-green.png',
      style: 'width: 200px',
      alt: ''
    })
  );
}

function setGaugeIcon(value) {
  $('#icon-gauge').html(
    $('<img>', {
      src: (value == 'red') ?
        '../assets/image/icons/icon-gauge-red.png' :
        '../assets/image/icons/icon-gauge-green.png',
      style: 'width: 180px; margin-left: 30px',
      alt: ''
    })
  );
}

function setKeyIcon(value) {
  $('#icon-key').html(
    $('<img>', {
      src: (value == 'red') ?
        '../assets/image/icons/icon-key-red.png' :
        '../assets/image/icons/icon-key-green.png',
      style: 'width: 200px',
      alt: ''
    })
  );
}

function setTorpedoIcon(value) {
  $('#icon-torpedo').html(
    $('<img>', {
      src: (value == 'red') ?
        '../assets/image/icons/icon-torpedo-red.png' :
        '../assets/image/icons/icon-torpedo-green.png',
      style: 'width: 240px',
      alt: ''
    })
  );
}

function setDeg(value) {
  $('#deg').html(value + '&deg;');
}

function setLong(value) {
  $('#long').html(value + '<span class="digital-panel-unit"> m</span>');
}