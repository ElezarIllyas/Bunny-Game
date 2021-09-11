const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;
var backgroundsound,cutsound,crysound,eatingsound,airsound;

let engine;
let world;
var ground;
var fruit,rope;
var fruit_con;
function preload(){
 backgroundimage=loadImage("background.png")
  fruitimage=loadImage("melon.png")
  rabbitimage=loadImage("Rabbit-01.png")
  blink=loadAnimation("blink_1.png","blink_2.png","blink_3.png")
  eat=loadAnimation("eat_0.png","eat_1.png","eat_2.png","eat_3.png","eat_4.png")
  sad=loadAnimation("sad_1.png","sad_2.png","sad_3.png")
  blink.playing=true
  eat.playing=true
  eat.looping=false
  sad.playing=true
  sad.looping=false
  backgroundsound=loadSound("sound1.mp3")
  cutsound=loadSound("rope_cut.mp3")
  crysound=loadSound("sad.wav")
  eatingsound=loadSound("eating_sound.mp3")
  airsound=loadSound("air.wav")
}
function setup() 
{
  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if(isMobile){
    canW = displayWidth; 
    canH = displayHeight; 
    createCanvas(displayWidth+80, displayHeight);
  } 
  else {
    canW = windowWidth; 
    canH = windowHeight; 
    createCanvas(windowWidth, windowHeight);
  }
 //createCanvas(500,700);
  frameRate(80);
  
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(200,canH,600,20);
  blink.frameDelay=20
  eat.frameDelay=20


  rope = new Rope(7,{x:245,y:30});
  rope2 = new Rope(7,{x:370,y:40});
  rope3 = new Rope(4,{x:400,y:225});
  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);
  
  fruit_con2 = new Link(rope2,fruit);
  
  fruit_con3= new Link(rope3,fruit);


  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  imageMode(CENTER);
  bunny=createSprite(190,canH-80,100,100)
 // bunny.addImage(rabbitimage)
  bunny.scale=0.2;
  bunny.addAnimation("blinking",blink)
  bunny.addAnimation("eating",eat)
  bunny.addAnimation("crying",sad)
  bunny.changeAnimation("blinking")
  button=createImg("cut_btn.png")
  button.position(220,30)
  button.size(60,60)
  button.mouseClicked(drop )
  button1=createImg("cut_btn.png")
  button1.position(330,35)
  button1.size(60,60)
  button1.mouseClicked(drop2 )
  button2=createImg("cut_btn.png")
  button2.position(360,200)
  button2.size(60,60)
  button2.mouseClicked(drop3 )
  mute_btn = createImg('mute.png');
  mute_btn.position(450,20);
  mute_btn.size(50,50);
  mute_btn.mouseClicked(mute);

}

function draw() 
{
  background(51);
  image(backgroundimage,0,0,displayWidth+60,displayHeight+700)
 // backgroundsound.play()
  rope.show();
  rope2.show();
  rope3.show();

  if (fruit !=null) {
    image(fruitimage,fruit.position.x,fruit.position.y,70,70); 
  }
  
  Engine.update(engine);
  ground.show();
  if (collide(fruit,bunny)===true) {
    bunny.changeAnimation("eating")
    eatingsound.play()
    backgroundsound.stop()
  }
  if (collide(fruit,ground.body)===true) {
    bunny.changeAnimation("crying")
    crysound.play()
    backgroundsound.stop()
  }
  drawSprites()
 
   
}
function drop(){
  rope.break()
  fruit_con.detach()
  fruit_con=null
  cutsound.play()
}function drop2(){
  rope2.break()
  fruit_con2.detach()
  fruit_con2=null
  cutsound.play()
  
}
function drop3(){
  rope3.break()
  fruit_con3.detach()
  fruit_con3=null
  cutsound.play()
}

function collide(body,sprite){
  if(body!=null)
  {
    var d= dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
    if(d<=80)
  {
    World.remove(engine.world,fruit);
      fruit=null;
      return true;
}
else{
  return false;
}
  }
}
function airblow()
{
  Matter.Body.applyForce(fruit,{x:0,y:0},{x:0.01,y:0});
  airsound.play();
}

function keyPressed()
{
  if(keyCode==LEFT_ARROW)
  {
    airblow();
  }
}
function mute()
{
  if(backgroundsound.isPlaying())
     {
      backgroundsound.stop();
     }
     else{
      backgroundsound.play();
     }
}