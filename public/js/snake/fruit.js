function Fruit() {
	this.X = Math.floor((Math.random() * 20) + 1) * 50;
	this.Y = Math.floor((Math.random() * 20) + 1) * 50;
	$("#fruit").css('margin-top', this.Y);
	$("#fruit").css('margin-left', this.X);
}

Fruit.prototype.isGoodSpawn = function() {
	// check if new fruit is in head
	if(head.X === fruit.X && head.Y === fruit.Y)
		return false;
	
	// check if new fruit is in body
	for(var i = body.length-1; i >= 0; i--)
	{
		if(body[i].X === fruit.X && body[i].Y === fruit.Y)
			return false;
	}
	
	return true;
}

Fruit.prototype.X;
Fruit.prototype.Y;