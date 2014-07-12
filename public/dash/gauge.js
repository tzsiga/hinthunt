$(document).ready(function () {
  $('#gauge').jqxGauge({
    ranges: [
      { startValue: 0, endValue: 130, style: { fill: '#4cb848', stroke: '#4cb848' }, startDistance: 0, endDistance: 0 },
      { startValue: 130, endValue: 180, style: { fill: '#fad00b', stroke: '#fad00b' }, startDistance: 0, endDistance: 0 },
      { startValue: 180, endValue: 220, style: { fill: '#e53d37', stroke: '#e53d37' }, startDistance: 0, endDistance: 0 }
    ],
    cap: { size: '5%', style: { fill: '#2e79bb', stroke: '#2e79bb' } },
    border: { style: { fill: '#8e9495', stroke: '#7b8384', 'stroke-width': 1 } },
    ticksMinor: { interval: 5, size: '5%' },
    ticksMajor: { interval: 20, size: '10%' },
    labels: { position: 'outside', interval: 20 },
    pointer: { style: { fill: '#2e79bb' }, width: 5 },
    animationDuration: 1500
  });

  $('#slider').jqxSlider({ min: 0, max: 220, mode: 'fixed', ticksFrequency: 20, width: 150, value: 120, showButtons: false });
  $('#slider').mousedown(function () {
    $('#gauge').jqxGauge('value', $('#slider').jqxSlider('value'));
    $('#linear-gauge').jqxLinearGauge('value', $('#slider').jqxSlider('value'));
  });
  $('#slider').on('slideEnd', function (e) {
    $('#gauge').jqxGauge('value', e.args.value);
    $('#linear-gauge').jqxLinearGauge('value', e.args.value);
  });

  $('#linear-gauge').jqxLinearGauge({
    orientation: 'vertical',
    width: 126,
    height: 350,
    ticksMajor: { size: '10%', interval: 10 },
    ticksMinor: { size: '5%', interval: 2.5, style: { 'stroke-width': 1, stroke: '#aaaaaa' } },
    min: 0,
    max: 220,
    pointer: { size: '5%' },
    colorScheme: 'scheme05',
    labels: {
      interval: 20, formatValue: function (value, position) {
        if (position === 'far') {
          value = (9 / 5) * value + 32;
          if (value === -76) {
            return '°F';
          }
          return value + '°';
        }
        if (value === -60) {
          return '°C';
        }
        return value + '°';
      }
    },
    ranges: [
      { startValue: 100, endValue: 130, style: { fill: '#FFF157', stroke: '#FFF157' } },
      { startValue: 130, endValue: 180, style: { fill: '#FFA200', stroke: '#FFA200' } },
      { startValue: 180, endValue: 220, style: { fill: '#FF4800', stroke: '#FF4800' } }
    ],
    animationDuration: 1500
  });

  $('#gauge').jqxGauge('value', 140);
  $('#linear-gauge').jqxLinearGauge('value', 140);
});
