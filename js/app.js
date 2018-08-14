// Enemies
var Enemy = function() {
    this.sprite = 'images/enemy-bug.png';
    this.x = -101;
    this.y = 219;
    this.speed = 10;
};

let slowBug = new Enemy();
let fastBug = new Enemy();
let superfastBug = new Enemy();

allEnemies = [slowBug]

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // Multiply any movement by the dt parameter which will ensure the game runs at the same speed for all computers.
    this.x = this.x + this.speed * dt;
};

// Draws the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Define player class
// Class requires update(), render() and handleInput() methods


// Instantiate objects
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var Player = function () {
  this.sprite = 'images/char-horn-girl.png';
  this.x = 202;
  this.y = 385;
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.update = function() {
}

let player = new Player();

// Listens for key presses and sends the keys to Player.handleInput()
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    // player.handleInput(allowedKeys[e.keyCode]);
});
