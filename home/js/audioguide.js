jQuery(document).ready(function($){
  $(".playbutton").click(function(){
  	var playbutton = $(this);
  	var guideelem = '<audio id="audiotest" controls src="' + playbutton.attr("data-src") + '" type="audio/mp3" autoplay></audio>';
    playbutton.replaceWith(guideelem);
  });
});