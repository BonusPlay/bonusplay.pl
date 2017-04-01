var head;
var body;
var gameClock;
var fruit;

// wait for whole page to load
$(document).ready(function() {
	head = new Head(500, 500);
	body = [];
	fruit = new Fruit();
	
	gameClock = setInterval(tick, 100);
});

$(document).keydown(function(evt) {
	evt = evt || window.event;
	
	switch(evt.keyCode)
	{
	case 37: // Left
		if(head.currentDirection !== 'r')
			head.currentDirection = 'l';
		break;
	case 38: // Up
		if(head.currentDirection !== 'd')
			head.currentDirection = 'u';
		break;
	case 39: // Right
		if(head.currentDirection !== 'l')
			head.currentDirection = 'r';
		break;
	case 40: // Down
		if(head.currentDirection !== 'u')
			head.currentDirection = 'd';
		break;
	case 27: // Escape
		clearInterval(gameClock);
		console.log('game stopped');
		break;
	}
});

function tick() {
	for(var i = body.length - 1; i >= 0; i--)
	{
		if(i === 0)
		{
			body[i].X = head.X;
			body[i].Y = head.Y;
		}
		else
		{
			body[i].X = body[i-1].X;
			body[i].Y = body[i-1].Y;
		}
	}
	
	head.move();
	
	if(head.X < 0)
		head.X = 1000;
	
	if(head.X > 1000)
		head.X = 0;
	
	if(head.Y < 0)
		head.Y = 1000;
	
	if(head.Y > 1000)
		head.Y = 0;
	
	for(var i = body.length - 1; i >= 0; i--)
	{
		if(body[i].X === head.X && body[i].Y === head.Y)
		{
			clearInterval(gameClock);
			console.log('rip');
		}
	}
	
	while(head.X === fruit.X && head.Y === fruit.Y)
	{
		// keep spawning untill good spawn
		while(!fruit.isGoodSpawn(body))
			fruit = new Fruit();
		
		body.push(new Body(head.X, head.Y, body.length+1));
	}
	
	for(var i = body.length-1; i >= 0; i--)
		body[i].moveDiv();
	
	head.moveDiv();
}