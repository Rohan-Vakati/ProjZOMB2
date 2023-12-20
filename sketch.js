//sprites
var zombies, zombieImg
var shooter, shooterImg, shooterDeadImg, shootImg
var bullet
var bg, bgImg
var bgMus
var gunShot
var gameOverSound
var score = 0;

//groups
var zombieGroup, bulletGroup;

//gamestate control
var gameState = "play"; 

function preload(){
  shooterImg = loadAnimation("shooter_2.png")
  shooterDeadImg = loadAnimation("shooter_1.png")
  shootImg = loadAnimation("shooter_3.png") 
  zombieImg = loadImage("zombie.png")
  bgImg = loadImage("bg.jpeg") 
  bgMus = loadSound("bgMusic/overdrive-matrika-main-version-03-04-11688.mp3")
  gunShot = loadSound("gunShot/gunshot-reload-bolt-action-rifle-fascinatedsound-3-3-00-02.mp3")
  gameOverSound = loadSound("gunShot/zapsplat_human_male_voice_says_game_over_001_15726.mp3")
  
}

function setup() {

  createCanvas(windowWidth,windowHeight)

  bg = createSprite(displayWidth/2 -20, displayHeight/2 - 40, 20, 20 )
  bg.addImage("bg", bgImg)
  bg.scale = 1.1
    
  //Playing Character 
  shooter = createSprite(400, 500, 20, 40)
  shooter.addAnimation("shooter",shooterImg)
  shooter.addAnimation("shooting",shootImg)
  shooter.addAnimation("dead",shooterDeadImg)
  shooter.changeAnimation("shooter", shooterImg)
  shooter.scale = .5

  
  

  //group
  zombieGroup = new Group();
  bulletGroup = new Group();
  if (gameState === "play"){
    bgMus.play();
    bgMus.setVolume(0.05);

  }
  if (gameState === "end"){
    gameOverSound.play();
    gameOverSound.setVoume(2)
    

  }
}

function draw() {
  background(0);
  drawSprites();
  
  fill("white");
  textSize(30)
  text("Zombie Kills: "+ score, 300, 70)

  //------------------------PLAY STATE----------------------

  if(gameState === "play"){

    //Player movement
    if(keyIsDown(RIGHT_ARROW)){
      shooter.position.x += 10;
      shooter.changeAnimation("shooting", shootImg);
    }
  
    if(keyIsDown(LEFT_ARROW)){
      shooter.position.x -= 10;
    }
  
    if(keyIsDown(UP_ARROW)){
      shooter.position.y -= 10;
    }
  
    if(keyIsDown(DOWN_ARROW)){
        shooter.position.y += 10;
    }
  
  
    spawnZombies();
  
    shootBullet();

    if(bulletGroup.isTouching(zombieGroup)){
      zombieGroup[0].destroy();
      bulletGroup[0].destroy();
      score = score + 1;
    }

    //condition to switch the game state
    if(zombieGroup.isTouching(shooter)){
      gameState = "end"
    }
   
  }
  //--------------------------END STATE--------------------
  if(gameState === "end"){
    shooter.destroy();
    zombieGroup.destroyEach();
    bulletGroup.destroyEach();
    bgMus.stop();
    

    swal(
      {
        title: "YOU DIED",
        text: "Try again?",
        imageUrl: "https://media.tenor.com/YQSLSQkP7_QAAAAC/galaxyroleplay-restart.gif",
        imageSize: "400x400",
        confirmButtonText: "Play again!"
      
      },
      function(isConfirm){
        if(isConfirm){
          window.location.reload();
        }
      }
    )
  }        
  
  

}




function spawnZombies(){

  if (frameCount % 120 === 0){
    zombies = createSprite(1400, 500, 20, 40)
    zombies.addImage("zombie", zombieImg)
    zombies.scale = .25

    zombies.y = Math.round(random(400,600))
    zombies.velocityX = -4;

    zombies.lifetime = 250;

    zombieGroup.add(zombies);
  }
}


function shootBullet(){
  if(keyWentDown("space")){
    bullet = createSprite(shooter.x, shooter.y - 43, 15, 15)
    bullet.velocityX = 10;
    bulletGroup.add(bullet);
    gunShot.play();
  }
}
