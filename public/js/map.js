// Using leaflet for MAP

// Assuming listing is correctly passed to this script
const la = listing.geometry.coordinates[1]; // Latitude (assuming it's at index 1)
const lg = listing.geometry.coordinates[0]; // Longitude (assuming it's at index 0)
console.log(listing.geometry.coordinates); // Verify coordinates in the console

let map = L.map('map').setView([la, lg], 13); // Set view with [latitude, longitude] format and zoom level
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 6,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

let marker = L.marker([la, lg]).addTo(map);
let circle = L.circle([la, lg], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500 // Adjust radius as needed
}).addTo(map);

marker.bindPopup("Here you will be.").openPopup(); // Adding a popup to the marker
circle.bindPopup("Area of interest"); // Adding a popup to the circle
