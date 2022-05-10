var appUrl = 'https://script.google.com/macros/s/AKfycby-gL9w_PIzt4TDnqfpErNP1YTck93p4j7z1FTpt52bCkryg5Iu/exec';
var sheetsUrl = 'https://docs.google.com/spreadsheets/d/1GNvkC8t3xua_ibN2GnnXJi-MXasuX5SXb4y1G6idFSc/edit#gid=1023127248';
//https://docs.google.com/spreadsheets/d/1GNvkC8t3xua_ibN2GnnXJi-MXasuX5SXb4y1G6idFSc/edit?usp=sharing
var sheetName = 'landmarks';

StoriesDict = {}
$(document).ready(

    function() {

        const i18n = new VueI18n({
            locale: 'en',
            messages,
        })
        new Vue({
            i18n
        }).$mount('#dropdown')

		var parameter = {
			url: sheetsUrl,
			name: sheetName,
			command: "getRecentStories",
		};
        $.get(appUrl, parameter, function(data) {

            console.log(data);
            data_json = JSON.parse(data);
            $('#TagList ul').append("<b>authors</b>");
            for (i in data_json.table_authors){
              //console.log(data_json.table_authors[i].tag);
              $('#TagList ul').append('<li>@<a href=\"javascript:getStoriesByAuthor(\'' + data_json.table_authors[i].tag +'\')\">'+ data_json.table_authors[i].tag +'</a></li>')
            }
            for (i in data_json.table_tags){
              if(i == 0){
                $('#TagList ul').append("<b>tags</b>");
              }else {
                $('#TagList ul').append('<li>#<a href=\"javascript:getStoriesByTag(\'' + data_json.table_tags[i] +'\')\">'+ data_json.table_tags[i] +'</a></li>')
              }
            }
            for (i in data_json.table) {
                appendStoriesList(DivStoriesList, data_json.table[i], 'prepend')
                switch(data_json.table[i].types){
                  case 'podcast':
                    StoriesDict[data_json.table[i].story_id] = {
                        'type': data_json.table[i].types,
                        'media_key': data_json.table[i].link,
                        'link': data_json.table[i].link,
                    };
                    break;
                  case 'youtube':
                    StoriesDict[data_json.table[i].story_id] = {
                        'type': data_json.table[i].types,
                        'media_key': data_json.table[i].link.split('v=')[1],
                        'link': data_json.table[i].link,
                    };
                    break;
                    default:
                    StoriesDict[data_json.table[i].story_id] = {
                        'type': data_json.table[i].types,
                        'media_key': data_json.table[i].link,
                        'link': data_json.table[i].link,
                    };
                }

            }


        })
    });







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
