let canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let c = canvas.getContext('2d');



let mouse = {

    x: undefined,
    y: undefined
}

const maxNegVelocity = -5.5;
const maxPosVelocity = 5.5;
const minNegVelocity = -0.5;
const minPosVelocity = 0.5;

// let maxRadius = 40;
// let minRadius = 2;

// let pinkArray = [
//     '#F595E1',
//     '#E157E6',
//     '#C475E0',
//     '#470F61',
//     '#AE0172'

// ]

// let blueArray = [
//     '#091140',
//     '#181D26',
//     '#364659',
//     '#8596A6',
//     '#BACBD9'
// ]

// let jupiterArray = [
//     '#F2E8D5',
//     '#F2AF88',
//     '#8C0B0B',
//     '#D92323',
//     '#400A0A'
// ]

// let auroraArray = [
//     '#172026',
//     '#5FCDD9',
//     '#027373',
//     '#04BFAD',
//     '#04BF9D'
// ]

// let sunsetArray = [
//     '#D9910B',
//     '#F2780C',
//     '#F24607',
//     '#591C05',
//     '#BF0A0A',
// ]

// let amtArray = [
//     '#BF0000',
//     '#000000',
//     '#424242',
//     '#898A8A',
//     '#E0E5E4'
// ]

// let arrays = [
//     pinkArray,
//     blueArray,
//     jupiterArray,
//     auroraArray,
//     sunsetArray,
//     amtArray
// ]

// function chooseArray(arrays) {
    
//     const length = arrays.length;
//     const randomIndex = Math.floor(Math.random() * length);
//     return arrays[randomIndex];
//   }

// let colorArray = chooseArray(arrays);

// window.addEventListener('mousemove', 
//     function(event){
//         mouse.x = event.x;
//         mouse.y = event.y;
//        // console.log(mouse)
//     })

// Event Listeners
addEventListener('mousemove', (event) => {
    mouse.x = event.clientX
    mouse.y = event.clientY
  });

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    init();

});

function randomIntFromRange(min, max) {
  
    return Math.floor(Math.random()*(max-min+1)+min);
  };
  
  function randomColor() {
    const randomColor = "#" + Math.floor(Math.random()*16777215).toString(16);
    return randomColor;
  };
  
  function distance(x1, y1, x2, y2) {
    let xDistance = x2-x1;
    let yDistance = y2-y1;
  
    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
  };

// Objects
class Particle {
    constructor(x, y, radius, color) {
      this.x = x;
      this.y = y;
      this.velocity = {
        x: (Math.random() - 0.5) * 5,
        y: (Math.random() - 0.5) * 5
      };
      this.radius = radius;
      this.color = color;
      this.mass = 1;
    }
  
    draw() {
      c.beginPath()
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
      
      c.fillStyle = this.color;
      c.shadowBlur = 8;
      c.shadowOffsetX = 3;
      c.shadowOffsetY = 3;
      c.shadowColor = 'black';
      c.fill();
      
      c.closePath()
    }

    
  
    update(particles) {
      this.draw();
      for (let i = 0; i < particles.length; i++) {
  
        totalVelocity = totalVelocity + particles[i].velocity.x + particles[i].velocity.y;
        
        //to keep velocities in check
        if (this.velocity.x > maxPosVelocity || this.velocity.x < maxNegVelocity || this.velocity.y > maxPosVelocity || this.velocity.y < maxNegVelocity) {
          this.velocity.x = (this.velocity.x * 0.998);
          this.velocity.y = (this.velocity.y * 0.998);
        }
  
        if (this === particles[i]) {
          continue;
        }
        //for two items colliding
        if (distance(this.x, this.y, particles[i].x, particles[i].y) - (this.radius + particles[i].radius) < 0) {
          collisionResolve(this, particles[i]);
  
          //for if two items get stuck together
          while (distance(this.x, this.y, particles[i].x, particles[i].y) - (this.radius + particles[i].radius) < 0){
  
            if (this.x > particles[i].x && this.y > particles[i].y) {
              this.x += 1;
              this.y +=1;
            } else if (this.x < particles[i].x && this.y > particles[i].y) {
              this.x -= 1;
              this.y +=1;
            } else if (this.x > particles[i].x && this.y < particles[i].y) {
              this.x += 1;
              this.y -=1;
            } else if (this.x < particles[i].x && this.y < particles[i].y) {
              this.x -= 1;
              this.y -=1;
            };
          };
       }
      }
  
      // ((((mouse.x - 20) - this.x > 10 && (mouse.x - 20) - this.x < this.radius + 10 && (mouse.y - 10) - this.y > 10 && (mouse.y - 0) - this.y < this.radius + 10) || ((mouse.x - 5) - this.x < 10 && (mouse.x - 10) - this.x > -this.radius && (mouse.y - 0) - this.y < 10 && (mouse.y - 10) - this.y > -this.radius)) && ((mouse.x - 10) < innerWidth || (mouse.y - 10) < innerHeight) )
  
  
      
      //interactivity
      if (distance(this.x, this.y, mouse.x-10, mouse.y-10) - (this.radius + 10) < 0) {
        
        if (((mouse.x - 10) > this.x && this.velocity.x >= 0) || ((mouse.x - 10) < this.x && this.velocity.x <= 0)) {
          this.velocity.x = -this.velocity.x;
          this.velocity.x = (this.velocity.x * 2);
        } else {
          this.velocity.x = (this.velocity.x * 2);
        };
  
        if (((mouse.y - 0) > this.y && this.velocity.y > 0) || ((mouse.y - 0) < this.y && this.velocity.y < 0)) {
          this.velocity.y = -this.velocity.y;
          this.velocity.y = (this.velocity.y * 2);
        } else {
          this.velocity.y = (this.velocity.y * 2);
        };
        
        var p = 0;
        while (p < 5) {
          this.velocity.x = (this.velocity.x * 1.003);
          this.velocity.y = (this.velocity.y * 1.003);
          p++;
        }
  
        var q = 0;
        while (q < 5) {
          this.velocity.x = (this.velocity.x * 0.998);
          this.velocity.y = (this.velocity.y * 0.998);
          q++;
        }
        
      }
      //to bounce off the edge
      if (this.x - this.radius <= 0 || this.x + this.radius >= innerWidth) {
        if (this.x-this.radius <= 0) {
          this.x -= (this.x-this.radius);
        } 
        
        if (this.x + this.radius >= innerWidth) {
          this.x -= ((this.x + this.radius)-innerWidth);
          
        }  
        this.velocity.x = -this.velocity.x;
      }
  
      if (this.y - this.radius <= 0 || this.y + this.radius >= innerHeight) {
        if (this.y-this.radius <= 0) {
          this.y -= (this.y-this.radius);
        } 
        
        if (this.y + this.radius >= innerHeight) {
          this.y -= ((this.y + this.radius)-innerHeight);
          
        }
        this.velocity.y = -this.velocity.y;
      }
  
      this.x += this.velocity.x;
      this.y += this.velocity.y;
  
    }
  }

  function collisionResolve(particle, otherParticle) {
    let radiusRatio = (particle.radius / otherParticle.radius);
    let swapXVelocity = particle.velocity.x;
    let swapYVelocity = particle.velocity.y;
    particle.velocity.x = (otherParticle.velocity.x / radiusRatio);
    particle.velocity.y = (otherParticle.velocity.y / radiusRatio);
    otherParticle.velocity.x = (swapXVelocity * radiusRatio);
    otherParticle.velocity.y = (swapYVelocity * radiusRatio);
    if (particle.radius < otherParticle.radius && (
      (particle.velocity.x > 0 && otherParticle.velocity.x > 0 && particle.velocity.y > 0 && otherParticle.velocity.y > 0 && particle.x < otherParticle.x) || 
      (particle.velocity.x > 0 && otherParticle.velocity.x > 0 && particle.velocity.y < 0 && otherParticle.velocity.y < 0 && particle.x < otherParticle.x) || 
      (particle.velocity.x < 0 && otherParticle.velocity.x < 0 && particle.velocity.y > 0 && otherParticle.velocity.y > 0 && particle.y < otherParticle.y) || 
      (particle.velocity.x < 0 && otherParticle.velocity.x < 0 && particle.velocity.y < 0 && otherParticle.velocity.y < 0 && particle.y < otherParticle.y))) {
  
      particle.velocity.x = -(particle.velocity.x * 0.975);
      particle.velocity.y = -(particle.velocity.y * 0.975);
      otherParticle.velocity.x = (otherParticle.velocity.x / 0.975);
      otherParticle.velocity.y = (otherParticle.velocity.y / 0.975);
    } 
    if (particle.radius > otherParticle.radius && (
      (particle.velocity.x > 0 && otherParticle.velocity.x > 0 && particle.velocity.y > 0 && otherParticle.velocity.y > 0 && particle.x > otherParticle.x) || 
      (particle.velocity.x > 0 && otherParticle.velocity.x > 0 && particle.velocity.y < 0 && otherParticle.velocity.y < 0 && particle.x > otherParticle.x) || 
      (particle.velocity.x < 0 && otherParticle.velocity.x < 0 && particle.velocity.y > 0 && otherParticle.velocity.y > 0 && particle.y > otherParticle.y) || 
      (particle.velocity.x < 0 && otherParticle.velocity.x < 0 && particle.velocity.y < 0 && otherParticle.velocity.y < 0 && particle.y > otherParticle.y))) {

      otherParticle.velocity.x = -(otherParticle.velocity.x * 0.975);
      otherParticle.velocity.y = -(otherParticle.velocity.y * 0.975);
      particle.velocity.x = (particle.velocity.x / 0.975);
      particle.velocity.y = (particle.velocity.y / 0.975);
    }  
  }

  // Implementation
let particles;
function init() {
  particles = [];
 
  for (let i = 0; i < 30; i++) {
     createParticle(i);
  }
}

function createParticle(i) {
    // const radius = 65;
    const radius = randomIntFromRange(10, 55);
      let x = randomIntFromRange(radius, canvas.width - radius);
      let y  = randomIntFromRange(radius, canvas.height - radius);
      const color = randomColor();
  
      if (i !=0) {
        for (let j = 0; j < particles.length; j++) {
          if (distance(x, y, particles[j].x, particles[j].y) - radius * 2 < 0) {
             x = randomIntFromRange(radius, canvas.width - radius);
             y  = randomIntFromRange(radius, canvas.height - radius);
  
             j = -1;
          }
          
        }
      }
  
      particles.push(new Particle(x, y, radius, color));
  }
  var totalVelocity = 0;
  
  // Animation Loop
  function animate() {
    
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    particles.forEach(particle => {
      particle.update(particles);
    })
  
    c.beginPath()
      c.arc(mouse.x - 10, mouse.y - 10, 10, 0, Math.PI * 2, false)
      c.fillStyle = 'red';
      c.fill();
      c.closePath()
  
  }
  init();
  animate();


//  let circleArray = [];

// function init() {

//    circleArray = [];

//     for (let i = 0; i < 800; i++) {
//         let radius = Math.random() * 3 + 1 ;
//         let x = Math.random() * (innerWidth - radius * 2) + radius;
//         let y = Math.random() * (innerHeight - radius * 2) + radius;
//         let dx = (Math.random() - 0.5) * 4;
//         let dy = (Math.random() - 0.5) * 4;
        
//         circleArray.push(new Circle(x, y, dx, dy, radius));  
// }
// }


// function animate() {
//     requestAnimationFrame(animate);
//     c.clearRect(0, 0, innerWidth, innerHeight);

//     for (let i = 0; i < circleArray.length; i++) {

//         circleArray[i].update();
//     }

   
// }

// init();
// animate();
