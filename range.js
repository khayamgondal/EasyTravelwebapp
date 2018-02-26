var nearByMarkers;
var size1 = new OpenLayers.Size(21,25);
var offset1 = new OpenLayers.Pixel(-(size1.w/2), -size1.h);
var icon1 = new OpenLayers.Icon('bustop.png', size1, offset1);

function showNearBy () {
	//window.alert("in fun");
	var difference = 0.008;
	//window.alert(range);
/*	switch (range) {
	case '0.5':
	 difference = 0.5 * 0.008;
		break;
	case '1.0':
	 difference = 0.008;
	break;
	case '1.5':
	difference = 1.5 * 0.008;
	break;
	}
	window.alert(difference);*/
	if (nearByMarkers==null){
	nearByMarkers =  new OpenLayers.Layer.Markers( "Near BY" );
	umap.map.addLayer(nearByMarkers);
	}
	
	var url = "range.jsp";
	
	//console.log(currentLat);
	var latMax = parseFloat(currentLat) + parseFloat(difference);
	var latMin = parseFloat (currentLat) - parseFloat(difference);
	var lonMax = parseFloat(currentLon) + parseFloat(difference);
	var lonMin = parseFloat(currentLon) - parseFloat(difference);
	
	url=url+"?latMax="+latMax+"&latMin="+latMin+"&lonMax="+lonMax+"&lonMin="+lonMin;
	//window.alert(url);
	//console.log(url);
	//window.alert("req");
	if (window.XMLHttpRequest)
	  {// code for IE7+, Firefox, Chrome, Opera, Safari
	  xmlhttp=new XMLHttpRequest();
	  }
	else
	  {// code for IE6, IE5
	  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	  }
	xmlhttp.open("GET",url,false);
	xmlhttp.send();
	xmlDoc=xmlhttp.responseText;
	showOutputmarkers(xmlDoc);
	//console.log(xmlDoc);
	
}

function checkBoxClick() {

    if (searchLocation == null) 
            window.alert("please search a place first");
    
    else
    	showNearBy();
}

function showOutputmarkers( output) {
	var k=0;
	var parsedOutput = output.split("%");
	//console.log(parsedOutput.length);
	for ( k=0; k<parsedOutput.length; k++) {
	var innerOutput =	parsedOutput[k].split("&");
	console.log(innerOutput[0]);
	nearByMarkers.addMarker(new OpenLayers.Marker(new OpenLayers.LonLat(innerOutput[2], innerOutput[1]).transform(new OpenLayers.Projection("EPSG:4326"), umap.getMap().getProjectionObject())));
	}
}
