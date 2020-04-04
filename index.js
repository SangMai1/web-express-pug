require("dotenv").config();

console.log(process.env.NODE_ENV);

var express = require("express");
var bodyParser = require("body-parser");
var shortid = require("shortid");
var cookieParser = require('cookie-parser');

var authRoute = require("./routes/auth.route");
var userRoutes = require("./routes/user.route");
var productRoute = require("./routes/product.route");
var cartRoute = require("./routes/cart.route");

var authMiddleware = require("./middlewares/auth.middlewares");
var seesionMiddleware = require("./middlewares/session.middleware");

var db = require("./db");

var app = express();
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended: true})); // for paesing application /x-www-form-urlencoded
app.use(cookieParser(process.env.NODE_ENV));
app.use(seesionMiddleware);

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
app.use("/products", productRoute);
app.use("/cart", cartRoute);

app.listen(port, function(){
    console.log("Server listening on port " + port);
})