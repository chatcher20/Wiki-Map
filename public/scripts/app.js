
// Client facing scripts here
$(document).ready(function() {
  $("#available-btn").on("click", () => {
    $("#all-maps").removeClass("hide-element");
    $("#fave-list").addClass("hide-element");
  });

  $("#favourite-btn").on("click", () => {
    $("#fave-list").removeClass("hide-element");
    $("#all-maps").addClass("hide-element");
  });
});

function initMap() {

  // The location of Uluru
  const uluru = { lat: -25.344, lng: 131.036 };

  const vanCity = { lat: 49.28741410202669, lng: -123.10724415091286 };

  // The map, centered at vanCity
  const map = new google.maps.Map(document.getElementById("map"), {
    center: vanCity,
    zoom: 11
  });

  const uluruString =
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

  let newPlace = {};

  const pointForm = $("#point-form");



  map.addListener("click", (e) => {
    placeMarker(e.latLng, map);
    console.log(e.latLng.toJSON());
    newPlace = e.latLng.toJSON();

    // open a form for user to submit a title, description or image
    pointForm.removeClass("hide-element")

    $("#point-form form").on('submit', function (event) {
      // prevent default beahviour of the form (making a GET request to the current page)
      event.preventDefault();
      console.log("the form has submitted");
      console.log("event = ", event);

      const pinData = $("#point-form form").serialize() + `&latitude=${newPlace.lat}&longitude=${newPlace.lng}&latLng=${newPlace.latLng}`;
      console.log("pinData = ", pinData);   // Serialize to turn it into a urlencoded string to be sent to the server

      $.ajax({
        method: "POST",
        url: "/api/pins",       //go to appropriate routes js file aka pins.js
        data: pinData
      }).then(() => {
        pointForm.addClass("hide-element");
        console.log("pin data created successfully");
      });
    });

  });


  $.ajax({
    method: "GET",
    url: "/api/pins",
  }).then((res) => {
    res.pins.map((pin) => {
      placeMarker({lat: Number(pin.latitude), lng: Number(pin.longitude)}, map);

    });
    console.log(res);
  })


  const infowindow = new google.maps.InfoWindow({
    content: uluruString
  });

  function placeMarker(latLng, map) {
    const marker = new google.maps.Marker({
      position: latLng,
      map: map,
    });

    // Define the function markerInfoToDisplay
    // const markerInfoToDisplay = function(pins) {
    //   for (const x = 0; x < pins.length; x = x + 1) {
    //     if(pins[x].latLng === marker.position) {
    //       return pins.description;
    //     }
    //   }
    // };

    // Add the following event listener to display a title, description or image that the user entered for this location
    marker.addListener("click", () => {
      infowindow.open({
        anchor: marker,
        map,
        shouldFocus: false,
        // content: markerInfoToDisplay(pins)  // Instead of displaying uluruString, Get the latLng specific to this marker by looping through the objects inside the "pins" array, and finding the object with the same latLng coordinates. Then display that object's title, description and image.
      })
    })

    // Right-click on a marker to delete it.
    marker.addListener("rightclick", () => {
      marker.setVisible(false);
      infowindow.close();
    })

  };

  const uluruMarker = new google.maps.Marker({
    position: uluru,
    map,
    title: "Uluru (Ayers Rock)",
  });

  uluruMarker.addListener("click", () => {
    infowindow.open({
      anchor: uluruMarker,
      map,
      shouldFocus: false,
    });
  });














  // Not sure if the code below will be necessary anymore, leave for now -Chris

  /*
  $(document).ready(() => {

    // For now let's hard code a location:
    let location = "Burnaby";

    // GET request to geocode api URL


    const geocode = function() {
      $.ajax({
        method: "GET",
        url: "https://maps.googleapis.com/maps/api/geocode/json",
        address: location,
        key:'AIzaSyDJRsaB7ihfFojhMQ5EdtHPxZYJQEX0C3E'
      })
      .then(function(response) {
        // Log full response
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      })
    }

    // Call geocode
    geocode();

  });

  */



};
