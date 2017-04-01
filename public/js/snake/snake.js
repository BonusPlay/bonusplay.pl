function Head(x, y) {
	this.X = x;
	this.Y = y;
};

Head.prototype.move = function() {
	switch(head.currentDirection)
	{
	case 'l':
		head.X = head.X - 50;
		break;
	case 'u':
		head.Y = head.Y - 50;
		break;
	case 'r':
		head.X = head.X + 50;
		break;
	case 'd':
		head.Y = head.Y + 50;
		break;
	}
}

Head.prototype.moveDiv = function() {
	$('#head').css('margin-top', head.Y);
	$('#head').css('margin-left', head.X);
}

// down
Head.prototype.currentDirection = 'd';
Head.prototype.X;
Head.prototype.Y;

function Body(x, y, id) {
	this.X = x;
	this.Y = y;
	this.id = id;
	$('#snake').append($('<div />').attr('id', id).addClass('snake'));
}

Body.prototype.moveDiv = function() {
	$('#' + this.id).css('margin-top', this.Y);
	$('#' + this.id).css('margin-left', this.X);
}

Body.prototype.X;
Body.prototype.Y;
Body.prototype.id;