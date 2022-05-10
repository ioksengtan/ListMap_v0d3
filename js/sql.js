var appUrl = 'https://script.google.com/macros/s/AKfycbzhDvz7kG2ghPV6xGdaFJLR2KboY4YUgaMouqauq3e13FGrkPx2/exec';
var sheetsUrl = 'https://docs.google.com/spreadsheets/d/1Hy041ZoEGjRsVox03E55oGL8CMcHOXeuL0kqRcN1QV4/edit#gid=0';
//https://docs.google.com/spreadsheets/d/1GNvkC8t3xua_ibN2GnnXJi-MXasuX5SXb4y1G6idFSc/edit?usp=sharing
var sheetName = 'data';


StoriesDict = {}
$(document).ready(

    function() {
    /*
		var parameter = {
			url: sheetsUrl,
			name: sheetName,
			command: "sql_get_landmarks_by_story_id",
      //command: "get_landmarks_by_story_id",
      story_id: 610
		};
    */
    var parameter = {
      url: sheetsUrl,
      name: sheetName,
      command: "get_data_by_distance_km_target",
      //command: "get_landmarks_by_story_id",
      lat_target:"0.1229113398",
      lng_target:"-65.34121007",
      distance_limit:"1000"
    };

    get_time();
        $.get(appUrl, parameter, function(data) {

            console.log(data);
            get_time();




        })
    });

function get_time(){
  var today = new Date();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  console.log(time);
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
