var landmark_name = 0;
var landmark_tags = 1;
var landmark_address = 2;
var landmark_notes = 3;
var landmark_contributor = 4;
var landmark_lat_lng = 5;
var landmark_is_delete = 6;
var landmark_story_id = 7;
var landmark_link = 8;
var landmark_landmark_id = 9;
var landmark_update_timestamp = 10;



var story_title = 0;
var story_story_id = 1;
var story_type_ = 2;
var story_link = 3;
var story_author = 4;
var story_tags = 5;
var story_gpstory = 6;
var story_update_timestamp = 7;
var story_is_delete = 8;


var tags_tag = 0;
var tags_story_id = 1;

function doGet(e) {
    var params = e.parameter;
    var command = params.command;
    var story_id = params.story_id;
    var lat_south = params.lat_south;
    var lat_north = params.lat_north;
    var lng_west = params.lng_west;
    var lng_east = params.lng_east;
    var url = params.url;
    var name = params.name;
    var type_ = params.type_;
    var link = params.link;
    var tag = params.tag;
    var author = params.author;
    var landmarks = params.landmarks;
    var query_year = params.year;
    var query_month = params.month;
    var query_date = params.date;
    var keyword = params.keyword;
    var startRow = 1;
    var startColumn = 1;
    var endRow = (!params.endRow) ? 1 : params.endRow; // 如果沒有 endRow，就讓 endRow=1
    var endColumn = (!params.endRow) ? 1 : params.endColumn; // 如果沒有 endColumn，就讓 endColumn=1
    var SpreadSheet = SpreadsheetApp.openByUrl(url);

    switch (command) {
        case ('get_story_and_landmarks_by_story_id'):

            var output_str = '';
            var output_data = {};
            // story
            var SheetName_stories = SpreadSheet.getSheetByName('stories');
            var SheetName_sql = SpreadSheet.getSheetByName('sql');
            SheetName_sql.activate();
            var formulaToUse = "=QUERY(stories!A:I, \"select * where B = " + story_id + "\")";
            SheetName_sql.getActiveRange().setFormula(formulaToUse);
            //
            var LastColumn_Sheet_sql = SheetName_sql.getLastColumn();
            var LastRow_Sheet_sql = SheetName_sql.getLastRow();
            var data = SheetName_sql.getSheetValues(startRow, startColumn, LastRow_Sheet_sql, LastColumn_Sheet_sql);
            output_data['story'] = data;

            // landmarks
            var SheetName_landmarks = SpreadSheet.getSheetByName('landmarks');
            var SheetName_sql = SpreadSheet.getSheetByName('sql');
            SheetName_sql.activate();
            var formulaToUse = "=QUERY(landmarks!A:K, \"select * where H = " + story_id + "\")";
            SheetName_sql.getActiveRange().setFormula(formulaToUse);
            //
            var LastColumn_Sheet_sql = SheetName_sql.getLastColumn();
            var LastRow_Sheet_sql = SheetName_sql.getLastRow();
            var data = SheetName_sql.getSheetValues(startRow, startColumn, LastRow_Sheet_sql, LastColumn_Sheet_sql);
            output_data['landmarks'] = data;
            //
            output_str = JSON.stringify(output_data);
            Logger.log(output_str);
            return ContentService.createTextOutput(output_str);
            break;
        case ('sql_get_stories_deleted'):
            //"=QUERY(stories!2:10, "select A,B where B < 125")"
            var output_str = '';
            var SheetName_stories = SpreadSheet.getSheetByName('stories');
            var SheetName_sql = SpreadSheet.getSheetByName('sql');
            SheetName_sql.activate();
            var formulaToUse = "=QUERY(stories!A:I, \"select * where I = 1\")";
            SheetName_sql.getActiveRange().setFormula(formulaToUse);
            //
            var LastColumn_Sheet_sql = SheetName_sql.getLastColumn();
            var LastRow_Sheet_sql = SheetName_sql.getLastRow();
            var data = SheetName_sql.getSheetValues(startRow, startColumn, LastRow_Sheet_sql, LastColumn_Sheet_sql);
            output_str = JSON.stringify(data);
            Logger.log(output_str);
            return ContentService.createTextOutput(output_str);
            break;
        case ('sql_get_stories_by_keyword'):
            //"=QUERY(stories!2:10, "select A,B where B < 125")"
            var output_str = '';
            var SheetName_stories = SpreadSheet.getSheetByName('stories');
            var SheetName_sql = SpreadSheet.getSheetByName('sql');
            SheetName_sql.activate();
            var formulaToUse = "=QUERY(stories!A:I, \"select * where A contains '" + keyword + "' and I != 0\")";
            SheetName_sql.getActiveRange().setFormula(formulaToUse);
            //
            var LastColumn_Sheet_sql = SheetName_sql.getLastColumn();
            var LastRow_Sheet_sql = SheetName_sql.getLastRow();
            var data = SheetName_sql.getSheetValues(startRow, startColumn, LastRow_Sheet_sql, LastColumn_Sheet_sql);
            output_str = JSON.stringify(data);
            Logger.log(output_str);
            return ContentService.createTextOutput(output_str);
            break;
        case ('sql_get_stories_by_author'):
            //"=QUERY(stories!2:10, "select A,B where B < 125")"
            var output_str = '';
            var SheetName_stories = SpreadSheet.getSheetByName('stories');
            var SheetName_sql = SpreadSheet.getSheetByName('sql');
            SheetName_sql.activate();
            var formulaToUse = "=QUERY(stories!A:E, \"select * where E = '" + author + "'\")";
            SheetName_sql.getActiveRange().setFormula(formulaToUse);
            //
            var LastColumn_Sheet_sql = SheetName_sql.getLastColumn();
            var LastRow_Sheet_sql = SheetName_sql.getLastRow();
            var data = SheetName_sql.getSheetValues(startRow, startColumn, LastRow_Sheet_sql, LastColumn_Sheet_sql);
            output_str = JSON.stringify(data);
            Logger.log(output_str);
            return ContentService.createTextOutput(output_str);
            break;
        case ('sql_get_stories_by_tag'):
            //"=QUERY(stories!2:10, "select A,B where B < 125")"
            var output_str = '';
            //var SheetName_stories = SpreadSheet.getSheetByName('stories');
            var SheetName_sql = SpreadSheet.getSheetByName('sql');
            SheetName_sql.activate();
            var formulaToUse = "=QUERY(stories!A:I, \"select * where F = '" + tag + "'\")";
            SheetName_sql.getActiveRange().setFormula(formulaToUse);
            //
            var LastColumn_Sheet_sql = SheetName_sql.getLastColumn();
            var LastRow_Sheet_sql = SheetName_sql.getLastRow();
            var data = SheetName_sql.getSheetValues(startRow, startColumn, LastRow_Sheet_sql, LastColumn_Sheet_sql);
            output_str = JSON.stringify(data);
            Logger.log(output_str);
            return ContentService.createTextOutput(output_str);
            break;
        case ('getGPSByZone'):
            var SheetName = SpreadSheet.getSheetByName('landmarks');

            var LastRow_Sheet = SheetName.getLastRow();
            var LastColumn_Sheet = SheetName.getLastColumn();
            var data = SheetName.getSheetValues(startRow, startColumn, LastRow_Sheet, LastColumn_Sheet);

            var SheetName_stories = SpreadSheet.getSheetByName('stories');
            var LastRow_stories = SheetName_stories.getLastRow();
            var LastColumn_stories = SheetName_stories.getLastColumn();
            var data_stories = SheetName_stories.getSheetValues(1, 1, LastRow_stories, LastColumn_stories);

            var header = data[0];
            output = {};
            output['table'] = [];
            var story_id_list = [];
            for (var iRow = 1; iRow < LastRow_Sheet; iRow++) {
                if (data[iRow][story_is_delete] != 1) {
                    reg = {};
                    /*
                    Logger.log(data[iRow]);
                    Logger.log(lat_south);
                    Logger.log(lat_north);
                    Logger.log(lng_west);
                    Logger.log(lng_east);
                    Logger.log('current:'+data[iRow][5]+','+data[iRow][6])
                    */
                    var lat_reg = data[iRow][5].split(',')[0];
                    var lng_reg = data[iRow][5].split(',')[1];
                    if (lat_reg > lat_south & lat_reg < lat_north & lng_reg > lng_west & lng_reg < lng_east) {

                        for (var iCol = 0; iCol < LastColumn_Sheet; iCol++) {

                            reg[header[iCol]] = data[iRow][iCol];
                            if (header[iCol] == 'story_id') {
                                if (!story_id_list.includes(data[iRow][iCol])) {
                                    story_id_list.push(data[iRow][iCol]);
                                }
                            }

                        }

                        output['table'].push(reg);
                    }
                }
            }
            output['table_stories'] = {};
            for (var iRow = 1; iRow < LastRow_stories; iRow++) {

                if (story_id_list.includes(data_stories[iRow][1])) {
                    //output['table_stories'].push(data_stories[iRow][0]);
                    output['table_stories'][data_stories[iRow][1]] = data_stories[iRow][0];
                }
            }

            output_str = JSON.stringify(output);
            Logger.log(output_str);
            return ContentService.createTextOutput(output_str); // 將資料透過 ContentService 拋出
            break;
        case ('getRecentStories'):
            var SheetName = SpreadSheet.getSheetByName('stories');
            var LastRow_Sheet = SheetName.getLastRow();
            var LastColumn_Sheet = SheetName.getLastColumn();
            var data = SheetName.getSheetValues(startRow, startColumn, LastRow_Sheet, LastColumn_Sheet);
            var header = data[0];
            output = {};
            output['table'] = [];
            output['table_authors'] = [];
            for (var iRow = LastRow_Sheet - 20; iRow < LastRow_Sheet; iRow++) {
                if (data[iRow][story_is_delete] != 1) {
                    reg = {};

                    for (var iCol = 0; iCol < LastColumn_Sheet; iCol++) {
                        reg[header[iCol]] = data[iRow][iCol];
                    }
                    output['table'].push(reg);
                }
            }
            var SheetName_authors = SpreadSheet.getSheetByName('authors');
            var LastRow_Sheet_authors = SheetName_authors.getLastRow();
            var LastColumn_Sheet_authors = SheetName_authors.getLastColumn();
            var data_authors = SheetName_authors.getSheetValues(startRow, startColumn, LastRow_Sheet_authors, LastColumn_Sheet_authors);
            output['table_authors'] = [];
            for (var iRow = 1; iRow < LastRow_Sheet_authors; iRow++) {
                reg = {};
                reg['tag'] = data_authors[iRow][0];
                output['table_authors'].push(reg);
            }
            //=UNIQUE(QUERY(tags!A:A, "select * "))
            // tags
            var output_str = '';
            //var SheetName_tags = SpreadSheet.getSheetByName('tags');
            var SheetName_sql = SpreadSheet.getSheetByName('sql');
            SheetName_sql.activate();
            var formulaToUse = "=UNIQUE(QUERY(tags!A:A, \"select * \"))";
            SheetName_sql.getActiveRange().setFormula(formulaToUse);
            //
            var LastColumn_Sheet_sql = SheetName_sql.getLastColumn();
            var LastRow_Sheet_sql = SheetName_sql.getLastRow();
            var data = SheetName_sql.getSheetValues(startRow, startColumn, LastRow_Sheet_sql, LastColumn_Sheet_sql);
            output['table_tags'] = data;

            //end of query tags
            output_str = JSON.stringify(output);
            Logger.log(output_str);
            return ContentService.createTextOutput(output_str); // 將資料透過 ContentService 拋出
            break;
        case ('get_landmarks_by_story_id'):
            var SheetName = SpreadSheet.getSheetByName('landmarks');

            var LastRow_Sheet = SheetName.getLastRow();
            var LastColumn_Sheet = SheetName.getLastColumn();
            var data = SheetName.getSheetValues(startRow, startColumn, LastRow_Sheet, LastColumn_Sheet);
            var header = data[0];
            output = {};
            output['table'] = [];
            for (var iRow = 1; iRow < LastRow_Sheet; iRow++) {
                reg = {};
                if (data[iRow][landmark_story_id] == story_id & data[iRow][landmark_is_delete] != '1' /*story_id == 1data[iRow][8]*/ ) {
                    //for(var iCol=0;iCol<LastColumn_Sheet;iCol++){
                    /*
                    var landmark_name = 0;
                    var landmark_tags = 1;
                    var landmark_address = 2;
                    var landmark_notes = 3;
                    var landmark_contributor = 4;
                    var landmark_lat_lng = 5;
                    var landmark_story_id = 7;
                    var landmark_link = 8;
                    var landmark_landmark_id = 9;
                    var landmark_update_timestamp = 10;
                    */
                    iCol = landmark_name;
                    reg[header[iCol]] = data[iRow][iCol];
                    iCol = landmark_tags;
                    reg[header[iCol]] = data[iRow][iCol];
                    iCol = landmark_address;
                    reg[header[iCol]] = data[iRow][iCol];
                    iCol = landmark_notes;
                    reg[header[iCol]] = data[iRow][iCol];
                    iCol = landmark_contributor;
                    reg[header[iCol]] = data[iRow][iCol];
                    iCol = landmark_lat_lng;
                    reg['lat'] = data[iRow][iCol].split(',')[0];
                    reg['lng'] = data[iRow][iCol].split(',')[1];
                    //reg[header[iCol]] = data[iRow][iCol];
                    //iCol = 6;
                    //reg[header[iCol]] = data[iRow][iCol];
                    iCol = landmark_link;
                    reg[header[iCol]] = data[iRow][iCol];
                    iCol = landmark_landmark_id;
                    reg[header[iCol]] = data[iRow][iCol];
                    iCol = landmark_update_timestamp;
                    reg[header[iCol]] = data[iRow][iCol];
                } else {
                    continue;
                }
                //}
                output['table'].push(reg);
            }
            output_str = JSON.stringify(output);
            Logger.log(output_str);
            return ContentService.createTextOutput(output_str); // 將資料透過 ContentService 拋出
            break;

        case ('getAllLandmarks'):
            var SheetName = SpreadSheet.getSheetByName('landmarks');

            var LastRow_Sheet = SheetName.getLastRow();
            var LastColumn_Sheet = SheetName.getLastColumn();
            var data = SheetName.getSheetValues(startRow, startColumn, LastRow_Sheet, LastColumn_Sheet);
            var header = data[0];
            output = {};
            output['table'] = [];
            for (var iRow = 1; iRow < LastRow_Sheet; iRow++) {
                reg = {};
                //for(var iCol=0;iCol<LastColumn_Sheet;iCol++){
                iCol = landmark_name;
                reg[header[iCol]] = data[iRow][iCol];
                iCol = landmark_story_id;
                reg[header[iCol]] = data[iRow][iCol];
                iCol = landmark_link;
                reg[header[iCol]] = data[iRow][iCol];
                //}
                output['table'].push(reg);
            }
            output_str = JSON.stringify(output);
            Logger.log(output_str);
            return ContentService.createTextOutput(output_str); // 將資料透過 ContentService 拋出
            break;
    }

}


function doPost(e) {
    var params = e.parameter;
    var command = params.command;
    var story_id = params.story_id;
    var lat = params.lat;
    var lng = params.lng;
    var lat_south = params.lat_south;
    var lat_north = params.lat_north;
    var lng_west = params.lng_west;
    var lng_east = params.lng_east;
    var url = params.url;
    var name = params.name;
    var type_ = params.type_;
    var link = params.link;
    var author = params.author;
    var tags = params.tags;
    var landmarks_str = params.landmarks;
    var landmarks_new_str = params.landmarks_new;
    var landmarks_to_update_str = params.landmarks_to_update;
    var query_year = params.year;
    var query_month = params.month;
    var query_date = params.date;    
    var gpstory = params.gpstory;
    var update_timestamp = params.update_timestamp;
    var is_delete = params.is_delete;
    var startRow = 1;
    var startColumn = 1;
    var endRow = (!params.endRow) ? 1 : params.endRow; // 如果沒有 endRow，就讓 endRow=1
    var endColumn = (!params.endRow) ? 1 : params.endColumn; // 如果沒有 endColumn，就讓 endColumn=1
    var SpreadSheet = SpreadsheetApp.openByUrl(url);
    var landmarks;
    var landmarks_new;
    var landmarks_to_update;

    if (typeof(landmarks_str) == 'undefined') landmarks = {};
    else landmarks = JSON.parse(landmarks_str);

    if (typeof(landmarks_new_str) == 'undefined' ) landmarks_new = {};
    else landmarks_new = JSON.parse(landmarks_new_str);

    if (typeof(landmarks_to_update_str) == 'undefined') landmarks_to_update = {};
    else landmarks_to_update = JSON.parse(landmarks_to_update_str);


    //output_str = JSON.stringify(params);
    /*
    var story_title = 0;
    var story_story_id = 1;
    var story_type_ = 2;
    var story_link = 3;
    var story_author = 4;
    var story_tags = 5;
    var story_gpstory = 6;
    var story_update_timestamp = 7;
    */
    /*
    var landmark_name = 0;
    var landmark_tags = 1;
    var landmark_address = 2;
    var landmark_notes = 3;
    var landmark_contributor = 4;
    var landmark_lat_lng = 5;
    var landmark_story_id = 7;
    var landmark_link = 8;
    var landmark_landmark_id = 9;
    var landmark_update_timestamp = 10;
    //
    var tags_tag = 0;
    var tags_story_id = 1;
    */
    switch (command) {
        case ('update_story_landmarks'):

            // update stories
            var SheetName_stories = SpreadSheet.getSheetByName('stories');
            var LastRow_stories = SheetName_stories.getLastRow();
            var LastCol_stories = SheetName_stories.getLastColumn();
            var SheetName_landmarks = SpreadSheet.getSheetByName('landmarks');
            var LastRow_landmarks = SheetName_landmarks.getLastRow();
            var LastCol_landmarks = SheetName_landmarks.getLastColumn();
            var data = SheetName_stories.getSheetValues(startRow, startColumn, LastRow_stories, LastCol_stories);
            var data_landmarks = SheetName_landmarks.getSheetValues(startRow, startColumn, LastRow_landmarks, LastCol_landmarks);

            for (var iRow = 0; iRow < LastRow_stories; iRow++) {
                if (data[iRow][story_story_id] == story_id) {
                    SheetName_stories.getRange(iRow + 1, story_title + 1).setValue(name);
                    SheetName_stories.getRange(iRow + 1, story_story_id + 1).setValue(story_id);
                    SheetName_stories.getRange(iRow + 1, story_type_ + 1).setValue(type_);
                    SheetName_stories.getRange(iRow + 1, story_link + 1).setValue(link);
                    SheetName_stories.getRange(iRow + 1, story_author + 1).setValue(author);
                    SheetName_stories.getRange(iRow + 1, story_tags + 1).setValue(tags);
                    SheetName_stories.getRange(iRow + 1, story_gpstory + 1).setValue(gpstory);
                    SheetName_stories.getRange(iRow + 1, story_update_timestamp + 1).setValue(update_timestamp);
                    SheetName_stories.getRange(iRow + 1, story_is_delete + 1).setValue(is_delete);
                }
            }
            // update landmarks
            for (var iRow = 0; iRow < LastRow_landmarks; iRow++) {
                if (data_landmarks[iRow][landmark_landmark_id] in landmarks_to_update) {
                    SheetName_landmarks.getRange(iRow + 1, landmark_name + 1).setValue(landmarks_to_update[data_landmarks[iRow][landmark_landmark_id]].name);
                    SheetName_landmarks.getRange(iRow + 1, landmark_tags + 1).setValue(landmarks_to_update[data_landmarks[iRow][landmark_landmark_id]].tags);
                    SheetName_landmarks.getRange(iRow + 1, landmark_address + 1).setValue(landmarks_to_update[data_landmarks[iRow][landmark_landmark_id]].address);
                    SheetName_landmarks.getRange(iRow + 1, landmark_notes + 1).setValue(landmarks_to_update[data_landmarks[iRow][landmark_landmark_id]].notes);
                    //SheetName_landmarks.getRange(iRow + 1, landmark_contributor + 1).setValue(landmarks_to_update[data_landmarks[iRow][landmark_landmark_id]].tags);
                    SheetName_landmarks.getRange(iRow + 1, landmark_lat_lng + 1).setValue(landmarks_to_update[data_landmarks[iRow][landmark_landmark_id]].lat_lng);
                    SheetName_landmarks.getRange(iRow + 1, landmark_story_id + 1).setValue(story_id);
                    var mm = parseInt(landmarks_to_update[data_landmarks[iRow][landmark_landmark_id]].link.split(':')[0]);
                    var nn = parseInt(landmarks_to_update[data_landmarks[iRow][landmark_landmark_id]].link.split(':')[1]);
                    var ss = mm * 60 + nn;
                    SheetName_landmarks.getRange(iRow + 1, landmark_link + 1).setValue(ss);
                    SheetName_landmarks.getRange(iRow + 1, landmark_is_delete + 1).setValue(landmarks_to_update[data_landmarks[iRow][landmark_landmark_id]].is_delete);
                    SheetName_landmarks.getRange(iRow + 1, landmark_update_timestamp + 1).setValue(landmarks_to_update[data_landmarks[iRow][landmark_landmark_id]].update_timestamp);
                }
            }
            // new landmarks
            var latest_landmark_id = SheetName_landmarks.getRange(LastRow_landmarks, landmark_landmark_id + 1).getValue();
            var curr_landmark_row = LastRow_landmarks;
            var output_str = '';
            for (var i in landmarks_new) {
                latest_landmark_id += 1;
                curr_landmark_row += 1;
                SheetName_landmarks.getRange(curr_landmark_row, landmark_name + 1).setValue(landmarks_new[i].name);
                SheetName_landmarks.getRange(curr_landmark_row, landmark_tags + 1).setValue(landmarks_new[i].tags);
                SheetName_landmarks.getRange(curr_landmark_row, landmark_address + 1).setValue(landmarks_new[i].address);
                SheetName_landmarks.getRange(curr_landmark_row, landmark_notes + 1).setValue(landmarks_new[i].notes);
                SheetName_landmarks.getRange(curr_landmark_row, landmark_lat_lng + 1).setValue(landmarks_new[i].lat_lng.replace(' ', ''));
                SheetName_landmarks.getRange(curr_landmark_row, landmark_story_id + 1).setValue(story_id);
                SheetName_landmarks.getRange(curr_landmark_row, landmark_landmark_id + 1).setValue(latest_landmark_id);
                var mm = parseInt(landmarks_new[i].link.split(':')[0]);
                var nn = parseInt(landmarks_new[i].link.split(':')[1]);
                var ss = mm * 60 + nn;
                SheetName_landmarks.getRange(curr_landmark_row, landmark_link + 1).setValue(ss);
                SheetName_landmarks.getRange(curr_landmark_row, landmark_is_delete + 1).setValue(landmarks_new[i].is_delete);
                output_str += landmarks_new[i].name;
                output_str += '';
            }


            // tags


            var SheetName_tags = SpreadSheet.getSheetByName('tags');
            var LastRow_tags = SheetName_tags.getLastRow();
            var LastCol_tags = SheetName_tags.getLastColumn();
            var curr_tag_row = LastRow_tags;
            var data_tags = SheetName_tags.getSheetValues(startRow, startColumn, LastRow_tags, LastCol_tags);
            var all_tags = [];
            for (var i = 0; i < LastRow_tags; i++) {
                all_tags.push(data_tags[i][0]);
            }
            var curr_tag_row = LastRow_tags;
            tags_set = tags.split(',')
            if (tags_set.length == 1 & tags_set[0] == '') {
                // do nothing
            } else {
                for (var i in tags_set) {
                    if (all_tags.includes(tags_set[i])) {
                        //do nothing
                    } else {
                        curr_tag_row += 1;
                        SheetName_tags.getRange(curr_tag_row, tags_tag + 1).setValue(tags_set[i].trim());
                        //SheetName_tags.getRange(curr_tag_row, tags_story_id + 1).setValue(new_story_id);
                    }
                }
            }
            /*
                       // landmarks
                       var latest_landmark_id = SheetName_landmarks.getRange(LastRow_landmarks, landmark_landmark_id + 1).getValue();

                       var curr_landmark_row = LastRow_landmarks;
                       var output_str = '';
                       for (var i in landmarks) {
                           latest_landmark_id += 1;
                           curr_landmark_row += 1;
                           SheetName_landmarks.getRange(curr_landmark_row, landmark_name + 1).setValue(landmarks[i].name);
                           SheetName_landmarks.getRange(curr_landmark_row, landmark_tags + 1).setValue(landmarks[i].tags);
                           SheetName_landmarks.getRange(curr_landmark_row, landmark_address + 1).setValue(landmarks[i].address);
                           SheetName_landmarks.getRange(curr_landmark_row, landmark_notes + 1).setValue(landmarks[i].notes);
                           SheetName_landmarks.getRange(curr_landmark_row, landmark_lat_lng + 1).setValue(landmarks[i].lat_lng.replace(' ', ''));
                           SheetName_landmarks.getRange(curr_landmark_row, landmark_story_id + 1).setValue(new_story_id);
                           SheetName_landmarks.getRange(curr_landmark_row, landmark_landmark_id + 1).setValue(latest_landmark_id);
                           var mm = parseInt(landmarks[i].link.split(':')[0]);
                           var nn = parseInt(landmarks[i].link.split(':')[1]);
                           var ss = mm * 60 + nn;
                           SheetName_landmarks.getRange(curr_landmark_row, landmark_link + 1).setValue(ss);
                           output_str += landmarks[i].name;
                           output_str += '';
                       }*/

            //SheetName_landmarks.getRange(LastRow_landmarks+1, 1).setValue('forfun test 2');  

            return ContentService.createTextOutput('upload done');
            break;
        case ('new_story'):        
            // stories
            var SheetName_stories = SpreadSheet.getSheetByName('stories');
            var LastRow_stories = SheetName_stories.getLastRow();
            var new_story_id = SheetName_stories.getRange(LastRow_stories, 2).getValue() + 1;
            var SheetName_landmarks = SpreadSheet.getSheetByName('landmarks');
            var LastRow_landmarks = SheetName_landmarks.getLastRow();
            SheetName_stories.getRange(LastRow_stories + 1, story_title + 1).setValue(name);
            SheetName_stories.getRange(LastRow_stories + 1, story_story_id + 1).setValue(new_story_id);
            SheetName_stories.getRange(LastRow_stories + 1, story_type_ + 1).setValue(type_);
            SheetName_stories.getRange(LastRow_stories + 1, story_link + 1).setValue(link);
            SheetName_stories.getRange(LastRow_stories + 1, story_author + 1).setValue(author);
            SheetName_stories.getRange(LastRow_stories + 1, story_tags + 1).setValue(tags);
            // tags

            var SheetName_tags = SpreadSheet.getSheetByName('tags');
            var LastRow_tags = SheetName_tags.getLastRow();
            var LastCol_tags = SheetName_tags.getLastColumn();
            //var new_story_id = SheetName_stories.getRange(LastRow_stories, 2).getValue() + 1;
            //var SheetName_landmarks = SpreadSheet.getSheetByName('landmarks');
            var data_tags = SheetName_tags.getSheetValues(startRow, startColumn, LastRow_tags, LastCol_tags);
            var all_tags = [];
            for (var i = 0; i < LastRow_tags; i++) {
                all_tags.push(data_tags[i][0]);
            }
            var curr_tag_row = LastRow_tags;
            tags_set = tags.split(',')
            if (tags_set.length == 1 & tags_set[0] == '') {
                // do nothing
            } else {
                for (var i in tags_set) {
                    if (all_tags.includes(tags_set[i])) {
                        //do nothing
                    } else {
                        curr_tag_row += 1;
                        SheetName_tags.getRange(curr_tag_row, tags_tag + 1).setValue(tags_set[i].trim());
                        //SheetName_tags.getRange(curr_tag_row, tags_story_id + 1).setValue(new_story_id);
                    }
                }
            }

            // authors
            var SheetName_authors = SpreadSheet.getSheetByName('authors');
            var LastRow_authors = SheetName_authors.getLastRow();
            var LastCol_authors = SheetName_authors.getLastColumn();
            //var new_story_id = SheetName_stories.getRange(LastRow_stories, 2).getValue() + 1;
            //var SheetName_landmarks = SpreadSheet.getSheetByName('landmarks');
            var data_authors = SheetName_authors.getSheetValues(startRow, startColumn, LastRow_authors, LastCol_authors);
            var all_authors = [];
            for (var i = 0; i < LastRow_authors; i++) {
                all_authors.push(data_authors[i][0]);
            }
            var curr_author_row = LastRow_authors;
            
        if (all_authors.includes(author)) {
          //do nothing
        } else {
          curr_author_row += 1;
          SheetName_authors.getRange(curr_author_row, 1).setValue(author.trim());
          //SheetName_tags.getRange(curr_tag_row, tags_story_id + 1).setValue(new_story_id);
        }
            
            // landmarks
            var latest_landmark_id = SheetName_landmarks.getRange(LastRow_landmarks, landmark_landmark_id + 1).getValue();

            var curr_landmark_row = LastRow_landmarks;
            var output_str = '';
            for (var i in landmarks) {
                latest_landmark_id += 1;
                curr_landmark_row += 1;
                SheetName_landmarks.getRange(curr_landmark_row, landmark_name + 1).setValue(landmarks[i].name);
                SheetName_landmarks.getRange(curr_landmark_row, landmark_tags + 1).setValue(landmarks[i].tags);
                SheetName_landmarks.getRange(curr_landmark_row, landmark_address + 1).setValue(landmarks[i].address);
                SheetName_landmarks.getRange(curr_landmark_row, landmark_notes + 1).setValue(landmarks[i].notes);
                SheetName_landmarks.getRange(curr_landmark_row, landmark_lat_lng + 1).setValue(landmarks[i].lat_lng.replace(' ', ''));
                SheetName_landmarks.getRange(curr_landmark_row, landmark_story_id + 1).setValue(new_story_id);
                SheetName_landmarks.getRange(curr_landmark_row, landmark_landmark_id + 1).setValue(latest_landmark_id);
                var mm = parseInt(landmarks[i].link.split(':')[0]);
                var nn = parseInt(landmarks[i].link.split(':')[1]);
                var ss = mm * 60 + nn;
                SheetName_landmarks.getRange(curr_landmark_row, landmark_link + 1).setValue(ss);
                output_str += landmarks[i].name;
                output_str += '';
            }

            //SheetName_landmarks.getRange(LastRow_landmarks+1, 1).setValue('forfun test 2');  

            return ContentService.createTextOutput(new_story_id);
            break;
        case ('new_landmark'):
            var SheetName = SpreadSheet.getSheetByName('landmarks');
            var LastRow = SheetName.getLastRow();
            SheetName.getRange(LastRow + 1, 1).setValue(name);

            //SheetName.getRange(LastRow+1, FILES_TYPE+1).setValue("md");
            /*
             Sheet.getRange(LastRow+1, FILES_MODE+1).setValue("0");
            Sheet.getRange(LastRow+1, FILES_FOLDERID+1).setValue(FolderID);
            Sheet.getRange(LastRow+1, FILES_USERID+1).setValue(uid);
            var lastFileID = Sheet.getRange(LastRow, 6, 1, 1).getValues();
            Sheet.getRange(LastRow+1, FILES_FILEID+1).setValue(parseInt(lastFileID)+1);
            Sheet.getRange(LastRow+1, FILES_DRAFT+1).setValue(in_draft);
            Sheet.getRange(LastRow+1, FILES_PUBLIC+1).setValue(in_public);
             Sheet.getRange(LastRow+1, FILES_STAR+1).setValue(is_star);
             Sheet.getRange(LastRow+1, FILES_SMALLIMG+1).setValue(smallimg);
             Sheet_blog.getRange(LastRow_blog+1, BLOGS_CONTENT+1).setValue(content);
             Sheet_blog.getRange(LastRow_blog+1, BLOGS_FILEID+1).setValue(parseInt(lastFileID)+1);
             */

            return ContentService.createTextOutput("test");
            break;
            /*
    case ('blog_update'):
      for(var i=0;i<LastRow_blog;i++){
        if(data_blog[i][BLOGS_FILEID]==FileID){
          Sheet_blog.getRange(i+1, BLOGS_CONTENT+1).setValue(content);
          
        }
      }
      for(var i=0;i<LastRow;i++){
        if(data[i][FILES_FILEID]==FileID){
          Sheet.getRange(i+1, FILES_FILENAME+1).setValue(filename);
          Sheet.getRange(i+1, FILES_FOLDERID+1).setValue(FolderID);
          Sheet.getRange(i+1, FILES_DRAFT+1).setValue(in_draft);
          Sheet.getRange(i+1, FILES_PUBLIC+1).setValue(in_public);
          Sheet.getRange(i+1, FILES_STAR+1).setValue(is_star);
          Sheet.getRange(i+1, FILES_USERID+1).setValue(uid);
          Sheet.getRange(i+1, FILES_SMALLIMG+1).setValue(smallimg);
        }
      }
      return  ContentService.createTextOutput(true);
      
      
      break;     
      */
    }


}