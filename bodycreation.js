
var endpoint;
var endpointdeco1;
var endpointdeco2;
const TILE_CATEGORY = 0x0002;
  function removeEndpoint(){
    Composite.remove(engine.world, endpoint)
    Composite.remove(engine.world, endpointdeco1)
    Composite.remove(engine.world, endpointdeco2)
  }

let staticBodyOptions = {
  isStatic: true,
  collisionFilter:{category: TILE_CATEGORY},
  render: {
      strokeStyle:'white'
  }
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
  var tile = Bodies.rectangle(posX, posY, length, width, staticBodyOptions);
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
