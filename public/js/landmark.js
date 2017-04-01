var deny = function() { 
	var url = 'https://api.thebonusplay.pl/landmarks/' + $('#id').text();
	$.ajax({
		url: url,
		type: 'DELETE',
		success: function(result) {
			console.log(result);
		}
	});
};

var approve = function() { 
	var url = 'https://api.thebonusplay.pl/landmarks/' + $('#id').text();
	$.ajax({
		url: url,
		type: 'PUT',
		data: {
			verified: true
		},
		success: function(result) {
			console.log(result);
		}
	});
};