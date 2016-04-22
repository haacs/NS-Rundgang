jQuery(document).ready(function($){
  var orgDest = null;
  $('.mapBtn').click(function($) {

    orgDest = getOrgDest(this);

    var cookiecheck = jQuery('#cookiecheck');
    if ( cookiecheck.hasClass('glyphicon-check') && (getCookie('autoNav')!=='true')) {
      setCookie("autoNav", "true", 8064000);
    };
    startNavigation(orgDest.origin, orgDest.destination);
  });

  if (getCookie('autoNav')==true) {
    if (jQuery('#map').dataset.btn==="false") {
      orgDest = getOrgDest(jQuery('.mapBtn'))
      startNavigation(orgDest.origin, orgDest.destination);
    } else {
      jQuery('#cookies').remove();
    };
  };

  $('#cookiecheck').click(function($){
    jQuery('#cookiecheck').toggleClass("glyphicon-check glyphicon-unchecked")
  });
});

function getOrgDest (elem) {
  var org = null;
  var dest = null;
  var orgDest = {org, dest};
  if (elem.dataset.orglat) {
    orgDest.org = {
      lat: Number(elem.dataset.orglat),
      lng: Number(elem.dataset.orglng)
    };
  } else if (elem.dataset.placestring) {
    orgDest.org = elem.dataset.orgplacestring;
  } else if (elem.dataset.placeid) {
    orgDest.org = elem.dataset.orgplaceid;
  };
  if (elem.dataset.destlat) {
    orgDest.dest = {
      lat: Number(elem.dataset.destlat),
      lng: Number(elem.dataset.destlng)
    };
  } else if (elem.dataset.placestring) {
    orgDest.dest = elem.dataset.destplacestring;
  } else if (elem.dataset.placeid) {
    orgDest.dest = elem.dataset.destplaceid;
  };
  return orgDest;
}

function startNavigation (origin, destination) {
  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;
  var map = new google.maps.Map(document.getElementById('map'), {
    center: origin,
    zoom: 8
  });
  var posMarker = new google.maps.Marker({
    position: origin,
    title: 'Sie sind hier',
  });
  directionsDisplay.setMap(map);
  directionsDisplay.setPanel(document.getElementById('textdir'));
  function setOrigin(pos){
    origin = {lat: pos.coords.latitude,
      lng: pos.coords.longitude};
    calculateAndDisplayRoute(origin, destination, directionsService, directionsDisplay, posMarker);
  };
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(setOrigin);
  };
  calculateAndDisplayRoute(origin, destination, directionsService, directionsDisplay, posMarker);
}

function calculateAndDisplayRoute(origin, destination, directionsService, directionsDisplay, posMarker) {
  directionsService.route({
    origin: origin,
    destination: destination,
    travelMode: google.maps.TravelMode.WALKING,
    provideRouteAlternatives: false
  }, function(result, status) {
    if (status === google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(result);
      trackUser(result, directionsDisplay, posMarker);
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });

  function trackUser (result, directionsDisplay, posMarker) {
    var trSteps = $('.adp-directions tr');
    var mySteps = new Array();
    var pos = null;
    trSteps.map( function (index, elem){
      mySteps[index] = {
        finished: false,
        elem: elem,
        start: directionsDisplay.route[0].legs[elem.attr('data-leg-index')].steps[elem.attr('data-step-index')].start_location
      };
    });
    var watchID = navigator.geolocation.watchPosition(function (position){
      pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      posMarker.setPosition(pos);
      var matchInd = mySteps.forEach(function (myStep, index){
        if( (myStep.start.lat + 0.01 ) > pos.lat && (myStep.start.lng - 0.01 ) < pos.lat ) {
          return index;
        };
        return null;
      });
      if (matchInd) {
        var finished = trSteps.slice(0, matchInd-1);
        var active = trSteps.eq(matchInd);
        finished.addClass('bg-info');
        finished.removeClass('bg-primary')
        active.addClass('bg-primary');
        active.removeClass('bg-info');
        if (matchInd === mySteps) {
          navigator.geolocation.clearWatch(watchId);
        };
      };
    });
  };
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