var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");

}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 10;

  ghost = createSprite(300,300);
  ghost.addImage(ghostImg);
  ghost.scale = 0.5;

doorsGroup = new Group();
climbersGroup = new Group();
invisibleBlockGroup = new Group();
}

function draw() {
  background(200);

  if(gameState === "play"){

  if(tower.y > 400){
      tower.y = 300
    }
    if(keyDown("RIGHT_ARROW")){
      ghost.x = ghost.x+3;
    }
    if(keyDown("LEFT_ARROW")){
      ghost.x = ghost.x-3;
    }
    if(keyDown("space")){
      ghost.velocityY = -5;
    }
    ghost.velocityY = ghost.velocityY+0.7;
    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY = 0;
    }
    if(invisibleBlockGroup.isTouching(ghost)||
    ghost.y> 600){
      ghost.destroy();
      gameState = "end";

    }
    spawnDoors();
    drawSprites();
  }
  if(gameState === "end"){
    textSize(20);
    text("GAME OVER (Press Ctrl/Command + R or Shift + F5 To restart)",20,300);
  }
}invisibleBlock



function spawnDoors(){
if(frameCount % 350 === 0){
  door = createSprite(200,150);
  door.addImage(doorImg);
  door.velocityY = 1;
  door.x = Math.round(random(100,400));
  
  door.lifetIme = 600;
  doorsGroup.add(door);

  ghost.depth = door.depth;
  ghost.depth +=1;

  

climber = createSprite(300,220);
climber.addImage(climberImg);
climber.x = door.x;
climber.velocityY = 1;

climber.lifetIme = 600;
climbersGroup.add(climber);

invisibleBlock = createSprite(300,230);
invisibleBlock.width = climber.width;
invisibleBlock.height = climber.height;
invisibleBlock.x = climber.x;
invisibleBlock.velocityY = 1;
invisibleBlockGroup.add(invisibleBlock);
invisibleBlock.visible = false;
invisibleBlock.scale = 0.7
}
}


