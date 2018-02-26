var length = new OpenLayers.Control.Measure(OpenLayers.Handler.Path, {
    eventListeners: {
        measure: function (evt) {
            alert("The length was " + evt.measure + evt.units);
        }
    }
});

var area = new OpenLayers.Control.Measure(OpenLayers.Handler.Polygon, {
    eventListeners: {
        measure: function (evt) {
            alert("The area was " + evt.measure + evt.units);
        }
    }
});

umap.map.addControl(length);
umap.map.addControl(area);