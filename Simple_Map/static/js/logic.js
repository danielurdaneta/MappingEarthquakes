console.log('working');

var map = L.map('mapid').setView([34.0522, -118.2437], 14);

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});
// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);

let citiesData = cities;



  citiesData.forEach((city) => {
      L.circleMarker(city.location,{
          radius: city.population/100000,
          color: 'orange',
          fillColor:'bisque',
          fillOpacity: '0.5',
          weight: 4
      })    
      .bindPopup(`<h2>${city.city},${city.state}</h2><hr><h3>Population: ${(city.population).toLocaleString()}<h3>`)
      .addTo(map)

  })