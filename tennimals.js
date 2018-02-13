var canvas = document.querySelector("canvas");
canvas.width = 1280;
canvas.height = 640;
var surface = canvas.getContext("2d");
var player = {x:120, y:128, speed:6};
var playerSprite = new Image();
playerSprite.src = "img/tennimalscharplaceholder.png";
var interval;

var upPressed = false;
var downPressed = false;
var leftPressed = false;
var rightPressed = false;

window.addEventListener("keydown", keyDown);
window.addEventListener("keyup", keyUp);



startGame();

function startGame()
{
	interval = setInterval(update, 33.34);
}

function update()
{
	movePlayer();
	render();
	console.log(player.x);
	console.log(player.y);
}

function movePlayer()
{
	if (upPressed == true && player.y > 0)
		player.y -= player.speed;
	if (downPressed == true && player.y < 640-64)
		player.y += player.speed;
	if (leftPressed == true && player.x > 0)
		player.x -= player.speed;
	if (rightPressed == true && player.x < 640-64)
		player.x += player.speed;
}

function render()
{
	surface.clearRect(0,0,1280,640)
	surface.drawImage(playerSprite, player.x, player.y);
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