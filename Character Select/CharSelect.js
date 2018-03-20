var canvas = document.querySelector("canvas");
canvas.width = 1280;
canvas.height = 640;
var surface = canvas.getContext("2d");

//original position 
var x = 50;
var y = 120;

var player = {};
var player2 = {};


var character1 = 
{
image: "charbox1.png";
imageP1: "charbox1_blue.png"
imageP2: "charbox1_red.png"
selected=false;

}
var character2 = new Image();
character2.src = "charbox2.png";
var character3 = new Image();
character3.src = "charbox3.png";
var character4 = new Image();
character4.src = "charbox4.png";
var character5 = new Image();
character5.src = "charbox5.png";

var character1 = new Image();
character1.src = character1.image;


window.addEventListener("keydown", keyDown);
window.addEventListener("keyup", keyUp);
window.addEventListener("keydown", p2KeyDown);
window.addEventListener("keyup", p2KeyUp);

var upPressed = false;
var downPressed = false;
var leftPressed = false;
var rightPressed = false;

var p2UpPressed = false;
var p2DownPressed = false;
var p2LeftPressed = false;
var p2RightPressed = false;
//original position 
var x = 50;
var y = 120;



startSelection ();

function startSelection()
{
	interval = setInterval(update, 33.34);
}

function update()
{

	render();

}






function render()
{
//Size of the images + buffer
var width = character1.width + 20;
var height = character1.height + 20;

//first row
	surface.drawImage (character1,x,y);
	surface.drawImage (character2,x + width ,y);
	surface.drawImage (character3,x + width*2 ,y);
	
//second row
	surface.drawImage (character4,x,y + height);
	surface.drawImage (character5,x + width ,y + height);
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