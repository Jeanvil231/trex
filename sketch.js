var trex, ground , groundI, nube

var score=0;

var PLAY=1, END=0, gameState=PLAY

var prueba;


//precargar las imagenes 
function preload(){
  
  trex_running=loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided=loadAnimation("trex_collided.png");
  
  groundImage=loadImage("ground2.png");
  
  nubeImage=loadImage("cloud21[241].png");
  
  obstacle1=loadImage("obstacle1.png");
  obstacle2=loadImage("obstacle2.png");
  obstacle3=loadImage("obstacle3.png");
  obstacle4=loadImage("obstacle4.png");
  obstacle5=loadImage("obstacle5.png");
  obstacle6=loadImage("obstacle6.png");
  
  restartImg=loadImage("restart.png");
  gameoverImg=loadImage("gameOver.png");
  
  checkPointSound=loadSound("checkPoint.mp3");
  dieSound=loadSound("die.mp3");
  jumpSound=loadSound("jump.mp3");
  
}


function setup(){
  
  createCanvas(600,200);//espacio de trabajo 
  
  trex=createSprite(50,160,20,50);
  trex.addAnimation("running",trex_running);
  trex.scale=0.5;//tamaño 
  trex.x=50;
  
  trex.addAnimation("collided",trex_collided);
  
  edges=createEdgeSprites();
  
  ground=createSprite(200,180,400,20);
  ground.addImage("ground", groundImage);
  ground.x=ground.width/2;
  groundI=createSprite(200,190,400,10);
  groundI.visible=false;
  
  restart=createSprite(300,140,10,10);
  restart.addImage(restartImg);
  restart.scale=0.6;
  restart.visible=false;
  
  gameover=createSprite(300,80,10,10);
  gameover.addImage(gameoverImg);
  gameover.visible=false;
  
  
   ObstaclesGroup=new Group();
  CloudsGroup=new Group();
  
  console.log(prueba);
  }

function draw(){
  
  background("withe");
  
  if(gameState===PLAY){
  score=score+Math.round(getFrameRate()/60);
  
  ground.velocityX=-(4+3*score/100);
    
  if (keyDown("space")&&trex.y>=150){
      trex.velocityY=-10;
      jumpSound.play();
      }

  console.log(trex.velocityY);
  
  //gravedad
    trex.velocityY=trex.velocityY+0.5;
  
   trex.collide(groundI);
   
  
  if (ground.x<0){
      ground.x=200;
      }
    
   if (score>0&&score%200===0){
      checkPointSound.play();
   }
    
  spawnClouds();
  spawnObstacles();
  
    
    if (ObstaclesGroup.isTouching(trex)){
      gameState=END;
      trex.changeAnimation("collided",trex_collided);
      dieSound.play();
    }
    }
  else if (gameState===END){
    ground.velocityX=0;
    ObstaclesGroup.setVelocityXEach(0);
    ObstaclesGroup.setLifetimeEach=-1;
    CloudsGroup.setVelocityXEach(0);
    CloudsGroup.setLifetimeEach=-1;
    trex.velocityY=0;
    restart.visible=true;
    gameover.visible=true;
  }
   
  
  
  //console.log(gameState);
  
    //console.count();
    drawSprites();
   text("score "+score,500,50);
  
  trex.setCollider("rectangle",0,0,60,60);
  trex.debug=true;
  
  if (mousePressedOver(restart)){
    reset();
  }
}

function spawnClouds(){
  
  if (frameCount%80===0){
    nube=createSprite(600,100,50,10);
    nube.velocityX=-(4+3*score/100);
    nube.addImage(nubeImage);
    nube.scale=0.08;
    nube.y=Math.round(random(20,100));
    nube.depth=trex.depth;
    trex.depth=trex.depth+1;
    nube.lifetime=330;
    
    CloudsGroup.add(nube);
  }
  
  
}

function spawnObstacles(){
  
  if (frameCount%60===0){
    obstacle=createSprite(600,165,10,40);
    obstacle.velocityX=-(6+score/100);
    var rand=Math.round(random(1,6));
    switch(rand){
      case 1:obstacle.addImage(obstacle1);
        break;
    case 2:obstacle.addImage(obstacle2);
        break;
    case 3:obstacle.addImage(obstacle3);
        break;
    case 4:obstacle.addImage(obstacle4);
        break;
    case 5:obstacle.addImage(obstacle5);
        break;
    case 6:obstacle.addImage(obstacle6);
        break;
        
        default:break;
    }
    //obstacle.lifetime=330;
    obstacle.scale=0.5;
    obstacle.depth=trex.depth;
    trex.depth=trex.depth+1;
    ObstaclesGroup.add(obstacle);
      }
  
}

function reset(){
  console.log("restart");
 gameState=PLAY;
  score=0;
  trex.changeAnimation("running",trex_running);
  ObstaclesGroup.destroyEach();
  CloudsGroup.destroyEach();
  gameover.visible=false;
  restart.visible=false;
}

