var appUrl = 'https://script.google.com/macros/s/AKfycby-gL9w_PIzt4TDnqfpErNP1YTck93p4j7z1FTpt52bCkryg5Iu/exec';
var sheetsUrl = 'https://docs.google.com/spreadsheets/d/1GNvkC8t3xua_ibN2GnnXJi-MXasuX5SXb4y1G6idFSc/edit#gid=1023127248';
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

            //console.log(data);
            data_json = JSON.parse(data);

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
