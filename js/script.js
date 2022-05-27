var canvas;
var canvasContext;
var ballX = 50;
var ballSpeedX = 10;
var ballY = 50;
var ballSpeedY = 4;
var paddle1Y = 250;
var paddle2Y = 250;
const PADDLE_HEIGHT = 100;
const PADDLE_THICKNESS = 10;
var playerScore = 0;
var computerScore = 0;
const WINNING_SCORE = 3;
var showingWinScreen = false;

function handleMouseClick(evt){
	if(showingWinScreen){
		playerScore = 0;
		computerScore = 0;
		(showingWinScreen = false);
	}
}

window.onload = function(){
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');
	var framesPerSecond = 50;
	setInterval(function(){
		moveEverything();
		drawEverything();}, 1000/framesPerSecond);
	canvas.addEventListener('mousedown', handleMouseClick);
	canvas.addEventListener('mousemove',
		function(evt){
			var mousePos = calculateMousePos(evt);
			paddle1Y = mousePos.y-(PADDLE_HEIGHT/2);
		})
}	


function moveEverything () {
	if(showingWinScreen){
		return;
	}
	computerMovements ();
	ballX+= ballSpeedX;
	if(ballX > canvas.width || ballX<0) {
		if(ballY > paddle1Y && ballY < paddle1Y+PADDLE_HEIGHT && ballX<0){
		var deltaY = ballY - (paddle1Y+PADDLE_HEIGHT/2);
		ballSpeedY = deltaY*.35;
		ballSpeedX*=(-1);} 
		else if(ballY > paddle2Y && ballY < paddle2Y+PADDLE_HEIGHT && ballX>canvas.width){
		var deltaY = ballY - (paddle2Y+PADDLE_HEIGHT/2);
		ballSpeedY = deltaY*.35;
		ballSpeedX*=(-1);}
		else{
			if(ballX > canvas.width){
				playerScore ++;
			}else{computerScore++;}
		ballReset();
		}
	}

	ballY+= ballSpeedY;
	if(ballY > canvas.height || ballY <= 0) {
		ballSpeedY*=(-1);
	}
}

function drawEverything() {
	newRectangle(0,0,canvas.width,canvas.height, "grey"); //playing field
	if(showingWinScreen){
		canvasContext.fillStyle = "white";
		canvasContext.fillText("Click Anywhere To Play Again", canvas.width/2-45, canvas.height/3);
	}
	colorCircle(ballX, ballY, 10, "red"); //ball
	newRectangle(0, paddle1Y, PADDLE_THICKNESS, PADDLE_HEIGHT, "white");//paddle 1
	newRectangle(canvas.width - PADDLE_THICKNESS,paddle2Y, PADDLE_THICKNESS ,PADDLE_HEIGHT, "white"); //paddle 2
	canvasContext.fillText(playerScore, 100, 100);
	canvasContext.fillText(computerScore, canvas.width-100, 100);
	drawNet();

}

function calculateMousePos(evt) {
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;
	var mouseX = evt.clientX - rect.left - root.scrollLeft;
	var mouseY = evt.clientY - rect.top - root.scrollTop;
	return {
		x:mouseX,
		y:mouseY
	}
}


function colorCircle (centerX, centerY, radius, color) {
	canvasContext.fillStyle = color;
	canvasContext.beginPath();
	canvasContext.arc(centerX, centerY, radius, 0, Math.PI*2, true);
	canvasContext.fill();
}

function newRectangle(x, y, width, height, color){
	canvasContext.fillStyle = color;
	canvasContext.fillRect(x,y,width,height);
}


function ballReset(){
	if (playerScore === WINNING_SCORE || computerScore === WINNING_SCORE){
		showingWinScreen = true;
	}
	ballSpeedY*=(-1);
	ballSpeedX*=(-1);
	ballX = canvas.width/2;
	ballY = canvas.height/2;

}

function computerMovements () {
	var paddle2YCenter = paddle2Y +(PADDLE_HEIGHT/2);
	if(paddle2YCenter < ballY-30) {
		paddle2Y+=6;} else if (paddle2YCenter > ballY+30) {paddle2Y-=6;}
}

function drawNet(){
	for(var i=0; i<canvas.height; i+=40){
		newRectangle(canvas.width/2-1, i, 2, 20, "white");
	}
}

