var canvas = document.getElementById("Canvas");
var ctx = canvas.getContext("2d");
// var paddle = document.getElementById("paddle");
// var ctxPa = paddle.getContext("2d");
var score = document.getElementById("Score");
var ctx1 = score.getContext("2d");
var score = 0;
var gameWidth = 800;
var gameHeight = 500;
var ballRadius = 12;
var brickRowCount = 6;
var brickColumnCount = 14;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var paddleHeight = 21;
var paddleWidth = 122;
var paddleX = (canvas.width-paddleWidth)/2;
var paddleY = 595;
var f = 2 * Math.PI, s = Date.now();
var x = canvas.width / 2;
var y = canvas.height - 60;
var cx, cy;
var colors = ["#FB0C0C", "#FD7905", "#FBE306", "#00FF00", "#130CFA", "#11F1FD", "#0AF8C8", "#FF4000", "#FFBF00", "#00FF80", "#0080FF", "#5F04B4", "#00FF40"];
var bricks = [];
var randomColor = Math.round(Math.random() * 7);
var tiles = new Image();
tiles.src = "padle.png";
var dx = 2;
var dy = -2;

var requestAnimFrame = window.requestAnimationFrame ||
                        window.webkitRequestAnimationFrame ||
                        window.mozRequestAnimationFrame ||
                        window.oRequestAnimationFrame ||
                        window.msRequestAnimationFrame;
                        
var rightPressed = false;
var leftPressed = false;

function drawArc() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, 2 * Math.PI);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
    x += dx;
    y += dy;
    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
    dx = -dx;
    }

    if(y + dy < ballRadius) {
        dy = -dy 
    }
        else if(y + dy > canvas.height-ballRadius-25) {
            if(x > paddleX && x < paddleX + paddleWidth) {
                    dy = -dy;
                    randomColor = Math.round(Math.random() * 11);
                }

        }
        ctx.fillStyle = colors[randomColor];
        ctx.fillRect(paddleX, paddleY, paddleWidth, paddleHeight);

    if (y + dy > canvas.height-ballRadius){
        alert("Ты че, лузер, с такой скоростью мячик пропустить?!")
        alert("Серьёзно?");
        document.location.reload();
    }
    // paddle.width = gameWidth;
    // paddle = gameHeight;
    drawBricks();
    collisionDetection();
    drawPaddle();
    Score();
}
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

setInterval(drawArc,15);
for(i = 0; i < brickRowCount; i++) {
        bricks[i] = [];
        for(j = 0; j < brickColumnCount; j++) {
            bricks[i][j] = { x: 0, y: 0, status: 1};          
            bricks[i][j].x = ( j *(brickWidth + brickPadding)) + brickOffsetLeft;
            bricks[i][j].y = ( i *(brickHeight + brickPadding)) + brickOffsetTop;
            
        }
    }
//рисуем блоки\кирпичи
function drawBricks() {
    for(i = 0; i < brickRowCount; i++) {
        for(j = 0; j < brickColumnCount; j++) {
            if(bricks[i][j].status == 1){
            ctx.beginPath();
            ctx.rect(bricks[i][j].x, bricks[i][j].y, brickWidth, brickHeight);
            ctx.fillStyle = colors[j];
            ctx.fill();
            ctx.closePath();
        }
            }
        }
}
//рисуем платформу
function drawPaddle() {
    ctx.clearRect(0, 0, paddleWidth, paddleHeight);
    ctx.drawImage(tiles, paddleX, paddleY, paddleWidth, paddleHeight);
    // ctx.rect(paddleX, paddleY, paddleWidth, paddleHeight);
    // ctx.fillStyle = "yellow";
    // ctx.fill();
    // ctx.stroke();
    // ctx.fillRect(paddleX, 590, paddleWidth, paddleHeight); 

    //границы для биты(платформы)
    if(paddleX - 25 > canvas.width - paddleWidth) {
     paddleX = canvas.width - paddleWidth;
     }
     else if (paddleX + paddleWidth < paddleWidth)
     {
         paddleX = -paddleX;
    
     }
 }

function Score() {
    ctx1.clearRect(0, 0, gameWidth, gameHeight);
    ctx1.font="35px Georgia";
    ctx1.fillText("Score: " + score, 10, 60);
    ctx1.fillStyle = "white";
    ctx1.fill();
}
//отслеживаем коллизию\столкновение
function collisionDetection() {
    for(i = 0; i < brickRowCount; i++) {
        for(j = 0; j < brickColumnCount; j++) {
            var b = bricks[i][j];
            if(b.status == 1){
                if(x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight){
                    dy = -dy;
                    b.status = 0;
                    score += 100;
                    // b.splice(i, 1);
                }
            }
        }
    }
}
//уничтожение блоков при столковении
function destroy(i){
    bricks.slice(i, 1);
}

function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width){
        paddleX = relativeX - paddleWidth/2;
    }
}
//отслеживание нажатия клавиш
function keyDownHandler(e) {
    var keyID = e.keyCode || e.which;
    var keyChar = String.fromCharCode(keyID);

    if(keyChar == "D")
    {
        rightPressed = true;
        paddleX += 30;
        e.preventDefault();
    }

    if(keyChar == "A")
    {
        leftPressed = true;
        paddleX -= 30;
        e.preventDefault();
    }
}
//отслеживание нажатия клавиш
function keyUpHandler(e) {
    if(e.KeyCode == 32){
        rightPressed = false;
        e.preventDefault();
    }
    else if(e.KeyCode == 30){
        leftPressed = false;
        e.preventDefault();d
    }
}