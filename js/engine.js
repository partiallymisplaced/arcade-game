/* Engine.js
 * Updates and renders entities, draws game board, calls the update and render methods on player and enemy objects (defined in app.js).
 * Makes the canvas' context (ctx) object globally available.
 */

var Engine = (function(global) {
    // Defines variables, creates 2D canvas element, sets canvas elements height/width, adds canvas to the DOM.
    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        lastTime;

    canvas.width = 505;
    canvas.height = 606;
    doc.body.appendChild(canvas);

    // Handles update() and render() calls
    function main() {
        // Gets time delta to be used for smooth animation.
        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;

        // Calls update() and render() from app.js. Passes time delta to update() for smooth animation
        update(dt);
        render();

        // Sets lastTime - used to determine time delta
        lastTime = now;

        // Uses the browser's requestAnimationFrame function to call this function again as soon as the browser is able to draw another frame.
        win.requestAnimationFrame(main);
    }

    // Initializes the game
    function init() {
        // reset();
        lastTime = Date.now();
        main();
    }

    /* Called by main(). Calls all functions which may be needed to update an entity's data.
     * Either implement collision detection (when two entities occupy the same space) here, or in app.js. Commented out for the time being.
     */

    function checkCollisions() {
      for (let eachEnemy of allEnemies) {
        // console.log(eachEnemy);
        // console.log('player', player.y);
        if (((player.x <= eachEnemy.x + 101) && (player.x >= eachEnemy.x - 101)) && (player.y === eachEnemy.y)) {
          console.log('Bump.', eachEnemy)
          setTimeout(function(){
            player.reset()
          }, 1);

        }
      }
    }
    function update(dt) {
        updateEntities(dt);
        checkCollisions();
    }

    /* Called by update(). Loops through objects within allEnemies[] in app.js, calls their update() methods, then calls update() of the player object. Update methods should focus purely on updating the data/properties related to the object. Do drawing in render methods.
     */
    function updateEntities(dt) {
        allEnemies.forEach(function(enemy) {
            enemy.update(dt);
        });
        player.update();
    }

    // Draws the "game level", then calls renderEntities(). This function is called every game tick (or loop of the game engine)
    function render() {

        // Array holds the relative URL to the images used for game canvas rows
        var rowImages = [
                'images/water-block.png',   // Top row is water
                'images/stone-block.png',   // Row 1 of 3 of stone
                'images/stone-block.png',   // Row 2 of 3 of stone
                'images/stone-block.png',   // Row 3 of 3 of stone
                'images/grass-block.png',   // Row 1 of 2 of grass
                'images/grass-block.png'    // Row 2 of 2 of grass
            ],
            numRows = 6,
            numCols = 5,
            row, col;

        // Before drawing, clear existing canvas
        ctx.clearRect(0,0,canvas.width,canvas.height)

        // Loops through rows and columns, then draws with images from rowImages[]
        for (row = 0; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {
                /* drawImage() is a canvas method with three parameters - image source, x coordinate & y coordinate (drawImage(image, x, y))
                 * Resources helpers are used to refer to images so images are cached.
                 */
                ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
            }
        }

        renderEntities();
    }

    // Called by render() on each game tick. It then calls the render functions on enemy and player entities within app.js
    function renderEntities() {
        // Loops through objects within allEnemies[] and calls the render function from app.js.
        allEnemies.forEach(function(enemy) {
            enemy.render();
        });

        player.render();
    }

    // Could be used to handle game reset states - new game menu, game over screen. Called once by the init() method.
    // function reset() {
    //     // noop
    // }

    // Loads all images needed to draw game level, then sets init as the callback method so game will start when all images are loaded.
    Resources.load([
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/enemy-bug.png',
        'images/char-horn-girl.png'
    ]);
    Resources.onReady(init);

    // Assigns context object of the canvas to the global variable so it can be used from within app.js.
    global.ctx = ctx;
})(this);
