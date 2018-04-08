var canvas = document.querySelector("canvas");
canvas.width = 1280;
canvas.height = 640;
var surface = canvas.getContext("2d");
var player = {x:120, y:128, xhit:3, ylighthit:1, yheavyhit:2, speed:4, img:"tennimalscharplaceholder", name:null, shortname:null, colour:"black", spimg: null, id: 0}; //ylighthit is for when you're moving at a diagonal,
var player2 = {x:1160-64, y:640-128-64, xhit:3, ylighthit:1, yheavyhit:2, speed:4, img:"tennimalscharplaceholder", name:null, shortname:null, colour:"black", spimg: null, id: 0}; //yheavyhit is for when you're moving straight up/down
var ball = {x: 630, y:310, xspeed:-3, yspeed:-1, speed:2};
var playerSprite = new Image();
playerSprite.src = "../sprites/tennimalscharplaceholder.png";
var player2Sprite = new Image();
player2Sprite.src = "../sprites/tennimalscharplaceholder.png";

var ballSprite = new Image();
ballSprite.src = "TennisBall.png";

var p1Effect = new Image();
var p2Effect = new Image();
var p1EffectActive = false;
var p2EffectActive = false;
var p1EffectInt;
var p2EffectInt;
var p1EffectAnimInt;
var p2EffectAnimInt;
var p1EffectAnimFrame = 1;
var p1EffectAnimFrame = 1;

surface.font = "80px BoldTennisFont";
surface.textAlign = "center";

var leonaStats = {xhit:4, ylighthit:0.5, yheavyhit:1.5, speed:4, img:"leona", name:"Leona Pryde", shortname:"LEONA", colour: "#c75859", spimg: "leonaspecialeffect", id:1}; //each character is assigned an id number for reference, e.g. in
var pennyStats = {xhit:3, ylighthit:1, yheavyhit:2.3, speed:3.6, img:"penny", name:"Penny Guinn", shortname:"PENNY", colour: "#c22f9f", spimg: "pennyspecialeffect", id:2}; //the setP1Character function
var archieStats = {xhit:2.5, ylighthit:1, yheavyhit:1.7, speed:5, img:"archie", name: "Archie Teuthis", shortname:"ARCHIE", colour: "#b35c42", spimg: "archiespecialeffect", id:3};
var perryStats = {xhit:3, ylighthit:1, yheavyhit:2, speed:4, img:"perry", name: "Perry Stripes", shortname:"PERRY", colour: "#2d358a", spimg: "perryspecialeffect", id:4};
var opheliaStats = {xhit:2.5, ylighthit:1, yheavyhit:1.5, img:"ophelia", speed:5.5, name: "Madame Ophelia", shortname:"OPHELIA", colour:"#ffbac3", spimg: "opheliaspecialeffect", id:5};
var emeraldStats = {xhit:5, ylighthit:1, yheavyhit: 1.8, speed: 5.8, img: "emerald", name: "Emerald Elysia", shortname: "EMERALD", colour:"#378f11", spimg: null, id:6};
var defaultStats = {xhit:3, ylighthit:1, yheavyhit:2, img:"tennimalscharplaceholder", speed:4, name: "Default", shortname:"COWSQUARE", colour: "black", id:0};

var interval;
//var collInt1;
//var collInt2;

var p1nocontact = false;
var p2nocontact = false;

var ding = document.getElementById("ding");
var scoresound = document.getElementById("scoresound");
var oobsound = document.getElementById("flub");
var specialsound = document.getElementById("special");
var impactsound = document.getElementById("impact");

var leonaspecialsound = document.getElementById("leonasp");
var pennyspecialsound = document.getElementById("pennysp");
var archiespecialsound = document.getElementById("archiesp");
var perryspecialsound = document.getElementById("perrysp");
var opheliaspecialsound = document.getElementById("opheliasp");
var poisonsound = document.getElementById("opheliasp2");
var emeraldspecialsound = document.getElementById("emeraldsp");

var characterCycle = 1; //delete this from final version, it's just for swapCharacters function.
var characterCycle2 = 1; //delete this from final version

var lastHit = 0; //1: ball last touched by player 1, 2: by player 2
var spawnDirection = 1; //1: ball spawns towards player 1, 2: towards player2

var p1Score = 0;
var p2Score = 0;
var targetScore = 8; //score to reach to win the game

var p1SpecialPoints = 0;
var p2SpecialPoints = 0;
var maxSpecialPoints = 10;

var p1stunint;
var p2stunint;

var currentRally = 0;

var brutalAttack = false;
var whirlyAttack = false;

var p1NoMotion = false;
var p2NoMotion = false;
var serving = true;

var cantUseSpecial = false;

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
var drawInterval;

var animSpeed = 4;
var p1CurrentFrame = 1;
var p2CurrentFrame = 1;
var animationInterval = setInterval(cycleFrame, 1000/animSpeed);

var pennySplashArray = [0, 0, 0, 0];
var perryWaveBasis = 0;
var perrySineBasis = 0;
var venom = {x: 0, y: 0, speed: 30, user: 0, active: false};
var photosynecdoche1 = false;
var photosynecdoche2 = false;

var aiInterval;
var aiServeCounter = 0;

var item = {x: 620, y: 100, speed: 2};
var itemSprite = new Image();
itemSprite.src = "../sprites/powerupbox.png";
var currentItem = 0;
var itemState = 0; //0: inactive, 1: box, 2: actual item
var itemOwner = 0; //1: player 1, 2: player2
var itemEffectActive = false;
var itemSpawnInterval;
var itemEffectInterval;
var itemsOn = true;

var shadowAide = {x: 0, y: 0, speed: 4, strength: 5, active: false};
var shadowAideSprite = new Image();

var itemappearssound = document.getElementById("itemappears");
var itemboxbreaks = document.getElementById("itemboxbreaks");
var item0sound = document.getElementById("item0sound");
var item1sound = document.getElementById("item1sound");
var item2sound = document.getElementById("item2sound");
var item3sound = document.getElementById("item3sound");
var item4sound = document.getElementById("item4sound");
var item5sound = document.getElementById("item5sound");
var item6sound = document.getElementById("item6sound");

window.addEventListener("keydown", keyDown);
window.addEventListener("keyup", keyUp);

window.addEventListener("keydown", debugReset); //delete this from final version
window.addEventListener("keydown", swapCharacters); //delete this from final version

startGame();

function startGame()
{
	aiInterval = setInterval(aiMotion, 300);
	interval = setInterval(update, 33.34);
	if (itemsOn = true)
		PrepareItemBox();
}

function update()
{
	//if (ball.x >= player2.x - 25 && ball.x >= player2.x + 5 && ball.y >= player2.y && ball.y+20 <= player2.y + 64)
		//aiStrike();
	if (serving == true)
		ServeStructure();
	else
	{
		movePlayer();
		movePlayer2();
	}
	checkCollision();
	moveBall();
	if (itemState != 0)
	{
		MoveItem();
		CheckItemCollision();
	}
	if (venom.active == true)
		MoveVenom();
	if (shadowAide.active == true)
		MoveShadowAide();
	render();
}

function movePlayer()
{
	if (upPressed == true && player.y > 0 && p1NoMotion == false)
		player.y -= player.speed;
	if (downPressed == true && player.y < 640-64 && p1NoMotion == false)
		player.y += player.speed;
	if (leftPressed == true && player.x > 0 && p1NoMotion == false)
		player.x -= player.speed;
	if (rightPressed == true && player.x < 640-64-17 && p1NoMotion == false)
		player.x += player.speed;
}

function movePlayer2()
{
	if (p2UpPressed == true && player2.y > 0 && p2NoMotion == false)
		player2.y -= player2.speed;
	if (p2DownPressed == true && player2.y < 640-64 && p2NoMotion == false)
		player2.y += player2.speed;
	if (p2LeftPressed == true && player2.x > 640+18 && p2NoMotion == false)
		player2.x -= player2.speed;
	if (p2RightPressed == true && player2.x < 1280-64 && p2NoMotion == false)
		player2.x += player2.speed;
}

function aiMotion()
{
	p2UpPressed = false;
	p2LeftPressed = false;
	p2RightPressed = false;
	p2DownPressed = false;
	
	if (serving == true)
	{
		player2Sprite.src = "../sprites/"+player2.img+"l2.png";
		if (aiServeCounter < 5)
			aiServeCounter++;
		else
		{
			aiServeCounter = 0;
			if (spawnDirection==2)
			{
				if (p2CurrentFrame < 3)
				{
					p2LeftPressed = true;
					p2UpPressed = true;
				}
				else if (p2CurrentFrame == 3 && player2.id != 2 && player2.id != 3)
				{
					p2UpPressed = true;
				}
				else if (player2.id != 6)
				{
					p2LeftPressed = true;
				}
				else
				{
					p2LeftPressed = true;
					p2UpPressed = true;
				}
			}
		}
	}
	else
	{
		if (lastHit == 1)
		{
			if (player2.id == 6 && p2SpecialPoints == 10 && photosynecdoche2 == false && cantUseSpecial == false)
				SpecialMoveP2();
			else if (ball.x <= player2.x)
			{	
				if (player2.id == 1 && p2SpecialPoints == 10 && ball.x + 20 > player2.x-64 && ball.x + 20 < player2.x + 32 && ball.y < player2.y + 64 && ball.y + 20 > player2.y)
				{
					SpecialMoveP2();
				}
				else if (player2.id == 4 && p2SpecialPoints == 10 && ball.x > player2.x - 64 && ball.x < player2.x + 32 && ball.y < player2.y + 64 && ball.y + 20 > player2.y)
				{
					SpecialMoveP2();
				}
				else if (player2.y >= ball.y-20 && player2.y <= ball.y+20)
				{
					p2LeftPressed = true;
					player2Sprite.src = "../sprites/"+player2.img+"l"+p2CurrentFrame+".png";
				}
				else if (player2.y >= ball.y && player2.y <= ball.y+120)
				{
					p2LeftPressed = true;
					p2UpPressed = true;
					player2Sprite.src = "../sprites/"+player2.img+"l"+p2CurrentFrame+".png";
				}
				else if (player2.y >= ball.y)
				{
					p2UpPressed = true;
					player2Sprite.src = "../sprites/"+player2.img+"b"+p2CurrentFrame+".png";
				}
				else if (player2.y <= ball.y && player2.y >= ball.y-110)
				{
					p2LeftPressed = true;
					p2DownPressed = true;
					player2Sprite.src = "../sprites/"+player2.img+"l"+p2CurrentFrame+".png";
				}
				else if (player2.y <= ball.y)
				{
					p2DownPressed = true;
					player2Sprite.src = "../sprites/"+player2.img+p2CurrentFrame+".png";
				}
			}
			else if (player2.id == 2 && p2SpecialPoints == 10 && cantUseSpecial == false)
			{
				SpecialMoveP2();
			}
			else if (player2.id == 3 && p2SpecialPoints == 10 && cantUseSpecial == false)
			{
				SpecialMoveP2();
			}
		}
		else if (lastHit == 2)
		{
			if (player2.id == 5 && player2.y + 64 >= player.y && player2.y <= player.y + 64 && cantUseSpecial == false && p2SpecialPoints == 10)
			{
				SpecialMoveP2();
			}
			else if (player2.y >= ball.y+50 && player2.x <= 1100)
			{
				p2RightPressed = true;
				p2UpPressed = true;
				player2Sprite.src = "../sprites/"+player2.img+"r"+p2CurrentFrame+".png";
			}
			else if (player2.y >= ball.y+50)
			{
				p2UpPressed = true;
				player2Sprite.src = "../sprites/"+player2.img+"b"+p2CurrentFrame+".png";
			}
			else if (player2.y <= ball.y-30 && player2.x <= 1100)
			{
				p2RightPressed = true;
				p2DownPressed = true;
				player2Sprite.src = "../sprites/"+player2.img+"r"+p2CurrentFrame+".png";
			}
			else if (player2.y <= ball.y-30)
			{
				p2DownPressed = true;
				player2Sprite.src = "../sprites/"+player2.img+p2CurrentFrame+".png";
			}
			else if (player2.x <= 1100)
			{
			p2RightPressed = true;
			player2Sprite.src = "../sprites/"+player2.img+"r"+p2CurrentFrame+".png";
			}
		}
	}
	if (player2.id == 0)
		player2Sprite.src = "../sprites/tennimalscharplaceholder.png";
}

/*function aiStrike()
{
	p2LeftPressed = false;
	p2UpPressed = false;
	p2DownPressed = false;
	p2RightPressed = false;
	if (player.y <= player2.y-300 || player.y >= player2.y+364)
	{
		p2LeftPressed = true;
		player2Sprite.src = "../sprites/"+player2.img+"l.png";
	}
	else if (player.y <= player2.y-150 && player2.y < 500)
	{
		p2LeftPressed = true;
		p2DownPressed = true;
		player2Sprite.src = "../sprites/"+player2.img+"l.png";
	}
	else if (player.y >= player2.y+214 && player2.y > 140)
	{
		p2LeftPressed = true;
		player2Sprite.src = "../sprites/"+player2.img+"l.png";
	}
	else if (player.y <= player2.y && player2.y < 500)
	{
		p2DownPressed = true;
		player2Sprite.src = "../sprites/"+player2.img+".png";
	}
	else if (player.y >= player2.y+64 && player2.y > 140)
	{
		p2UpPressed = true;
		player2Sprite.src = "../sprites/"+player2.img+"b.png";
	}
	else
	{
		p2LeftPressed = true;
		player2Sprite.src = "../sprites/"+player2.img+"l.png";
	}
}*/

function moveBall()
{
	ball.x += ball.xspeed * ball.speed;
	if (whirlyAttack == false)
		ball.y += ball.yspeed * ball.speed;
	else
	{
		perrySineBasis++;
		ball.y = perryWaveBasis + 100 * (Math.sin(perrySineBasis*8 * (Math.PI / 180)));
	}
}

function render()
{
	surface.clearRect(0,0,1280,640)
	CheckP1Sprite();
	//playerSprite.src = player.img + ".png";
	//player2Sprite.src = player2.img + ".png";
	playerSprite.onload = function()
	{
		surface.drawImage(playerSprite, player.x, player.y);
		surface.drawImage(player2Sprite, player2.x, player2.y);
		surface.drawImage(ballSprite, ball.x, ball.y);
	}
	player2Sprite.onload = function()
	{
		surface.drawImage(player2Sprite, player2.x, player2.y);
		surface.drawImage(playerSprite, player.x, player.y);
		surface.drawImage(ballSprite, ball.x, ball.y);
	}
	surface.drawImage(playerSprite, player.x, player.y);
	surface.drawImage(player2Sprite, player2.x, player2.y);
	surface.drawImage(ballSprite, ball.x, ball.y);
	
	if (p1EffectActive == true)
		DrawP1Effect();
	if (p2EffectActive == true)
		DrawP2Effect();
	if (itemState != 0)
		DrawItem();
	if (shadowAide.active == true)
		DrawShadowAide();
	
	DrawMeters();
}

function checkCollision() //we can maybe add an if statement to make it only check one player's collision at a time if necessary
{
	checkP1Collision();
	checkP2Collision();
	if (shadowAide.active == true)
		CheckShadowAideCollision();
	checkBounds();
}

function CheckP1Sprite()
{
	if (player.id != 0)
	{
		if (serving == true)
		{
			playerSprite.src = "../sprites/"+player.img+"r2.png";
		}
		else
		{
			if (rightPressed == true && p1NoMotion == false)
				playerSprite.src = "../sprites/"+player.img+"r"+p1CurrentFrame+".png";
			else if (leftPressed == true && p1NoMotion == false)
				playerSprite.src = "../sprites/"+player.img+"l"+p1CurrentFrame+".png";
			else if (downPressed == true && p1NoMotion == false)
				playerSprite.src = "../sprites/"+player.img+p1CurrentFrame+".png";
			else if (upPressed == true && p1NoMotion == false)
				playerSprite.src = "../sprites/"+player.img+"b"+p1CurrentFrame+".png";
		}
	}
	else
		playerSprite.src = "../sprites/tennimalscharplaceholder.png";
}

/*function CheckP2Sprite()
{
	if (p2RightPressed == true && p2UpPressed == false && p2DownPressed == false)
		player2Sprite.src = "../sprites/"+player2.img+"r.png";
	else if (p2LeftPressed == true && p2UpPressed == false && p2DownPressed == false)
		player2Sprite.src = "../sprites/"+player2.img+"l.png";
	else if (p2DownPressed == true && p2LeftPressed == false && p2RightPressed == false)
		player2Sprite.src = "../sprites/"+player2.img+".png";
	else if (p2UpPressed == true && p2LeftPressed == false && p2RightPressed == false)
		player2Sprite.src = "../sprites/"+player2.img+"b.png";
}*/

function DrawMeters()
{
	surface.fillStyle = "white";
	surface.fillRect(120, 605, 440, 20);
	surface.fillRect(720, 605, 440, 20);
	if (p1SpecialPoints > 0)
	{
		surface.fillStyle = player.colour;
		surface.fillRect(120, 605, (44 * p1SpecialPoints), 20);
	}
	if (p2SpecialPoints > 0)
	{
		surface.fillStyle = player2.colour;
		surface.fillRect((1160-(44 * p2SpecialPoints)), 605, (44 * p2SpecialPoints), 20);
	}
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
		currentRally++;
		if (currentRally > 4)
			incrementP1SP();
		
		whirlyAttack = false;
		if (brutalAttack == false)
			ding.play();
		else
		{
			impactsound.play();
			brutalAttack = false;
			if (player.x-10 > 0)
				player.x -= 10;
			p1NoMotion = true;
			p1stunint = setInterval(EndP1Stun, 2000);
			ballSprite.src = "TennisBall.png";
		}
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
			if (ball.y > 100)
				ball.yspeed = -player2.ylighthit;
		}
		else if (p2LeftPressed == true && p2UpPressed == false && p2DownPressed == true)
		{
			ball.xspeed = -player2.xhit;
			if (ball.y < 1180)
				ball.yspeed = player2.ylighthit;
		}
		else if (p2LeftPressed == false && p2UpPressed == true && p2DownPressed == false)
		{
			ball.xspeed = -player2.xhit;
			if (ball.y > 180)
				ball.yspeed = -player2.yheavyhit;
		}
		else if (p2LeftPressed == false && p2UpPressed == false && p2DownPressed == true)
		{
			ball.xspeed = -player2.xhit;
			if (ball.y < 1100)
				ball.yspeed = player2.yheavyhit;
		}
		else
		{
			ball.xspeed *= -1;
			ball.yspeed *= 1;
		}
		/*p2LeftPressed = false;
		p2UpPressed = false;
		p2DownPressed = false;
		p2RightPressed = false;
		if (player.y <= player2.y-300 || player.y >= player2.y+364)
		{
			ball.xspeed = -player2.xhit-1;
			ball.yspeed = 0;
		}
		else if (player.y <= player2.y-150 && player2.y < 500)
		{
			ball.xspeed = -player2.xhit;
			ball.yspeed = player2.ylighthit;
		}
		else if (player.y >= player2.y+214 && player2.y > 140)
		{
			ball.xspeed = -player2.xhit-1;
			ball.yspeed = -player2.ylighthit;
		}
		else if (player.y <= player2.y && player2.y < 400)
		{
			ball.xspeed = -player2.xhit;
			ball.yspeed = player2.yheavyhit;
		}
		else if (player.y >= player2.y+64 && player2.y > 240)
		{
			ball.xspeed = -player2.xhit;
			ball.yspeed = -player2.yheavyhit;
		}
		else
		{
			ball.xspeed = -player2.xhit-1;
			ball.yspeed = 0;
		}*/
		lastHit = 2;
		currentRally++;
		if (currentRally > 4)
			incrementP2SP();
		
		whirlyAttack = false;
		if (brutalAttack == false)
			ding.play();
		else
		{
			impactsound.play();
			brutalAttack = false;
			if (player2.x+10 < 1280-64)
				player2.x += 10;
			p2NoMotion = true;
			p2stunint = setInterval(EndP2Stun, 2000);
			ballSprite.src = "TennisBall.png";
		}
	}
}

function SpecialMoveP1()
{
	if (photosynecdoche1 == false)
		p1SpecialPoints = 0;
	if (player.id == 1) //Leona: Lion's Fury
	{
		leonaspecialsound.play();
		p1NoMotion = true;
		p1stunint = setInterval(EndP1Stun, 1500);
		playerSprite.src = "../sprites/leonar1.png";
		p1EffectActive = true;
		p1EffectInt = setInterval(EndP1Effect, 300);
		p1EffectAnimFrame = 1;
		p1EffectAnimInt = setInterval(AnimateP1Effect, 50);
		if (ball.x < player.x + 128 && ball.x > player.x + 32 && ball.y < player.y + 64 && ball.y + 20 > player.y)
		{
			serving = false;
			p2NoMotion = false;
			whirlyAttack = false;
			ball.xspeed = 12;
			ball.yspeed = 0;
			lastHit = 1;
			currentRally++;
			brutalAttack = true;
			ballSprite.src = "TennisBallRed.png";
		}
	}
	else if (player.id == 2) //Penny: Dive Save
	{
		pennyspecialsound.play();
		p1EffectActive = true;
		p1EffectInt = setInterval(EndP1Effect, 300);
		p1EffectAnimFrame = 1;
		p1EffectAnimInt = setInterval(AnimateP1Effect, 50);
		pennySplashArray[0] = player.x;
		pennySplashArray[1] = player.y;
		if (serving == false)
		{
			if (ball.x <= 640 && ball.x >= 74)
			{
				player.x = ball.x-74;
				player.y = ball.y-22;
			}
			else if (ball.x < 74)
			{
				player.x = 0;
				player.y = ball.y-22;
			}
			else if (ball.x > 640)
			{
				player.y = ball.y-22;
			}
			pennySplashArray[2] = player.x;
			pennySplashArray[3] = player.y;
		}
	}
	else if (player.id == 3) //Archie: Flurry Return
	{
		archiespecialsound.play();
		p1NoMotion = true;
		p1stunint = setInterval(EndP1Stun, 1500);
		playerSprite.src = "../sprites/archier1.png";
		p1EffectActive = true;
		p1EffectInt = setInterval(EndP1Effect, 300);
		p1EffectAnimFrame = 1;
		p1EffectAnimInt = setInterval(AnimateP1Effect, 50);
		if (ball.x < player.x + 448 && ball.x > player.x - 384 && ball.y < player.y + 448 && ball.y + 20 > player.y - 384)
		{
			ding.play();
			serving = false;
			p2NoMotion = false;
			brutalAttack = false;
			whirlyAttack = false;
			ballSprite.src = "TennisBall.png";
			ball.xspeed = player.xhit + 2;
			ball.yspeed = 0;
			lastHit = 1;
			currentRally++;
		}
	}
	else if (player.id == 4) //Perry: Whirligig Wave
	{
		perryspecialsound.play();
		p1NoMotion = true;
		p1stunint = setInterval(EndP1Stun, 1500);
		playerSprite.src = "../sprites/perryr1.png";
		p1EffectActive = true;
		p1EffectInt = setInterval(EndP1Effect, 300);
		p1EffectAnimFrame = 1;
		p1EffectAnimInt = setInterval(AnimateP1Effect, 50);
		if (ball.x < player.x + 128 && ball.x > player.x + 32 && ball.y < player.y + 64 && ball.y + 20 > player.y)
		{
			serving = false;
			p2NoMotion = false;
			ball.xspeed = player.xhit+2;
			ball.yspeed = 0;
			lastHit = 1;
			whirlyAttack = true;
			brutalArrack = false;
			ballSprite.src = "TennisBall.png";
			perryWaveBasis = ball.y;
			perrySineBasis = 0;
			currentRally++;
		}
	}
	else if (player.id == 5) //Ophelia: Aristoxicity
	{
		opheliaspecialsound.play();
		p1NoMotion = true;
		p1stunint = setInterval(EndP1Stun, 1000);
		playerSprite.src = "../sprites/opheliar1.png";
		p1EffectActive = true;
		p1EffectAnimFrame = 1;
		p1Effect.src = "../sprites/opheliaspecialeffectr1.png";
		//p1EffectAnimInt = setInterval(AnimateP1Effect, 200);
		if (venom.active == false)
		{
			venom.active = true;
			venom.user = 1;
			venom.x = player.x+64;
			venom.y = player.y;
		}
	}
	else if (player.id == 6 && photosynecdoche1 == false) //Emerald: Photosynecdoche
	{
		emeraldspecialsound.play();
		player.img = "semerald";
		playerSprite.src = "../sprites/semerald1.png";
		p1SpecialPoints = 10;
		photosynecdoche1 = true;
		player.xhit += 2;
		player.speed += 2;
		player.colour = "#82fdff";
	}
}

function SpecialMoveP2()
{
	if (photosynecdoche2 == false)
		p2SpecialPoints = 0;
	if (player2.id == 1) //Leona: Lion's Fury
	{
		leonaspecialsound.play();
		p2NoMotion = true;
		p2stunint = setInterval(EndP2Stun, 1500);
		player2Sprite.src = "../sprites/leonal1.png";
		p2EffectActive = true;
		p2EffectInt = setInterval(EndP2Effect, 300);
		p2EffectAnimFrame = 1;
		p2EffectAnimInt = setInterval(AnimateP2Effect, 50);
		if (ball.x + 20 > player2.x-64 && ball.x + 20 < player2.x + 32 && ball.y < player2.y + 64 && ball.y + 20 > player2.y)
		{
			serving = false;
			p1NoMotion = false;
			ball.xspeed = -12;
			ball.yspeed = 0;
			lastHit = 2;
			currentRally++;
			brutalAttack = true;
			whirlyAttack = false;
			ballSprite.src = "TennisBallRed.png";
		}
	}
	else if (player2.id == 2) //Penny: Dive Save
	{
		pennyspecialsound.play();
		p2EffectActive = true;
		p2EffectInt = setInterval(EndP2Effect, 300);
		p2EffectAnimFrame = 1;
		p2EffectAnimInt = setInterval(AnimateP2Effect, 50);
		pennySplashArray[0] = player2.x;
		pennySplashArray[1] = player2.y;
		if (serving == false)
		{
			if (ball.x >= 640 && ball.x <= 1280-74)
			{
				player2.x = ball.x+10;
				player2.y = ball.y-22;
			}
			else if (ball.x >= 1280-74)
			{
				player2.x = 1280-64;
				player2.y = ball.y-22;
			}
			else if (ball.x < 640)
			{
				player2.y = ball.y-22;
			}
			pennySplashArray[2] = player2.x;
			pennySplashArray[3] = player2.y;
		}
	}
	else if (player2.id == 3) //Archie: Flurry Return
	{
		archiespecialsound.play();
		p2NoMotion = true;
		p2stunint = setInterval(EndP2Stun, 1500);
		player2Sprite.src = "../sprites/archiel1.png";
		p2EffectActive = true;
		p2EffectInt = setInterval(EndP2Effect, 300);
		p2EffectAnimFrame = 1;
		p2EffectAnimInt = setInterval(AnimateP2Effect, 50);
		if (ball.x < player2.x + 448 && ball.x > player2.x - 384 && ball.y < player2.y + 448 && ball.y + 20 > player2.y - 384)
		{
			ding.play();
			serving = false;
			p1NoMotion = false;
			brutalAttack = false;
			whirlyAttack = false;
			ballSprite.src = "TennisBall.png";
			ball.xspeed = -player2.xhit - 2;
			ball.yspeed = 0;
			lastHit = 2;
			currentRally++;
		}
	}
	else if (player2.id == 4) //Perry: Whirligig Wave
	{
		perryspecialsound.play();
		p2NoMotion = true;
		p2stunint = setInterval(EndP2Stun, 1500);
		player2Sprite.src = "../sprites/perryl1.png";
		p2EffectActive = true;
		p2EffectInt = setInterval(EndP2Effect, 300);
		p2EffectAnimFrame = 1;
		p2EffectAnimInt = setInterval(AnimateP2Effect, 50);
		if (ball.x > player2.x - 64 && ball.x < player2.x + 32 && ball.y < player2.y + 64 && ball.y + 20 > player2.y)
		{
			serving = false;
			p1NoMotion = false;
			ball.xspeed = -player2.xhit-2;
			ball.yspeed = 0;
			lastHit = 2;
			whirlyAttack = true;
			brutalArrack = false;
			ballSprite.src = "TennisBall.png";
			perryWaveBasis = ball.y;
			perrySineBasis = 0;
			currentRally++;
		}
	}
	else if (player2.id == 5) //Ophelia: Aristoxicity
	{
		opheliaspecialsound.play();
		p2NoMotion = true;
		p2stunint = setInterval(EndP2Stun, 1000);
		player2Sprite.src = "../sprites/ophelial1.png";
		p2EffectActive = true;
		p2EffectAnimFrame = 1;
		p2Effect.src = "../sprites/opheliaspecialeffectl1.png";
		if (venom.active == false)
		{
			venom.active = true;
			venom.user = 2;
			venom.x = player2.x-128;
			venom.y = player2.y;
		}
	}
	else if (player2.id == 6 && photosynecdoche2 == false) //Emerald: Photosynecdoche
	{
		emeraldspecialsound.play();
		player2.img = "semerald";
		player2Sprite.src = "../sprites/semerald1.png";
		p2SpecialPoints = 10;
		photosynecdoche2 = true;
		player2.xhit += 2;
		player2.speed += 2;
		player2.colour = "#82fdff";
	}
}

function EndP1Stun()
{
	clearInterval(p1stunint);
	p1NoMotion = false;
}

function EndP2Stun()
{
	clearInterval(p2stunint);
	p2NoMotion = false;
}

function EndP1Effect()
{
	p1EffectActive = false;
	clearInterval(p1EffectInt);
	clearInterval(p1EffectAnimInt);
}

function EndP2Effect()
{
	p2EffectActive = false;
	clearInterval(p2EffectInt);
	clearInterval(p2EffectAnimInt);
}

function AnimateP1Effect()
{
	if (player.id == 1)
	{
		if (p1EffectAnimFrame == 1)
			p1EffectAnimFrame = 2;
		else
			p1EffectAnimFrame = 1;
		p1Effect.src = "../sprites/" + player.spimg + "r" + p1EffectAnimFrame + ".png";
	}
	else if (player.id == 2)
	{
		if (p1EffectAnimFrame < 3)
			p1EffectAnimFrame++;
		else
			p1EffectAnimFrame = 1;
		p1Effect.src = "../sprites/" + player.spimg + p1EffectAnimFrame + ".png";
	}
	else if (player.id == 3)
	{
		if (p1EffectAnimFrame < 3)
			p1EffectAnimFrame++;
		else
			p1EffectAnimFrame = 1;
		p1Effect.src = "../sprites/" + player.spimg + "r" + p1EffectAnimFrame + ".png";
	}
	else if (player.id == 4)
	{
		if (p1EffectAnimFrame < 3)
			p1EffectAnimFrame++;
		else
			p1EffectAnimFrame = 1;
		p1Effect.src = "../sprites/" + player.spimg + p1EffectAnimFrame + ".png";
	}
	else if (player.id == 5 && venom.active == true && venom.user == 1)
	{
		if (p1EffectAnimFrame < 4)
			p1EffectAnimFrame++;
		else
			p1EffectAnimFrame = 1;
		p1Effect.src = "../sprites/"+player.spimg+"r"+p1EffectAnimFrame+".png";
	}
}

function AnimateP2Effect()
{
	if (player2.id == 1)
	{
		if (p2EffectAnimFrame == 1)
			p2EffectAnimFrame = 2;
		else
			p2EffectAnimFrame = 1;
		p2Effect.src = "../sprites/" + player2.spimg + "l" + p2EffectAnimFrame + ".png";
	}
	else if (player2.id == 2)
	{
		if (p2EffectAnimFrame < 3)
			p2EffectAnimFrame++;
		else
			p2EffectAnimFrame = 1;
		p2Effect.src = "../sprites/" + player2.spimg + p2EffectAnimFrame + ".png";
	}
	else if (player2.id == 3)
	{
		if (p2EffectAnimFrame < 3)
			p2EffectAnimFrame++;
		else
			p2EffectAnimFrame = 1;
		p2Effect.src = "../sprites/" + player2.spimg + "l" + p2EffectAnimFrame + ".png";
	}
	else if (player2.id == 4)
	{
		if (p2EffectAnimFrame < 3)
			p2EffectAnimFrame++;
		else
			p2EffectAnimFrame = 1;
		p2Effect.src = "../sprites/" + player2.spimg + p2EffectAnimFrame + ".png";
	}
}

function DrawP1Effect()
{
	if (player.id == 1)
	{
		surface.drawImage(p1Effect, player.x, player.y);
	}
	else if (player.id == 2)
	{
		surface.drawImage(p1Effect, pennySplashArray[0], pennySplashArray[1]);
		surface.drawImage(p1Effect, pennySplashArray[2], pennySplashArray[3]);
	}
	else if (player.id == 3)
	{
		surface.drawImage(p1Effect, player.x-384, player.y-384);
	}
	else if (player.id == 4)
	{
		surface.drawImage(p1Effect, player.x+64, player.y);
	}
	else if (player.id == 5)
	{
		surface.drawImage(p1Effect, venom.x, venom.y);
	}
}

function DrawP2Effect()
{
	if (player2.id == 1)
	{
		surface.drawImage(p2Effect, player2.x-64, player2.y);
	}
	else if (player2.id == 2)
	{
		surface.drawImage(p2Effect, pennySplashArray[0], pennySplashArray[1]);
		surface.drawImage(p2Effect, pennySplashArray[2], pennySplashArray[3]);
	}
	else if (player2.id == 3)
	{
		surface.drawImage(p2Effect, player2.x-384, player2.y-384);
	}
	else if (player2.id == 4)
	{
		surface.drawImage(p2Effect, player2.x-64, player2.y);
	}
	else if (player2.id == 5)
	{
		surface.drawImage(p2Effect, venom.x, venom.y);
	}
}

function MoveVenom()
{
	if (venom.user == 1)
		venom.x += venom.speed;
	if (venom.user == 2)
		venom.x -= venom.speed;
	if (venom.x >= 1280 || venom.x <= -128)
		DeactivateVenom();
	if (venom.user == 1 && venom.x + 128 > player2.x && venom.x +128 < player2.x + 64 && venom.y < player2.y + 64 && venom.y + 64 > player2.y)
	{
		PoisonPlayer2();
		DeactivateVenom();
	}
	if (venom.user == 2 && venom.x < player.x + 64 && venom.x > player.x && venom.y < player.y + 64 && venom.y + 64 > player.y)
	{
		PoisonPlayer1();
		DeactivateVenom();
	}
}

function DeactivateVenom()
{
	venom.active = false;
	venom.user = 0;
	p1EffectActive = false;
	p2EffectActive = false;
	clearInterval(p1EffectAnimInt);
}

function PoisonPlayer1()
{
	console.log("P1 POISONED");
	poisonsound.play();
	player.speed -= 2;
	p2EffectInt = setInterval(HealPoisonP1, 5000);
}

function PoisonPlayer2()
{
	console.log("P2 POISONED");
	poisonsound.play();
	player2.speed -= 2;
	p1EffectInt = setInterval(HealPoisonP2, 5000);
}

function HealPoisonP1()
{
	player.speed += 2;
	clearInterval(p2EffectInt);
}

function HealPoisonP2()
{
	player2.speed += 2;
	clearInterval(p1EffectInt);
}

function EndPhotosynecdoche()
{
	if (photosynecdoche1 == true)
	{
		player.img = "emerald";
		p1SpecialPoints = 0;
		photosynecdoche1 = false;
		player.xhit -= 2;
		player.speed -= 2;
		player.colour = "#378f11";
	}
	if (photosynecdoche2 == true)
	{
		player2.img = "emerald";
		p2SpecialPoints = 0;
		photosynecdoche2 = false;
		player2.xhit -= 2;
		player2.speed -= 2;
		player2.colour = "#378f11";
	}
}

function DrawItem()
{
	surface.drawImage(itemSprite, item.x, item.y);
}

function MoveItem()
{
	if (itemState == 1)
		item.y += item.speed;
	else if (itemState == 2)
	{
		if (itemOwner == 1)
			item.x -= item.speed;
		else
			item.x+=item.speed;
	}
}

function CheckItemCollision()
{
	if (itemState == 1)
	{
		if (ball.x < item.x + 40 && ball.x + 20 > item.x && ball.y < item.y + 40 && ball.y + 20 > item.y)
		{
			itemOwner = lastHit;
			itemState = 2;
			item.speed = 2;
			itemSprite.src = "../sprites/powerup"+currentItem+".png";
			itemboxbreaks.play();
		}
		if (item.y > 640 || item.y < -40)
			EndItem();
	}
	else if (itemState == 2)
	{
		if (itemOwner == 1)
		{
			if (item.x < player.x + 64 && item.x + 40 > player.x && item.y < player.y + 64 && item.y + 40 > player.y)
			{
				itemState = 0;
				ActivateItemP1();
			}
		}
		else if (itemOwner == 2)
		{
			if (item.x < player2.x + 64 && item.x + 40 > player2.x && item.y < player2.y + 64 && item.y + 40 > player2.y)
			{
				itemState = 0;
				ActivateItemP2();
			}
		}
		if (item.x > 1280 || item.x < 0)
			EndItem();
	}
}

function PrepareItemBox()
{
	clearInterval(itemSpawnInterval);
	var randomtime = 10000 + Math.floor(Math.random() * 15000 + 1);
	itemSpawnInterval = setInterval(SpawnItemBox, randomtime);
	var randomspot = 100 + Math.floor(Math.random() * 440);
	item.y = randomspot;
	item.x = 620;
	if (item.y >= 320)
		item.speed = -2;
	else
		item.speed = 2;
	currentItem = Math.floor(Math.random() * 7);
}

function SpawnItemBox()
{
	itemSprite.src = "../sprites/powerupbox.png";
	itemState = 1;
	itemappearssound.play();
	clearInterval(itemSpawnInterval);
}

function EndItem()
{
	if (itemOwner == 1 && itemEffectActive == true)
		DeactivateItemP1();
	else if (itemOwner == 2 && itemEffectActive == true)
		DeactivateItemP2();
	itemState = 0;
	itemOwner = 0;
	PrepareItemBox();
}

function ActivateItemP1()
{
	itemEffectActive = true;
	if (currentItem == 0) //STRENGTH BOOST
	{
		item0sound.play();
		player.xhit += 4;
		itemEffectInterval = setInterval(EndItem, 7000);
	}
	else if (currentItem == 1) //SPEED BOOST
	{
		item1sound.play();
		player.speed += 2;
		itemEffectInterval = setInterval(EndItem, 7000);
	}
	else if (currentItem == 2) //SNAIL TIME
	{
		item2sound.play();
		player2.speed /= 2;
		ball.speed /= 2;
		itemEffectInterval = setInterval(EndItem, 7000);
	}
	else if (currentItem == 3) //SHADOW AIDE
	{
		item3sound.play();
		shadowAide.active = true;
		itemEffectInterval = setInterval(EndItem, 15000);
	}
	else if (currentItem == 4) //SP BOOST
	{
		item4sound.play();
		for (var j = 0; j < 5; j++)
			incrementP1SP();
		EndItem();
	}
	else if (currentItem == 5) //SCORE VAMPIRE
	{
		item5sound.play();
	}
	else if (currentItem == 6) //DOUBLE POINTS
	{
		item6sound.play();
	}
}

function ActivateItemP2()
{
	itemEffectActive = true;
	if (currentItem == 0) //STRENGTH BOOST
	{
		item0sound.play();
		player2.xhit += 4;
		itemEffectInterval = setInterval(EndItem, 7000);
	}
	else if (currentItem == 1) //SPEED BOOST
	{
		item1sound.play();
		player2.speed += 2;
		itemEffectInterval = setInterval(EndItem, 7000);
	}
	else if (currentItem == 2) //SNAIL TIME
	{
		item2sound.play();
		player.speed /= 2;
		ball.speed /= 2;
		itemEffectInterval = setInterval(EndItem, 7000);
	}
	else if (currentItem == 3) //SHADOW AIDE
	{
		item3sound.play();
		shadowAide.active = true;
		itemEffectInterval = setInterval(EndItem, 15000);
	}
	else if (currentItem == 4) //SP BOOST
	{
		item4sound.play();
		for (var j = 0; j < 5; j++)
			incrementP2SP();
		EndItem();
	}
	else if (currentItem == 5) //SCORE VAMPIRE
	{
		item5sound.play();
	}
	else if (currentItem == 6) //DOUBLE POINTS
	{
		item6sound.play();
	}
}

function DeactivateItemP1()
{
	clearInterval(itemEffectInterval);
	itemEffectActive = false;
	if (currentItem == 0)
		player.xhit -= 4;
	else if (currentItem == 1)
		player.speed -=2;
	else if (currentItem == 2)
	{
		player2.speed *= 2;
		ball.speed *= 2;
	}
	else if (currentItem == 3)
		shadowAide.active = false;
}

function DeactivateItemP2()
{
	clearInterval(itemEffectInterval);
	itemEffectActive = false;
	if (currentItem == 0)
		player2.xhit -= 4;
	else if (currentItem == 1)
		player2.speed -= 2;
	else if (currentItem == 2)
	{
		player.speed *= 2;
		ball.speed *= 2;
	}
	else if (currentItem == 3)
		shadowAide.active = false;
}

function MoveShadowAide()
{
	if (itemOwner == 1)
		shadowAide.x = 100;
	else if (itemOwner == 2)
		shadowAide.x = 1150;
	if (shadowAide.y < ball.y-22)
		shadowAide.y += shadowAide.speed;
	else if (shadowAide.y > ball.y+20)
		shadowAide.y -= shadowAide.speed;
}

function DrawShadowAide()
{
	if (itemOwner == 1)
		shadowAideSprite.src = "../sprites/shadowaider.png";
	else if (itemOwner == 2)
		shadowAideSprite.src = "../sprites/shadowaidel.png";
	surface.drawImage(shadowAideSprite, shadowAide.x, shadowAide.y);
}

function CheckShadowAideCollision()
{
	if (itemOwner == 1 && ball.x < shadowAide.x + 30 && ball.x > shadowAide.x && ball.y < shadowAide.y + 64 && ball.y + 20 > shadowAide.y && lastHit != 1)
	{
		ding.play();
		lastHit = 1;
		currentRally++;
		whirlyAttack = false;
		brutalAttack = false;
		ball.yspeed = 0;
		ball.xspeed = shadowAide.strength;
	}
	else if (itemOwner == 2 && ball.x + 20 > shadowAide.x && ball.x < shadowAide.x + 30 && ball.y < shadowAide.y + 64 && ball.y + 20 > shadowAide.y && lastHit != 2)
	{
		ding.play();
		lastHit = 2;
		currentRally++;
		whirlyAttack = false;
		brutalAttack = false;
		ball.yspeed = 0;
		ball.xspeed = -shadowAide.strength;
	}
}

function checkBounds()
{
	if (ball.x <= -20 || ball.x >= 1280 || ball.y <= -20 || ball.y >= 640)
	{
		if (ball.x <= 360)
			scoreP2();
		else if (ball.x >= 920)
			scoreP1();
		else
			outOfBounds();
		CheckScores();
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

function ServeStructure()
{
	ball.xspeed = 0;
	ball.yspeed = 0;
	p1NoMotion = true;
	p2NoMotion = true;
	if (spawnDirection == 1)
	{
		ball.x = 120+68;
		ball.y = 128 + 22;
		
		if (rightPressed == true && upPressed == false && downPressed == false)
		{
			ball.xspeed = player.xhit+1;
			ball.yspeed = 0;
			p1Served();
		}
		else if (rightPressed == true && upPressed == true && downPressed == false)
		{
			ball.xspeed = player.xhit;
			ball.yspeed = -player.ylighthit;
			p1Served();
		}
		else if (rightPressed == true && upPressed == false && downPressed == true)
		{
			ball.xspeed = player.xhit;
			ball.yspeed = player.ylighthit;
			p1Served();
		}
		else if (rightPressed == false && upPressed == true && downPressed == false)
		{
			ball.xspeed = player.xhit;
			ball.yspeed = -player.yheavyhit;
			p1Served();
		}
		else if (rightPressed == false && upPressed == false && downPressed == true)
		{
			ball.xspeed = player.xhit;
			ball.yspeed = player.yheavyhit;
			p1Served();
		}
	}
	else if (spawnDirection == 2)
	{
		ball.x = 1072;
		ball.y = 456 + 20;
		
		if (p2LeftPressed == true && p2UpPressed == false && p2DownPressed == false)
		{
			ball.xspeed = -player2.xhit-1;
			ball.yspeed = 0;
			p2Served();
		}
		else if (p2LeftPressed == true && p2UpPressed == true && p2DownPressed == false)
		{
			ball.xspeed = -player2.xhit;
			ball.yspeed = -player2.ylighthit;
			p2Served();
		}
		else if (p2LeftPressed == true && p2UpPressed == false && p2DownPressed == true)
		{
			ball.xspeed = -player2.xhit;
			ball.yspeed = player2.ylighthit;
			p2Served();
		}
		else if (p2LeftPressed == false && p2UpPressed == true && p2DownPressed == false)
		{
			ball.xspeed = -player2.xhit;
			ball.yspeed = -player2.yheavyhit;
			p2Served();
		}
		else if (p2LeftPressed == false && p2UpPressed == false && p2DownPressed == true)
		{
			ball.xspeed = -player2.xhit;
			ball.yspeed = player2.yheavyhit;
			p2Served();
		}
	}
	//surface.drawImage(playerSprite, player.x, player.y);
	//surface.drawImage(player2Sprite, player2.x, player2.y);
}

function p1Served()
{
	lastHit = 1;
	ding.play();
	p1NoMotion = false;
	p2NoMotion = false;
	serving = false;
}

function p2Served()
{
	lastHit = 2;
	ding.play();
	p1NoMotion = false;
	p2NoMotion = false;
	serving = false;
}

function scoreP1()
{
	p1Point.innerHTML = p1Score += 1;
	if (itemOwner == 1 && p2Score > 0 && itemEffectActive == true && currentItem == 5)
	{
		p2Score--;
		p2Point.innerHTML = p2Score;
	}
	spawnDirection = 2;
	cantUseSpecial = true;
	incrementP1SP();
	incrementP2SP();
	incrementP2SP();
	//textOutput.innerHTML = player.shortname + " SCORED!";
	clearInterval(interval);
	clearInterval(animationInterval);
	drawInterval = setInterval(drawP1ScoreText, 50);
	textInterval = setInterval(clearText, 2000);
	//textOutput.innerHTML = "Player 1 Serve!";
	//textInterval = setInterval(clearText, 2000);
	scoresound.play();
	console.log("Player 1 scores");
	//resetPositions();
}

function scoreP2()
{
	p2Point.innerHTML = p2Score += 1;
	if (itemOwner == 2 && p1Score > 0 && itemEffectActive == true && currentItem == 5)
	{
		p1Score--;
		p1Point.innerHTML = p1Score;
	}
	spawnDirection = 1;
	cantUseSpecial = true;
	incrementP1SP();
	incrementP1SP();
	incrementP2SP();
	//textOutput.innerHTML = player2.shortname + " SCORED!";
	clearInterval(interval);
	clearInterval(animationInterval);
	drawInterval = setInterval(drawP2ScoreText, 50);
	textInterval = setInterval(clearText, 2000);
	//textOutput.innerHTML = "Player 2 Serve!";
	//textInterval = setInterval(clearText, 2000);
	scoresound.play();
	console.log("Player 2 scores");
	//resetPositions();
}

function outOfBounds()
{
	if (lastHit == 1)
	{
		spawnDirection = 2;
		if (p1SpecialPoints >= 1)
			p1SpecialPoints--;
		if (p1SpecialPoints >= 1)
			p1SpecialPoints--;
	}
	else if (lastHit == 2)
	{
		spawnDirection = 1;
		if (p2SpecialPoints >= 1)
			p2SpecialPoints--;
		if (p2SpecialPoints >= 1)
			p2SpecialPoints--;
	}
	//textOutput.innerHTML = "OUT OF BOUNDS!";
	cantUseSpecial = true;
	clearInterval(interval);
	clearInterval(animationInterval);
	drawInterval = setInterval(drawOobText, 50);
	surface.fillStyle = "black";
	surface.fillText("OUT OF BOUNDS!", 640, 320);
	textInterval = setInterval(clearText, 2000);
	oobsound.play();
	console.log("Out of bounds");
	//resetPositions();
}

function drawP1ScoreText()
{
	surface.fillStyle = "black";
	surface.fillText(player.shortname+" SCORED!", 640, 320);
}

function drawP2ScoreText()
{
	surface.fillStyle = "black";
	surface.fillText(player2.shortname+" SCORED!", 640, 320);
}

function drawOobText()
{
	surface.fillStyle = "black";
	surface.fillText("OUT OF BOUNDS!", 640, 320);
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
	cantUseSpecial = false;
	clearInterval(textInterval);
	clearInterval(drawInterval);
	interval = setInterval(update, 33.34);
	animationInterval = setInterval(cycleFrame, 1000/animSpeed);
	resetPositions();
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
		case 69: //E
			if (p1SpecialPoints == 10 && cantUseSpecial == false)
				SpecialMoveP1();
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
	/*ball.x = 630;
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
	}*/
	ball.speed = 2;
	aiServeCounter = 0;
	currentRally = 0;
	serving = true;
	brutalAttack = false;
	whirlyAttack = false;
	if (venom.active == true)
		venom.active = false;
	ballSprite.src="TennisBall.png";
	if (itemsOn == true)
	{
		clearInterval(itemSpawnInterval);
		EndItem();
	}
	if (photosynecdoche1 == true || photosynecdoche2 == true)
		EndPhotosynecdoche();
}

function incrementP1SP()
{
	if (p1SpecialPoints < maxSpecialPoints)
	{
		p1SpecialPoints++;
		if (p1SpecialPoints == 10)
		{specialsound.play();}
	}
}

function incrementP2SP()
{
	if (p2SpecialPoints < maxSpecialPoints)
	{
		p2SpecialPoints++;
		if (p2SpecialPoints == 10)
		{specialsound.play();}
	}
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
		player.shortname = leonaStats.shortname;
		player.colour = leonaStats.colour;
		player.spimg = leonaStats.spimg;
		//p1Effect.src = "../sprites/leonaspecialeffectr.png";
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
		player.shortname = pennyStats.shortname;
		player.colour = pennyStats.colour;
		player.spimg = pennyStats.spimg;
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
		player.shortname = archieStats.shortname;
		player.colour = archieStats.colour;
		player.spimg = archieStats.spimg;
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
		player.shortname = perryStats.shortname;
		player.colour = perryStats.colour;
		player.spimg = perryStats.spimg;
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
		player.shortname = opheliaStats.shortname;
		player.colour = opheliaStats.colour;
		player.spimg = opheliaStats.spimg;
		console.log("Ophelia");
	}
	else if (x == 6) //Emerald
	{
		player.xhit = emeraldStats.xhit;
		player.ylighthit = emeraldStats.ylighthit;
		player.yheavyhit = emeraldStats.yheavyhit;
		player.speed = emeraldStats.speed;
		player.img = emeraldStats.img;
		player.name = emeraldStats.name;
		player.id = emeraldStats.id;
		player.shortname = emeraldStats.shortname;
		player.colour = emeraldStats.colour;
		player.spimg = emeraldStats.spimg;
		console.log("Emerald");
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
		player.shortname = defaultStats.shortname;
		player.colour = defaultStats.colour;
		console.log("default");
	}
	playerSprite.src = "../sprites/" + player.img + "r2.png";
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
		player2.shortname = leonaStats.shortname;
		player2.colour = leonaStats.colour;
		player2.spimg = leonaStats.spimg;
		//p2Effect.src = "../img/leonaspecialeffectl.png";
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
		player2.shortname = pennyStats.shortname;
		player2.colour = pennyStats.colour;
		player2.spimg = pennyStats.spimg;
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
		player2.shortname = archieStats.shortname;
		player2.colour = archieStats.colour;
		player2.spimg = archieStats.spimg;
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
		player2.shortname = perryStats.shortname;
		player2.colour = perryStats.colour;
		player2.spimg = perryStats.spimg;
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
		player2.shortname = opheliaStats.shortname;
		player2.colour = opheliaStats.colour;
		player2.spimg = opheliaStats.spimg;
		player2.id = opheliaStats.id;
	}
	else if (x == 6) //Emerald
	{
		player2.xhit = emeraldStats.xhit;
		player2.ylighthit = emeraldStats.ylighthit;
		player2.yheavyhit = emeraldStats.yheavyhit;
		player2.speed = emeraldStats.speed;
		player2.img = emeraldStats.img;
		player2.name = emeraldStats.name;
		player2.id = emeraldStats.id;
		player2.shortname = emeraldStats.shortname;
		player2.colour = emeraldStats.colour;
		player2.spimg = emeraldStats.spimg;
		console.log("Emerald");
	}
	else //default
	{
		player2.xhit = defaultStats.xhit;
		player2.ylighthit = defaultStats.ylighthit;
		player2.yheavyhit = defaultStats.yheavyhit;
		player2.speed = defaultStats.speed;
		player2.img = defaultStats.img;
		player2.name = defaultStats.name;
		player2.shortname = defaultStats.shortname;
		player2.colour = defaultStats.colour;
		player2.id = defaultStats.id;
	}
	player2Sprite.src = "../sprites/" + player2.img + "l2.png";
}

function swapCharacters() //this is for testing purposes, remove from final version
{
	switch (event.keyCode)
	{
		case 77: //cycles P1 through each character every time you press M
			setP1Character(characterCycle);
			if (characterCycle < 6)
				characterCycle++;
			else
				characterCycle = 0;
			break;
		case 78:
			setP2Character(characterCycle2);
			if (characterCycle2 < 6)
				characterCycle2++;
			else
				characterCycle2 = 0;
			break;
		case 48: //0
			p1SpecialPoints = maxSpecialPoints;
			p2SpecialPoints = maxSpecialPoints;
			break;
	}
}

