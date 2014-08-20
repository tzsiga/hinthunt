$(document).ready(function () {

  var gauge = AmCharts.makeChart("gauge",
    {
      "type": "gauge",
      "theme": "none",
      "fontSize": 20,
      "color": "white",
      "axes": [
        {
          "axisThickness": 4,
          "axisAlpha": 1,
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
    }
  );

  var socket = io();

  socket.on('SetPressure', function (value) {
    setGaugeValue(value);
  });

  function setGaugeValue(value) {
    gauge.arrows[0].setValue(Math.round(value));
    $('#gauge-value').text(value);
  }

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