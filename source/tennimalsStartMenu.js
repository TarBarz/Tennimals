//Jesse/Nate
var canvas = document.getElementById("menuCanvas"); 
var playButton = document.getElementById("playGame");
var exitButton = document.getElementById("exitGame");
var displayTitle = document.getElementById("title");
var menuMusic = document.getElementById("menuAudio").autoplay;
canvas.width = 1280;
canvas.height = 640; 
menuSurface = canvas.getContext("2d");
playButton.addEventListener("click", function clickPlay()
{
	if (playButton.click)
	{
		import ("tennimals.js");
		console.log("play game!");
	}
});

exitButton.addEventListener("click", function clickPlay()
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


