// Client facing scripts here
let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"),
  {
    center: { lat: 49.28741410202669, lng: -123.10724415091286 },
    zoom: 14,
  });
};
