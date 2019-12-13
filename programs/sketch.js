/* ===================================================================
   ==============================[README]=============================
   This is a 2D Shooter with keyboard only interactions. Game consist 
   of 3 scenes: Menu => Character Select => Level
   Menu: Select the mode to play: Story/Versus
   Character Select: Select your character's class
   Level: *Game level*

   Enemies will spawn randomly from the black dots across the edge &
   middle of the map. Colliding with an enemy and you'll use Health
   Points. You lose if your health reaches 0 (empty health bar).
   You win if you shoot all the enemies that spawn. 

   ===================================================================
   =============================[HOW-TO]==============================
    wasd_KEYS:  Controls on-screen button hovering in the
                Menu & Character Select scenes

    ENTER:      Select the current hover in the Menu &
                CHaracter Select scenes

    ARROW_KEYS: Player movement - (KEY HOLDING ENABLED) &
                (CORNERS KEYS ENABLED - i.e UP + RIGHT ARROWS)

    LSHIFT:     Shoot - (HOLDING ENABLED)
    ===================================================================
    =================================================================== */

// Sound effects
let selectEffect;
let gameMusic;
let winEffect;

// Sprite images
let floor1, wall1, wall2; // Background & map
let robot, mage, archer; // player character classes
let robotPic, magePic, archerPic; // Body pic for character classes
let laser, magic, arrow; // projectiles
let warrior; // enemy

// Variables to track game scene
let scenes; // Hash table of all scenes
let currentScene; // Current scene we are on
let menu; // Menu scene
let selection; // Character class selection scene

// Arrays & Groups
let allClassLabels; // Array of String for all character classes
let allAnimations; // Array of Animation of all character classes
let floorGroup, wallGroup, enemyGroup; // Groups for floor, wall, enemies

// Game state variables
let gameStart; // Bool to switch to the level stage
let gameOver; // Bool to see if the game is has concluded (either win or lose)
let gameWin; // Bool to see if we've won

// Player Entity
let player;
let PMove;

// Enemy spawning
let spawnPositions; // Position enemies will spawn
let lastSpawn; // Time for enemy spawn so it's spread out
let MAX_ENEMIES; // GLOBAL CONSTANT for total enemies to spawn


function preload() {
    // Initialize all file loads
    selectEffect = loadSound('music/select_effect.mp3');
    gameMusic = loadSound('music/epic_game_music.mp3');
    winEffect = loadSound('music/win_effect.mp3');

    floor1 = loadImage('background/floor1.png');

    wall1 = loadImage('background/wall1.png');
    wall2 = loadImage('background/wall2.png');


    robot = [ 
                loadAnimation('robot/robot_down001.png', 'robot/robot_down003.png'),
                loadAnimation('robot/robot_left001.png', 'robot/robot_left003.png'),
                loadAnimation('robot/robot_right001.png', 'robot/robot_right003.png'),
                loadAnimation('robot/robot_up001.png', 'robot/robot_up003.png')]

    mage = [ 
                loadAnimation('mage/mage_down001.png', 'mage/mage_down003.png'),
                loadAnimation('mage/mage_left001.png', 'mage/mage_left003.png'),
                loadAnimation('mage/mage_right001.png', 'mage/mage_right003.png'),
                loadAnimation('mage/mage_up001.png', 'mage/mage_up003.png')]

    archer = [ 
                loadAnimation('archer/archer_down001.png', 'archer/archer_down003.png'),
                loadAnimation('archer/archer_left001.png', 'archer/archer_left003.png'),
                loadAnimation('archer/archer_right001.png', 'archer/archer_right003.png'),
                loadAnimation('archer/archer_up001.png', 'archer/archer_up003.png')]

    robotPic = loadImage('robot/robot_pic.png');
    magePic = loadImage('mage/mage_pic.png');
    archerPic = loadImage('archer/archer_pic.png');

    laser = loadImage('robot/laser.png');
    magic = loadImage('mage/magic.png');
    arrow = loadImage('archer/arrow.png');


    warrior = [ 
                loadAnimation('warrior/warrior_down001.png', 'warrior/warrior_down003.png'),
                loadAnimation('warrior/warrior_left001.png', 'warrior/warrior_left003.png'),
                loadAnimation('warrior/warrior_right001.png', 'warrior/warrior_right003.png'),
                loadAnimation('warrior/warrior_up001.png', 'warrior/warrior_up003.png')]
}

function setup() {
    // Initialize general P5 settings
    createCanvas(1230, 650);
    rectMode(CENTER);
    textAlign(CENTER, CENTER);
    angleMode(DEGREES);
    
    // Initializing all globals, map data, & player designated movement keys
    floorGroup = new Group();
    wallGroup = new Group();
    enemyGroup = new Group();

    loadLevel(LEVEL1_WIDTH, LEVEL1_HEIGHT, LEVEL1_DATA);

    // Initalizing player move
    gameStart = false;
    gameOver = false;
    gameWin = false;
    MAX_ENEMIES = 20;
    
        PMove = {   "P1" : {    "LEFT": LEFT_ARROW,
                                "RIGHT": RIGHT_ARROW,
                                "UP": UP_ARROW,
                                "DOWN": DOWN_ARROW},

                    "P2" : {    "LEFT": LEFT_ARROW,
                                "RIGHT": RIGHT_ARROW,
                                "UP": UP_ARROW,
                                "DOWN": DOWN_ARROW}  
                }


    allClassLabels = ['robot', 'mage', 'archer'];
    allAnimations = [robot, mage, archer];
    allProjectiles = [laser, magic, arrow];
    allEnemies = [];

    let centerX = (LEVEL1_WIDTH - 1)*64/2;
    let centerY = (LEVEL1_HEIGHT - 1)*64/2;

    spawnPositions = [
                        [centerX, centerY],
                        [256,centerY],
                        [centerX*2 -256, centerY],
                        [centerX, 256],
                        [centerX, centerY*2 - 256]];

    menu = new MainMenu();
    selection = new CharacterSelection();

    scenes = {};
    scenes['menu'] = menu;
    scenes['selection'] = selection;
    currentScene = 'menu';
}


function draw() {
    background(255);

    if (gameStart) runLevel(); // Run the level & gameplay
    else if (currentScene === "start") InitializeGame(); // First time into game start
    else runScene(); // Run the other scenes

    if (!gameStart) { // Border for the non-level scenes
        push();
        noFill();
        strokeWeight(25);
        rect(width/2, height/2, width, height);
        pop();
    }

    if (gameWin) { // You won, display won message
                background(0);
        push();
        fill(0, 255, 0);
        textSize(200);
        textStyle(BOLD);
        text("Y O U  W O N !", camera.position.x, camera.position.y, width/0.5, height/0.5);
    }
    else if (gameOver) { // You've lost, display game over message
                background(0);
        push();
        fill(255, 0, 0);
        textSize(200);
        textStyle(BOLD);
        text("G A M E  O V E R !", camera.position.x, camera.position.y, width/0.5, height/0.5);
    }
}

// First time into game start -> Initialize everything needed to start playing the level
function InitializeGame() {
    player.entity.position.x = (LEVEL1_WIDTH - 1)*64/2;
    player.entity.position.y = (LEVEL1_HEIGHT - 1)*64/2;
    gameStart = true;
    lastSpawn = millis();
    gameMusic.loop();
    camera.zoom = 0.5;

}

// Run the current scene
function runScene() {
    scenes[currentScene].Run();
}

// Adjust camera to follow the players with limits based on level map size
function SetCamera() {
    if ((player.entity.position.x - width + 60 > 0) &&
        (player.entity.position.x + width - 60 < (LEVEL1_WIDTH-1)*64)) {
        camera.position.x = player.entity.position.x;

    }
    if ((player.entity.position.y - height + 60 > 0) &&
        (player.entity.position.y + height - 60 < (LEVEL1_HEIGHT-1)*64)) {
        camera.position.y = player.entity.position.y;
    }
}

// Draw everything non-sprite related of the background
function DrawBackground() {
    push();
    fill("#c88f57");
    rect((LEVEL1_WIDTH-1)*64/2, (LEVEL1_HEIGHT-1)*64/2, (LEVEL1_WIDTH-1)*64, (LEVEL1_HEIGHT-1)*64);

    fill(160, 0, 0);
    noStroke();
    for (let aWall of wallGroup) {
        rect(aWall.position.x, aWall.position.y, aWall.width + 48, aWall.height + 48);
    }

    rect((LEVEL1_WIDTH-1)*64/2, (LEVEL1_HEIGHT-1)*64/2, (LEVEL1_WIDTH-1)*64, 1*64);
    rect((LEVEL1_WIDTH-1)*64/2, (LEVEL1_HEIGHT-1)*64/2, 2*64, (LEVEL1_HEIGHT-1)*64);

    pop();

}

// Draw the spawn points for the enemy
function DrawSpawnPoints() {
    for (let spot of spawnPositions) {
        fill(0);
        ellipse(spot[0], spot[1], 20, 20);
    }
}

// Function to make the game fully functioning
function runLevel() {
    SetCamera();
    DrawBackground();

    drawSprites(floorGroup);
    drawSprites(wallGroup);

    DrawSpawnPoints();

    SpawnenemyGroup();
    
        // Set all the collisions and overlaps appropriately & Run respective sprites
    player.entity.collide(wallGroup);
    player.projectileGroup.collide(wallGroup, Deactivate);
    player.entity.collide(enemyGroup, PlayerEnemyCollide);

    enemyGroup.collide(wallGroup);
    enemyGroup.collide(enemyGroup);
    enemyGroup.overlap(player.projectileGroup, EntityProjectileCollide);

    for (let anEnemy of allEnemies) {
        anEnemy.projectileGroup.collide(wallGroup, Deactivate);
        player.entity.overlap(anEnemy.projectileGroup, EntityProjectileCollide);
        anEnemy.Run();
    }

    player.Run();

    CheckWinCondition();

}

// See if game is over and if we've won
function CheckWinCondition() {
    if (allEnemies.length !== MAX_ENEMIES) return;
    for (let enemy of enemyGroup) {
        if (!enemy.removed) return // Still got enemies left
    }
        if (!gameWin) winEffect.play(0, 0.8); // No more enemies, play win effect
    gameWin = true; // Set win to true
    gameOver = true; // End the game
}

// Function for spawning enemies based on a threshold for uniform spawning
function SpawnenemyGroup() {
    let currSpawn = millis();
    if  (currSpawn - lastSpawn > 2500 && allEnemies.length < MAX_ENEMIES) {
        lastSpawn = currSpawn;
        let spawnSpot = spawnPositions[int(random(0, spawnPositions.length))];
        let enemy = new Enemy(warrior, magic, 0, spawnSpot[0], spawnSpot[1]);
        enemyGroup.add(enemy.entity);
        allEnemies.push(enemy);
    }
}

// Callback function for player<=>enemy collision
function PlayerEnemyCollide(pEntity, eEntity) {
    pEntity.health -= eEntity.damage; // Subtract player health
    if (pEntity.health < 1) gameOver = true; // Check if we've died
    pEntity.position.add(eEntity.velocity.copy().setMag(25)); // Knockback player
    eEntity.position.sub(eEntity.velocity.copy().setMag(25)); // Knockback enemy
}

// Callback function for enemy<=>projectile collision
function EntityProjectileCollide(anEntity, projectile) {
    anEntity.health -= projectile.damage; // Subtract enemy health
    if (anEntity.health < 1) CheckStatus(anEntity); // Check if they've died
    Deactivate(projectile, 0); // Deactivate/kill the projecile
}

// Function to see if an entity's health is empty
function CheckStatus(anEntity) {
    if (player.health < 1) gameOver = true;
    else anEntity.remove(); // Died, no longer active so remove it
}

// Helper Callback function for enemy<=>projectile collision
// Deactivates/kills the projectile (first param - SpriteA)
function Deactivate(SpriteA, SpriteB) {
    SpriteA.velocity.mult(0); // Reset velocity
    SpriteA.position.x = 3000; // Place somewhere not on the map
    SpriteA.position.y = 3000; // Place somewhere not on the map
    SpriteA.deactivate = true; // Set custom projectile sprite property for deactivation to true
}

// Loads the game level
function loadLevel (levelWidth, levelHeight, levelData) {
    for (let y = 0; y < levelHeight; y++) {
        for (let x = 0; x < levelWidth; x++) {
            index = y * levelWidth + x; // Simulating a 2D array into 3D
            if (levelData[index] === 0) continue;

            let tile = createSprite(x*64, y*64); // Sprite being used is size 64x64 pixels

            switch (levelData[index]) { // Select the appropriate background texture
                case 1:
                    tile.addImage(floor1);
                    floorGroup.add(tile);
                    break;
                case 2:
                    tile.addImage(wall1);
                    wallGroup.add(tile);
                    break;
                case 3:
                    tile.addImage(wall2);
                    wallGroup.add(tile);
                    break;
            }
        }
    }
}

