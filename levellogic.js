
var interval;
var index = 0;
let string;
function typewriter() {
  if (index >= string.length) {
    clearInterval(interval);
  } else {
    $("#textBox").append(string[index]);
    index++;
   
  }
}

function setText(word){
    string = word;
    interval = setInterval(typewriter, 200);
}


function tutorialDialogue(){
    setText("hmm?")
}

function start(){
    $("#startButton").hide();
    $("#title").slideUp();
    tutorialDialogue();
}

