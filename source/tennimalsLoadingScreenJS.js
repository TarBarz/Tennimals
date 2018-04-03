loadBar();

function loadBar()
{
	var prog = document.getElementById("progress");
	var width = 1;
	var setInt = setInterval(frame, 50);
	
	function frame()
	{
		if (width >= 100)
		{
			clearInterval(setInt);
		}
		else
		{
			width++;
			prog.style.width = width + '%';
		}
	}
}