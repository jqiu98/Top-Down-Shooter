
let gameLevels;
let currentLevel;

let player;
let tileTexture;

let GRAVITY = 1.3;

let playerSprite;

let gameStart;
let settingMenu;

let menu;
let selection;

let warrior, mage, archer;
let warriorPic, magePic, archerPic;

let scenes;
let currentScene;

let allClassLabels;
let allAnimations;

let selectedClassLabel;
let selectedClassAnim;

function preload() {
    tileTexture = loadImage('groundTile.png');

    warrior = [ 
                loadAnimation('warrior/warrior_down001.png', 'warrior/warrior_down003.png'),
                loadAnimation('warrior/warrior_left001.png', 'warrior/warrior_left003.png'),
                loadAnimation('warrior/warrior_right001.png', 'warrior/warrior_right003.png'),
                loadAnimation('warrior/warrior_up001.png', 'warrior/warrior_up003.png')]

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

    warriorPic = loadImage('warrior/warrior_pic.png');
    magePic = loadImage('mage/mage_pic.png');
    archerPic = loadImage('archer/archer_pic.png');
}

function setup() {
    createCanvas(windowWidth-4, windowHeight-4);
    rectMode(CENTER);
    textAlign(CENTER, CENTER);
    angleMode(DEGREES);

    gameLevels = [];
    gameLevels[0] = loadLevel(LEVEL1_WIDTH, LEVEL1_HEIGHT, LEVEL1_DATA, tileTexture);
    currentLevel = gameLevels[0];

    gameStart = false;
    settingMenu = false;

    // player = new Player(warrior);

    allClassLabels = ['warrior', 'mage', 'archer'];
    allAnimations = [warrior, mage, archer];

    menu = new MainMenu();
    selection = new CharacterSelection();

    scenes = {};
    scenes['menu'] = menu;
    scenes['selection'] = selection;
    currentScene = 'menu';
}

function draw() {
    if (gameStart) background(144);
    else background(255);

    if (gameStart) runLevel();
    else if (currentScene === "start") InitializePlayer();
    else runScene();

    push();
    noFill();
    strokeWeight(25);
    rect(width/2, height/2, width+5, height+5);
    pop();

}

function InitializePlayer() {
    player = new Player(selectedClassAnim);
    gameStart = true;
}

function runScene() {
    scenes[currentScene].Run();
}


function runLevel() {
    drawSprites(currentLevel);
    player.player.collide(currentLevel);

    player.Run();

    camera.position.x = player.player.position.x;
    camera.position.y = player.player.position.y;
}


// function UpdateGravity() {
//     if (player.player.touching.bottom) player.player.velocity.y = 0;
//     if (player.player.touching.top) player.player.velocity.y = 0;
// }


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
