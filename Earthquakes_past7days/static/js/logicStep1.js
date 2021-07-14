console.log('working');


// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

let satellite = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

let map = L.map('mapid', {
    layers: [streets],
    center: [39.5,-98.5],
    zoom: 3
});


let baseMaps = {
    'Streets' : streets,
    'Satellite': satellite
}

L.control.layers(baseMaps).addTo(map)

let earthQuakesData = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson'
                       

var Mystyle = {
    color: 'black',
    weight: 2,
    fillColor: 'darkred'
} 


d3.json(earthQuakesData).then(data =>{
    console.log(data)
   L.geoJson(data).addTo(map)})



// var line = [
//     [37.6213, -122.3790],
//     [30.1975, -97.6664],
//     [29.9902, -95.3368],
//     [43.6777, -79.6248],
//     [40.6413, -73.7781]
//   ];

 
//   L.polyline(line, {
//       color: 'blue',
//       weight: 4,
//       opacity: 0.5,
//       dashArray: "15"
//   }).addTo(map)

//   // Add GeoJSON data.
// let sanFranAirport =
// {"type":"FeatureCollection","features":[{
//     "type":"Feature",
//     "properties":{
//         "id":"3469",
//         "name":"San Francisco International Airport",
//         "city":"San Francisco",
//         "country":"United States",
//         "faa":"SFO",
//         "icao":"KSFO",
//         "alt":"13",
//         "tz-offset":"-8",
//         "dst":"A",
//         "tz":"America/Los_Angeles"},
//         "geometry":{
//             "type":"Point",
//             "coordinates":[-122.375,37.61899948120117]}}
// ]};

// L.geoJson(sanFranAirport, {
//     onEachFeature: function(feature, layer) {
//       layer.bindPopup();
//      }
// }).addTo(map);