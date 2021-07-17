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



let earthQuakesData = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson'
                       

function radiusize(data) {
    
    for(let i = 0; i < data.features.lenght; i++){
        data.features[i].properties.mag * 10
    }
       
}

function getRadius(magnitude) {
    if (magnitude === 0) {
        return 1 
    }
    return magnitude * 4
}

function colorMagnitude(magnitude){
    if (magnitude > 5) {
        return "#ea2c2c";
      }
      if (magnitude > 4) {
        return "#ea822c";
      }
      if (magnitude > 3) {
        return "#ee9c00";
      }
      if (magnitude > 2) {
        return "#eecc00";
      }
      if (magnitude > 1) {
        return "#d4ee00";
      }
      return "#98ee00"
}

function stileInfo(feature) {
        return {
            fillColor: colorMagnitude(feature.properties.mag),
            fillOpacity: 1.0,
            color: 'black',
            weight: 0.5,
            radius: getRadius(feature.properties.mag)
}
}


d3.json(earthQuakesData).then(data =>{

    
    L.geoJSON(data,{
    style:stileInfo,
    pointToLayer: (feature, latlng) => {
        return L.circleMarker(latlng)
     },
     onEachFeature: (feature, layer) => {
        layer.bindPopup('<h4> Magnitude: ' + feature.properties.mag + '<br> Location: ' + feature.properties.place)
     }
  
   }).addTo(markers)

})

let markers = new L.LayerGroup()


   let baseMaps = {
    'Streets' : streets,
    'Satellite': satellite,
 
}

    let markerslayer = {
        'Layer': markers
    }

let map = L.map('mapid', {
    layers: [streets, markers],
    center: [39.5,-98.5],
    zoom: 3
});




L.control.layers(baseMaps, markerslayer, {collapsed: false}).addTo(map)



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