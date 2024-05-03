
var endpoint;
var endpointdeco1;
var endpointdeco2;
const TILE_CATEGORY = 0x0002;
const KILL_CATEGORY = 0x0003;
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
  },
  customData: {
    type: "tile"
  }
}

let killstaticBodyOptions = {
  isStatic: true,
  collisionFilter:{category: KILL_CATEGORY},
  render: {
      strokeStyle:'red'
  },
  customData: {
    type: "killtile"
  }
}

let rotationSpeed = 0.02;
function createEndpoint(posX, posY){
  //150 530
  endpoint = Bodies.rectangle(posX, posY, 40, 40, { isStatic: true, isSensor:true, render:{strokeStyle:'skyblue'}, customData:{type:'endpoint'} });
  endpointdeco1 = Bodies.rectangle(posX, posY, 30, 30, { isStatic: true,isSensor: true, render:{strokeStyle:'skyblue'}, customData:{type:'endpointdeco1'}});
  endpointdeco2 = Bodies.rectangle(posX, posY, 20, 20, { isStatic: true,isSensor: true, render:{strokeStyle:'skyblue'}, customData:{type:'endpointdeco2'} });
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

function createKillTile(posX, posY, length, width){
  //400 610
  var killtile = Bodies.rectangle(posX, posY, length, width, killstaticBodyOptions);
    Composite.add(engine.world, killtile)
    Events.on(engine, 'collisionStart', function(event){
      //checks if a playerbody and the end point have collided
      event.pairs.forEach(pair => {
              if((pair.bodyA === playerBlob && pair.bodyB === killtile) || 
              (pair.bodyA === killtile && pair.bodyB === playerBlob)) {
                  killPlayer()
              }
      });
  });

  Events.on(engine, 'collisionEnd', event => {
  event.pairs.forEach(pair => {
      if((pair.bodyA === playerBlob && pair.bodyB === endpoint) || 
              (pair.bodyA === endpoint && pair.bodyB === playerBlob)) {
              //label.style.display = 'none'
      }
  });
});

}

function createSign(posX, posY, text){
  var sign = Bodies.circle(posX, posY, 15, { isStatic: true,isSensor: true, render:{strokeStyle:'#eda424'}, customData:{type:'sign'}});
  let exclam1 = Bodies.rectangle(posX,posY -5, 2, 10,{ isStatic: true,isSensor: true, render:{strokeStyle:'#eda424', fillStyle: '#eda424', customData:{type:'signdeco1'}}})
  let exclam2 = Bodies.circle(posX,posY + 7, 2,{ isStatic: true,isSensor: true, render:{strokeStyle:'#eda424' , fillStyle: '#eda424', customData:{type:'signdeco2'}}})
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
var mode = 'none'
var type = "tile"
let editon = false;

setInterval(function(){
  if(editon){
    $("#SwitchMode").show();
   
    /*
    Events.on(mConstraint, 'startdrag', function(event) {
      if (event.body.isStatic) {
          // Temporarily make the body non-static to drag it
          Body.setStatic(event.body, false);
          console.log("vinebom")
      }
  });
  
  Events.on(mConstraint, 'enddrag', function(event) {
      if (event.body.isStatic === false) {
          // Revert the body back to static
          Body.setStatic(event.body, true);
      }
  });
  */
  }else{
    $("#SwitchMode").hide();
    Composite.remove(engine.world,[canvasmouse, mConstraint] )
  }
}, 100)


function changeBodySize(body) {
  Swal.fire({
      title: 'Enter new height and new width of tile',
      html: `
          <input id="swal-input1" class="swal2-input" placeholder="height">
          <input id="swal-input2" class="swal2-input" placeholder="width">
      `,
      focusConfirm: false,
      preConfirm: () => {
          const input1 = document.getElementById('swal-input1').value;
          const input2 = document.getElementById('swal-input2').value;
          return [input1, input2];
      },
      toast: true,
      position: 'top-end',
      showConfirmButton: true,
      confirmButtonText: 'Submit',
  }).then((result) => {
    let newx = body.position.x;
    let newy = body.position.y;
    Composite.remove(engine.world, [body])
    createTile(newx, newy, result.value[0], result.value[1] )
  });
}
function leveleditplacetile(x, y, h ,w){
  if(type == "tile"){
    createTile(x,y,h ,w)
  }else if(type == "killtile"){ 
    createKillTile(x,y,h,w)
  }
}
let levelEditRespawnPoint = {x:0, y:0}
function setleveleditrespawn(){
  type = "respawntile"
}


function switchTypeMode(){
  if(type == "tile"){
      type="killtile"
      document.getElementById("switchTypeButton").innerHTML = "Currently: <br> Kill Tile"
  }else if(type == 'killtile'){
      type="tile"
      document.getElementById("switchTypeButton").innerHTML  = "Currently: <br> Tile"
  }
}

// checks if a body of the type/is passed already exists in the world
function bodyExists(body){
  for(let i =0; i<engine.world.bodies.length; i++){
    let curbod = engine.world.bodies[i]
    if(curbod === body){
      return true;
    }
  }
  return false;
}