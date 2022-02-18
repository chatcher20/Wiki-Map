// Client facing scripts here
$(document).ready(function() {
  // Shows All available maps
  $("#available-btn").on("click", () => {
    $("#all-maps").removeClass("hide-element");
    $("#fave-list").addClass("hide-element");
    $("#create-form").addClass("hide-element");
  });

  // Shows only favourite maps
  $("#favourite-btn").on("click", () => {
    $("#fave-list").removeClass("hide-element");
    $("#all-maps").addClass("hide-element");
    $("#create-form").addClass("hide-element");
  });

  // Shows create map form
  $("#create-btn").on("click", () => {
    $("#create-form").removeClass("hide-element");
    $("#fave-list").addClass("hide-element");
    $("#all-maps").addClass("hide-element");
  });

  // Creating map list from db
  let usersNames = [];
    $.ajax({
      method: "GET",
      url: "/api/users",
      success:function(u) {
      const arr = u.users;
      for (const key in arr) {
        usersNames.push( [arr[key].first_name, arr[key].id] );
      };
    }
  });

  const createMapListItem = (item) => {
    let creator;
    for (const name of usersNames) {
      if (item.user_id === name[1]) {
        creator = name[0];
      }
    };

    let listItem = `
    <li>
      <div class="list-item">
        <h3>${item.map_name}</h3>
        <p>Created by: ${creator}</p>
        <p>Favourite <input type="checkbox" name="add-fave-map" id="add-fave-map"></p>
      </div>
    </li>`;

    return listItem;
  };

  const createFaveList = (faveItem) => {
    let creator;
    for (const name of usersNames) {
      if (faveItem.user_id === name[1]) {
        creator = name[0];
      }
    };

    let listItem = `
    <li>
      <div class="list-item">
        <h3>${faveItem.map_name}</h3>
        <p>Created by: ${creator}</p>
        <button class="remove-fave-btn">Remove</button>
      </div>
    </li>`;

    return listItem;
  };

  // Render the list item
  const showListItem = function(items) {
    const mapList = $(".all-maps-list");
    const arr = items.maps;
    for (const key in arr) {
      mapList.prepend(createMapListItem(arr[key]));
    };

    return mapList;
  };

  const faveListItem = function(items) {
    const mapList = $(".fave-maps-list");
    const arr = items.maps;
    for (const key in arr) {
      if (arr[key].is_favourite === true) {
        mapList.prepend(createFaveList(arr[key]));
      };
    };

    return mapList;
  };

  // Fetch maps from db
  const loadMaps = function () {
    $.ajax({
      method: "GET",
      url: "/api/maps",
    }).then(function (item) {
      showListItem(item);
      faveListItem(item);
    });
  };

  // Add post route here so that when "Create new map" is clicked a post route sends that data to a map database (url: "/api/maps"
  //go to appropriate routes js file aka maps.js
  $("#map-form").on("submit", function(event) {

    // prevent default beahviour of the form (making a GET request to the current page)
    event.preventDefault();
    console.log("the form has submitted");
    console.log("event = ", event);

    const mapData = $("#map-form").serialize();
    console.log("mapDataL ", mapData);

      $.ajax({
        method: "POST",
        url: "/api/maps",
        data: mapData
      }).then(() => {
        console.log("map data created successfully");
      })
      // Added lines 46-51 below. This causes the map to be saved into maps database and wipes page clean (fresh map).
      $('#map').empty();
        const vanCity = { lat: 49.28741410202669, lng: -123.10724415091286 };
        const map = new google.maps.Map(document.getElementById("map"), {
          center: vanCity,
          zoom: 11
        });
        $(".all-maps-list").empty();
        $(".fave-maps-list").empty();
        loadMaps();
  });

  loadMaps();
});


function initMap() {

  // The location of Uluru, Australia
  const uluru = { lat: -25.344, lng: 131.036 };

  const vanCity = { lat: 49.28741410202669, lng: -123.10724415091286 };

  const map = new google.maps.Map(document.getElementById("map"), {
    center: vanCity,
    zoom: 11
  });

  let newPlace = {};

  const pointForm = $("#point-form");


  map.addListener("click", (e) => {
    placeMarker(e.latLng, map);
    console.log(e.latLng.toJSON());
    newPlace = e.latLng.toJSON();
    newPlaceNotJSON = e.latLng;

    // open a form for user to submit a title, description or image
    $("#point-form").slideDown();

    $("#point-form form").on('submit', function (event) {
      // prevent default beahviour of the form (making a GET request to the current page)
      event.preventDefault();
      console.log("the form has submitted");
      console.log("event = ", event);

      const pinData = $("#point-form form").serialize() + `&latitude=${newPlace.lat}&longitude=${newPlace.lng}&latLng=${newPlaceNotJSON}`;
      console.log("pinData = ", pinData);   // Serialize to turn it into a urlencoded string to be sent to the server

      $.ajax({
        method: "POST",
        url: "/api/pins",       //go to appropriate routes js file aka pins.js
        data: pinData
      }).then(() => {
        pointForm.css({"display":"none"});   // pointForm.addClass("hide-element") this was not removing form window
        console.log("pin data created successfully");
        location.reload();     // reloads the page so that when you click on the pin you just created, the information shows up.
      });
    });
  });


  $.ajax({
    method: "GET",
    url: "/api/pins",
  }).then((res) => {
    res.pins.map((pin) => {
      placeMarker({lat: Number(pin.latitude), lng: Number(pin.longitude), title: pin.title, description: pin.description, image: pin.image}, map);
    });
    console.log("pins is...  ", res);
  })


  function placeMarker(latLng, map) {

    const marker = new google.maps.Marker({
      position: latLng,
      map: map,
    });

    // Add the following event listener to display a title, description or image that the user entered for this location
    marker.addListener("click", () => {
      infowindow.open({
        anchor: marker,
        map,
        shouldFocus: false,
      })
    })

    // Right-click on a marker to delete it.
    marker.addListener("rightclick", () => {
      marker.setVisible(false);
      infowindow.close();
    })

    let infowindow = new google.maps.InfoWindow({
      content: `<h1 id="firstHeading" class="firstHeading">${latLng.title}</h1>` +
      '<div id="bodyContent">' + `<p><b>Description: </b>${latLng.description}</p>` +
       `<p><b>Image: </b><a target="_blank" href="${latLng.image}">Click Here to view image</a></p>` +
      '</div>'
    });

  };















  // Uluru/Ayer's Rock example:

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

  const uluruMarker = new google.maps.Marker({
    position: uluru,
    map,
    title: "Uluru (Ayers Rock)",
  });

  let uluruWindow = new google.maps.InfoWindow({
    content: uluruString
  });

  uluruMarker.addListener("click", () => {
    uluruWindow.open({
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
