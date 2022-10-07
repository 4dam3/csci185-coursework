function setup() {
    const canvasWidth = window.innerWidth;
    const canvasHeight = window.innerHeight;
    createCanvas(canvasWidth, canvasHeight);

    // Once you've created your drawCreature function, 
    // invoke drawCreature 5 times with the following arguments
    // (feel free to change the sizes, positions, and colors):

    // drawCreature(92, 115, 85, '#5e6976', '#1b324d');
    // drawCreature(487, 110, 101, '#bfdc65', '#abb880');
    // drawCreature(454, 423, 141, '#aebb83', '#227876');
    // drawCreature(333, 227, 99, '#94ba77', '#3f5364');
    // drawCreature(117, 314, 91, '#648d8e', '#afc272');
    drawCreature(92, 115, 85, '#5e6976', '#1b324d');
    drawGrid(canvasWidth, canvasHeight);
}

// define your drawCreature function here:

function drawCreature(x, y, size, primaryColor, secondaryColor) {
    strokeWeight(10);
    fill(primaryColor);
    circle(x * 1.5, y * 1.5, size);
    fill(secondaryColor);
    triangle(x - 2, y - 2, x - 3, y - 3, x - 4, y - 4)
    fill(secondaryColor);
    triangle(x + 2, y + 2, x + 3, y + 3, x + 4, y + 4)
    fill('black');
    ellipse(x*1.5, y*1.5, size/20);
    // strokeWeight(size / 25);
    // line(
    //     X - size * 2, // x1
    //     Y + size, // y1
    //     X + size * 2, // x2
    //     Y + size, // y2

    // );
}

