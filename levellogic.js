
var interval;
var index = 0;
let string;
var keypressed = false;
var delayInMilliseconds = 1000;
let playerRespawn = {x: 0, y:0}

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

function setRespawn(x,y){
  playerRespawn.x = x
  playerRespawn.y = y
}
function pRespawn(){

  Body.setPosition(playerBlob, {x:playerRespawn.x, y:playerRespawn.y})
  Body.setVelocity(playerBlob, {x:0, y:0})
  playerDead = false;
}

function checkDeaths(){
  Events.on(engine, 'beforeUpdate', function(e) {
    if(playerBlob.position.y > 800){
      killPlayer()
    }

  });
  
}

function setPlayerPosition(thisx,thisy){
  Body.setPosition(playerBlob, {x:thisx, y:thisy})
  Body.setVelocity(playerBlob, {x:0, y:0})
}

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

function start(where){
    $("#startButton").hide();
    $("#title").hide();
    $("#playscreen").show()
    //tutorialDialogue();
    if(where == 'lobby'){
      createLevel('lobby', playerBlob, engine, render)
    }else if(where == 'levelEdit'){
      editon = true;
      Composite.clear(engine.world);
      mode = "place"
      Composite.add(engine.world,[canvasmouse, mConstraint] )
    }else{
      createLevel(0, playerBlob, engine, render)
      Body.setPosition(playerBlob, {x:360, y:560})
    }
   
    //Composite.add(engine.world, [playerBlob]);
    
}

let curLevel = 0;

function createLevel(number, player, engine, render){
    Composite.clear(engine.world);
    Render.stop(render);
    let levelName = `runLevel${number}`
  if(typeof window[levelName] === 'function'){
    window[levelName]();

  }else if(number == 'lobby'){
    createLobby()
  }else{
      createLobby()
  }
  Composite.add(engine.world, player)
  Render.run(render);
  checkDeaths()
      // run the engine
  //Runner.run(runner, engine);

  }
