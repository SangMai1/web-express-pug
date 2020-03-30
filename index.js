var express = require("express");
var bodyParser = require("body-parser");
var shortid = require("shortid");

var userRoutes = require("./routes/user.route");
var db = require("./db");

var app = express();
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended: true})); // for paesing application /x-www-form-urlencoded

app.use(express.static('public'));

app.set('view engine', 'pug');
app.set('views', './views')

var port = 3000;
app.get("/", function(req, res){
    res.render("index"), {
        name: "AAA"
    };
});


app.use("/users", userRoutes);
app.listen(port, function(){
    console.log("Server listening on port " + port);
})