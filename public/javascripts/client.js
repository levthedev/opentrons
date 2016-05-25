$(document).ready(function() {
  var otVid = document.getElementById('ot-vid')
  if ($(window).width() > 1200) {
    var webm = document.createElement('source');
    webm.src = './img/opentrons.webmsd.webm';
    webm.type = 'video/webm';

    var mp4 = document.createElement('source');
    mp4.src = './img/opentrons.mp4';
    mp4.type = 'video/mp4';

    otVid.appendChild(webm);
    otVid.appendChild(mp4);
    otVid.play();
  }

  var map = L.map('map', {
    zoomControl: false
  }).setView([25.84706035607122, -0], 2.5);

  map._layersMaxZoom = 8;
  map._layersMinZoom = 2.5;

  map.doubleClickZoom.enable();
  map.scrollWheelZoom.disable();

  new L.Control.Zoom({
    position: 'topright'
  }).addTo(map);

  var gl = L.mapboxGL({
    accessToken: 'pk.eyJ1Ijoia3Q4MCIsImEiOiI4NG5ZZ1BZIn0.YfJqwZ4R_B_8vnaWbIiXmg',
    style: 'mapbox://styles/kt80/ciju7tcqa00bz90lxjxfflym1'
  }).addTo(map);

  var cLayer = new L.layerGroup().addTo(map);

  var tronIcon = L.icon({
    iconUrl: 'img/ot-marker.svg',
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    popupAnchor: [15, 15]
  });

  var array = [];

  $.getJSON('./javascripts/CustomerLocations3-4.json', function(data) {
    var sightings = data.features;
    for (var i = 0; i < sightings.length; i++) {
      var lat, lon;

      lon = sightings[i].geometry.coordinates[0];
      lat = sightings[i].geometry.coordinates[1];

      var ltln = [lat, lon];
      var marker = new L.marker(ltln, {
        icon: tronIcon
      }).addTo(cLayer);
      marker.on('click', function(e) {
        var z = map.getZoom();
        map.setView(e.latlng, z + 1);
      });
      array.push(marker);
    }
  });
  function cycle(markers) {
    var i = 0;

    function run() {
      if (++i > array.length - 1) i = 0;
      map.setView(markers[i].getLatLng(), 3);
      window.setTimeout(run, 1000);
    }
    run();
  }
});
