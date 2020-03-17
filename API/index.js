let express = require('express')
let bodyParser = require('body-parser')
let mongoose = require('mongoose')

var port = process.env.PORT || 8080;

let app = express();
let userRoutes = require('./users/UserRoutes');

app.get('/', (req, res) => res.send('Welcome to RazettoStone\'s API!'));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
 }));


mongoose.connect('mongodb://127.0.0.1:27017/RazettoStoneTest1', { useNewUrlParser: true});
var db = mongoose.connection;

if(!db) {
	throw new Error("Can't connect to db");
	process.exit(1);
}	else {
	console.log("Db connected successfully");
}

app.use('/users', userRoutes);

let postRoutes = require('./posts/PostRoutes');
app.use('/posts', postRoutes);

// TODO: error catching 
app.use(function(err,req,res,next){

});

app.listen(port, function () {
     console.log("Running RazettoStone API on port " + port);
});