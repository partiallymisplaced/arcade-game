// Enemies
var Enemy = function() {
    this.sprite = 'images/enemy-bug.png';
    this.x = -101;
    this.y = 219;
    this.speed = 100;
};

let slowBug = new Enemy();
let fastBug = new Enemy();
let superfastBug = new Enemy();

allEnemies = [slowBug];

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  this.x = this.x + this.speed * dt;
  if (this.x > 505) {
    delete this.x;
  }
};

// Draws the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Define player class
// Class requires update(), render() and handleInput() methods

// Instantiate objects

var Player = function () {
  this.sprite = 'images/char-horn-girl.png';
  this.x = 202;
  this.y = 385;
}

let player = new Player();

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.update = function() {
}


Player.prototype.handleInput = function(key) {
  if(key === 'up' && this.y > 0){
    this.y = this.y - 83;
  } else if (key === 'down' && this.y < 385) {
    this.y = this.y + 83;
  } else if (key === 'right' && this.x < 404) {
    this.x = this.x + 101;
  } else if (key === 'left' && this.x > 0) {
    this.x = this.x - 101;
  }
}

// Listens for key presses and sends the keys to Player.handleInput()
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
