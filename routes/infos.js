var    express     = require("express");
var    router      = express.Router({mergeParams: true});
var    Firm        = require("../models/firm");
var    Info        = require("../models/info");
var    middleware  = require("../middleware/index.js");


//-----------------------
//Info Routes
//-----------------------

router.get("/new", middleware.isLoggedIn, function(req, res){
    // find firm by id
    Firm.findById(req.params.id, function (err, firm){
        if(err){
            console.log(err);
        } else {
            res.render("infos/new", {firm: firm});
        }
    })
});

// Info Create

router.post("/", middleware.isLoggedIn,  function(req, res){
    // lookup firm using ID
    Firm.findById(req.params.id, function (err, firm){
        if(err){
            console.log(err);
            res.redirect("/firms");
        } else {
            Info.create(req.body.info, function (err, info){
                if(err){
                    req.flash("error", "Something went wrong");
                    console.log(err);
                } else {
                    //add user name and id info
                    info.author.id = req.user._id;
                    info.author.username = req.user.username;
                    //save info
                    info.save();
                    firm.infos.push(info);
                    firm.save();
                    req.flash("success", "Successfully added your Info");
                    res.redirect('/firms/' + firm._id);
                }
            });//   Info.create({})
        }
    });
});


// Info Edit route
router.get("/:info_id/edit", middleware.checkInfoOwnership, function (req, res){
    Info.findById(req.params.info_id, function (err, foundInfo){
       if(err){
           res.redirect("back");
       } else {
           res.render("infos/edit", {firm_id: req.params.id, info: foundInfo});
       }
    });
});

 // Info Update
router.put("/:info_id", middleware.checkInfoOwnership, function (req, res){
    Info.findByIdAndUpdate(req.params.info_id, req.body.info, function (err, updatedInfo){
        if(err){
            res.redirect("back");
        } else {
            req.flash("success", "Your Info has been edited");
            res.redirect("/firms/" + req.params.id );
        }
    });
});

// Info DESTROY ROUTE
router.delete("/:info_id", middleware.checkInfoOwnership, function (req,res){
    Info.findByIdAndRemove(req.params.info_id, function (err){
        if(err){
            res.redirect("back");
        } else {
            req.flash("success", "Your Info has been deleted");
            res.redirect("/firms/" + req.params.id );
        }
    });
});








module.exports = router;

