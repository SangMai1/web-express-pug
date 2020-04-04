var db = require("../db");
var shortid = require("shortid");

module.exports.index = function (req, res) {
    res.render("users/index", {
        users: db.get("users").value()
    });
};

module.exports.search = function (req, res) {
    var q = req.query.q;
    var matchedUsers = db.get("users").value().filter(function (user) {
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    })
    res.render("users/index", {
        users: matchedUsers,
        question: q
    });
};

module.exports.create = function (req, res) {
    console.log(req.cookies);
    res.render("users/create");
};

module.exports.delete = function(req, res) {
    db.read();
    let id = req.query.id;
    let data = db.get("users").find({id: id }).value();
    console.log("User to Process: ", data, "and the id: ", id);
    db.get("users")
      .remove({id: id})
      .write();
    res.render("users/index", {
        users: db.get("users").value()
    });
}
module.exports.edit = function(req, res, next){
    db.read();
    let uid = req.query.id;
    console.log(uid);
    let values = db.get("users").find({id: uid}).value();
    console.log(values);
    if(values.name === req.body.name){
        console.log("No change in name");
    } else {
        db.get("users").find({id: uid})
        .assign({name: req.body.name})
        .write();
    }
    if (values.phone === req.body.phone) {
        console.log("No change in phone");
    } else {
        db.get("users").find({ id: uid })
            .assign({phone: req.body.phone })
            .write();
    }; 
    res.render("users/create");
}
module.exports.get = function (req, res) {
    var id = req.params.id;

    var user = db.get("users").find({ id: id }).value();

    res.render("users/view", {
        user: user
    });
};

module.exports.postCreate = function (req, res) {
    req.body.id = shortid.generate();
    req.body.avatar = req.file.path.split("\\").slice(1).join("/");
    console.log(JSON.stringify(res.locals));
    db.get("users").push(req.body).write();
    res.redirect("/users");
};
