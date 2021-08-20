var gmarkers1 = [];
var markers1 = [];
var infowindow = new google.maps.InfoWindow({
  content: ''
});

// Our markers
markers1 = [
  ["0", "Leichlingen", 51.106277, 7.018726, "1", "red", "-35", "<h3>Leichlingen <span style='font-size: 10pt;'>( 42799 )</span></h3><p>Internet: 0 (0%)<p>Social Media: 0 (0%)<p>Dein HSK: 0 (0%)<p>Newsletter: 0 (0%)<p>Banner:  (0%)<p>Zeitung: 0 (0%)<p>Bus: 0 (0%)<p>Radio: 0 (0%)<p>Hören Sagen: 0 (0%)<p>vor Ort:  (0%)<p>Sonstiges: 1 (100%)"],
  ["1", "Stuttgart", 48.7667, 9.18333, "1", "red", "-35", "<h3>Stuttgart <span style='font-size: 10pt;'>( 70327 )</span></h3><p>Internet: 0 (0%)<p>Social Media: 0 (0%)<p>Dein HSK: 0 (0%)<p>Newsletter: 0 (0%)<p>Banner:  (0%)<p>Zeitung: 0 (0%)<p>Bus: 0 (0%)<p>Radio: 0 (0%)<p>Hören Sagen: 1 (100%)<p>vor Ort:  (0%)<p>Sonstiges: 0 (0%)"],
  ["2", "Pfaffenhofen", 49.0644444, 8.9763889, "1", "red", "-35", "<h3>Pfaffenhofen <span style='font-size: 10pt;'>( 74397 )</span></h3><p>Internet: 0 (0%)<p>Social Media: 0 (0%)<p>Dein HSK: 0 (0%)<p>Newsletter: 0 (0%)<p>Banner:  (0%)<p>Zeitung: 0 (0%)<p>Bus: 0 (0%)<p>Radio: 0 (0%)<p>Hören Sagen: 1 (100%)<p>vor Ort:  (0%)<p>Sonstiges: 0 (0%)"],
  ["3", "Bretten", 49.03685, 8.707453, "1", "red", "-35", "<h3>Bretten <span style='font-size: 10pt;'>( 75015 )</span></h3><p>Internet: 0 (0%)<p>Social Media: 2 (13%)<p>Dein HSK: 0 (0%)<p>Newsletter: 0 (0%)<p>Banner:  (0%)<p>Zeitung: 4 (27%)<p>Bus: 4 (27%)<p>Radio: 0 (0%)<p>Hören Sagen: 3 (20%)<p>vor Ort:  (0%)<p>Sonstiges: 2 (13%)"],
  ["4", "Oberderdingen", 49.0655556, 8.8030556, "1", "red", "-35", "<h3>Oberderdingen <span style='font-size: 10pt;'>( 75038 )</span></h3><p>Internet: 0 (0%)<p>Social Media: 0 (0%)<p>Dein HSK: 0 (0%)<p>Newsletter: 0 (0%)<p>Banner:  (0%)<p>Zeitung: 3 (19%)<p>Bus: 1 (6%)<p>Radio: 0 (0%)<p>Hören Sagen: 7 (44%)<p>vor Ort:  (0%)<p>Sonstiges: 4 (25%)"],
];


/**
 * Function to init map
 */

function initialize() {
  var center = new google.maps.LatLng(52.4357808, 4.991315699999973);
  var mapOptions = {
    zoom: 6,
    clickableIcons: false,
    center: {
      lat: 50.533481,
      lng: 10.018343
    },
    disableDefaultUI: true,
    streetViewControl: false,
    zoomControl: true,
    gestureHandling: 'greedy',
    zoomControlOptions: {
      style: google.maps.ZoomControlStyle.SMALL,
      position: google.maps.ControlPosition.RIGHT
    },
  };

  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  
  for (i = 0; i < markers1.length; i++) {
    addMarker(markers1[i]);
  }
  var markerCluster = new MarkerClusterer(map, gmarkers1, {imagePath:'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
}

/**
 * Function to add marker to map
 */

function addMarker(marker) {
  var category = marker[4];
  var title = marker[1];
  var color = marker[5];
  var pos = new google.maps.LatLng(marker[2], marker[3]);
  var content = marker[7];
  var rotations = marker[6];

  var icon = {
    path: "M320.69 630.86C320.69 630.86 520.91 323.43 520.91 222.4C520.91 73.71 419.43 9.03 320.46 8.8C221.49 9.03 120 73.71 120 222.4C120 323.43 320.34 630.86 320.34 630.86C320.34 630.86 320.46 630.51 320.46 630.51C320.46 630.63 320.64 630.79 320.69 630.86ZM320.57 144.46C358.97 144.46 390.06 175.54 390.06 213.94C390.06 252.34 358.86 283.43 320.46 283.43C282.17 283.43 251.09 252.34 251.09 213.94C251.09 175.54 282.17 144.46 320.57 144.46Z", //SVG path of awesomefont marker
    fillColor: color, //color of the marker
    fillOpacity: 1,
    strokeWeight: 0,
    rotation: parseInt(rotations),
    scale: 0.06, //size of the marker, careful! this scale also affects anchor and labelOrigin
    anchor: new google.maps.Point(310, 620), //position of the icon, careful! this is affected by scale
    labelOrigin: new google.maps.Point(205, 190) //position of the label, careful! this is affected by scale
  }
  marker1 = new google.maps.Marker({
    title: title,
    position: pos,
    category: category,
    map: map,
    icon: icon
  });

  gmarkers1.push(marker1);

  // Marker click listener
  google.maps.event.addListener(marker1, 'click', (function(marker1, content) {
    return function() {
      infowindow.setContent(content);
      infowindow.open(map, marker1);
      map.panTo(this.getPosition());
    }
  })(marker1, content));
}
filterMarkers = function(category) {
  for (i = 0; i < gmarkers1.length; i++) {
    marker = gmarkers1[i];
    // If is same category or category not picked
    if (marker.category == category || category.length === 0) {
      //Close InfoWindows
      marker.setVisible(true);
      if (infowindow) {
        infowindow.close();
      }
    }
    // Categories don't match 
    else {
      marker.setVisible(false);
    }
  }
}

// Init map
initialize();
