var shortId = require("shortid");

var db = require("../db");

module.exports = function(req, res, next){
    if(!req.signedCookies.sessionId){
        var sessionId = shortId.generate();
        res.cookie('sessionId', sessionId , {
            signed: true
        });

        db.get("session").push({
            id: sessionId
        }).write();
    } 
         sessionId = req.signedCookies.sessionId;
        res.locals.countCart = db.get("session").find({ id: sessionId }).get("cart").size().value();
        // res.locals.countCart = Object.values(db.get("session")
        //                                         .find({id: sessionId})
        //                                         .get("cart")
        //                                         .values())
    

    next();
}