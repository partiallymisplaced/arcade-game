// Enemies
var Enemy = function(x, y, speed) {
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Updates the enemy's position every dt (time delta between ticks)
Enemy.prototype.update = function(dt) {
  this.x = this.x + this.speed * dt;
  if (this.x > 505) {
    this.x = -101;
  }
};

// Draws the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

let slowBugOne = new Enemy(-101, 219, 100);
let slowBugTwo = new Enemy(-401, 219, 100);
let superfastBugOne = new Enemy(-201, 136, 200);
let superfastBugTwo = new Enemy(-501, 136, 200);
let fastBugOne = new Enemy(-151, 53 , 150);
let fastBugTwo = new Enemy(-451, 53 , 150);

allEnemies = [slowBugOne, slowBugTwo, superfastBugOne, superfastBugTwo, fastBugOne, fastBugTwo];


// Define player class
// Class requires update(), render() and handleInput() methods

// Instantiate objects

var Player = function() {
  this.sprite = 'images/char-horn-girl.png';
  this.x = 202;
  this.y = 385;
}

let player = new Player();

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.reset = function() {
  this.y = 385;
  this.x = 202;

}

Player.prototype.update = function() {
  if(this.y === -30) {
    setTimeout(function(){
      player.reset()
    }, 100);
  }
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
