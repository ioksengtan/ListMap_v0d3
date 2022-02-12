var appUrl = 'https://script.google.com/macros/s/AKfycby-gL9w_PIzt4TDnqfpErNP1YTck93p4j7z1FTpt52bCkryg5Iu/exec';
var sheetsUrl = 'https://docs.google.com/spreadsheets/d/1GNvkC8t3xua_ibN2GnnXJi-MXasuX5SXb4y1G6idFSc/edit#gid=1023127248';
var sheetName = 'landmarks';

parameter = {
    url: sheetsUrl,
    name: sheetName,
    command: "getRecentStories",
};
data_dict = {}



$.getScript('http://www.youtube.com/iframe_api');

var player;

function onYouTubePlayerAPIReady() {
  /*
    player = new YT.Player('player', {
      height: '390',
      width: '640',
      videoId: 'EVNTyuZrAlg',
        playerVars: { 'start': 159, 'autoplay': 1, 'controls': 1 },
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange,
      }

    });
    */
}

function onPlayerStateChange(evt)
{
    if (evt.data==1)
    {
        // this will seek to a certain point when video starts
        // but you're better off using 'start' parameter
        // player.seekTo(22);
    }
}

     function onPlayerReady(evt) {

        // doesn't work here
        // player.seekTo(30);

         // lets make ure we have a function
         //alert("typeof(player.SeekTo) = " + typeof(player.seekTo));
     }
     $(document).on('click', '#btnSeek', function() {
         player.seekTo($(this).data('seek'), true);
     });


$(document).ready(

    function() {

        const i18n = new VueI18n({
            locale: 'en',
            messages,
        })
        new Vue({
            i18n
        }).$mount('#dropdown')

        $.get(appUrl, parameter, function(data) {

            //            console.log(data);
            data_json = JSON.parse(data);

            for (i in data_json.table) {
                addmyappList(gpsstory_list_all, data_json.table[i], 'prepend')
				data_dict[data_json.table[i].story_id] = {
					'type':data_json.table[i].types,
					'youtube_key':data_json.table[i].link.split('v=')[1],
					'link':data_json.table[i].link,
				};

            }


        })
    });

function renderMap() {
    var mymap = L.map('map').setView([25.1130643, 121.5227629], 7);
    console.log('test');
    /*
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoiaW9rc2VuZ3RhbiIsImEiOiJja3JkeTgxMHI1Z3B2MzFxcHM0NWo3cTEwIn0.kkcIlaMdiTpqqaCk6YpOgQ'
    }).addTo(mymap);
	*/
    L.tileLayer('https://api.mapbox.com/styles/v1/yushengc/cksmkvn1wnscl17lydjzbzhtv/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoieXVzaGVuZ2MiLCJhIjoiY2phYnJ6NDdwMDM2bzMzcXV1NTEzMWlucCJ9.0mKbx5AhNu9BLzYyLwCyXQ', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,

    }).addTo(mymap);


    var markers = L.markerClusterGroup();
    locations.map(item => L.marker(new L.LatLng(item.lat, item.lng)))
        .forEach(item => markers.addLayer(item));
    mymap.addLayer(markers);

}
function seekto(story_id, time){
  youtube_players[story_id].seekTo(time, true);
  //console.log('seekto:'+player+' '+time);
  //console.log('seekto:'+time);
  //player.seekTo(60, true);

}
var youtube_players = {}
function getGPSbyStoryID(story_id) {
    parameter = {
        url: sheetsUrl,
        command: "getLandmarksByStory",
        story_id: story_id
    };
    $.get(appUrl, parameter, function(data) {
        console.log(data);

        var data_json_landmarks_by_story = JSON.parse(data);
		dbg = data_json_landmarks_by_story;
        var gps_locations = [];
        content_reg = '';
        player_id = 'collapse_player_' + story_id;
		switch(data_dict[story_id].type){
			case 'youtube':
				if (typeof data_dict[story_id].youtube_key != 'undefined'){
          youtube_players[story_id] = new YT.Player(player_id, {
            height: '390',
            width: '640',
            videoId: data_dict[story_id].youtube_key,
              playerVars: { 'start': 0, 'autoplay': 0, 'controls': 1 },
            events: {
              'onReady': onPlayerReady,
              'onStateChange': onPlayerStateChange,
            }

          });
					//content_reg += '<iframe width="560" height="315" src="https://www.youtube.com/embed/' + data_dict[story_id].youtube_key	+ '" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
				}
				break;
			case 'webpage':
				if (typeof data_dict[story_id].link != 'undefined'){
					content_reg += '<iframe width="100%" height="315" src="'+ data_dict[story_id].link +'" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
				}
				break;
		}

        content_reg += '<ul>'
        for (i in data_json_landmarks_by_story.table) {
            gps_locations.push({
                lat: data_json_landmarks_by_story.table[i].lat,
                lng: data_json_landmarks_by_story.table[i].lng,
                name: data_json_landmarks_by_story.table[i].name,
                notes: data_json_landmarks_by_story.table[i].notes,
                link: data_json_landmarks_by_story.table[i].link,
                landmark_id: data_json_landmarks_by_story.table[i].landmark_id,
            })
            content_reg += `<li style="cursor:pointer" class="checkboxLandmark"><input class="chilInput${story_id}" id="${data_json.table[i].landmark_id}" type="checkbox"> <a class="singleZoom">`
            content_reg += data_json_landmarks_by_story.table[i].name + '</a>';
            //content_reg += '<a href=\"javascript:seekto(' + youtube_players[story_id] +','+data_json.table[i].link + ')\">('+ data_json.table[i].link +')</a>'
            if(data_json_landmarks_by_story.table[i].link == ''){
              content_reg += '<a href=\"javascript:seekto('+ story_id +',' + data_json_landmarks_by_story.table[i].link + ')\">' +'</a>'
            }else{
            var video_seconds = data_json_landmarks_by_story.table[i].link;
              video_mm = Math.floor(video_seconds / 60);
              video_ss = video_seconds - video_mm * 60;
              content_reg += '<a href=\"javascript:seekto('+ story_id +',' + data_json_landmarks_by_story.table[i].link + ')\">(t='+ video_mm + 'm' + video_ss +'s)</a>'
            }
            //content_reg += '<a href=\"javascript:add_to_favorite(' + data_json_landmarks_by_story.table[i].landmark_id + ')\">(add)</a>'
            content_reg += '</li>'

        }

        content_reg += '</ul>'
        test_str = '#collapse_' + story_id;
        $('#collapse_ul_' + story_id).html(content_reg);
        UpdateMap(gps_locations, story_id);

        let markerIcon = document.querySelectorAll('.leaflet-marker-icon')
        let markerShadow = document.querySelectorAll('.leaflet-marker-shadow')

        if (gps_locations.length != markerIcon.length) {
            for (let i = 0; i < (markerShadow.length - gps_locations.length); i++) {
                markerIcon[i].remove()
                markerShadow[i].remove()
            }
        }
        let main_input = document.querySelectorAll('.groupinput').checked = true

        // document.getElementById(`collapse_${story_id}`).classList.add("show");

        let genInpt = document.getElementById(`genInput${story_id}`)
        genInpt.checked = true
        GotoStory(story_id, genInpt.checked)

    });


}




function addStoriesToLayer(locations) {
    var markers = L.markerClusterGroup();
    locations.map(item => L.marker(new L.LatLng(item.lat, item.lng)))
        .forEach(item => markers.addLayer(item));
    mymap.addLayer(markers)
}

// function ZoomToGroup(input, coor) {

//     input.forEach((input, i) => {
//         if (input.checked === true) {
//             let bound = coor.getBounds()
//             mymap.fitBounds(bound)
//         } else {
//             console.log('k')
//         }
//     })
// }


function ShowHideMarker(input, loc, opt) {

    input.addEventListener('click', () => {
        if (input.checked === false) {
            mymap.removeLayer(loc)
        } else {
            mymap.addLayer(loc)
        }
    })
}

function zoomto(){
  var loc = {'lat': -34.003646,'lng': 18.469909};
  mymap.flyTo(loc, 16, {
      animate: true,
      duration: 0.3
  })
}

function SingleZoom(hyperlink, loc) {
    hyperlink.addEventListener('click', () => {
        console.log('hyperlink:' + hyperlink + ', loc:' + loc);
        mymap.flyTo(loc._latlng, 18, {
            animate: true,
            duration: 0.3
        })
    })
}

function ZoomToGroup(coor) {

    var markers = L.markerClusterGroup();
    //var landmarks_layergroup = L.layerGroup();

    coor.map(item => L.marker(new L.LatLng(item.lat, item.lng)))
        //.forEach(item => mymap.addLayer(item));
        .forEach((item, i) => {
            markers.addLayer(item)
        });

    let bound = markers.getBounds()
    mymap.fitBounds(bound)

    // ZoomToGroup(markers)
}

function ShowHideCluster(location, input) {
    var markers = L.markerClusterGroup();
    input.addEventListener('click', () => {
        if (input.checked === false) {
            markers.removeLayer(location)
        } else {
            markers.addLayer(location)
        }
    })

    mymap.addLayer(markers)


}

function onclickTitleShowMarker(location) {
    var markers = L.markerClusterGroup();
    markers.addLayer(location)

    mymap.addLayer(markers)
}

function GetCluster(story_id) {
    parameter = {
        url: sheetsUrl,
        //command:"getLandmarksByStory",
        command: "getLandmarksByStory",
        story_id: story_id
    };
    $.get(appUrl, parameter, function(data) {
        //console.log(data);
        var data_json = JSON.parse(data);
        var gps_locations = [];
        for (i in data_json.table) {
            gps_locations.push({
                lat: data_json.table[i].lat,
                lng: data_json.table[i].lng,
                name: data_json.table[i].name,
                content: data_json.table[i].content,
                link: data_json.table[i].link,
                landmark_id: data_json.table[i].landmark_id,
            })

        }




        // onclickTitleShowMarker(gps_locations)
        addStoriesToLayer(gps_locations)
    });
}

function GotoStory(id, val) {

    let childIcon = document.querySelectorAll(`.chilInput${id}`)
    childIcon.forEach(child => {
        child.checked = val
    })
}

function UpdateMap(locations, sid) {
    console.log('UpdateMap');


    var streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoiaW9rc2VuZ3RhbiIsImEiOiJja3JkeTgxMHI1Z3B2MzFxcHM0NWo3cTEwIn0.kkcIlaMdiTpqqaCk6YpOgQ'
    });

    var markers = L.markerClusterGroup();
    //var landmarks_layergroup = L.layerGroup();


    let input = document.querySelectorAll(`#collapse_${sid} input`)
    let a = document.querySelectorAll(`#collapse_${sid} .singleZoom`)

    locations.map(item => L.marker(new L.LatLng(item.lat, item.lng)))
        .forEach((marker, i) => {
            markers.addLayer(marker);
            ShowHideMarker(input[i], marker, markers);
            SingleZoom(a[i], marker);
            marker.bindPopup("<b>" + locations[i].name + "</b><br>" + locations[i].notes).openPopup();
        });

    let genInput = document.getElementById(`genInput${sid}`)


    let markerIcon = document.querySelectorAll('.leaflet-marker-icon')
    let markerShadow = document.querySelectorAll('.leaflet-marker-shadow')
    genInput.addEventListener('click', function() {
        let id = genInput.id.replace('genInput', '')
        let val = genInput.checked

        if (genInput.checked === true) {
            mymap.eachLayer(function(layer) {
                mymap.addLayer(layer)
            })
            mymap.addLayer(markers);
            GotoStory(id, val)
            console.log(markerIcon.length)
        } else {
            markers.eachLayer(function(layer) {
                layer.remove()
            })
            mymap.removeLayer(markers);
            GotoStory(id, val)
            console.log(markerIcon.length)
        }
    })

    ZoomToGroup(locations)


    var baseMaps = {
        //    "Streets": streets
    };

    var overlayMaps = {
        "Landmarks": markers
    };

    mymap.addLayer(markers);


}


function refreshGMap(locations) {
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 8,
        center: {
            lat: 24.790078397806973,
            lng: 121.07471724480152
        },
    });
    const infowindow = new google.maps.InfoWindow({
        content: "<h1>test</h1>",
    });
    // Create an array of alphabetical characters used to label the markers.
    let labels = [];
    for (location_id in locations) {
        //const labels = ["", "B1"];
        labels.push(locations[location_id].name);
    }
    // Add some markers to the map.
    // Note: The code uses the JavaScript Array.prototype.map() method to
    // create an array of markers based on a given "locations" array.
    // The map() method here has nothing to do with the Google Maps API.
    markers = locations.map((location, i) => {
        var marker = new google.maps.Marker({
            position: location,
            label: labels[i % labels.length],
            title: 'test'
        });
        marker.addListener("click", () => {
            //map.setZoom(8);
            //map.setCenter(marker.getPosition());
            infowindow.setContent(location.content + '<br/>' + '<a href=\"' + location.link + '\">link</a>');
            infowindow.open(map, marker);
            console.log(marker.getLabel());

        });
        return marker
    });
    // Add a marker clusterer to manage the markers.
    markerCluster = new MarkerClusterer(map, markers, {
        imagePath: "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
    });
    marker = new google.maps.Marker({
        position: {
            lat: 25.0489782,
            lng: 121.5208181
        },
    });
    //markerCluster.addMarkers(marker, true);

    google.maps.event.addListener(markerCluster, 'clusterclick', function(c) {
        console.log('Number of managed markers in cluster: ' + c.getSize());
        var m = c.getMarkers();

    });
}


function initMap() {
    //mymap = L.map('map').setView([25.1130643, 121.5227629], 7);
    //console.log('test');
    var streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoiaW9rc2VuZ3RhbiIsImEiOiJja3JkeTgxMHI1Z3B2MzFxcHM0NWo3cTEwIn0.kkcIlaMdiTpqqaCk6YpOgQ'
    });
    /*
    	var streets = L.tileLayer('https://api.mapbox.com/styles/v1/yushengc/cksmkvn1wnscl17lydjzbzhtv/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoieXVzaGVuZ2MiLCJhIjoiY2phYnJ6NDdwMDM2bzMzcXV1NTEzMWlucCJ9.0mKbx5AhNu9BLzYyLwCyXQ', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,

        });
    */
    var markers = L.markerClusterGroup();
    //var landmarks_layergroup = L.layerGroup();
    locations.map(item => L.marker(new L.LatLng(item.lat, item.lng)))
        //.forEach(item => mymap.addLayer(item));
        .forEach(item => markers.addLayer(item));

    mymap = L.map('map', {
        //center: [25.1130643, 121.5227629],
        center: [39.921640, -75.412165],
        zoom: 7,
        layers: [streets]
    });

    mymap.on('zoomend', function() {
        console.log('zoom to:' + 'level(' + this.getZoom() + ') ' + this.getCenter());
    });

    var baseMaps = {
        "Streets": streets
    };
    p_control = L.control.layers(baseMaps);


}

function initGMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 8,
        center: {
            lat: 24.790078397806973,
            lng: 121.07471724480152
        },
    });
    const infowindow = new google.maps.InfoWindow({
        content: "<h1>test</h1>",
    });
    // Create an array of alphabetical characters used to label the markers.
    const labels = ["一", "B1"];
    // Add some markers to the map.
    // Note: The code uses the JavaScript Array.prototype.map() method to
    // create an array of markers based on a given "locations" array.
    // The map() method here has nothing to do with the Google Maps API.
    markers = locations.map((location, i) => {
        var marker = new google.maps.Marker({
            position: location,
            label: labels[i % labels.length],
            title: 'test'
        });
        marker.addListener("click", () => {
            //map.setZoom(8);
            //map.setCenter(marker.getPosition());
            infowindow.setContent(marker.getLabel());
            infowindow.open(map, marker);
            console.log(marker.getLabel());

        });
        return marker
    });
    // Add a marker clusterer to manage the markers.
    markerCluster = new MarkerClusterer(map, markers, {
        imagePath: "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
    });
    marker = new google.maps.Marker({
        position: {
            lat: 25.0489782,
            lng: 121.5208181
        },
    });
    //markerCluster.addMarkers(marker, true);

    google.maps.event.addListener(markerCluster, 'clusterclick', function(c) {
        console.log('Number of managed markers in cluster: ' + c.getSize());
        var m = c.getMarkers();
        for (let i in m) {
            //console.log(m[i].getLabel());
            //console.log(m[i].getTitle());
            //console.log(m[i].myObj.myKey);
        }
    });
}

const locations = []
