var ball;
var database;
var position;

function setup(){
    database=firebase.database();
    console.log(database);
    createCanvas(500,500);
    var ballPositionRef=database.ref("/position");
    ballPositionRef.on("value",readPosition,showError);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";
}

function draw(){
    background("white");
    if(position!=undefined){
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
         writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
}
    drawSprites();
}
function readPosition(data){
  position=data.val();
  console.log(position.x); 
  ball.x=position.x;
  ball.y=position.y; 
}
function showError(){
    console.log("error in reading from database");
}
function writePosition(x,y){
    database.ref("/position").set({ 
        x:position.x+x,
        y:position.y+y
    });
}
function changePosition(x,y){
    ball.x = ball.x + x;
    ball.y = ball.y + y;
}
