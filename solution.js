var colors = ["red", "green", "blue", "yellow"];
var simon = {};

// Select "#game-info button" (the "button" tags inside a "game-info" id)
// On click, executes the function
$("#game-info button").on("click", function() {
  init(simon);
});


function init(simon) {
  console.log("FUNCTION init");

  // Initialisation of simon properties
  simon.sequence = [];
  simon.userClickCount = 0;
  simon.round = 1;
  
  updateRound(simon);
  generateSequence(simon, 3);
  showSequence(simon);
  $(".btn").unbind("click");
  $(".btn").on("click", function() { checkUserInput(simon, this)} );
  $("#game-info button").addClass("blocked");
  $("#game-info button").text("Playing...");
} 

function updateRound(simon) {
  $("#counter").text(simon.round);
}

function generateSequence(simon, quantity) {
  for (var i = 0; i < quantity; i++) {
    var generatedColor = colors[generateRandom()];
    simon.sequence.push(generatedColor);
  }
}

function showSequence(simon) {
  $("#simon").addClass("blocked");
  var i = 0;
  var interval = setInterval(function() {
    $(".btn").removeClass("active");

    if (i < simon.sequence.length) {
      $(".btn-" + simon.sequence[i]).addClass("active");
    } else {
      console.log("BLOCKED");
      $("#simon").removeClass("blocked");
      clearInterval(interval);
    }

    setTimeout(function() {
      $(".btn").removeClass("active");
    }, 700);

    i++;
  }, 1000);
}

function checkUserInput(simon, element) {
  var inputColor = $(element).data("color");

  console.log(inputColor);

  if (simon.sequence[simon.userClickCount] === inputColor) {
    simon.userClickCount++;
  } else {
    gameOver();
  }

  if (simon.userClickCount === simon.sequence.length) {
    finishedRound(simon);
  }
}

function gameOver() {
  var i = 0;
  var intervalId = setInterval(function() {
    $(".btn").toggleClass("active");
    i++;
    if (i == 6) {
      clearInterval(intervalId);
    }
  }, 300);

  $("#game-info").find("button").removeClass("blocked").text("Game Over, Play again");
}

function finishedRound (simon) {
  generateSequence(simon, 1);
  showSequence(simon);
  simon.userClickCount = 0;
  simon.round++;
  updateRound(simon);
}

function generateRandom() {
  return Math.floor(Math.random() * 4);
}
