var map;
var markers = [];
var geocoder;

function initialize() {
  geocoder = new google.maps.Geocoder();
  var mapOptions = {
    center: new google.maps.LatLng(25,0),
    zoom: 2,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
	streetViewControl: false
  };
  map = new google.maps.Map(document.getElementById("map-box"), mapOptions);
  for(var i in data) {
	  markers[i] = new google.maps.Marker({
	      position: new google.maps.LatLng(data[i].latitude,data[i].longitude),
	      map: map,
	      title: i,
		  clickable: true,
		  icon: {
			  path: google.maps.SymbolPath.CIRCLE,
			  fillColor: 'ff3333',
			  fillOpacity: 1,
			  scale: 4,
			  strokeOpacity: 1,
			  strokeWeight: 1
		  }
	  });
  }
}
function codeAddress(myLocation) {
  var address = myLocation;
  geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
	  var closest = geolib.findNearest({
		  latitude:results[0].geometry.location.jb,
		  longitude: results[0].geometry.location.kb
	  },data);
	  console.log(closest);
      map.setCenter(new google.maps.LatLng(closest.latitude,closest.longitude));
	  map.setZoom(12);
    } else {
      alert("Geocode was not successful for the following reason: " + status);
    }
  });
}
google.maps.event.addDomListener(window, 'load', initialize);

window.addEventListener('load',function() {
	document.getElementById("location").addEventListener('change',function(){
		myLocation = this.value;
		codeAddress(myLocation)
	})
});