// All Middleware Goes here
var Firm = require("../models/firm");
var Info = require("../models/info");
var middlewareObj = {};

middlewareObj.checkFirmOwnership = function(req, res, next){
        // if user logged in ?
        if(req.isAuthenticated()){
            Firm.findById(req.params.id, function (err, foundFirm){
                if(err){
                    req.flash("error", "Firm not found");
                    res.redirect("back")
                } else{
                    //does user own firm
                    if(foundFirm.author.id.equals(req.user._id)){
                        next();
                    }else{
                        req.flash("error", "You don't have permission to do that !");
                        res.redirect("back")
                    }
                }
            });
        }else {
            req.flash("error", "You need to be log in to continue");
            res.redirect("back");
        }
}

middlewareObj.checkInfoOwnership = function(req, res, next){
    // if user logged in ?
    if(req.isAuthenticated()){
        Info.findById(req.params.info_id, function (err, foundInfo){
            if(err){
                req.flash("error", "Info not found");
                res.redirect("back")
            } else {
                //does user own info
                if(foundInfo.author.id.equals(req.user._id)){
                    next();
                }else{
                    req.flash("error", "You don't have permission to do that !");
                    res.redirect("back")
                }
            }
        });
    }else {
        req.flash("error", "You need to be log in to continue");
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function (req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be log in to continue");
    res.redirect("/login");
}


module.exports = middlewareObj;