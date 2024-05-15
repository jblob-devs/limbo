
$(document).ready(function(){
  
   tsParticles.load({
    
    id: "title", 

    options:{
        fullScreen: { enable: false, zIndex: -1},
        particles: {
            number: { value: 15,},
            color: {value: "#ffffff"},
            shape: { type: "circle"},
            opacity: {value: 0.7},
            size: {value: 3},
            links: {
                enable: true,
                distance: 50,
                blink:true,
                color: "#ffffff",
                opacity: 1,
                width: 1,
                triangles:{
                    enable:true,
                    color: "#ffffff",
                    opacity: 1
                }
            },
            move: {
                enable: true,
                speed: 2,
                direction: "none",
                random: true,
                straight: false,
                out_mode: "out",
                bounce: false,
                attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 1200
                }
            },
            
        },
        retina_detect: true
    }

   });

  





})

let staroptions = {
    fullScreen: { enable: false, zIndex: -1},
    particles: {
        number: {
          value: 80
        },
        color: {
          value: "#ff0000",
          animation: {
            enable: true,
            speed: 20,
            sync: true
          }
        },
        shape: {
          type: "circle"
        },
        opacity: {
          value: 0.5
        },
        size: {
          value: { min: 1, max: 3 }
        },
        links: {
          enable: true,
          distance: 100,
          color: "random",
          opacity: 0.4,
          width: 1,
          triangles: {
            enable: true,
            color: "#ffffff",
            opacity: 0.1
          }
        },
        move: {
          enable: true,
          speed: 6,
          direction: "none",
          outModes: "out"
        }
      },
      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: "repulse"
          },
          onClick: {
            enable: true,
            mode: "push"
          }
        },
        modes: {
          repulse: {
            distance: 200
          },
          push: {
            quantity: 4
          }
        }
      },
      background: {
        color: "#000000"
      }
    }