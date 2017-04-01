$(document).ready(handleResize);
$(window).resize(handleResize);

$(window).scroll(function() {
	if ($(document).scrollTop() > 50)
		$('nav').addClass('shrink');
	else
		$('nav').removeClass('shrink');
});

function handleResize() {
	var viewportWidth = $(window).width();
	
	$('#wedge-one').css('border-left-width', viewportWidth);
	$('#wedge-two').css('border-right-width', viewportWidth);
	$('#wedge-three').css('border-left-width', viewportWidth);
}