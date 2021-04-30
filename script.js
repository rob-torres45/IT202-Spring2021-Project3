// Screens
let navAnchors = document.querySelectorAll("div#topnav a");
document.querySelector("#home").style.display = "block";
navAnchors.forEach((anchor) => {
  anchor.addEventListener("click", (event) => {
    document.querySelectorAll(".screen").forEach((screen) => {
      screen.style.display = "none";
    });
    let screen = event.target.getAttribute("data-screen");
    let targetScreen = document.querySelector("#" + screen);
    targetScreen.style.display = "block";
  })
})
// Camera
const supported = 'mediaDevices' in navigator;
const player = document.getElementById('player');
var canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const captureButton = document.getElementById('capture');
const dataDiv = document.getElementById('imageData');
const visionApiEndpoint = "https://vision.googleapis.com/v1/images:annotate";
let requestBody;


const constraints = {
  video: true,
};

navigator.mediaDevices.getUserMedia(constraints)
  .then((stream) => {
    player.srcObject = stream;
});

captureButton.addEventListener('click', () => {
  context.drawImage(player, 0, 0, canvas.width, canvas.height);
  var dataURL = canvas.toDataURL('image/jpeg', 1.0);
  console.log(dataURL);
  document.querySelector(".card-img-top").setAttribute("src", dataURL);
});

document.querySelector("#capture").addEventListener("click", (e) => {
let pic = document.querySelector("#canvas");
});

// Caption Input
let buttonPress = document.querySelector(".captionButton");
let snackbar = mdc.snackbar.MDCSnackbar.attachTo(document.querySelector(".mdc-snackbar"));

buttonPress.addEventListener("click", () => {
  let caption = document.querySelector(".mdc-text-field__input").value;
  snackbar.labelText = "You Entered: " + caption;
  snackbar.open();
  document.querySelector(".card-text").innerText = caption;
});

//Location
let map;

function initMap() {
  const contentString =
    "<p class = 'infoWindow'><i class = 'fas fa-camera-retro'></i> took the photo right here</p>"
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 41.8781, lng: -87.6298 },
    zoom: 14,
  });

  let infoWindow = new google.maps.InfoWindow();
  const locationButton = document.createElement("button");

  locationButton.textContent = "Current Location";
  locationButton.classList.add("custom-map-control-button");
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
  locationButton.addEventListener("click", () => {
    if (navigator.geolocation) {
      console.log("Hello")
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          infoWindow.setPosition(pos);
          infoWindow.setContent(contentString);
          infoWindow.open(map);
          map.setCenter(pos);
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter());
        }
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}

function geoFindMe() {

  const status = document.querySelector('#status');
  const mapLink = document.querySelector('#map-link');

  mapLink.href = '';
  mapLink.textContent = '';

  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    status.textContent = '';
    mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
    mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
    document.querySelector(".card-title").innerText = "Location: " + latitude + ", " + longitude;

    fetch('https://api.openweathermap.org/data/2.5/weather?lat='+position.coords.latitude+'&lon='+position.coords.longitude+'&appid=e5d24fde103a118f3cdeb022ed1d885b&units=imperial')
      .then(response => response.json())
      // .then((data) => console.log(data['weather'][0]['main']))
      .then((data) => document.querySelector("h2.card-weather").innerText = data['weather'][0]['description'])
  }

  function error() {
    status.textContent = 'Unable to retrieve your location';
  }

  if (!navigator.geolocation) {
    status.textContent = 'Geolocation is not supported by your browser';
  } else {
    status.textContent = 'Locating…';
    navigator.geolocation.getCurrentPosition(success, error);
  }


}
document.querySelector('#find-me').addEventListener('click', geoFindMe);


// indexDB

// var db = new Dexie("app_db");
// db.version(1).stores({
//   names: 'name'
// });

