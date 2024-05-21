document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('space-invaders');
  const ctx = canvas.getContext('2d');

  // ... (Your existing game constants) ...

  // Game State Variables
  let rightPressed = false;
  let leftPressed = false;
  let spacePressed = false;
  let aliens = [];
  let bullets = [];
  let playerX = (canvas.width - playerWidth) / 2;
  let score = 0;
  let gameOver = false;
  let gameStart = false; // Flag to track if game has started
  let alienDirection = 1; // 1 for right, -1 for left
  let alienSpeed = 0.5; // Initial alien speed

  // ... (Your existing alien initialization) ...

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
      rightPressed = true;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
      leftPressed = true;
    } else if ((e.key === ' ' || e.key === 'Spacebar') && !gameOver && gameStart) {
      spacePressed = true;
    } else if (e.key === 'Enter' && !gameStart) {
      gameStart = true; // Start the game on Enter key press
      draw(); // Start the game loop
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
    // ... (Your existing drawAliens() function) ...
    
    // Alien movement and edge detection
    let hitEdge = false; // Flag to check if aliens hit an edge
    for (let c = 0; c < alienColumnCount; c++) {
      for (let r = 0; r < alienRowCount; r++) {
        if (aliens[c][r].status === 1) {
          aliens[c][r].x += alienDirection * alienSpeed;
          if (aliens[c][r].x + alienWidth > canvas.width || aliens[c][r].x < 0) {
            hitEdge = true;
          }
        }
      }
    }
    if (hitEdge) {
      alienDirection = -alienDirection; // Reverse direction
      aliens.forEach(row => row.forEach(alien => alien.y += alienHeight / 2)); // Move down
      alienSpeed += 0.1; // Increase speed slightly
    }
  }

  // ... (Your existing drawPlayer(), movePlayer(), drawBullets(), and shootBullet() functions) ...

  function checkGameOver() {
    for (let c = 0; c < alienColumnCount; c++) {
      for (let r = 0; r < alienRowCount; r++) {
        if (aliens[c][r].status === 1 && aliens[c][r].y + alienHeight > canvas.height - playerHeight) {
          gameOver = true;
          alert("GAME OVER");
        }
      }
    }

    if (aliens.every(row => row.every(alien => alien.status === 0))) {
      gameOver = true;
      alert("YOU WIN");
    }
  }

  function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#fff";
    ctx.fillText("Score: " + score, 8, 20);
  }

  function draw() {
    if (!gameOver && gameStart) { // Check if game has started and not over
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawAliens();
      drawPlayer();
      drawBullets();
      movePlayer();
      shootBullet();
      checkGameOver();
      drawScore();
      requestAnimationFrame(draw);
    } else if (!gameStart) {
      ctx.font = "30px Arial";
      ctx.fillStyle = "#fff";
      ctx.fillText("Press Enter to Start", canvas.width / 2 - 150, canvas.height / 2); 
    }
  }

  // Don't start the game loop initially, wait for Enter key press
});
