document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('space-invaders');
    const ctx = canvas.getContext('2d');

    const alienRowCount = 3;
    const alienColumnCount = 10;
    const alienWidth = 50;
    const alienHeight = 30;
    const alienPadding = 10;
    const alienOffsetTop = 30;
    const alienOffsetLeft = 30;
    const playerHeight = 30;
    const playerWidth = 50;
    const playerSpeed = 7;
    const bulletWidth = 4;
    const bulletHeight = 10;
    const bulletSpeed = 7;

    let rightPressed = false;
    let leftPressed = false;
    let spacePressed = false;
    let aliens = [];
    let bullets = [];
    let playerX = (canvas.width - playerWidth) / 2;

    for (let c = 0; c < alienColumnCount; c++) {
        aliens[c] = [];
        for (let r = 0; r < alienRowCount; r++) {
            aliens[c][r] = { x: 0, y: 0, status: 1 };
        }
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Right' || e.key === 'ArrowRight') {
            rightPressed = true;
        } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
            leftPressed = true;
        } else if (e.key === ' ' || e.key === 'Spacebar') {
            spacePressed = true;
        }
    });

    document.addEventListener('keyup', (e) => {
        if (e.key === 'Right' || e.key === 'ArrowRight') {
            rightPressed = false;
        } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
            leftPressed = false;
        } else if (e.key === ' ' || e.key === 'Spacebar') {
            spacePressed = false;
        }
    });

    function drawAliens() {
        for (let c = 0; c < alienColumnCount; c++) {
            for (let r = 0; r < alienRowCount; r++) {
                if (aliens[c][r].status === 1) {
                    const alienX = c * (alienWidth + alienPadding) + alienOffsetLeft;
                    const alienY = r * (alienHeight + alienPadding) + alienOffsetTop;
                    aliens[c][r].x = alienX;
                    aliens[c][r].y = alienY;
                    ctx.beginPath();
                    ctx.rect(alienX, alienY, alienWidth, alienHeight);
                    ctx.fillStyle = '#00ff00';
                    ctx.fill();
                    ctx.closePath();
                }
            }
        }
    }

    function drawPlayer() {
        ctx.beginPath();
        ctx.rect(playerX, canvas.height - playerHeight, playerWidth, playerHeight);
        ctx.fillStyle = '#0095DD';
        ctx.fill();
        ctx.closePath();
    }

    function movePlayer() {
        if (rightPressed && playerX < canvas.width - playerWidth) {
            playerX += playerSpeed;
        } else if (leftPressed && playerX > 0) {
            playerX -= playerSpeed;
        }
    }

    function drawBullets() {
        bullets.forEach((bullet, index) => {
            ctx.beginPath();
            ctx.rect(bullet.x, bullet.y, bulletWidth, bulletHeight);
            ctx.fillStyle = '#ff0000';
            ctx.fill();
            ctx.closePath();
            bullet.y -= bulletSpeed;

            if (bullet.y + bulletHeight < 0) {
                bullets.splice(index, 1);
            }

            aliens.forEach((column) => {
                column.forEach((alien) => {
                    if (alien.status === 1 && bullet.x > alien.x && bullet.x < alien.x + alienWidth && bullet.y > alien.y && bullet.y < alien.y + alienHeight) {
                        alien.status = 0;
                        bullet.status = 0;
                    }
                });
            });

            bullets = bullets.filter(bullet => bullet.status !== 0);
        });
    }

    function shootBullet() {
        if (spacePressed) {
            bullets.push({ x: playerX + playerWidth / 2 - bulletWidth / 2, y: canvas.height - playerHeight - bulletHeight, status: 1 });
            spacePressed = false;
        }
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawAliens();
        drawPlayer();
        drawBullets();
        movePlayer();
        shootBullet();
        requestAnimationFrame(draw);
    }

    draw();
});
