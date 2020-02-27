let express = require('express')
let bodyParser = require('body-parser');

var port = process.env.PORT || 8080;

let app = express();
let apiRoutes = require("./api-routes")

//app.get('/', (req, res) => res.send('Welcome to RazettoStone\'s API!'));
app.use('/', apiRoutes)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
 }));

app.listen(port, function () {
     console.log("Running RazettoStone API on port " + port);
});