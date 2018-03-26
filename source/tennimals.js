var canvas = document.querySelector("canvas");
canvas.width = 1280;
canvas.height = 640;
var surface = canvas.getContext("2d");
var player = {x:120, y:128, xhit:3, ylighthit:1, yheavyhit:2, speed:4, img:"tennimalscharplaceholder", name:null, id: 0}; //ylighthit is for when you're moving at a diagonal,
var player2 = {x:1160-64, y:640-128-64, xhit:3, ylighthit:1, yheavyhit:2, speed:4, img:"tennimalscharplaceholder", name:null, id: 0}; //yheavyhit is for when you're moving straight up/down
var ball = {x: 630, y:310, xspeed:-3, yspeed:-1, speed:2};
var playerSprite = new Image();
playerSprite.src = "../sprites/tennimalscharplaceholder.png";
var player2Sprite = new Image();
player2Sprite.src = "../sprites/tennimalscharplaceholder.png";

var ballSprite = new Image();
ballSprite.src = "TennisBall.png";

var leonaStats = {xhit:4, ylighthit:0.5, yheavyhit:1.5, speed:4, img:"leona", name:"Leona Pryde", id:1}; //each character is assigned an id number for reference, e.g. in
var pennyStats = {xhit:3, ylighthit:1, yheavyhit:2.3, speed:3.6, img:"penny", name:"Penny Guinn", id:2}; //the setP1Character function
var archieStats = {xhit:2.5, ylighthit:1, yheavyhit:1.7, speed:5, img:"archie", name: "Archie Teuthis", id:3};
var perryStats = {xhit:3, ylighthit:1, yheavyhit:2, speed:4, img:"perry", name: "Perry Stripes", id:4};
var opheliaStats = {xhit:2.5, ylighthit:1, yheavyhit:1.5, img:"ophelia", speed:5.5, name: "Madame Ophelia", id:5};
var defaultStats = {xhit:3, ylighthit:1, yheavyhit:2, img:"tennimalscharplaceholder", speed:4, name: "Default", id:0};

var interval;
//var collInt1;
//var collInt2;

var p1nocontact = false;
var p2nocontact = false;

var ding = document.getElementById("ding");
var scoresound = document.getElementById("scoresound");
var oobsound = document.getElementById("flub");

var characterCycle = 1; //delete this from final version, it's just for swapCharacters function.
var characterCycle2 = 1; //delete this from final version

var lastHit = 2; //1: ball last touched by player 1, 2: by player 2
var spawnDirection = 1; //1: ball spawns towards player 1, 2: towards player2

var p1Score = 0;
var p2Score = 0;
var targetScore = 8; //score to reach to win the game

var upPressed = false;
var downPressed = false;
var leftPressed = false;
var rightPressed = false;

var p2UpPressed = false;
var p2DownPressed = false;
var p2LeftPressed = false;
var p2RightPressed = false;

var textOutput = document.getElementById("displayText");
var p1Point = document.getElementById("p1ScoreCount");
var p2Point = document.getElementById("p2ScoreCount");
var textInterval;

var animSpeed = 4;
var p1CurrentFrame = 1;
var p2CurrentFrame = 1;
var animationInterval = setInterval(cycleFrame, 1000/animSpeed);

window.addEventListener("keydown", keyDown);
window.addEventListener("keyup", keyUp);
window.addEventListener("keydown", p2KeyDown);
window.addEventListener("keyup", p2KeyUp);

window.addEventListener("keydown", debugReset); //delete this from final version
window.addEventListener("keydown", swapCharacters); //delete this from final version

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
	CheckP1Sprite();
	CheckP2Sprite();
	//playerSprite.src = player.img + ".png";
	//player2Sprite.src = player2.img + ".png";
	surface.drawImage(playerSprite, player.x, player.y);
	surface.drawImage(player2Sprite, player2.x, player2.y);
	surface.drawImage(ballSprite, ball.x, ball.y);
}

function checkCollision() //we can maybe add an if statement to make it only check one player's collision at a time if necessary
{
	checkP1Collision();
	checkP2Collision();
	checkBounds();
}

function CheckP1Sprite()
{
	if (player.id != 0)
	{
		if (rightPressed == true)
			playerSprite.src = "../sprites/"+player.img+"r"+p1CurrentFrame+".png";
		else if (leftPressed == true)
			playerSprite.src = "../sprites/"+player.img+"l"+p1CurrentFrame+".png";
		else if (downPressed == true)
			playerSprite.src = "../sprites/"+player.img+p1CurrentFrame+".png";
		else if (upPressed == true)
			playerSprite.src = "../sprites/"+player.img+"b"+p1CurrentFrame+".png";
	}
	else
		playerSprite.src = "../sprites/tennimalscharplaceholder.png";
}

function CheckP2Sprite()
{
	if (player2.id != 0)
	{
		if (p2RightPressed == true)
			player2Sprite.src = "../sprites/"+player2.img+"r"+p2CurrentFrame+".png";
		else if (p2LeftPressed == true)
			player2Sprite.src = "../sprites/"+player2.img+"l"+p2CurrentFrame+".png";
		else if (p2DownPressed == true)
			player2Sprite.src = "../sprites/"+player2.img+p2CurrentFrame+".png";
		else if (p2UpPressed == true)
			player2Sprite.src = "../sprites/"+player2.img+"b"+p2CurrentFrame+".png";
	}
	else
		player2Sprite.src = "../sprites/tennimalscharplaceholder.png";
}

function checkP1Collision()
{
	if(ball.x < player.x + 64 && ball.x > player.x + 32 && ball.y < player.y + 64 && ball.y + 20 > player.y && lastHit != 1)
	{
		if (rightPressed == true && upPressed == false && downPressed == false)
		{
			ball.xspeed = player.xhit+1;
			ball.yspeed = 0;
		}
		else if (rightPressed == true && upPressed == true && downPressed == true)
		{
			ball.xspeed = player.xhit;
			ball.yspeed = 0;
		}
		else if (rightPressed == true && upPressed == true && downPressed == false)
		{
			ball.xspeed = player.xhit;
			ball.yspeed = -player.ylighthit;
		}
		else if (rightPressed == true && upPressed == false && downPressed == true)
		{
			ball.xspeed = player.xhit;
			ball.yspeed = player.ylighthit;
		}
		else if (rightPressed == false && upPressed == true && downPressed == false)
		{
			ball.xspeed = player.xhit;
			ball.yspeed = -player.yheavyhit;
		}
		else if (rightPressed == false && upPressed == false && downPressed == true)
		{
			ball.xspeed = player.xhit;
			ball.yspeed = player.yheavyhit;
		}
		else
		{
		ball.xspeed *= -1;
		ball.yspeed *= 1; //maybe change this to -1?
		}
		lastHit = 1;
		//p1nocontact = true;
		//collInt1 = setInterval(p1flash, 1000);
		ding.play();
	}
}

function checkP2Collision()
{
	if(ball.x + 20 > player2.x && ball.x + 20 < player2.x + 32 && ball.y < player2.y + 64 && ball.y + 20 > player2.y && lastHit != 2)
	{
		if (p2LeftPressed == true && p2UpPressed == false && p2DownPressed == false)
		{
			ball.xspeed = -player2.xhit-1;
			ball.yspeed = 0;
		}
		else if (p2LeftPressed == true && p2UpPressed == true && p2DownPressed == true)
		{
			ball.xspeed = -player2.xhit;
			ball.yspeed = 0;
		}
		else if (p2LeftPressed == true && p2UpPressed == true && p2DownPressed == false)
		{
			ball.xspeed = -player2.xhit;
			ball.yspeed = -player2.ylighthit;
		}
		else if (p2LeftPressed == true && p2UpPressed == false && p2DownPressed == true)
		{
			ball.xspeed = -player2.xhit;
			ball.yspeed = player2.ylighthit;
		}
		else if (p2LeftPressed == false && p2UpPressed == true && p2DownPressed == false)
		{
			ball.xspeed = -player2.xhit;
			ball.yspeed = -player2.yheavyhit;
		}
		else if (p2LeftPressed == false && p2UpPressed == false && p2DownPressed == true)
		{
			ball.xspeed = -player2.xhit;
			ball.yspeed = player2.yheavyhit;
		}
		else
		{
			ball.xspeed *= -1;
			ball.yspeed *= 1;
		}
		lastHit = 2;
		//p2nocontact = true;
		//collInt2 = setInterval(p2flash, 1000);
		ding.play();
	}
}

function checkBounds()
{
	if (ball.x <= -20 || ball.x >= 1280 || ball.y <= -20 || ball.y >= 640)
	{
		if (ball.x <= 360)
			scoreP2();
		else if (ball.x >= 820)
			scoreP1();
		else
			outOfBounds();
		CheckScores();
		resetPositions();
	}
}

/*function p1flash()
{
	p1nocontact = false;
	clearInterval(collInt1);
}

function p2flash()
{
	p2nocontact = false;
	clearInterval(collInt2);
}*/

function scoreP1()
{
	p1Point.innerHTML = p1Score += 1;
	spawnDirection = 2;
	textOutput.innerHTML = "Player 1 Scored!";
	
	textInterval = setInterval(clearText, 2000);
	//textOutput.innerHTML = "Player 1 Serve!";
	//textInterval = setInterval(clearText, 2000);
	scoresound.play();
	console.log("Player 1 scores");
	resetPositions();
}

function scoreP2()
{
	p2Point.innerHTML = p2Score += 1;
	spawnDirection = 1;
	textOutput.innerHTML = "Player 2 Scored!";
	textInterval = setInterval(clearText, 2000);
	//textOutput.innerHTML = "Player 2 Serve!";
	//textInterval = setInterval(clearText, 2000);
	scoresound.play();
	console.log("Player 2 scores");
	resetPositions();
}

function outOfBounds()
{
	if (lastHit == 1)
		spawnDirection = 2;
	else if (lastHit == 2)
		spawnDirection = 1;
	textOutput.innerHTML = "Out of Bounds!";
	textInterval = setInterval(clearText, 2000);
	oobsound.play();
	console.log("Out of bounds");
	resetPositions();
}

function CheckScores()
{
	if (p1Score >= targetScore)
		p1Wins();
	else if (p2Score >= targetScore)
		p2Wins();
}

function p1Wins()
{
	window.alert("Player 1, " + player.name + ", Wins!");
	window.close();
}

function p2Wins()
{
	window.alert("Player 2, " + player2.name + ", Wins!");
	window.close();
}

function clearText()
{
	textOutput.innerHTML = " ";
	clearInterval(textInterval);
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

function cycleFrame()
{
	if (leftPressed == true || rightPressed == true || upPressed == true || downPressed == true)
	{
		if (p1CurrentFrame < 4)
			p1CurrentFrame++;
		else
			p1CurrentFrame = 1;
	}
	if (p2LeftPressed == true || p2RightPressed == true || p2UpPressed == true || p2DownPressed == true)
	{
		if (p2CurrentFrame < 4)
			p2CurrentFrame++;
		else
			p2CurrentFrame = 1;
	}
}

function debugReset(event) //delete this from final version
{
	switch (event.keyCode)
	{
		case 81:
			resetPositions();
			break;
	}
}

function resetPositions()
{
	player.x = 120;
	player.y = 128;
	player2.x = 1160-64;
	player2.y = 640-128-64;
	ball.x = 630;
	ball.y = 310;
	if (spawnDirection == 1)
	{
		ball.xspeed = -3;
		ball.yspeed = -1
	}
	else if (spawnDirection == 2)
	{
		ball.xspeed = 3;
		ball.yspeed = 1;
	}
	ball.speed = 2;
}

function setP1Character(x)
{
	if (x == 1) //Leona
	{
		player.xhit = leonaStats.xhit;
		player.ylighthit = leonaStats.ylighthit;
		player.yheavyhit = leonaStats.yheavyhit;
		player.speed = leonaStats.speed;
		player.img = leonaStats.img;
		player.name = leonaStats.name;
		player.id = leonaStats.id;
		console.log("Leona");
	}
	else if (x == 2) //Penny
	{
		player.xhit = pennyStats.xhit;
		player.ylighthit = pennyStats.ylighthit;
		player.yheavyhit = pennyStats.yheavyhit;
		player.speed = pennyStats.speed;
		player.img = pennyStats.img;
		player.name = pennyStats.name;
		player.id = pennyStats.id;
		console.log("Penny");
	}
	else if (x == 3) //Archie
	{
		player.xhit = archieStats.xhit;
		player.ylighthit = archieStats.ylighthit;
		player.yheavyhit = archieStats.yheavyhit;
		player.speed = archieStats.speed;
		player.img = archieStats.img;
		player.name = archieStats.name;
		player.id = archieStats.id;
		console.log("Archie");
	}
	else if (x == 4) //Perry
	{
		player.xhit = perryStats.xhit;
		player.ylighthit = perryStats.ylighthit;
		player.yheavyhit = perryStats.yheavyhit;
		player.speed = perryStats.speed;
		player.img = perryStats.img;
		player.name = perryStats.name;
		player.id = perryStats.id;
		console.log("Perry");
	}
	else if (x == 5) //Ophelia
	{
		player.xhit = opheliaStats.xhit;
		player.ylighthit = opheliaStats.ylighthit;
		player.yheavyhit = opheliaStats.yheavyhit;
		player.speed = opheliaStats.speed;
		player.img = opheliaStats.img;
		player.name = opheliaStats.name;
		player.id = opheliaStats.id;
		console.log("Ophelia");
	}
	else //default
	{
		player.xhit = defaultStats.xhit;
		player.ylighthit = defaultStats.ylighthit;
		player.yheavyhit = defaultStats.yheavyhit;
		player.speed = defaultStats.speed;
		player.img = defaultStats.img;
		player.name = defaultStats.name;
		player.id = defaultStats.id;
		console.log("default");
	}
	playerSprite.src = "../sprites/" + player.img + ".png";
}

function setP2Character(x)
{
	if (x == 1) //Leona
	{
		player2.xhit = leonaStats.xhit;
		player2.ylighthit = leonaStats.ylighthit;
		player2.yheavyhit = leonaStats.yheavyhit;
		player2.speed = leonaStats.speed;
		player2.img = leonaStats.img;
		player2.name = leonaStats.name;
		player2.id = leonaStats.id;
	}
	else if (x == 2) //Penny
	{
		player2.xhit = pennyStats.xhit;
		player2.ylighthit = pennyStats.ylighthit;
		player2.yheavyhit = pennyStats.yheavyhit;
		player2.speed = pennyStats.speed;		
		player2.img = pennyStats.img;
		player2.name = pennyStats.name;
		player2.id = pennyStats.id;
	}
	else if (x == 3) //Archie
	{
		player2.xhit = archieStats.xhit;
		player2.ylighthit = archieStats.ylighthit;
		player2.yheavyhit = archieStats.yheavyhit;
		player2.speed = archieStats.speed;
		player2.img = archieStats.img; 	
		player2.name = archieStats.name;
		player2.id = archieStats.id;		
	}
	else if (x == 4) //Perry
	{
		player2.xhit = perryStats.xhit;
		player2.ylighthit = perryStats.ylighthit;
		player2.yheavyhit = perryStats.yheavyhit;
		player2.speed = perryStats.speed;
		player2.img = perryStats.img;
		player2.name = perryStats.name;
		player2.id = perryStats.id;
	}
	else if (x == 5) //Ophelia
	{
		player2.xhit = opheliaStats.xhit;
		player2.ylighthit = opheliaStats.ylighthit;
		player2.yheavyhit = opheliaStats.yheavyhit;
		player2.speed = opheliaStats.speed;
		player2.img = opheliaStats.img;
		player2.name = opheliaStats.name;
		player2.id = opheliaStats.id;
	}
	else //default
	{
		player2.xhit = defaultStats.xhit;
		player2.ylighthit = defaultStats.ylighthit;
		player2.yheavyhit = defaultStats.yheavyhit;
		player2.speed = defaultStats.speed;
		player2.img = defaultStats.img;
		player2.name = defaultStats.name;
		player2.id = defaultStats.id;
	}
	player2Sprite.src = "../sprites/" + player2.img + ".png";
}

function swapCharacters() //this is for testing purposes, remove from final version
{
	switch (event.keyCode)
	{
		case 77: //cycles P1 through each character every time you press M
			setP1Character(characterCycle);
			if (characterCycle < 5)
				characterCycle++;
			else
				characterCycle = 0;
			break;
		case 78:
			setP2Character(characterCycle2);
			if (characterCycle2 < 5)
				characterCycle2++;
			else
				characterCycle2 = 0;
			break;
	}
}

