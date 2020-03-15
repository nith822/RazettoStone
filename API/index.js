let express = require('express')
let bodyParser = require('body-parser')
let mongoose = require('mongoose')

var port = process.env.PORT || 8080;

let app = express();
let apiRoutes = require("./api-routes")

app.get('/', (req, res) => res.send('Welcome to RazettoStone\'s API!'));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
 }));


mongoose.connect('mongodb://127.0.0.1:27017/RazettoStoneTest1', { useNewUrlParser: true});
var db = mongoose.connection;

//doesn't work
if(!db) {
    console.log("Error connecting db");
}	else {
	console.log("Db connected successfully");
}

app.use('/', apiRoutes);

//app.use('/posts', require('./routes/PostController'));

// TODO: error catching 
app.use(function(err,req,res,next){

});

app.listen(port, function () {
     console.log("Running RazettoStone API on port " + port);
});