$(document).ready(function () {
  var codeTable = [];
  /*
  codeTable[32] = "Space";
  codeTable[37] = "Left";
  codeTable[38] = "Up";
  codeTable[39] = "Right";
  codeTable[40] = "Down";
  codeTable[48] = "0";
  codeTable[49] = "1";
  codeTable[50] = "2";
  codeTable[51] = "3";
  codeTable[52] = "4";
  codeTable[53] = "5";
  codeTable[54] = "6";
  codeTable[55] = "7";
  codeTable[56] = "8";
  codeTable[57] = "9";
  */
  codeTable[65] = "A";
  codeTable[66] = "B";
  codeTable[67] = "C";
  codeTable[68] = "D";
  codeTable[69] = "E";
  codeTable[70] = "F";
  codeTable[71] = "G";
  codeTable[72] = "H";
  codeTable[73] = "I";
  codeTable[74] = "J";
  codeTable[75] = "K";
  codeTable[76] = "L";
  codeTable[77] = "M";
  codeTable[78] = "N";
  codeTable[79] = "O";
  codeTable[80] = "P";
  codeTable[81] = "Q";
  codeTable[82] = "R";
  codeTable[83] = "S";
  codeTable[84] = "T";
  codeTable[85] = "U";
  codeTable[86] = "V";
  codeTable[87] = "W";
  codeTable[88] = "X";
  codeTable[89] = "Y";
  codeTable[90] = "Z";

  var keyesPressed = [];

  $('html')
    .keydown(function (e) {
      var pressed = codeTable[e.keyCode];

      if (pressed !== undefined) {
        e.preventDefault();
        $("#_" + pressed).addClass('key-pressed');
      }
    })
    .keyup(function (e) {
      var pressed = codeTable[e.keyCode];

      if (pressed !== undefined) {
        $("#_" + pressed).removeClass('key-pressed');
        keyesPressed.push(e.keyCode);
        //console.log(keyesPressed);
      }
    });
});