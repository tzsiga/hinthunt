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
      case "help":
        display("help text goes here</br>bla bla blah");
        break;
      case "lorem":
        display("Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.");
        break;
      default:
        display(command);
    }

    // send command to core
    // print command result
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

/*
$.getJSON("external.json", function(data){
  console.log(data);
});
*/