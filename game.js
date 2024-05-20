const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const spaceship = {
    x: canvas.width / 2 - 25,
    y: canvas.height - 70,
    width: 50,
    height: 50,
    dx: 5
};

const bullet = {
    x: spaceship.x + spaceship.width / 2 - 2.5,
    y: spaceship.y - 10,
    width: 5,
    height: 10,
    dy: 5,
    active: false
};

const invaderRowCount = 3;
const invaderColumnCount = 8;
const invaderWidth = 50;
const invaderHeight = 50;
const invaderPadding = 10;
const invaderOffsetTop = 30;
const invaderOffsetLeft = 30;
let invaders = [];

for (let c = 0; c < invaderColumnCount; c++) {
    invaders[c] = [];
    for (let r = 0; r < invaderRowCount; r++) {
        invaders[c][r] = { x: 0, y: 0, status: 1 };
    }
}

let rightPressed = false;
let leftPressed = false;
let spacePressed = false;

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

function keyDownHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
        rightPressed = true;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        leftPressed = true;
    } else if (e.key === ' ' || e.key === 'Spacebar') {
        if (!bullet.active) {
            bullet.x = spaceship.x + spaceship.width / 2 - bullet.width / 2;
            bullet.y = spaceship.y - bullet.height;
            bullet.active = true;
        }
    }
}

function keyUpHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
        rightPressed = false;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        leftPressed = false;
    }
}

function drawSpaceship() {
    ctx.beginPath();
    ctx.rect(spaceship.x, spaceship.y, spaceship.width, spaceship.height);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.closePath();
}

function drawBullet() {
    if (bullet.active) {
        ctx.beginPath();
        ctx.rect(bullet.x, bullet.y, bullet.width, bullet.height);
        ctx.fillStyle = 'red';
        ctx.fill();
        ctx.closePath();
    }
}

function drawInvaders() {
    for (let c = 0; c < invaderColumnCount; c++) {
        for (let r = 0; r < invaderRowCount; r++) {
            if (invaders[c][r].status === 1) {
                const invaderX = c * (invaderWidth + invaderPadding) + invaderOffsetLeft;
                const invaderY = r * (invaderHeight + invaderPadding) + invaderOffsetTop;
                invaders[c][r].x = invaderX;
                invaders[c][r].y = invaderY;
                ctx.beginPath();
                ctx.rect(invaderX, invaderY, invaderWidth, invaderHeight);
                ctx.fillStyle = 'green';
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function moveSpaceship() {
    if (rightPressed && spaceship.x < canvas.width - spaceship.width) {
        spaceship.x += spaceship.dx;
    } else if (leftPressed && spaceship.x > 0) {
        spaceship.x -= spaceship.dx;
    }
}

function moveBullet() {
    if (bullet.active) {
        bullet.y -= bullet.dy;
        if (bullet.y < 0) {
            bullet.active = false;
        }
    }
}

function collisionDetection() {
    for (let c = 0; c < invaderColumnCount; c++) {
        for (let r = 0; r < invaderRowCount; r++) {
            const invader = invaders[c][r];
            if (invader.status === 1) {
                if (bullet.x > invader.x && bullet.x < invader.x + invaderWidth &&
                    bullet.y > invader.y && bullet.y < invader.y + invaderHeight) {
                    bullet.active = false;
                    invader.status = 0;
                }
            }
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSpaceship();
    drawBullet();
    drawInvaders();
    moveSpaceship();
    moveBullet();
    collisionDetection();
    requestAnimationFrame(draw);
}

draw();
