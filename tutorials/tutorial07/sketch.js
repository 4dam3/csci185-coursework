function setup() {
    const canvasWidth = window.innerWidth;
    const canvasHeight = window.innerHeight; 
    createCanvas(canvasWidth, canvasHeight);

    // Exercise 1:
    //drawCircle(300, 400, 40, 'yellow');
    //drawCircle(250, 300, 80, 'red');


    // Exercise 2: 
    //drawOval(300, 400, 100, 150, "pink");

    // Exercise 3:
    // drawBullseye(100, 300, 100);
    // drawBullseye(100, 200, 50);
    // drawBullseye(300, 300, 100);

    // Exercise 4:
    drawFace();

    // Exercise 4 (Faces):
drawFace(100, 400, 50);
drawFace(200, 400, 100);
drawFace(300, 400, 50);
drawFace(400, 400, 100);

    drawGrid(canvasWidth, canvasHeight);
}


// modify this function so that it accepts and honors
// the following parameters: centerX, centerY, size, and fillColor
function drawCircle(centerX, centerY, size, fillcolor) {
    fill(fillcolor);
    circle(centerX, centerY, size);
}

// modify this function so that it accepts and honors
// the following parameters: centerX, centerY, sizeX, sizeY, and fillColor
function drawOval(centerX,centerY,sizeX, sizeY, fillcolor) {
    fill(fillcolor);
    ellipse(centerX, centerY, sizeX, sizeY);
}


// modify this function so that it accepts and honors
// the following 3 parameters: centerX, centerY, and size
function drawBullseye(centerX, centerY, size) {
    fill('teal');
    circle(centerX, centerY, size);
    fill('navy');
    circle(centerX, centerY, .75);
    fill('teal');
    circle(centerX, centerY, .5);
    fill('navy');
    circle(centerX, centerY, .25);
}

// modify this function so that it accepts and honors
// the following 3 parameters: centerX, centerY, and size
function drawFace(centerX, centerY, size, facecolor='yellow') {
    fill(facecolor);
    circle(centerX, centerY, size); //100, 400, 50
    fill('black');
    let sf = size / 6;
    circle(centerX - sf, centerY - sf, sf);   //left eye
    circle(centerX + sf, centerY - sf, sf);    //right eye

    //make a mouth
    strokeWeight(size / 25);
    line(
        centerX - sf*2, // x1
        centerY + sf, // y1
        centerX + sf*2, // x2
        centerY + sf, // y2

    ) ; 

    noFill()
    stroke('black');
    curve(
        centerX - sf*2, centerY - 1.5*size,       // control point
        centerX - sf*2, centerY + sf,     // start point
        centerX + sf*2, centerY +sf,     // end point
        centerX + sf*2, centerY - 1.5*size       // control point
    );

}
