//namespacing the engine world bodies and contraints and assingning them to a variable
const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

//creating variables
var engine, world;
var box1, pig1,pig3;
var backgroundImg,platform;
var bird, slingshot;

//creating the gamestate onsling,background image and the score
var gameState = "onSling";
var bg = "sprites/bg1.png";
var score = 0;

function preload() {
    //defining the img to be stored
    getBackgroundImg();
}

function setup(){
    //creating the canvas as well as the engine and the world in which the different objects are to be created 
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;

//creating the various objects like ground,boxes,pigs,logs,bird
    ground = new Ground(600,height,1200,20);
    platform = new Ground(150, 305, 300, 170);

    box1 = new Box(700,320,70,70);
    box2 = new Box(920,320,70,70);
    pig1 = new Pig(810, 350);
    log1 = new Log(810,260,300, PI/2);

    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);
    pig3 = new Pig(810, 220);

    log3 =  new Log(810,180,300, PI/2);

    box5 = new Box(810,160,70,70);
    log4 = new Log(760,120,150, PI/7);
    log5 = new Log(870,120,150, -PI/7);

    bird = new Bird(200,50);

    //log6 = new Log(230,180,80, PI/2);
    slingshot = new SlingShot(bird.body,{x:200, y:50});
}

function draw(){
    //storing the bg img
    if(backgroundImg)
        background(backgroundImg);
    

        noStroke();
        textSize(35)
        fill("white")
        text("Score  " + score, width-300, 50)
    
    Engine.update(engine);
    //strokeWeight(4);
    //displaying the various objects created
    box1.display();
    box2.display();
    ground.display();
    pig1.display();
    pig1.score();
    log1.display();

    box3.display();
    box4.display();
    pig3.display();
    pig3.score();
    log3.display();

    box5.display();
    log4.display();
    log5.display();

    bird.display();
    platform.display();
    //log6.display();
    slingshot.display();    
}

//defining the mouse dragged function to launch the bird
function mouseDragged(){
    //if (gameState!=="launched"){
        Matter.Body.setPosition(bird.body, {x: mouseX , y: mouseY});
    //}
}

//defining the mouse released function when the bird is actually launched
function mouseReleased(){
    slingshot.fly();
    gameState = "launched";
}

//to attach the bird back to the slingshot after pressing the enter key
function keyPressed(){
    if(keyCode === 32){
        bird.trajectory=[];
        Matter.Body.setPosition(bird.body,{x:200,y:50});
       slingshot.attach(bird.body);
    }
}

//creating a asychronous function to retrieve the hours of the day from the worldtimeapi
async function getBackgroundImg(){
//waiting for the api call to get complete and retrieving the information
    var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
    var responseJSON = await response.json();

    //retrieving the datetime segment from the retrieved information
    var datetime = responseJSON.datetime;
    //slicing the hours
    var hour = datetime.slice(11,13);
    
    if(hour>=0600 && hour<=1900){
        bg = "sprites/bg1.png";
    }
    else{
        bg = "sprites/bg2.jpg";
    }

    backgroundImg = loadImage(bg);
    console.log(backgroundImg);
}