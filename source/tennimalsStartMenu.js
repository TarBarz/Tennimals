//Jesse/Nate
var canvas = document.getElementById("menuCanvas"); 
var singlePlayerButton = document.getElementById("singlePlayer");
var versusButton = document.getElementById("versus");
var creditsButton = document.getElementById("credits");
var exitButton = document.getElementById("exitGame");
var displayTitle = document.getElementById("title");
var menuMusic = document.getElementById("menuAudio").autoplay;
canvas.width = 1280;
canvas.height = 640; 
menuSurface = canvas.getContext("2d");
singlePlayerButton.addEventListener("click", function clickSinglePlayer()
{
	if (singlePlayerButton.click)
	{
		import ("tennimalsAI.js");
		console.log("Single Player Mode!");
	}
});

versusButton.addEventListener("click", function clickVersus()
{
	if (versusButton.click)
	{
		import ("tennimals.js");
		console.log("Versus AI!");
	}
});

creditsButton.addEventListener("click", function clickCredits()
{
	if (versusButton.click)
	{
		//import ("tennimals.js");
		console.log("Credits!");
	}
});

exitButton.addEventListener("click", function clickExit()
{
	if (exitButton.click)
	{
		close();
		console.log("exit game!");
	}
});
function displayMenu()
{
	menuSurface.fillRect(0,0,1280,640);
}


