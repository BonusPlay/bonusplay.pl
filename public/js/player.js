var audio = new Audio('http://radio-on.spelnionemarzenia.org.pl:8000/stationRadioOnMP3');

function play() {
	if(audio.paused)
	{
		audio.play();
		isPlaying = true;
		$('#button_play').attr('src', '/images/button_pause.png');
	}
	else
	{
		audio.pause();
		isPlaying = false;
		$('#button_play').attr('src', '/images/button_play.png');
	}
}

$('#volume_fg').click(function(e) {
	$('#volume_bg').width(e.offsetX);
	audio.volume = e.offsetX / 154;
});

$('#volume_bg').click(function(e) {
	$('#volume_bg').width(e.offsetX);
	audio.volume = e.offsetX / 154;
});