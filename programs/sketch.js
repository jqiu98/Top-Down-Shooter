
let gameLevels;
let currentLevel;

let player;

let tileTexture, floor1, floor2, wall1, wall2;

let GRAVITY = 1.3;

let playerSprite;

let gameStart;
let settingMenu;

let menu;
let selection;

let robot, mage, archer;
let robotPic, magePic, archerPic;

let scenes;
let currentScene;

let allClassLabels;
let allAnimations;
let allProjectiles;

let laser, magic, arrow;


function preload() {
    tileTexture = loadImage('dirt.png');
    floor1 = loadImage('floor1.png');
    floor2 = loadImage('floor1.png');

    wall1 = loadImage('wall1.png');
    wall2 = loadImage('wall1.png');


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

    laser = loadImage('laser.png');
    magic = loadImage('magic.png');
    arrow = loadImage('arrow3.png');
}

function setup() {
    createCanvas(windowWidth-4, windowHeight-4);
    rectMode(CENTER);
    textAlign(CENTER, CENTER);
    angleMode(DEGREES);

    gameLevels = [];
    gameLevels[0] = loadLevel(LEVEL1_WIDTH, LEVEL1_HEIGHT, LEVEL1_DATA);
    currentLevel = gameLevels[0];

    gameStart = false;
    settingMenu = false;

    // player = new Player(robot);

    allClassLabels = ['robot', 'mage', 'archer'];
    allAnimations = [robot, mage, archer];
    allProjectiles = [laser, magic, arrow];

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
    // player = new Player(selectedClassAnim, magic, 64, 7*64);
    player.entity.position.x = 64;
    player.entity.position.y = 7*64;
    gameStart = true;
}

function runScene() {
    scenes[currentScene].Run();
}


function runLevel() {
    drawSprites(currentLevel);
    player.entity.collide(currentLevel);

    player.Run();

    camera.position.x = player.entity.position.x;
    camera.position.y = player.entity.position.y;
}


function loadLevel (levelWidth, levelHeight, levelData) {
    let platforms = new Group();

    for (let y = 0; y < levelHeight; y++) {
            for (let x = 0; x < levelWidth; x++) {
                    index = y * levelWidth + x;
                    if (levelData[index] === 0) continue;

                    let tile = createSprite(x*64, y*64);
                    
                    tile.addImage(tileTexture);
                    platforms.add(tile);
            }
    }
    return platforms;
}
