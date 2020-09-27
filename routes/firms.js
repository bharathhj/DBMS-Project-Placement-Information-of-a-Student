var express = require("express");
var router = express.Router();
var    Firm        = require("../models/firm");
var middleware = require("../middleware/index.js")

//-------------------------
//INDEX - show all campgrounds
//-------------------------

router.get("/", function(req, res){

    //Get all firms from DB
    Firm.find({}, function (err, allFirms){
        if(err){
            console.log(err);
        } else {
            res.render("firms/index",{firms:allFirms});
        }
    });
});

//-------------------------
// add new Firm the Data into Data Base
//-------------------------

router.post("/", middleware.isLoggedIn, function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var contact = req.body.contact;
    var location = req.body.location;
    var author = {
        id : req.user._id,
        username: req.user.username
    }
    var newFirms = {name: name, image: image, contact: contact, location: location, author: author}
    // Create a new Firm and save to DB
    Firm.create(newFirms, function (err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect to firms
            console.log(newlyCreated);
            req.flash("success", "New Firm Added");
            res.redirect("/firms");
        }
    });
});

//-------------------------
//NEW - show form to create new campground
//-------------------------

router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("firms/new");
});

//-------------------------
// SHOW - shows more about one FIRM
//-------------------------

router.get("/:id", function (req, res){
    // find the firm with provided ID
    Firm.findById(req.params.id).populate("infos").exec(function (err, foundFirm){
        if(err){
            console.log(err);
        } else {
            // render show tamplate with that firm
            res.render("firms/show", {firm: foundFirm});
        }
    });
});



// Edit Firm Route
router.get("/:id/edit", middleware.checkFirmOwnership, function(req, res){
        Firm.findById(req.params.id, function (err, foundFirm){
                    res.render("firms/edit", {firm: foundFirm});
                });
});

// Update Route
router.put("/:id", middleware.checkFirmOwnership, function (req, res){
    //find and update the correct Firm
    Firm.findByIdAndUpdate(req.params.id, req.body.firm, function (err, updatedFirm){
        if(err){
            res.redirect("/firms");
        } else {
            //redirect samewhere(show page)
            req.flash("success", "Your Info has been edited");
            res.redirect("/firms/" + req.params.id);
        }
    });
});

// Destroy Firm Route
    router.delete("/:id", middleware.checkFirmOwnership, function(req, res){
        Firm.findByIdAndRemove(req.params.id, function(err){
            if(err){
                res.redirect("/firms");
            } else {
                req.flash("success", "Your Info has been deleted");
                res.redirect("/firms");
            }
        });
    });





module.exports = router;

