// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    this.x = x;
    this.y = y;
    this.speed = speed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += dt * this.speed;
    if (this.x >= 505)
        this.x = 0;

    this.isCollision(this);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//this method check if the space of an enemy intersects with the space of the hero
Enemy.prototype.isCollision = function(anEnemy) {
    if (player.y <= anEnemy.y + 70 && player.y + 60 > anEnemy.y && (player.x + 30 >= anEnemy.x && player.x <= (anEnemy.x + 50))) {
        player.reset();
    }

};
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.update = function() {
    this.x = this.x;
    this.y = this.y;
};

//returvs player to starting point
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 420;
};

//win function
Player.prototype.success = function() {
    console.log("You Win");
    this.reset();
};

//moving the player around according to input while chicking walls and bounds
Player.prototype.handleInput = function(keyPressed) {
    switch (keyPressed) {
        case 'left':
            if (this.x > 0) {
                this.x -= this.speed;

            }
            break;
        case 'up':
            if (this.y > 0) {
                this.y -= this.speed;
                if (this.y <= 5) {
                    this.success();
                }
            }
            break;
        case 'right':
            if (this.x < 400) {
                this.x += this.speed;
            }
            break;
        case 'down':
            if (this.y < 420) {
                this.y += this.speed;
            }
    }

};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player(200, 420, 50);
var allEnemies = [];
var enemyY = [70, 150, 230];//the three rows of enemies
var enemyLength = enemyY.length;

for (var i = 0; i < enemyLength; i++) {
    allEnemies.push(new Enemy((Math.random() * (504 - 1) + 1), enemyY[i], 80 + (Math.random() * (50 - 1) + 1)));
}
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