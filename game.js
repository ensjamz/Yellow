const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const imageUpload = document.getElementById('imageUpload');
let playerImage = new Image();
let playerReady = false;

imageUpload.addEventListener('change', handleImageUpload);

function handleImageUpload(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      playerImage.onload = function() {
        playerReady = true;
        startGame();
      };
      playerImage.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}

function startGame() {
  if (playerReady) {
    // Initialize game variables
    let playerX = 50;
    let playerY = canvas.height - 100;
    let isJumping = false;
    let jumpSpeed = 0;
    const gravity = 0.5;

    // Game loop
    function gameLoop() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Handle jumping
      if (isJumping) {
        playerY -= jumpSpeed;
        jumpSpeed -= gravity;
        if (playerY >= canvas.height - 100) {
          playerY = canvas.height - 100;
          isJumping = false;
          jumpSpeed = 0;
        }
      }

      // Draw player
      ctx.drawImage(playerImage, playerX, playerY, 50, 50);

      requestAnimationFrame(gameLoop);
    }

    // Event listener for jump
    document.addEventListener('keydown', function(event) {
      if (event.code === 'Space' && !isJumping) {
        isJumping = true;
        jumpSpeed = 10;
      }
    });

    gameLoop();
  }
}