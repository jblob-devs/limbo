function createLobby(){
    setPlayerPosition(410,500)
    setRespawn(410, 500)
    createTile(400, 610, 200, 60)
}


function runLevel0(){
   

    setPlayerPosition(350,550)
    setRespawn(410, 600)
    console.log("pas")
    createTile(400, 610, 200, 60)
    createTile(180, 530, 100, 60)
    createTile(420, 440, 100, 30)
    createSign(460, 560, "Destination: Limbo")

    createEndpoint(420, 390)
    tsParticles.load({ id: "tsparticles", options: tsoptions});
   
}

///all levels are temp stored here until better thing can be found ;/
function runLevel1(){
    
    setPlayerPosition(410,600)
    setRespawn(410, 500)

    createTile(400, 610, 200, 60)
    createTile(600, 610, 50, 60)
    createTile(800, 540, 80, 30)
    createSign(800, 500, "Fall too far...")
    createTile(1000, 500, 80, 30)
    createSign(1000, 470, "...and the void consumes you")
    createTile(1210, 410, 100, 20)

    createEndpoint(1210, 370)
}

