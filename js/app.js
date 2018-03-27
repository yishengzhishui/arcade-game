// Enemies our player must avoid
var Enemy = function(y) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';
  this.x = -50;
  this.y = y;
  this.speed = 20 + Math.random() * 100; //Math.random() 生成0～1随机数
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  this.x += this.speed * dt;
  if (this.x > 600) {
    this.x = -50;
    this.speed = 20 + Math.random() * 100;
    this.y = (60 + Math.floor(Math.random() * 3) * 83);
  };

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
  this.sprite = 'images/char-boy.png';
  this.x = 200;
  this.y = 380;
};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(allowedKeys) {
  switch (allowedKeys) {
    case 'left':
      this.x -= 100;
      break;
    case 'right':
      this.x += 100;
      break;
    case 'up':
      this.y -= 80;
      break;
    case 'down':
      this.y += 80;
  };
};

Player.prototype.update = function() {
  //checkout distance between enemy and player
  for (let i = 0; i < allEnemies.length; i++) {
    if ((Math.abs(this.y - allEnemies[i].y)) < 40) {
      if ((Math.abs(this.x - allEnemies[i].x)) < 40) {
        this.x = 200;
        this.y = 380;
      };
    };
  };
  //success
  if (this.y < -10) {
    this.x = 200;
    this.y = 380;
  };
  //the border
  if (this.y > 500) {
    this.y = 380;
  };
  if (this.x > 400) {
    this.x = 400;
  };
  if (this.x < 0) {
    this.x = 0;
  };
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
for (var i = 0; i < 6; i++) {
  var enemy = new Enemy(60 + Math.floor(Math.random() * 3) * 83);
  allEnemies.push(enemy);
};
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
