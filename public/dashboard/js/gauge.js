$(document).ready(function () {

  var gauge = AmCharts.makeChart("gauge", {
    "type": "gauge",
    "theme": "none",
    "fontSize": 28,
    "color": "white",
    "axes": [
      {
        "axisThickness": 20,
        "axisColor": "#FFFFFF",
        "axisAlpha": 1,
        "tickThickness": 2,
        "tickAlpha": 1,
        "valueInterval": 20,
        "bands": [
          {
            "color": "#AAAAAA",
            "endValue": 260,
            "startValue": 0
          }
        ],
        "endValue": 260
      }
    ],
    "arrows": [
      {
        "nailAlpha": 1,
        "nailRadius": 10,
        "startWidth": 12,
        "color": "white"
      }
    ]
  });

  var socket = io();

  socket.on('setPressure', function (value) {
    setGaugeValue(value);
  });

  function setGaugeValue(value) {
    gauge.arrows[0].setValue(Math.round(value));
    $('#gauge-value').text(value);
  }

});