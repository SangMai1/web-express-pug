var db = require("../db");

module.exports.addToCart = function(req, res, next){
    var page = parseInt(req.query.page);
    var productId = req.params.productId;
    var sessionId = req.signedCookies.sessionId;

    var linkProducts = "/products" + ((page) ? "?page=" + page : "");
    if(!sessionId){
        res.redirect("/products");
        return;
    }

    var count = db.get("session")
                .find({id: sessionId})
                .get("cart." + productId, 0)
                .value();
    db.get("session")
      .find({id: sessionId})
      .set("cart." + productId,count + 1)
      .write();

    res.redirect(linkProducts);
}