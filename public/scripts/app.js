// Client facing scripts here



function initMap() {

  // The location of Uluru
  const uluru = { lat: -25.344, lng: 131.036 };

  const vanCity = { lat: 49.28741410202669, lng: -123.10724415091286 };

  // The map, centered at vanCity
  const map = new google.maps.Map(document.getElementById("map"), {
    center: vanCity,
    zoom: 14
  });

  map.addListener("click", (e) => {
    placeMarker(e.latLng, map);
  });

  function placeMarker(latLng, map) {
    new google.maps.Marker({
      position: latLng,
      map: map,
    });
    // map.panTo(latLng);
  }

  const contentString =
  '<div id="content">' +
  '<div id="siteNotice">' +
  "</div>" +
  '<h1 id="firstHeading" class="firstHeading">Uluru</h1>' +
  '<div id="bodyContent">' +
  "<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large " +
  "sandstone rock formation in the southern part of the " +
  "Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) " +
  "south west of the nearest large town, Alice Springs; 450&#160;km " +
  "(280&#160;mi) by road. Kata Tjuta and Uluru are the two major " +
  "features of the Uluru - Kata Tjuta National Park. Uluru is " +
  "sacred to the Pitjantjatjara and Yankunytjatjara, the " +
  "Aboriginal people of the area. It has many springs, waterholes, " +
  "rock caves and ancient paintings. Uluru is listed as a World " +
  "Heritage Site.</p>" +
  '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' +
  "https://en.wikipedia.org/w/index.php?title=Uluru</a> " +
  "(last visited June 22, 2009).</p>" +
  "</div>" +
  "</div>";

  const infowindow = new google.maps.InfoWindow({
    content: contentString,
  });
  const marker = new google.maps.Marker({
    position: uluru,
    map,
    title: "Uluru (Ayers Rock)",
  });

  marker.addListener("click", () => {
    infowindow.open({
      anchor: marker,
      map,
      shouldFocus: false,
    });
  });



  const geocode = function() {

    // For now let's hard code a location:
    let location = "22 Main Street Boston MA";

    // GET request to geocode api URL



  }














};



