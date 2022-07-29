var appUrl = 'https://script.google.com/macros/s/AKfycbx1bqAa5nG7JA6mt0Xf0Im3CUYFLVtSymiFgpn3/exec';
var sheetsUrl = 'https://docs.google.com/spreadsheets/d/1kzMM_-o1G-rf6eAWLm8HMy6JGfz2HxP05H3TcB_k3Zk/edit#gid=1264616887';
var sheetName = 'landmarks';

parameter = {
    url: sheetsUrl,
    name: sheetName,
    command: "getRecentStories",
};
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
		/*
        $.get(appUrl, parameter, function(data) {

            //            console.log(data);
            data_json = JSON.parse(data);

            for (i in data_json.table) {
                append_stories_list(DivStoriesList, data_json.table[i], 'prepend')
				StoriesDict[data_json.table[i].story_id] = {
					'type':data_json.table[i].types,
					'media_key':data_json.table[i].link.split('v=')[1],
					'link':data_json.table[i].link,
				};

            }


        })
		*/
    });
