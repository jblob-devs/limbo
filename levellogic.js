
var interval;
var index = 0;
let string;
var keypressed = false;
var delayInMilliseconds = 1000;

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))


$(document).ready(function(){
  $("#eyes").hide();
});


function typewriter() {
  if (index >= string.length) {
    clearInterval(interval);
  } else {
    $("#textBox").append(string[index]);
    index++;
   
  }
}

function updateEyes() {

  const eyes = document.querySelectorAll('.eye');
  eyes.forEach(eye => {
      const eyeRect = eye.getBoundingClientRect();
      const eyeCenterX = eyeRect.left + eyeRect.width / 2;
      const eyeCenterY = eyeRect.top + eyeRect.height / 2;
      const dx = playerBlob.position.x - eyeCenterX;
      const dy = playerBlob.position.y - eyeCenterY;
      const angle = Math.atan2(dy, dx)  - Math.PI / 2;
      eye.style.transform = `rotate(${angle}rad)`;
  });
  
}

function setText(word){
  index=0;
    $("#textBox").html("")
    string = word;
    interval = setInterval(typewriter, 200);
}


let tutorialDialogue = async()=>{
    await sleep(1000)
    $("#eyes").fadeToggle(500);
    await sleep(500)
    setText("hmm?")
    await sleep(2000)
    setText("oh!")
    await sleep(1000)
    $("#textBox").html("")
    $("#eyes").fadeToggle(500);


}

function start(){
    $("#startButton").hide();
    $("#title").slideUp();
    tutorialDialogue();
}


function createLevel(number, player, engine, render, canvas){
    Composite.clear(engine.world);
    Render.stop(render);
 
  if(number == 1){
      let ground = Bodies.rectangle(250, 600, 610, 50, { isStatic: true, collisionFilter:{category: TILE_CATEGORY} });
      Composite.add(engine.world, [ground, player])
  }


  Render.run(render);
  let runner = Runner.create();

      // run the engine
  Runner.run(runner, engine);

  }
