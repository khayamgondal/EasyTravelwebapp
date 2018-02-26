var searchMarkers; // marker layer 
var searchLocation;
var currentLat;
var currentLon;
if (searchMarkers == null) {
    //window.alert("creating search marker in search");
	searchMarkers =  new OpenLayers.Layer.Markers( "searchMarkers" );
	
	}
var current;
var xmlhttp;

var searchMark; //actual marker to shown 

var size = new OpenLayers.Size(21,25);
var offset = new OpenLayers.Pixel(-(size.w/2), -size.h);
var icon = new OpenLayers.Icon('marker.png', size, offset);

function searchResults()
{
	 current = document.getElementById("searchBox");
	current.value = "";
	//location.href = "/search.php";
}
function keyPressed () {
	if (current.value == "")
	{	document.getElementById("hiddenDIV2").style.visibility = "collapse";
		}
	else {
		document.getElementById("hiddenDIV2").style.visibility = "visible";
	//var request = current.value;
	var url = "search.jsp";
	url=url+"?keyz="+current.value;
	var xmlhttp;
if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp=new XMLHttpRequest();
  }
else
  {// code for IE6, IE5
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
xmlhttp.onreadystatechange=function()
  {
  if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
 // alert(xmlhttp.responseText);
	  
	  document.getElementById("hiddenDIV2").innerHTML = xmlhttp.responseText;
    }
  }
xmlhttp.open("GET",url,true);
xmlhttp.send();
	}
	}

function loadrecord(record, stopLat, stopLon) {
	
document.getElementById("searchBox").value = record;
document.getElementById("hiddenDIV2").style.visibility = "collapse";
 searchLocation = new OpenLayers.LonLat(stopLon, stopLat).transform(new OpenLayers.Projection("EPSG:4326"), umap.getMap().getProjectionObject());
   umap.map.setCenter(searchLocation, 17);
   umap.map.addLayer(searchMarkers);

  	 searchMark = new OpenLayers.Marker(new OpenLayers.LonLat(stopLon, stopLat).transform(new OpenLayers.Projection("EPSG:4326"), umap.getMap().getProjectionObject()), icon);
     searchMarkers.addMarker(searchMark);
     currentLat = stopLat;
     currentLon = stopLon;
	  
  
 //  searchMarkers.destroy();
}
function nominatimSearch() {
	var query = document.getElementById("searchBox").value ;
	var theUrl = "http://nominatim.openstreetmap.org/search?q="+query+"&format=xml";
	//window.alert(query);
	if (window.XMLHttpRequest)
	  {// code for IE7+, Firefox, Chrome, Opera, Safari
	  xmlhttp=new XMLHttpRequest();
	  }
	else
	  {// code for IE6, IE5
	  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	  }
	xmlhttp.open("GET",theUrl,false);
	xmlhttp.send();
	xmlDoc=xmlhttp.responseXML;
	x=xmlDoc.getElementsByTagName('place');
var textout = "";
	for (i=0;i<x.length;i++)
	{
		Lat = (x[i].getAttribute('lat'));
		Lon = (x[i].getAttribute('lon'));
		textout = textout + "<table><tr><a href=\"javascript:loadResults('"+Lat+"','"+Lon+"')\">";
		textout = textout + (x[i].getAttribute('display_name'));
		textout = textout + "</a></tr></table>";
	}
	
	document.getElementById("hiddenDIV2").style.visibility = "visible";
	document.getElementById("hiddenDIV2").innerHTML = textout;
}
function loadResults(Lat, Lon) {
	document.getElementById("hiddenDIV2").style.visibility = "collapse";
	 searchLocation = new OpenLayers.LonLat(Lon, Lat).transform(new OpenLayers.Projection("EPSG:4326"), umap.getMap().getProjectionObject());
	   umap.map.setCenter(searchLocation, 15);
	   umap.map.addLayer(searchMarkers);
	   searchMark = new OpenLayers.Marker(new OpenLayers.LonLat(Lon, Lat).transform(new OpenLayers.Projection("EPSG:4326"), umap.getMap().getProjectionObject()), icon);
	     searchMarkers.addMarker(searchMark);
	     currentLat = Lat;
	     currentLon = Lon;
	 // var dis = center.distanceTo(new OpenLayers.LonLat(0, 0).transform(new OpenLayers.Projection("EPSG:4326"), umap.getMap().getProjectionObject()));
	  // var dis = OpenLayers.Spherical.computeDistanceBetween(center,new OpenLayers.LonLat(0, 0).transform(new OpenLayers.Projection("EPSG:4326"), umap.getMap().getProjectionObject()));
	  // window.alert(dis);
	 }
	 function initialize() {
	     /*   var mapOptions = {
	     center: new google.maps.LatLng(-33.8688, 151.2195),
	     zoom: 13,
	     mapTypeId: google.maps.MapTypeId.ROADMAP
	     };*/
	     //  var map = new google.maps.Map(document.getElementById('map_canvas'),          mapOptions);

	     var input = document.getElementById('searchTextField');
	     var autocomplete = new google.maps.places.Autocomplete(input);

	     //  autocomplete.bindTo('bounds', map);

	     // var infowindow = new google.maps.InfoWindow();
	     /*  var marker = new google.maps.Marker({
	     map: map
	     });*/

	     google.maps.event.addListener(autocomplete, 'place_changed', function () {

	         //   infowindow.close();
	         // marker.setVisible(false);
	         input.className = '';
	         var place = autocomplete.getPlace();
	         // window.alert(place);
	         if (!place.geometry) {
	             // Inform the user that the place was not found and return.
	             input.className = 'notfound';
	             return;
	         }

	         // If the place has a geometry, then present it on a map.
	         if (place.geometry.viewport) {
	             //    map.fitBounds(place.geometry.viewport);
	          //    window.alert(place.geometry.location.lng());
	            umap.map.setCenter(new OpenLayers.LonLat(place.geometry.location.lng(), place.geometry.location.lat()).transform(new OpenLayers.Projection("EPSG:4326"), umap.getMap().getProjectionObject()),15);
	           // place.geometry.location);

	         } else {
	            umap.map.setCenter(new OpenLayers.LonLat(place.geometry.location.lng(), place.geometry.location.lat()).transform(new OpenLayers.Projection("EPSG:4326"), umap.getMap().getProjectionObject()),15);
	            //  window.alert(place.geometry.location);
	             //   map.setZoom(17);  // Why 17? Because it looks good.
	         }
	         /*  var image = {
	         url: place.icon,
	         size: new google.maps.Size(71, 71),
	         origin: new google.maps.Point(0, 0),
	         anchor: new google.maps.Point(17, 34),
	         scaledSize: new google.maps.Size(35, 35)
	         };*/
	         //  marker.setIcon(image);
	         // marker.setPosition(place.geometry.location);
	         // marker.setVisible(true);

	         /*  var address = '';
	         if (place.address_components) {
	         address = [
	         (place.address_components[0] && place.address_components[0].short_name || ''),
	         (place.address_components[1] && place.address_components[1].short_name || ''),
	         (place.address_components[2] && place.address_components[2].short_name || '')
	         ].join(' ');
	         }*/

	         //  infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
	         // infowindow.open(map, marker);
	     });

	     // Sets a listener on a radio button to change the filter type on Places
	     // Autocomplete.
	     /*    function setupClickListener(id, types) {
	     var radioButton = document.getElementById(id);
	     google.maps.event.addDomListener(radioButton, 'click', function() {
	     autocomplete.setTypes(types);
	     });
	     }*/

	     /*  setupClickListener('changetype-all', []);
	     setupClickListener('changetype-establishment', ['establishment']);
	     setupClickListener('changetype-geocode', ['geocode']);*/
	 }
	 google.maps.event.addDomListener(window, 'load', initialize);