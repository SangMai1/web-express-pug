var express = require("express");
var multer = require("multer");

var router = express.Router();

var controller = require("../controllers/user.controller");
var validate = require("../validate/user.validate");

var upload = multer({dest: "./public/uploads/"});

router.get("/", controller.index);

router.get("/cookie", function(req, res, next){
    res.cookie("user-id", 12345);
    res.send("Hello");
})

router.get("/delete", controller.delete);
router.get("/edit", controller.edit)
router.get("/search", controller.search);

router.get("/create", controller.create);

router.get("/:id", controller.get);

router.post("/create", upload.single("avatar"), validate.postCreate, controller.postCreate);

module.exports = router;