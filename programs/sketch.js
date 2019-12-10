
let floor1, floor2, wall1, wall2;
let robot, mage, archer;
let robotPic, magePic, archerPic;
let laser, magic, arrow;
let warrior;

let scenes;
let currentScene;
let menu;
let selection;
let gameLevels;
let currentLevel;

let allClassLabels;
let allAnimations;
let allProjectiles;
let allEnemies;
let floorGroup, wallGroup, enemyGroup;

let gameStart;
let gameOver;
let gameWin;

let player;

let spawnPositions;
let lastSpawn;
let MAX_ENEMIES;

function preload() {
    floor1 = loadImage('floor1.png');
    floor2 = loadImage('floor2.png');

    wall1 = loadImage('wall1.png');
    wall2 = loadImage('wall2.png');


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
    arrow = loadImage('arrow.png');


    warrior = [ 
                loadAnimation('warrior/warrior_down001.png', 'warrior/warrior_down003.png'),
                loadAnimation('warrior/warrior_left001.png', 'warrior/warrior_left003.png'),
                loadAnimation('warrior/warrior_right001.png', 'warrior/warrior_right003.png'),
                loadAnimation('warrior/warrior_up001.png', 'warrior/warrior_up003.png')]
}

function setup() {
    createCanvas(windowWidth-4, windowHeight-4);
    rectMode(CENTER);
    textAlign(CENTER, CENTER);
    angleMode(DEGREES);

    floorGroup = new Group();
    wallGroup = new Group();
    enemyGroup = new Group();

    loadLevel(LEVEL1_WIDTH, LEVEL1_HEIGHT, LEVEL1_DATA);

    gameStart = false;
    gameOver = false;
    gameWin = false;
    MAX_ENEMIES = 20;


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
    if (gameStart) background(220);
    else background(255);

    if (gameStart) runLevel();
    else if (currentScene === "start") InitializePlayer();
    else runScene();

    if (!gameStart) {
        push();
        noFill();
        strokeWeight(25);
        rect(width/2, height/2, width+5, height+5);
        pop();
    }

    if (gameWin) {
        push();
        fill(0, 0, 255);
        textSize(200);
        textStyle(BOLD);
        text("Y O U  W O N !", player.entity.position.x, player.entity.position.y, width/0.5, height/0.5);
    }
    else if (gameOver) {
        push();
        fill(0, 0, 255);
        textSize(200);
        textStyle(BOLD);
        text("G A M E  O V E R !", player.entity.position.x, player.entity.position.y, width/0.5, height/0.5);
    }
}

function InitializePlayer() {
    player.entity.position.x = (LEVEL1_WIDTH - 1)*64/2;
    player.entity.position.y = (LEVEL1_HEIGHT - 1)*64/2;
    gameStart = true;
    lastSpawn = millis();
}

function runScene() {
    scenes[currentScene].Run();
}


function runLevel() {
    camera.position.x = player.entity.position.x;
    camera.position.y = player.entity.position.y;

    push();
    fill(160, 0, 0);
    rect((LEVEL1_WIDTH-1)*64/2, (LEVEL1_HEIGHT-1)*64/2, (LEVEL1_WIDTH-1)*64, (LEVEL1_HEIGHT-1)*64);
    pop();

    drawSprites(floorGroup);
    drawSprites(wallGroup);

    for (let spot of spawnPositions) {
        fill(0, 255, 0);
        ellipse(spot[0], spot[1], 20, 20);
    }

    SpawnenemyGroup();

    player.entity.collide(wallGroup);
    player.projectileGroup.collide(wallGroup, Deactivate);
    player.entity.collide(enemyGroup, PlayerEnemyCollide);

    enemyGroup.collide(wallGroup);
    enemyGroup.overlap(player.projectileGroup, EntityProjectileCollide);

    for (let anEnemy of allEnemies) {
        anEnemy.projectileGroup.collide(wallGroup, Deactivate);
        player.entity.overlap(anEnemy.projectileGroup, EntityProjectileCollide);
        anEnemy.Run();
    }

    player.Run();

    CheckWinCondition();

}

function CheckWinCondition() {
    if (allEnemies.length !== MAX_ENEMIES) return;
    for (let enemy of enemyGroup) {
        if (!enemy.removed) return
    }
    gameWin = true;
    gameOver = true;
}

function SpawnenemyGroup() {
    let currSpawn = millis();
    if  (currSpawn - lastSpawn > 2500 && allEnemies.length < MAX_ENEMIES) {
        lastSpawn = currSpawn;
        let spawnSpot = spawnPositions[int(random(0, spawnPositions.length))];
        console.log(spawnSpot);
        let enemy = new Enemy(warrior, magic, 0, spawnSpot[0], spawnSpot[1]);
        enemyGroup.add(enemy.entity);
        allEnemies.push(enemy);
    }
}

function PlayerEnemyCollide(pEntity, eEntity) {
    pEntity.health -= eEntity.damage;
    if (pEntity.health < 1) gameOver = true;
    pEntity.position.add(eEntity.velocity.copy().setMag(25));
    eEntity.position.sub(eEntity.velocity.copy().setMag(25));
}

function EntityProjectileCollide(anEntity, projectile) {
    anEntity.health -= projectile.damage;
    if (anEntity.health < 1) CheckStatus(anEntity);
    Deactivate(projectile, 0);
}

function CheckStatus(anEntity) {
    if (player.health < 1) gameOver = true;
    else anEntity.remove();
}

function Deactivate(SpriteA, SpriteB) {
    SpriteA.velocity.x = 0;
    SpriteA.velocity.y = 0;
    SpriteA.position.x = 3000;
    SpriteA.position.y = 3000;
    SpriteA.deactivate = true;
}


function loadLevel (levelWidth, levelHeight, levelData) {
    for (let y = 0; y < levelHeight; y++) {
        for (let x = 0; x < levelWidth; x++) {
            index = y * levelWidth + x;
            if (levelData[index] === 0) continue;

            let tile = createSprite(x*64+5, y*64+5);

            switch (levelData[index]) {
                case 1:
                    tile.addImage(floor1);
                    floorGroup.add(tile);
                    break;
                // case 2:
                //     tile.addImage(floor2);
                //     floorGroup.add(tile);
                //     break;
                case 3:
                    tile.addImage(wall1);
                    wallGroup.add(tile);
                    break;
                case 4:
                    tile.addImage(wall2);
                    wallGroup.add(tile);
                    break;
            }
        }
    }
}
