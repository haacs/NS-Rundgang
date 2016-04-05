jQuery(document).ready(function($){
  $(".srcbtn").click(function(){
    target = "#" + $(this).attr("target");
    $(target).slideToggle("slow");
  });
});