// from homework
// Store our API endpoint inside queryUrl
var queryUrl = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2021-01-09&endtime=" +
  "2021-01-10&maxlongitude=-69.52148437&minlongitude=-123.83789062&maxlatitude=48.74894534&minlatitude=25.16517337";

// Perform a GET request to the query URL
d3.json(queryUrl, function(data) {
  // Once we get a response, send the data.features object to the createFeatures function
  createFeatures(data.features);
});

// Create a map object
var myMap = L.map("map", {
  center: [15.5994, -28.6731],
  zoom: 3
});

L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);

function createFeatures(earthquakeData) {

  // Define a function we want to run once for each feature in the features array
  // Give each feature a popup describing the place and time of the earthquake
  function onEachFeature(feature, layer) {
    layer.bindPopup("<h3>" + feature.properties.place +
      "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
  }

  // Create a GeoJSON layer containing the features array on the earthquakeData object
  // Run the onEachFeature function once for each piece of data in the array
  var earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature
  });

  // Sending our earthquakes layer to the createMap function
  createMap(earthquakes);
}

// // Country data
// var countries = [
//   {
//     name: "Brazil",
//     location: [-14.2350, -51.9253],
//     points: 227
//   },
//   {
//     name: "Germany",
//     location: [51.1657, 10.4515],
//     points: 218
//   },
//   {
//     name: "Italy",
//     location: [41.8719, 12.5675],
//     points: 156
//   },
//   {
//     name: "Argentina",
//     location: [-38.4161, -63.6167],
//     points: 140
//   },
//   {
//     name: "Spain",
//     location: [40.4637, -3.7492],
//     points: 99
//   },
//   {
//     name: "England",
//     location: [52.355, 1.1743],
//     points: 98
//   },
//   {
//     name: "France",
//     location: [46.2276, 2.2137],
//     points: 96
//   },
//   {
//     name: "Netherlands",
//     location: [52.1326, 5.2913],
//     points: 93
//   },
//   {
//     name: "Uruguay",
//     location: [-32.4228, -55.7658],
//     points: 72
//   },
//   {
//     name: "Sweden",
//     location: [60.1282, 18.6435],
//     points: 61
//   }
// ];

// console.log(countries);

// Loop through the cities array and create one marker for each city object
for (var i = 0; i < earthquakes.length; i++) {

  // Conditionals for countries points
  var color = "";
  if (countries[i].points > 200) {
    color = "yellow";
  }
  else if (countries[i].points > 100) {
    color = "blue";
  }
  else if (countries[i].points > 90) {
    color = "green";
  }
  else {
    color = "red";
  }

  L.circle(earthquakes, {
    fillOpacity: 0.75,
    color: "white",
    fillColor: color,
    // Adjust radius
    radius: features.geometry.coordinates[2] * 15000
  }).bindPopup.addTo(myMap);


  // Add circles to map
  L.circle(countries[i].location, {
    fillOpacity: 0.75,
    color: "white",
    fillColor: color,
    // Adjust radius
    radius: countries[i].points * 1500
  }).bindPopup("<h1>" + countries[i].name + "</h1> <hr> <h3>Points: " + countries[i].points + "</h3>").addTo(myMap);
}
