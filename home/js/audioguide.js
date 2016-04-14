jQuery(document).ready(function($){
  var playbutton = $("#playbutton");
  var guideelem = '<audio id="audiotest" controls src="' + playbutton.attr("data-src") + '" type="audio/mp3" autoplay></audio>';
  playbutton.click(function($){
    playbutton.replaceWith(guideelem);
  });
});