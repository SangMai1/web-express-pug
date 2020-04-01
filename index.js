var express = require("express");
var bodyParser = require("body-parser");
var shortid = require("shortid");
var cookieParser = require('cookie-parser');

var authRoute = require("./routes/auth.route");
var userRoutes = require("./routes/user.route");

var authMiddleware = require("./middlewares/auth.middlewares");
var db = require("./db");

var app = express();
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended: true})); // for paesing application /x-www-form-urlencoded
app.use(cookieParser());

app.use(express.static('public'));

app.set('view engine', 'pug');
app.set('views', './views')

var port = 3000;
app.get("/", function(req, res){
    res.render("index"), {
        name: "AAA"
    };
});


app.use("/users", authMiddleware.requireAuth, userRoutes);
app.use("/auth", authRoute);
app.listen(port, function(){
    console.log("Server listening on port " + port);
})