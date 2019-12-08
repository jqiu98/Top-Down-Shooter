
let gameLevels;
let currentLevel;

let player;
let playerTexture;
let tileTexture;

let GRAVITY = 1.3;

let playerSprite;

let gameStart;
let settingMenu;

let menu;


function preload() {
    playerTexture = loadImage('assets/ghost_walk0001.png');
    tileTexture = loadImage('groundTile.png');
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    gameLevels = [];
    gameLevels[0] = loadLevel(LEVEL1_WIDTH, LEVEL1_HEIGHT, LEVEL1_DATA, tileTexture);
    currentLevel = gameLevels[0];

    gameStart = false;
    settingMenu = false;

    player = new Player(playerTexture);

    menu = new MainMenu();
}

function draw() {
    background(120);
    if (!gameStart) runMainMenu();
    else runLevel();
}

function runMainMenu() {
    menu.Display();
    gameStart = menu.start;
}

function runLevel() {
    player.player.collide(currentLevel, UpdateGravity);

    player.Run();

    camera.position.x = player.player.position.x;
    camera.position.y = player.player.position.y;

    player.player.debug = true;

    if(mouseIsPressed)
            camera.zoom = 0.1;
    else
            camera.zoom = 1;

    drawSprites(currentLevel);
    player.Display();
}

function keyPressed() {
    if (gameStart) {
            if (key == " ") player.Jump();
    }
}

function UpdateGravity() {
    if (player.player.touching.bottom) player.player.velocity.y = 0;
    if (player.player.touching.top) player.player.velocity.y = 0;
}


function loadLevel (levelWidth, levelHeight, levelData, mapTileTexture) {
    let platforms = new Group();

    for (let y = 0; y < levelHeight; y++) {
            for (let x = 0; x < levelWidth; x++) {
                    index = y * levelWidth + x;
                    if (levelData[index] != 1) continue;

                    let tile = createSprite(x*64, y*64);
                    tile.addImage(tileTexture);
                    platforms.add(tile);
            }
    }
    return platforms;
}
