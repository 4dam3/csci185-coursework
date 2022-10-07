const canvasWidth = window.innerWidth;
const canvasHeight = window.innerHeight; 
    
function setup() {
    createCanvas(canvasWidth, canvasHeight);
}

let x = 200;
let speed = 5;
let color = black
let width = 50

function draw() {
    // frameRate(4);
    clear();

    if (x >= 500 - width/2) {
        speed *= -1;
    }

    if (x <= 150 + width/2) {
        speed *= -1;
    }

    // draw walls:
    fill('red');
    rect(100, 0, 50, canvasHeight); // left wall
    rect(500, 0, 50, canvasHeight); // right wall

    // draw circle:
    fill('black');
    circle(x, canvasHeight/2, width);
    x += speed;
    console.log("x position is:", x);

    drawGrid(canvasWidth, canvasHeight);
}

const moveController = ev => {
    console.log(ev.code);
    if (ev.code == 'KeyR') {
        color = 'red';
    }
  
}


// Add event listener on keydown
document.addEventListener('keydown', moveController);
