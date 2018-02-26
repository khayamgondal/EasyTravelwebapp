// JavaScript Document
var size = new OpenLayers.Size(21, 25);
var offset = new OpenLayers.Pixel(-(size.w / 2), -size.h);
var icon = new OpenLayers.Icon('C:\apache-tomcat-7.0.34\webapps\opentripplanner-webapp\js\otp\planner\map_images\mapview.PNG', size, offset);
function locateMe() {

    var geolocate = new OpenLayers.Control.Geolocate({
        bind: true,
        geolocationOptions: {
            enableHighAccuracy: false,
            maximumAge: 0,
            timeout: 7000
        }
    });

    umap.map.addControl(geolocate);


    // vector.removeAllFeatures();
    geolocate.deactivate();
    //document.getElementById('track').checked = false;
    // geolocate.watch = false;
    //firstGeolocation = true;
   // window.alert("just before");
    geolocate.activate();
    var locateMeMarker = new OpenLayers.Marker(umap.map.getCenter(),icon);
    searchMarkers.addMarker(locateMeMarker);
    umap.map.zoomToExtent();

}
