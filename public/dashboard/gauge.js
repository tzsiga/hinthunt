$(document).ready(function () {
  $('#gauge').jqxGauge({
    height: '650px',
    width: '650px',
    style: { fill: '#222222', stroke: '#222222' },
    max: 260,
    cap: { size: '5%', style: { fill: 'red', stroke: 'red' } },
    pointer: { style: { fill: 'red' }, width: 5 },
    border: { style: { showGradient: true, fill: '#8e9495', stroke: '#7b8384', 'stroke-width': 1 } },
    ticksMinor: { interval: 5, size: '5%', style: { fill: 'white', stroke: 'white' } },
    ticksMajor: { interval: 20, size: '10%', style: { fill: 'white', stroke: 'white' } },
    labels: { position: 'outside', interval: 20 },
    animationDuration: 1500
  });
});