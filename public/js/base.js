$(document).ready(function() {
	$(document).on('click', '.link', function(a) {
		$.post(this.innerHTML, function(data, status) {
			$('#main').hide().html(data).fadeIn();
		});
	});
});