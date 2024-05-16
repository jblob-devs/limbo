

var tsoptions = 
{
    fullScreen: { enable: false, zIndex: -10},
    background:{
        zIndex: -10,
    },
    particles: {
        number: { value: 10,},
        color: {value: "#ffffff"},
        shape: { type: "circle"},
        opacity: {value: 0.7},
        size: {value: 3},
        links: {
            enable: true,
            distance: 100,
            color: "#ffffff"
        },
        move: {
            enable: true,
            speed: 2,
            direction: "none",
            random: true,
            straight: false,
            out_mode: "bounce",
            bounce: true,
            attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200
            }
        },
        
  },
    retina_detect: true

}

$(document).ready(function(){
    tsParticles.load({ id: "title", options: tsoptions})
 })
 

 function clearParticles(){
    $("#tsparticles").empty()
 }