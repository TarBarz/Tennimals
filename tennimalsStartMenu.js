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
var canvas = document.querySelector("canvas"); 
canvas.width = //TBD;
canvas.height = //TBD;
MenuSurface = canvas.getContext("2d");
window.addEventListener("keydown", keyDown);
window.addEventListener("keyup", keyUp);

function Menu()
{
	if (PlayGame = true)
	{
		//move to screen select
	}
	if (ExitGame = true)
	{
		//Exit Game and maybe move to credit screen
	}
}
function displayMenu()
{
	//Where the canvas goes 
}
function keyDown(event)
{
	case 49:
			PlayGame = true;
			break;
	case 50:
			ExitGame = true;
			break;
}
function keyUp(event)
{
	case 49:
			PlayGame = false;
			break;
	case 50:
			ExitGame = false;
			break;
}

