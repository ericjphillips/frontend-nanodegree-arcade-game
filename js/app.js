// Enemies our player must avoid
var Enemy = function(lane) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = -101;
    this.y = (41 * lane * 2) - 21;
    this.width = 101;
    this.height = 75;
    this.speed = Math.random() * 70 + 70;

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
    if (this.x > 606){
        this.x = -101;
        this.speed = Math.random()*70 + 70;
    }
    else {
        this.x += dt * this.speed;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png'
    this.x = 202;
    this.y = 404;
    this.width = 50;
    this.height = 50;
    this.score = 0;
}

//return true if there is no space between player and an enemy
Player.prototype.weHaveACollision = function(enemyArray){
    var collisionDetected = false;
    for (i = 0; i < enemyArray.length; i++){
        if (this.x + 25 < enemyArray[i].x + enemyArray[i].width &&
           this.x + this.width > enemyArray[i].x &&
           this.y < enemyArray[i].y + enemyArray[i].height &&
           this.y + this.height > enemyArray[i].y)
            collisionDetected = true;
    }
    return collisionDetected;
}


//reset score and position on collision. add to score and reset position when reaching the water.
Player.prototype.update = function() {
    if (this.weHaveACollision(allEnemies)){
        this.score = 0;
        ctx.clearRect(0, 0, 200, 50);
        ctx.fillText('Score: ' + this.score, 0, 30);
        this.x = 202;
        this.y = 404;
    }
    if (this.y < 1){
        this.score += 1
        ctx.clearRect(0, 0, 200, 50);
        ctx.fillText('Score: ' + this.score, 0, 30);
        this.x = 202;
        this.y = 404;
    }
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(keyCode) {
    switch(keyCode){
        case 'left':
            if (this.x > 0)
                this.x -= 101;
            break;
        case 'right':
            if (this.x < 404)
                this.x += 101;
            break;
        case 'up':
            if (this.y > 0)
                this.y -= 83;
            break;
        case 'down':
            if (this.y < 404)
                this.y += 83;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];

//place one enemy on each lane and push to allEnemies
function createEnemies(){
    for (var i = 1; i <=3; i++){
        var newEnemy = new Enemy(i);
        allEnemies.push(newEnemy);
    }
}

//instantiate two sets of Enemies and a Player
createEnemies();
setTimeout(createEnemies, 4000);
var player = new Player;

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