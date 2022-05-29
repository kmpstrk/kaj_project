// Setting up the map
let mapOptions = {
    center: [45.063224, 38.999948],
    zoom: 4
}
let map = new L.Map('map', mapOptions);
let layer = new L.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
map.addLayer(layer);

//Getting geolocation if it is permitted
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
}

// Mark the point of user's geolocation on map
function showPosition(position) {

    //Creating custom yellow marker for user's geolocation
    let icon = new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    // Adding marker to the map
    let m = L.marker([position.coords.latitude,position.coords.longitude], {icon: icon}).addTo(map);

    //Setting info popup for the marker
    m.bindPopup("You are here");
    m.on('click', function(e){
        e.target.getPopup();
    });

}


// Variable for the marker on the map, which user is capable to add to DB. Marker appears on the place where user clicked
let theMarker = {};

// After clicking on map, form appears and marker is set on the place where user pointed.
map.on('click',function(e){

    //Getting coordinates of the marker
    let lat = e.latlng.lat;
    let lng = e.latlng.lng;

    //Clear existing marker
    if (theMarker !== undefined) {
        map.removeLayer(theMarker);
    }

    //Creating custom red marker
    let icon = new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    // Add the marker to the map
    theMarker = L.marker([lat,lng], {icon: icon}).addTo(map);

    //Change header text content
    let header = document.getElementById("header");
    header.textContent = "Now add the information about this place";

    //Show hidden fields of form for adding a new marker
    let list = document.getElementsByClassName("hiddenWhenNotClicked");
    for (let i = 0; i < list.length; i++) {
        list[i].style.visibility = "visible";
    }

    //Show coordinates' values on the screen
    document.getElementById("lat").textContent = lat;
    document.getElementById("lng").textContent = lng;
});
