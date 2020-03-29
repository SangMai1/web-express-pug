var express = require("express");
var app = express();

app.set('view engine', 'pug');
app.set('views', './views')

var port = 3000;
app.get("/", function(req, res){
    res.render("index"), {
        name: "AAA"
    };
});

app.get("/users", function(req, res){
    res.render("users/index", {
        users: [
            {id: 1, name: "Thinh"},
            {id: 2, name: "Hung"}
        ]
    })
})

app.listen(port, function(){
    console.log("Server listening on port " + port);
})