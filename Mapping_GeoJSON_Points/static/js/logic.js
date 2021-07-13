console.log('working');

let map = L.map('mapid').setView([37.5, -122.5], 10);

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/navigation-night-v1/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});
// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);



var line = [
    [37.6213, -122.3790],
    [30.1975, -97.6664],
    [29.9902, -95.3368],
    [43.6777, -79.6248],
    [40.6413, -73.7781]
  ];

 
  L.polyline(line, {
      color: 'blue',
      weight: 4,
      opacity: 0.5,
      dashArray: "15"
  }).addTo(map)

  // Add GeoJSON data.
let sanFranAirport =
{"type":"FeatureCollection","features":[{
    "type":"Feature",
    "properties":{
        "id":"3469",
        "name":"San Francisco International Airport",
        "city":"San Francisco",
        "country":"United States",
        "faa":"SFO",
        "icao":"KSFO",
        "alt":"13",
        "tz-offset":"-8",
        "dst":"A",
        "tz":"America/Los_Angeles"},
        "geometry":{
            "type":"Point",
            "coordinates":[-122.375,37.61899948120117]}}
]};

L.geoJson(sanFranAirport, {
    onEachFeature: function(feature, layer) {
      layer.bindPopup();
     }
}).addTo(map);