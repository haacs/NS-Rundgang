jQuery(document).ready(function($){
  $('.mapBtn').click(function($) {
    var destination = this.dataset.destplaceid;
    var origin = this.dataset.orgplaceid;
    var cookiecheck = jQuery('#cookiecheck');
    if ( cookiecheck.hasClass('glyphicon-check') && (getCookie('autoNav')!=='true')) {
      setCookie("autoNav", "true", 8064000);
    };
    startNavigation(destination, origin);
  });

  if (getCookie('autoNav')==true) {
    if (jQuery('#map').dataset.btn==="false") {
      var map = jQuery('#map');
      var destination = map.dataset.destplaceid;
      var origin = map.dataset.orgplaceid;
      startNavigation(destination, origin);
    } else {
      jQuery('#cookies').remove();
    };
  };

  $('#cookiecheck').click(function($){
    jQuery('#cookiecheck').toggleClass("glyphicon-check glyphicon-unchecked")
  });

  document.cookie = "fuck=you; expires=800000000;";
});

function startNavigation (destination, origin) {
  jQuery('#map').html('<iframe width="100%" height="500" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/directions?key=AIzaSyCPIQox75ruBBARUffohD7XMgcmSrOsJac&origin=place_id:' + origin + '&destination=place_id:' + destination + '&mode=walking" allowfullscreen></iframe>');
}

function setCookie (identifier, value, Verfall) {
  var now = new Date();
  var timeout = new Date(now.getTime() + Verfall);
  document.cookie = identifier + "=" + value + "; expires=" + timeout.toGMTString() + ";";
}

function getCookie (identifier) {
  var value = "";
  if (document.cookie) {
    var start = document.cookie.indexOf("=", indexOf('identifier')) + 1;
    var end = document.cookie.indexOf(";");
    if (end == -1) {
      end = document.cookie.length;
  }
  value = document.cookie.substring(start, end);
  }
  return value;
}