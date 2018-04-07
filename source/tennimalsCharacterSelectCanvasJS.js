var canvas = document.querySelector("canvas");
canvas.height = 1000;
canvas.width = 1280;
var surface = canvas.getContext("2d");

var characterImageArray = [{id:0, img: "newcharbox1", selectedCharacter: false},
				  {id:1, img: "newcharbox2", selectedCharacter: false},
				  {id:2, img: "newcharbox3", selectedCharacter: false},
				  {id:3, img: "newcharbox4", selectedCharacter: false},
				  {id:4, img: "newcharbox5", selectedCharacter: false},
				  {id:5, img: "newcharboxr", selectedCharacter: false}];
				  
var nameTagArray = [{id:0, img: "charbox1"},
				    {id:1, img: "charbox2"},
				    {id:2, img: "charbox3"},
				    {id:3, img: "charbox4"},
				    {id:4, img: "charbox5"},
				    {id:5, img: "charboxr"}];

var char0img = new Image();
char0img.src = "../characterselectboxes/" + characterImageArray[0].img + ".png";
var char1img = new Image();
char1img.src = "../characterselectboxes/" + characterImageArray[1].img + ".png";
var char2img = new Image();
char2img.src = "../characterselectboxes/" + characterImageArray[2].img + ".png";
var char3img = new Image();
char3img.src = "../characterselectboxes/" + characterImageArray[3].img + ".png";
var char4img = new Image();
char4img.src = "../characterselectboxes/" + characterImageArray[4].img + ".png";
var char5img = new Image();
char5img.src = "../characterselectboxes/" + characterImageArray[5].img + ".png";

var nameTag0img = new Image();
nameTag0img.src = "../characterselectboxes/" + nameTagArray[0].img + ".png";
var nameTag1img = new Image();
nameTag1img.src = "../characterselectboxes/" + nameTagArray[1].img + ".png";
var nameTag2img = new Image();
nameTag2img.src = "../characterselectboxes/" + nameTagArray[2].img + ".png";
var nameTag3img = new Image();
nameTag3img.src = "../characterselectboxes/" + nameTagArray[3].img + ".png";
var nameTag4img = new Image();
nameTag4img.src = "../characterselectboxes/" + nameTagArray[4].img + ".png";
var nameTag5img = new Image();
nameTag5img.src = "../characterselectboxes/" + nameTagArray[5].img + ".png";

var leftArrow = new Image();
leftArrow.src = "../sprites/leftArrow.png";
var rightArrow = new Image();
rightArrow.src = "../sprites/rightArrow.png";
var arrowLocation;

var arrowPointsArrayX = [385, 882];
var arrowPointsArrayY = [195, 530, 850];

//window.addEventListener("keydown", keyDown);

surface.fillStyle = "slategrey";
surface.fillRect(0, 0, 1280, 1000);
surface.font = "30px Ariel";

drawCharacterSelectScreen();
//drawCharacterScreen();
//drawCharacterBoxes();

function drawCharacterSelectScreen()
{
	arrowLocation = 0;
	drawCharacterScreen();
	drawCharacterBoxes();
}

function drawCharacterScreen()
{
	surface.fillStyle = "lightgrey";
	surface.fillRect(5, 5, 1270, 990);
	
	surface.fillStyle = "black";
	surface.font = "30px Ariel";
	surface.fillText("Character", 560, 30);
	surface.textAlign = "center";
	
	surface.fillStyle = "black";
	surface.font = "30px Ariel";
	surface.fillText("Select", 620, 60);
	surface.textAlign = "center";
}

function drawCharacterBoxes()
{
	surface.fillStyle = "white"; //Leona Pryde Character Box
	surface.fillRect(15, 100, 380, 256);
	
	//surface.fillStyle = "black"; //Leona Pryde Arrow
	//surface.fillRect(390, 210, 10, 10);
	
	surface.fillStyle = "black"; //Leona Pryde Profile Box
	surface.fillRect(15, 276, 380, 80);
	
	surface.fillStyle = "grey"; //Leona Pryde Name Tag Box
	surface.fillRect(145, 148, 128, 128);
	
	surface.fillStyle = "blue"; //Penny Guinn Character Box
	surface.fillRect(886, 100, 380, 256);
	
	surface.fillStyle = "black"; //Penny Guinn Arrow
	surface.fillRect(882, 210, 10, 10);
	
	surface.fillStyle = "black"; //Penny Guinn Profile Box
	surface.fillRect(886, 276, 380, 80);
	
	surface.fillStyle = "grey"; //Penny Guinn Name Tag Box
	surface.fillRect(1016, 148, 128, 128);
	
	surface.fillStyle = "red"; //Archie Teuthis Character Box
	surface.fillRect(15, 406, 380, 256);
	
	surface.fillStyle = "black"; //Archie Teuthis Arrow
	surface.fillRect(390, 530, 10, 10);
	
	surface.fillStyle = "black"; //Archie Teuthis Profile Box
	surface.fillRect(15, 606, 380, 80);
	
	surface.fillStyle = "grey"; //Archie Teuthis Name Tag Box
	surface.fillRect(145, 478, 128, 128);
	
	surface.fillStyle = "green"; //Perry Stripes Character Box
	surface.fillRect(886, 406, 380, 256);
	
	surface.fillStyle = "black"; //Perry Stripes Arrow
	surface.fillRect(882, 530, 10, 10);
	
	surface.fillStyle = "black"; //Perry Stripes Profile Box
	surface.fillRect(886, 606, 380, 80);
	
	surface.fillStyle = "grey"; //Perry Stripes Name Tag Box
	surface.fillRect(1016, 478, 128, 128);
	
	surface.fillStyle = "yellow"; //Madame Ophelia Character Box
	surface.fillRect(15, 736, 380, 256);
	
	surface.fillStyle = "black"; //Madame Ophelia Arrow
	surface.fillRect(390, 850, 10, 10);
	
	surface.fillStyle = "black"; //Madame Ophelia Profile Box
	surface.fillRect(15, 912, 380, 80);
	
	surface.fillStyle = "grey"; //Madame Ophelia Name Tag Box
	surface.fillRect(145, 784, 128, 128);
	
	surface.fillStyle = "purple"; //Random Character Box
	surface.fillRect(886, 736, 380, 256);
	
	surface.fillStyle = "black"; //Random Character Arrow
	surface.fillRect(882, 850, 10, 10);
	
	surface.fillStyle = "black"; //Random Profile Box
	surface.fillRect(886, 912, 380, 80);
	
	surface.fillStyle = "grey"; //Random Name Tag Box
	surface.fillRect(1016, 784, 128, 128);
	
	if (arrowLocation <= 5)
	{
		switch (arrowLocation)
		{
			case 0:
				surface.drawImage(char0img, 15, 276, 380, 80);
				break;
			case 1:
				surface.drawImage(char1img, 15, 276, 380, 80);
				break;
			/*case 2:
				surface.drawImage(char2img, 15, 276, 380, 80);
				break;
			case 3:
				surface.drawImage(char3img, 15, 276, 380, 80);
				break;
			case 4:
				surface.drawImage(char4img, 15, 276, 380, 80);
				break;
			case 5:
				surface.drawImage(char5img, 15, 276, 380, 80);
				break;*/
		}
	}
	char0img.onload = function()
	{
		surface.drawImage(char0img, arrowPointsArrayX[0]-241, arrowPointsArrayY[0]-47);
	}
	char1img.onload = function()
	{
		surface.drawImage(char1img, arrowPointsArrayX[1]+133, arrowPointsArrayY[0]-47);
	}
	char2img.onload = function()
	{
		surface.drawImage(char2img, arrowPointsArrayX[0]-241, arrowPointsArrayY[1]-52);
	}
	char3img.onload = function()
	{
		surface.drawImage(char3img, arrowPointsArrayX[1]+133, arrowPointsArrayY[1]-52);
	}
	char4img.onload = function()
	{
		surface.drawImage(char4img, arrowPointsArrayX[0]-240, arrowPointsArrayY[2]-66);
	}
	char5img.onload = function()
	{
		surface.drawImage(char5img, arrowPointsArrayX[1]+134, arrowPointsArrayY[2]-66);
	}
	
	nameTag0img.onload = function()
	{
		surface.drawImage(nameTag0img, arrowPointsArrayX[0]-370, arrowPointsArrayY[0]+81);
	}
	nameTag1img.onload = function()
	{
		surface.drawImage(nameTag1img, arrowPointsArrayX[1]+4, arrowPointsArrayY[0]+81);
	}
	nameTag2img.onload = function()
	{
		surface.drawImage(nameTag2img, arrowPointsArrayX[0]-370, arrowPointsArrayY[1]+76);
	}
	nameTag3img.onload = function()
	{
		surface.drawImage(nameTag3img, arrowPointsArrayX[1]+4, arrowPointsArrayY[1]+76);
	}
	nameTag4img.onload = function()
	{
		surface.drawImage(nameTag4img, arrowPointsArrayX[0]-370, arrowPointsArrayY[2]+62);
	}
	nameTag5img.onload = function()
	{
		surface.drawImage(nameTag5img, arrowPointsArrayX[1]+4, arrowPointsArrayY[2]+62);
	}
	
	
	leftArrow.onload = function()
	{
		surface.drawImage(leftArrow, arrowPointsArrayX[0], arrowPointsArrayY[0]);
	};
	//surface.drawImage(leftArrow, arrowPointsArrayX[0], arrowPointsArrayY[0], 80, 80);
	
	/*leftArrow.onload = function()
	{
		surface.drawImage(leftArrow, arrowPointsArrayX[arrowLocation]+385, arrowPointsArrayY[arrowLocation]+195, 80, 80);
	};
	surface.drawImage(leftArrow, arrowPointsArrayX[0], arrowPointsArrayY[0], 80, 80);*/

}

function keyDown()
{
	switch (event.keyCode)
	{

		case 87: //W
			if (arrowLocation >= 5)
			{
				arrowLocation -= 5;
				drawCharacterSelectScreen();
			}
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