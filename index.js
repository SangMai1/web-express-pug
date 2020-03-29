var express = require("express");
var app = express();

var port = 3000;
app.get("/", function(req, res){
    res.send("<h1>Hello CodersX</h1>")
});

app.get("/user", function(req, res){
    res.send("user list");
})

app.listen(port, function(){
    console.log("Server listening on port " + port);
})