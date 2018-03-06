//Jesse/Nate
/*
what we need to do:
*Pathways to the player select and exit Game(Credits if wanted)
*Visuals that represent the pathways(canvas images and such) 
*/
var Menu;
var displayMenu;
var inputMenu;
var ExitGame;//Variable to Exit Game
var PlayGame;//Variable to Move to the Player select screen
var canvas = document.getElementById("menuCanvas"); 
var playButton = document.getElementsByClassName("btn playGame");
var exitButton = document.getElementsByClassName("btn exitGame");
var displayTitle = document.getElementById("title");
var menuMusic = document.getElementById("menuAudio").autoplay;
canvas.width = 1280; //TBD
canvas.height = 640; //TBD
menuSurface = canvas.getContext("2d");
playButton.addEventListener("click", clickPlay);

playAudio();
displayMenu();
clickPlay();

function playAudio()
{
	menuMusic.play();
}
/*function Menu()
{
	if (PlayGame = true)
	{
		//move to screen select
	}
	if (ExitGame = true)
	{
		//Exit Game and maybe move to credit screen
	}
}*/
function displayMenu()
{
	menuSurface.fillRect(0,0,1280,640);
	//interval = setInterval(update, 33.34);
	//Where the canvas goes 
}
function clickPlay()
{
	if (playButton.onclick == true)
	{
		console.log("play game!");
	}
}

