$("#command-line").focus();

var commandHistory = new Array();
var commandCounter = 0;

function prevCommand() {
  if (commandCounter > 0)
    return commandHistory[--commandCounter];
  return commandHistory[commandCounter];
}

function nextCommand() {
  if (commandCounter < commandHistory.length)
    return commandHistory[++commandCounter];
  return commandHistory[commandCounter];
}

$("#command-enter").click(function () {
  runCommand($("#command-line").val());
});

$("html").keydown(function (e) {
  switch (e.keyCode) {
    case 13: // enter
      runCommand($("#command-line").val());
      break;
    case 38: // up
      $("#command-line").val(prevCommand());
      break;
    case 40: // down
      $("#command-line").val(nextCommand());
      break;
  }
});

function runCommand(command) {
  commandHistory.push(command);
  commandCounter = commandHistory.length;

  $("#command-line").val("");

  if (!isValid(command)) {
    display(command + ": command not found");
  } else {
    switch (command) {
      case "clear":
        $("#command-output").text("");
        break;
      case "necessary":
        display("necessary<br/>And so it is...");
        break;
      default:
        display(command + "<br/>The password is necessary!");
    }
  }
}

function isValid(command) {
  return command !== "x";
}

function display(message) {
  $("#command-output")
    .append("> " + message + "<br/>")
    .scrollTop($("#command-output")[0].scrollHeight);
}