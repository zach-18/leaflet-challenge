// * I used the Quick Start Guide to try to build this from scratch.
// https://leafletjs.com/examples/quick-start/

var mymap = L.map('map').setView([37.09, -95.71], 5);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoicHphY2gxOCIsImEiOiJja2owb3BnZXMxZzhwMnltMGhzYWZsNXVsIn0.M8kVsV7SUpCYj2ao9ojcTA'
}).addTo(mymap);

// above allowed me to create the map of the US.

var circle = L.circle([41.8781, -87.6298], {
  color: 'red',
  fillColor: '#f03',
  fillOpacity: 0.5,
  radius: 5000
}).addTo(mymap);

circle.bindPopup("I am a circle.");
//Above is a red circle on Chicago.


//* from https://leafletjs.com/examples/geojson/
var geojsonMarkerOptions = {
  radius: 8,
  fillColor: "#ff7800",
  color: "#000",
  weight: 1,
  opacity: 1,
  fillOpacity: 0.8
};

L.geoJSON(someGeojsonFeature, {
  pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng, geojsonMarkerOptions);
  }
}).addTo(map);