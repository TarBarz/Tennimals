var leonaPrydeBtn = document.getElementById("leonaPrydeButton");
var pennyGuinnBtn = document.getElementById("pennyGuinnButton");
var archieTeuthisBtn = document.getElementById("archieTeuthisButton");
var perryStripesBtn = document.getElementById("perryStripesButton");
var madameOpheliaBtn = document.getElementById("madameOpheliaButton");
var randomSelectBtn = document.getElementById("randomSelectButton");

var playerOutput = document.getElementById("playerText");
var playerOutput1 = document.getElementById("playerText1");

var randomPlayer = randomPlayer = 1 + Math.floor(Math.random() * 2);
var keyPressedCounter = 0;

var playerOneTurn = true;
var playerTwoTurn = true;

var p1UpPressed = false;
var p1DownPressed = false;
var p1LeftPressed = false;
var p1RightPressed = false;

var p1OnePressed = false;
var p1TwoPressed = false;
var p1ThreePressed = false;
var p1FourPressed = false;
var p1FivePressed = false;
var p1ZeroPressed = false;

var p2UpPressed = false;
var p2DownPressed = false;
var p2LeftPressed = false;
var p2RightPressed = false;

var p2OnePressed = false;
var p2TwoPressed = false;
var p2ThreePressed = false;
var p2FourPressed = false;
var p2FivePressed = false;
var p2ZeroPressed = false;

//var playerOneTurn = window.addEventListener("keydown", playerOneControls);
//var playerTwoTurn = document.addEventListener("keydown", playerTwoControls);

playerSelect();

function playerSelect()
{
	if (randomPlayer == 1)
	{
		playerOneTurn;
		playerOutput.innerHTML = "player 1";
		playerOutput1.innerHTML = "select a character";
	else
	{
		playerTwoTurn;
		playerOutput.innerHTML = "player 2";
		playerOutput1.innerHTML = "select a character";
	}
}

function playerOneControls(event)
{
	switch (event.keyCode)
	{

		case 87: //W
			p1UpPressed = true;
			break;
		case 83: //S
			p1DownPressed = true;
			break;
		case 65: //A
			p1LeftPressed = true;
			break;
		case 68: //D
			p1RightPressed = true;
			break;
	} 
}

function playerTwoControls(event)
{
	switch (event.keyCode)
	{

		case 38: //UP
			p2UpPressed = true;
			break;
		case 40: //DOWN
			p2DownPressed = true;
			break;
		case 37: //LEFT
			p2LeftPressed = true;
			break;
		case 39: //RIGHT
			p2RightPressed = true;
			break;
	} 
}

function playerControls(event)
{
	switch (event.keyCode)
	{

		case 49: //1
			p1OnePressed = true;
			break;
		case 50: //2
			p1TwoPressed = true;
			break;
		case 51: //3
			p1ThreePressed = true;
			break;
		case 52: //4
			p1FourPressed = true;
			break;
		case 53: //5
			p1FivePressed = true;
			break;
		case 48: //0
			p1ZeroPressed = true;
			break;
	} 
}