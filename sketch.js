var Monkey, monkey_image;
var Ground, Ground_image;
var Rock, Rock_image, RockGroup;
var Building1, Building1_image, Building2, Building2_image, Building3, Building3_image, Building4, Building4_image, Building5, Building5_image, Building6, Building6_image; 
var GameMode = "Play";
  Score = 0;


function preload() {
  monkey_image = loadAnimation ("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png", "sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png", "sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png", "sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png", "sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png", "sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")
  Ground_image = loadImage("line.png")
  Rock_image = loadImage("obstacle.png")
  Building1_image = loadImage("building 1.png")
  Building1_image = loadImage("building 2.png")
  Building1_image = loadImage("building 3.png")
  Building1_image = loadImage("building 4.png")
  Building1_image = loadImage("building 5.png")
  Building1_image = loadImage("building 6.png")
}


function setup() {
  //THAT IS YOU FAVOUTATE MONKEY!!!!!!!!!!!!!!!!!!!!!
  createCanvas(windowWidth, windowHeight);
  Monkey = createSprite(80, height / 2-200, 10, 10);
  Monkey.addAnimation("RUN", monkey_image)
  Monkey.scale = 0.17;

  //THAT IS LAND 
  Ground = createSprite(1, height / 2+100, 800, 10)
  Ground.addImage(Ground_image)
  Ground.scale=2

  Score = 0

  RockGroup = new Group()
  CactusGroup = new Group()


}

function draw() {
  background(320)
  //that is a private code better don't mess with it
  text(mouseX + "," + mouseY, mouseX, mouseY)

  Monkey.collide(Ground)
  text("Score:" + Score, width / 2 + 300, 20)

  Monkey.setCollider("circle", 0, 0, 220)
  Ground.setCollider("rectangle", 0, 0, 1000, 5) 

  if (GameMode == "Play") {
    Score = Score + Math.round(frameRate() / 60)
    if ((keyWentDown("space") || touches.length > 0) && Monkey.y >= height / 2 + 20) {
      Monkey.velocityY = -40;
      touches = []
    }
    if (Ground.x > 0) {
      Ground.x = 800;
    }
    
    Ground.velocityX = -(10 + Score / 100)
    RockBuild();
    Monkey.velocityY = Monkey.velocityY + 3;
    if (RockGroup.isTouching(Monkey)) {
      GameMode = "END"
    }
  }



  if (GameMode == "END") {
    Ground.velocityX = 0
    RockGroup.setVelocityXEach(0)
    CactusGroup.setVelocityXEach(0)
    RockGroup.setLifetimeEach(-1)
    Monkey.velocityY = Monkey.velocityY + 3;
    text("Game Over Press 'R' to Restart",width/2,height/2)
    if (keyDown("R") || touches.length > 0) {
      GameMode = "Play"
      RockGroup.destroyEach()
      RockGroup.setVelocityXEach(10)
      Score = 0
      touches = []
    }
  }


  drawSprites();

}


function RockBuild() {
  if (frameCount % 160 == 0) {
    Rock = createSprite(width, height / 2 +80, 10, 10)
    Rock.addImage(Rock_image)
    Rock.scale = 0.2
    Rock.velocityX = -(10 + Score / 200)
    Rock.lifetime = 210
    RockGroup.add(Rock)
    Rock.depth = Monkey.depth
    Rock.depth = Monkey.depth + 1
  }
}
