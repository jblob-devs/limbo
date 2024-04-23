
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
    $("#title").hide();
    $("#playscreen").show()
    //tutorialDialogue();
}
var endpoint;
var endpointdeco1;
var endpointdeco2;

  function removeEndpoint(){
    Composite.remove(engine.world, endpoint)
    Composite.remove(engine.world, endpointdeco1)
    Composite.remove(engine.world, endpointdeco2)
  }

let rotationSpeed = 0.02;
function createEndpoint(posX, posY){
  //150 530
  endpoint = Bodies.rectangle(posX, posY, 40, 40, { isStatic: true, isSensor:true, render:{strokeStyle:'skyblue'} });
  endpointdeco1 = Bodies.rectangle(posX, posY, 30, 30, { isStatic: true,isSensor: true, render:{strokeStyle:'skyblue'}});
  endpointdeco2 = Bodies.rectangle(posX, posY, 20, 20, { isStatic: true,isSensor: true, render:{strokeStyle:'skyblue'} });
   // Adjust as needed
    setInterval(() => {
        Body.rotate(endpoint, rotationSpeed);
        Body.rotate(endpointdeco1, rotationSpeed * 2);
        Body.rotate(endpointdeco2, rotationSpeed * 3);
    }, 1000 / 60);
    Events.on(engine, 'collisionStart', function(event){
      //checks if a playerbody and the end point have collided
      event.pairs.forEach(pair => {

              if((pair.bodyA === playerBlob && pair.bodyB === endpoint) || 
              (pair.bodyA === endpoint && pair.bodyB === playerBlob)) {
                  updateLabel(posX, posY, "press s to enter")
              }
      });
  });

  Events.on(engine, 'collisionEnd', event => {
  event.pairs.forEach(pair => {
      if((pair.bodyA === playerBlob && pair.bodyB === endpoint) || 
              (pair.bodyA === endpoint && pair.bodyB === playerBlob)) {
              label.style.display = 'none'
      }
  });
  });


  Composite.add(engine.world, [endpoint, endpointdeco1, endpointdeco2])
}

function createTile(posX, posY, length, width){
  //400 610
  var tile = Bodies.rectangle(posX, posY, length, width, { isStatic: true, collisionFilter:{category: TILE_CATEGORY} });
    Composite.add(engine.world, tile)
}

function createSign(posX, posY, text){
  var sign = Bodies.circle(posX, posY, 15, { isStatic: true,isSensor: true, render:{strokeStyle:'#eda424'}});
  let exclam1 = Bodies.rectangle(posX,posY -5, 2, 10,{ isStatic: true,isSensor: true, render:{strokeStyle:'#eda424', fillStyle: '#eda424'}})
  let exclam2 = Bodies.circle(posX,posY + 7, 2,{ isStatic: true,isSensor: true, render:{strokeStyle:'#eda424' , fillStyle: '#eda424'}})
  Events.on(engine, 'collisionStart', function(event){
    //checks if a playerbody and the end point have collided
    event.pairs.forEach(pair => {

            if((pair.bodyA === playerBlob && pair.bodyB === sign) || 
            (pair.bodyA === sign && pair.bodyB === playerBlob)) {
              console.log(posX, posY)
                updateLabel(posX, posY, text)
                label.style.display = 'absolute'
                //smoothZoomIn(engine.world, 1.1, 1000)
            }
    });
});
Events.on(engine, 'collisionEnd', event => {
  event.pairs.forEach(pair => {
      if((pair.bodyA === playerBlob && pair.bodyB === sign) || 
              (pair.bodyA === sign && pair.bodyB === playerBlob)) {
              label.style.display = 'none'
              //smoothZoomIn(engine.world, 1, 1000)
      }
  });
  });
Composite.add(engine.world, [sign, exclam1, exclam2])
}


let curLevel = 0;

function createLevel(number, player, engine, render){
    Composite.clear(engine.world);
    Render.stop(render);
    let levelName = `runLevel${number}`
  if(typeof window[levelName] === 'function'){
    window[levelName]();
  }else{
      createLobby()
  }
  Composite.add(engine.world, player)
  Render.run(render);
      // run the engine
  //Runner.run(runner, engine);

  }
