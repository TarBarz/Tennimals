var canvas = document.querySelector("canvas");
canvas.width = 1280;
canvas.height = 640;
var surface = canvas.getContext("2d");

var leona = new Image();
var leonal = new Image();
var leonar = new Image();
var leonab = new Image();
var penny = new Image();
var pennyl = new Image();
var pennyr = new Image();
var pennyb = new Image();
var archie = new Image();
var archiel = new Image();
var archier = new Image();
var archieb = new Image();
var perry = new Image();
var perryl = new Image();
var perryr = new Image();
var perryb = new Image();
var ophelia = new Image();
var ophelial = new Image();
var opheliar = new Image();
var opheliab = new Image();

var animSpeed = 4;
var currframe = 1;

var interval = setInterval(update, 1000/animSpeed);

function update()
{
	updateSprites();
	render();
}

function updateSprites()
{
	leona.src = "../sprites/leona" + currframe + ".png";
	leonal.src = "../sprites/leonal" + currframe + ".png";
	leonar.src = "../sprites/leonar" + currframe + ".png";
	leonab.src = "../sprites/leonab" + currframe + ".png";
	penny.src = "../sprites/penny" + currframe + ".png";
	pennyl.src = "../sprites/pennyl" + currframe + ".png";
	pennyr.src = "../sprites/pennyr" + currframe + ".png";
	pennyb.src = "../sprites/pennyb" + currframe + ".png";
	archie.src = "../sprites/archie" + currframe + ".png";
	archiel.src = "../sprites/archiel" + currframe + ".png";
	archier.src = "../sprites/archier" + currframe + ".png";
	archieb.src = "../sprites/archieb" + currframe + ".png";
	perry.src = "../sprites/perry" + currframe + ".png";
	perryl.src = "../sprites/perryl" + currframe + ".png";
	perryr.src = "../sprites/perryr" + currframe + ".png";
	perryb.src = "../sprites/perryb" + currframe + ".png";
	ophelia.src = "../sprites/ophelia" + currframe + ".png";
	ophelial.src = "../sprites/ophelial" + currframe + ".png";
	opheliar.src = "../sprites/opheliar" + currframe + ".png";
	opheliab.src = "../sprites/opheliab" + currframe + ".png";
	
	if (currframe < 4)
		currframe++
	else
		currframe = 1;
}

function render()
{
	surface.clearRect(0,0,1280,640);
	
	surface.drawImage(leona, 96, 56);
	surface.drawImage(leonal, 96, 216);
	surface.drawImage(leonar, 96, 376);
	surface.drawImage(leonab, 96, 536);
	surface.drawImage(penny, 352, 56);
	surface.drawImage(pennyl, 352, 216);
	surface.drawImage(pennyr, 352, 376);
	surface.drawImage(pennyb, 352, 536);
	surface.drawImage(archie, 608, 56);
	surface.drawImage(archiel, 608, 216);
	surface.drawImage(archier, 608, 376);
	surface.drawImage(archieb, 608, 536);
	surface.drawImage(perry, 864, 56);
	surface.drawImage(perryl, 864, 216);
	surface.drawImage(perryr, 864, 376);
	surface.drawImage(perryb, 864, 536);
	surface.drawImage(ophelia, 1120, 56);
	surface.drawImage(ophelial, 1120, 216);
	surface.drawImage(opheliar, 1120, 376);
	surface.drawImage(opheliab, 1120, 536);
}