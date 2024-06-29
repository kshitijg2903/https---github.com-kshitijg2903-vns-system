let map;
let marker;
let path = [];
let currentPosition = { lat: 28.653805, lon: 77.10459 }; // Example starting point (San Francisco)

//Get current position using geolocation
 navigator.geolocation.getCurrentPosition((position) => {
     currentPosition.lat = position.coords.latitude;
     currentPosition.lon = position.coords.longitude;
     console.log("Current position:", currentPosition);
 });

function initMap() {
    console.log("Initializing map...");
    map = L.map('map').setView([currentPosition.lat, currentPosition.lon], 20);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Create a custom icon for the marker
    const icon = L.divIcon({
        html: '<img src="images/compass.png" id="direction-icon" style="transform: rotate(0deg);">',
        iconSize: [32, 32],
        className: 'direction-icon'
    });

    marker = L.marker([currentPosition.lat, currentPosition.lon], { icon: icon }).addTo(map);
    path.push([currentPosition.lat, currentPosition.lon]);
    console.log("Map initialized.");
}

function updateMap() {
    console.log("Updating map with new position:", currentPosition);
    document.getElementById('coordinates').innerText = `Latitude: ${currentPosition.lat}\n Longitude: ${currentPosition.lon}`;
    marker.setLatLng([currentPosition.lat, currentPosition.lon]);
    path.push([currentPosition.lat, currentPosition.lon]);
    L.polyline(path, { color: 'blue' }).addTo(map);
    map.panTo(new L.LatLng(currentPosition.lat, currentPosition.lon));
}

function updateDirection(degree) {
    const icon = document.getElementById('direction-icon');
    if (icon) {
        icon.style.transform = `rotate(${degree}deg)`;
    }
}

export { initMap, updateMap, updateDirection, currentPosition };
