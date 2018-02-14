var canvas = document.querySelector("canvas");
canvas.width = 1280;
canvas.height = 640;
var surface = canvas.getContext("2d");
var player = {x:120, y:128, speed:4};
var player2 = {x:1160, y:640-128, speed:4};
var ball = {x: 630, y:310, xspeed:-3, yspeed:-1, speed:2};
var playerSprite = new Image();
playerSprite.src = "tennimalscharplaceholder.png";
var player2Sprite = new Image();
player2Sprite.src = "tennimalscharplaceholder.png";

var ballSprite = new Image();
ballSprite.src = "ballplaceholder.png";

var interval;
var collInt1;
var collInt2;

var p1nocontact = false;
var p2nocontact = false;

var upPressed = false;
var downPressed = false;
var leftPressed = false;
var rightPressed = false;

var p2UpPressed = false;
var p2DownPressed = false;
var p2LeftPressed = false;
var p2RightPressed = false;

window.addEventListener("keydown", keyDown);
window.addEventListener("keyup", keyUp);
window.addEventListener("keydown", p2KeyDown);
window.addEventListener("keyup", p2KeyUp);

window.addEventListener("keydown", debugReset); //delete this from final version

startGame();

function startGame()
{
	interval = setInterval(update, 33.34);
}

function update()
{
	movePlayer();
	movePlayer2();
	checkCollision();
	moveBall();
	render();
	//console.log(player.x);
	//console.log(player.y);
	//console.log(player2.x);
	//console.log(player2.y);
}

function movePlayer()
{
	if (upPressed == true && player.y > 0)
		player.y -= player.speed;
	if (downPressed == true && player.y < 640-64)
		player.y += player.speed;
	if (leftPressed == true && player.x > 0)
		player.x -= player.speed;
	if (rightPressed == true && player.x < 640-64-17)
		player.x += player.speed;
}

function movePlayer2()
{
	if (p2UpPressed == true && player2.y > 0)
		player2.y -= player2.speed;
	if (p2DownPressed == true && player2.y < 640-64)
		player2.y += player2.speed;
	if (p2LeftPressed == true && player2.x > 640+18)
		player2.x -= player2.speed;
	if (p2RightPressed == true && player2.x < 1280-64)
		player2.x += player2.speed;
}

function moveBall()
{
	ball.x += ball.xspeed * ball.speed;
	ball.y += ball.yspeed * ball.speed;
}

function render()
{
	surface.clearRect(0,0,1280,640)
	surface.drawImage(playerSprite, player.x, player.y);
	surface.drawImage(player2Sprite, player2.x, player2.y);
	surface.drawImage(ballSprite, ball.x, ball.y);
}

function checkCollision() //we can maybe add an if statement to make it only check one player's collision at a time if necessary
{
	checkP1Collision();
	checkP2Collision();
}

function checkP1Collision()
{
	if(ball.x < player.x + 64 && ball.x > player.x + 32 && ball.y < player.y + 64 && ball.y + 20 > player.y && p1nocontact == false)
	{
		if (rightPressed == true && upPressed == false && downPressed == false)
		{
			ball.xspeed = 3;
			ball.yspeed = 0;
		}
		else if (rightPressed == true && upPressed == true && downPressed == true)
		{
			ball.xspeed = 3;
			ball.yspeed = 0;
		}
		else if (rightPressed == true && upPressed == true && downPressed == false)
		{
			ball.xspeed = 3;
			ball.yspeed = -1;
		}
		else if (rightPressed == true && upPressed == false && downPressed == true)
		{
			ball.xspeed = 3;
			ball.yspeed = 1
		}
		else if (rightPressed == false && upPressed == true && downPressed == false)
		{
			ball.xspeed = 3;
			ball.yspeed = -2;
		}
		else if (rightPressed == false && upPressed == false && downPressed == true)
		{
			ball.xspeed = 3;
			ball.yspeed = 2;
		}
		else
		{
		ball.xspeed *= -1;
		ball.yspeed *= -1;
		}
		p1nocontact = true;
		collInt1 = setInterval(p1flash, 200);
	}
}

function checkP2Collision()
{
	if(ball.x + 20 > player2.x && ball.x + 20 < player2.x + 32 && ball.y < player2.y + 64 && ball.y + 20 > player2.y && p2nocontact == false)
	{
		if (p2LeftPressed == true && p2UpPressed == false && p2DownPressed == false)
		{
			ball.xspeed = -3;
			ball.yspeed = 0;
		}
		else if (p2LeftPressed == true && p2UpPressed == true && p2DownPressed == true)
		{
			ball.xspeed = -3;
			ball.yspeed = 0;
		}
		else if (p2LeftPressed == true && p2UpPressed == true && p2DownPressed == false)
		{
			ball.xspeed = -3;
			ball.yspeed = -1;
		}
		else if (p2LeftPressed == true && p2UpPressed == false && p2DownPressed == true)
		{
			ball.xspeed = -3;
			ball.yspeed = 1
		}
		else if (p2LeftPressed == false && p2UpPressed == true && p2DownPressed == false)
		{
			ball.xspeed = -3;
			ball.yspeed = -2;
		}
		else if (p2LeftPressed == false && p2UpPressed == false && p2DownPressed == true)
		{
			ball.xspeed = -3;
			ball.yspeed = 2;
		}
		else
		{
			ball.xspeed *= -1;
			ball.yspeed *= -1;
		}
		p2nocontact = true;
		collInt2 = setInterval(p2flash, 200);
	}
}

function p1flash()
{
	p1nocontact = false;
	clearInterval(collInt1);
}

function p2flash()
{
	p2nocontact = false;
	clearInterval(collInt2);
}

function keyDown(event)
{
	switch (event.keyCode)
	{

		case 87:
			upPressed = true;
			break;
		case 83:
			downPressed = true;
			break;
		case 65:
			leftPressed = true;
			break;
		case 68:
			rightPressed = true;
			break;
	} 
}

function p2KeyDown(event)
{
	switch (event.keyCode)
	{

		case 38:
			p2UpPressed = true;
			break;
		case 40:
			p2DownPressed = true;
			break;
		case 37:
			p2LeftPressed = true;
			break;
		case 39:
			p2RightPressed = true;
			break;
	} 
}

function keyUp(event)
{
	switch (event.keyCode)
	{
		case 87:
			upPressed = false;
			break;
		case 83:
			downPressed = false;
			break;
		case 65:
			leftPressed = false;
			break;
		case 68:
			rightPressed = false;
			break;
	}
}

function p2KeyUp(event)
{
	switch (event.keyCode)
	{

		case 38:
			p2UpPressed = false;
			break;
		case 40:
			p2DownPressed = false;
			break;
		case 37:
			p2LeftPressed = false;
			break;
		case 39:
			p2RightPressed = false;
			break;
	} 
}

function debugReset(event) //delete this from final version
{
	switch (event.keyCode)
	{
		case 81:
			player.x = 120;
			player.y = 128;
			player2.x = 1160;
			player2.y = 640-128;
			ball.x = 630;
			ball.y = 310;
			ball.xspeed = -3;
			ball.yspeed = -1;
			ball.speed = 2;
			break;
	}
}
