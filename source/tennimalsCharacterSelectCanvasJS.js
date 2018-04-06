var canvas = document.querySelector("canvas");
canvas.height = 1000;
canvas.width = 1280;
var surface = canvas.getContext("2d");

var characterImageArray = [{id:0, img: "newcharbox1"},
				  {id:1, img: "newcharbox2"},
				  {id:2, img: "newcharbox3"},
				  {id:3, img: "newcharbox4"},
				  {id:4, img: "newcharbox5"},
				  {id:5, img: "newcharboxr"},];
				  
var nameTagArray = [{id:0, img: "charbox1"},
				    {id:1, img: "charbox2"},
				    {id:2, img: "charbox3"},
				    {id:3, img: "charbox4"},
				    {id:4, img: "charbox5"},
				    {id:5, img: "charboxr"},];

var char0img = new Image();
char0img.src = "characterselectboxes/" + characterImageArray[0].img + ".png";
var char1img = new Image();
char1img.src = "characterselectboxes/" + characterImageArray[1].img + ".png";
var char2img = new Image();
char2img.src = "characterselectboxes/" + characterImageArray[2].img + ".png";
var char3img = new Image();
char3img.src = "characterselectboxes/" + characterImageArray[3].img + ".png";
var char4img = new Image();
char4img.src = "characterselectboxes/" + characterImageArray[4].img + ".png";
var char5img = new Image();
char5img.src = "characterselectboxes/" + characterImageArray[5].img + ".png";

var nameTag0img = new Image();
nameTag0img.src = "characterselectboxes/" + nameTagArray[0].img + ".png";
var nameTag1img = new Image();
nameTag1img.src = "characterselectboxes/" + nameTagArray[1].img + ".png";
var nameTag2img = new Image();
nameTag2img.src = "characterselectboxes/" + nameTagArray[2].img + ".png";
var nameTag3img = new Image();
nameTag3img.src = "characterselectboxes/" + nameTagArray[3].img + ".png";
var nameTag4img = new Image();
nameTag4img.src = "characterselectboxes/" + nameTagArray[4].img + ".png";
var nameTag5img = new Image();
nameTag5img.src = "characterselectboxes/" + nameTagArray[5].img + ".png";

//window.addEventListener("keydown", keyDown);

surface.fillStyle = "slategrey";
surface.fillRect(0, 0, 1280, 1000);
surface.font = "30px Ariel";

drawCharacterScreen();
drawCharacterBoxes();

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
	surface.fillRect(10, 100, 380, 256);
	
	surface.fillStyle = "black"; //Leona Pryde Profile Box
	surface.fillRect(10, 276, 380, 80);
	
	surface.fillStyle = "grey"; //Leona Pryde Name Tag Box
	surface.fillRect(140, 148, 128, 128);
	
	surface.fillStyle = "blue"; //Penny Guinn Character Box
	surface.fillRect(886, 100, 380, 256);
	
	surface.fillStyle = "black"; //Penny Guinn Profile Box
	surface.fillRect(886, 276, 380, 80);
	
	surface.fillStyle = "grey"; //Penny Guinn Name Tag Box
	surface.fillRect(1016, 148, 128, 128);
	
	surface.fillStyle = "red"; //Archie Teuthis Character Box
	surface.fillRect(10, 406, 380, 256);
	
	surface.fillStyle = "black"; //Archie Teuthis Profile Box
	surface.fillRect(10, 606, 380, 80);
	
	surface.fillStyle = "grey"; //Archie Teuthis Name Tag Box
	surface.fillRect(140, 478, 128, 128);
	
	surface.fillStyle = "green"; //Perry Stripes Character Box
	surface.fillRect(886, 406, 380, 256);
	
	surface.fillStyle = "black"; //Perry Stripes Profile Box
	surface.fillRect(886, 606, 380, 80);
	
	surface.fillStyle = "grey"; //Perry Stripes Name Tag Box
	surface.fillRect(1016, 478, 128, 128);
	
	surface.fillStyle = "yellow"; //Madame Ophelia Character Box
	surface.fillRect(10, 706, 380, 256);
	
	surface.fillStyle = "black"; //Madame Ophelia Profile Box
	surface.fillRect(10, 882, 380, 80);
	
	surface.fillStyle = "grey"; //Madame Ophelia Name Tag Box
	surface.fillRect(140, 754, 128, 128);
	
	surface.fillStyle = "purple"; //Random Character Box
	surface.fillRect(886, 706, 380, 256);
	
	surface.fillStyle = "black"; //Random Profile Box
	surface.fillRect(886, 882, 380, 80);
	
	surface.fillStyle = "grey"; //Random Name Tag Box
	surface.fillRect(1016, 754, 128, 128);

}