const express = require('express')
const engine = require('ejs-locals');
const app = express()
const port = 3000
app.use(express.static('./'));
app.engine('ejs', engine);
app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/test', (req, res) => {
  res.render('test')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

//Import the mongoose module
var mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1/my_database';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

var Schema = mongoose.Schema;
var StoryModelSchema = new Schema({
	title: String,
	type: String,
});

var LandmarkModelSchema = new Schema({
	name: String,
});

//compile model from schema
var StoryModel = mongoose.model('StoryModel', StoryModelSchema);
var LandmarkModel = mongoose.model('LandmarkModel', LandmarkModelSchema);

//Create an instance of model StoryModel
var test_story = new StoryModel({name: 'test'})
//Save the new model instance, passing a callback
/*
test_story.save(function(err){
	if(err) return handleError(err);
});
*/
test_story.save();

var query = StoryModel.find({'title':'test'})

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


