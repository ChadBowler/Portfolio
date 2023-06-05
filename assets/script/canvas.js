let canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let c = canvas.getContext('2d');


let mouse = {

    x: undefined,
    y: undefined
}

let maxRadius = 40;
let minRadius = 2;

let pinkArray = [
    '#F595E1',
    '#E157E6',
    '#C475E0',
    '#470F61',
    '#AE0172'

]

let blueArray = [
    '#091140',
    '#181D26',
    '#364659',
    '#8596A6',
    '#BACBD9'
]

let jupiterArray = [
    '#F2E8D5',
    '#F2AF88',
    '#8C0B0B',
    '#D92323',
    '#400A0A'
]

let auroraArray = [
    '#172026',
    '#5FCDD9',
    '#027373',
    '#04BFAD',
    '#04BF9D'
]

let sunsetArray = [
    '#D9910B',
    '#F2780C',
    '#F24607',
    '#591C05',
    '#BF0A0A',
]

let amtArray = [
    '#BF0000',
    '#000000',
    '#424242',
    '#898A8A',
    '#E0E5E4'
]

let arrays = [
    pinkArray,
    blueArray,
    jupiterArray,
    auroraArray,
    sunsetArray,
    amtArray
]

function chooseArray(arrays) {
    
    const length = arrays.length;
    const randomIndex = Math.floor(Math.random() * length);
    return arrays[randomIndex];
  }

let colorArray = chooseArray(arrays);

window.addEventListener('mousemove', 
    function(event){
        mouse.x = event.x;
        mouse.y = event.y;
       // console.log(mouse)
    })

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    init();

})

function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

    const randomColor = Math.floor(Math.random()*16777215).toString(16);

    this.draw = function() {
        
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        c.strokeStyle =this.color;
        c.stroke();
        c.fillStyle = this.color;
        c.fill();

    }

    this.update = function() {

        
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0 ) {
            this.dx = -this.dx;
        }

        if (this.y + this.radius > innerHeight || this.y - this.radius <0){

            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;

        // interactivity
        if (mouse.x - this.x < 100 && mouse.x - this.x > -100
            && mouse.y - this.y < 100 && mouse.y - this.y > -100) 
            {
            if (this.radius < maxRadius) {

            this.radius += 1;}
        } else if (this.radius > minRadius){
            this.radius -= 1;
        }

        this.draw();

    }
}


 let circleArray = [];

function init() {

   circleArray = [];

    for (let i = 0; i < 800; i++) {
        let radius = Math.random() * 3 + 1 ;
        let x = Math.random() * (innerWidth - radius * 2) + radius;
        let y = Math.random() * (innerHeight - radius * 2) + radius;
        let dx = (Math.random() - 0.5) * 4;
        let dy = (Math.random() - 0.5) * 4;
        
        circleArray.push(new Circle(x, y, dx, dy, radius));
    
}


}


function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < circleArray.length; i++) {

        circleArray[i].update();
    }

   
}

init();
animate();
