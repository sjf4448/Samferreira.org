const canvas = document.getElementById("gameArea");
const ctx = canvas.getContext('2d');

let x = 100;
let y = 100;
let radius = 50;
let speed = 10;
let score = 0;

let downPressed = false;
let upPressed = false;
let leftPressed = false;
let rightPressed = false;

//Game Loop
function drawGame(){
    clearScreen();
    inputs();
    boundryCheck();
    drawGreenBlob();
    drawScore();
}


function boundryCheck(){
    //top bound
    if(y < radius) {
        y = radius;
        score -= 1;
    }

    //bottom bound
    if (y > canvas.height - radius) {
        y = canvas.height - radius;
        score -= 1;
    }

    //left bound
    if(x < radius) {
        x = radius;
        score -= 1;
    }

    //right bound
    if (x > canvas.width - radius) {
        x = canvas.width - radius;
        score -= 1;
    }

    else{
        //score += 1;
    }
}

//changes values after key presses
function inputs(){
    if(downPressed){
        y += speed;
    }
    if(upPressed){
        y -= speed;
    }
    if(leftPressed){
        x -= speed;
    }
    if(rightPressed){
        x += speed;
    }
}

//draws the character
function drawGreenBlob(){
    ctx.fillStyle = "green";
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2)
    ctx.fill();
}

//draws and updates the score
function drawScore(){
    ctx.fillStyle = "blue";
    ctx.font = "30px Arial";
    ctx.fillText("Score: " + score, 10, 50);
}

//reseets game screen
function clearScreen() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.clientWidth, canvas.height);
    drawPellets();
}

document.body.addEventListener('keydown', keyDown);
document.body.addEventListener('keyup', keyUp);

//listening for key being pressed
function keyDown(event) {

    //down
    if(event.keyCode == 40){
        downPressed = true;
    }

    //up
    if(event.keyCode == 38){
        upPressed = true;
    }

    //left
    if(event.keyCode == 37){
       leftPressed = true;
    }

    //right
    if(event.keyCode == 39){
        rightPressed = true;
    }
}

//listening for key being released
function keyUp(event) {
    //down
    if(event.keyCode == 40){
        downPressed = false;
    }

    //up
    if(event.keyCode == 38){
        upPressed = false;
    }

    //left
    if(event.keyCode == 37){
        leftPressed = false;
     }

    //right
    if(event.keyCode == 39){
        rightPressed = false;
    }
}

//does not work yet
function loadPellets(){
    for(let i = 0; i <= 10; i++){
        let pHeight = Math.random() * 800
        let pWidth = Math.random() * 800
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(pHeight, pWidth, 10, 0, Math.PI * 2)
        ctx.fill();
    }  
}

//interval set to 60 times per second in order to ensure no differnce between computers
setInterval(drawGame, 1000/60);
loadPellets();